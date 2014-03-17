<?php

include_once("stemmer.php");
include_once("util.php");
include_once("database/constants.php");
include_once("database/queries.php");
include_once("database/connection.php");
include_once("database/config.php");
include_once("mailhelper.php");

/*
Latrinalia DataBase Helper
*/
class DBHelper{
	
	private $authkey = -1;
	private static $connection;

	function __construct(){
		$this->connection = DBConnection::getInstance();
	}

	/**
	BASIC FUNCTIONS
	**/

	public function setAuthKey($key){
		$this->authkey = $key;
	}

	public function getAuthKey(){
		return $this->authkey;
	}

	private function loggedin(){
		if($this->authkey==-1)return false;
		return true;
	}

	private function query($query){
		//echo $query."\n\n\n";
		if($this->connection->status != DBConfig::$dbStatus["ready"])
			return false;
		if($this->loggedin()){
			$this->update();
		}
		return $this->internalQuery($query);
	}

	// use with caution!!!
	public function getComplete($table){
		return $this->query("SELECT * FROM `".$table."`");
	}

	private function internalQuery($query){
		return $this->connection->query($query);
	}

	// this function updates the last action of the user
	private function update(){
		$q = Queries::update($this->authkey);
		$this->internalQuery($q);
	}

	/**
	USER FUNCTIONS
	**/

	// returns the complete user with the previously defined authkey
	// or a user by id or username or email
	public function getUser($id){
		if(isset($id)){
			$me = $this->getUser();
			if(is_string($id)){
				$query = Queries::getuserbyname($id);
			}else{
				$query = Queries::getuserbyid($id);
			}
			$users = $this->query($query);
			if(count($users)==0)return false;
			$stats = $this->getUserStats($users[0]["id"]);
			if($stats){
				$users[0]["stats"] = $stats[0];
			}
			if((!isset($me))
				||$me==false
				||($me["status"]!=DBConfig::$userStatus["admin"]
					&&$me["id"]!=$users[0]["id"])){
				$users[0]["email"]="user".$users[0]["id"]."@latrinalia.de";
			}
			return $users[0];
		}else{
			$query = Queries::getuser($this->authkey);
			$users = $this->query($query);
			if(count($users)==0)return false;
			return $users[0];
		}
	}

	// verify a new user
	public function verify($key){
		if(!isset($key))return false;
		$query = Queries::verify($key);
		if(!$this->query($query))return false;
		$query = Queries::getuserbykey($key);
		return $this->query($query);
	}

	private function getUserStats($id){
		$query = Queries::getuserstats($id);
		return $this->query($query);
	}

	public function updateUser($mail, $name, $pwd){
		$user = $this->getUser();
		if(!isset($user["id"])){
			return false;
		}

		// check for missing parameters
		if(!isset($mail)&&!isset($name)&&!isset($pwd))return false;
		if(!isset($mail))$mail = $user["email"];
		if(!isset($name))$name = $user["username"];
		if(!isset($pwd))$pwd = $user["password"];


		// check whether username is long enough
		if(strlen($name)<3)return false;

		// username must not be a valid email !!!
		if (filter_var($name, FILTER_VALIDATE_EMAIL))return false;

		// check whether valid email
		if (!filter_var($mail, FILTER_VALIDATE_EMAIL))return false;

		if($user["status"]==DBConfig::$userStatus["unregistered"]){
			$this->registerDummy($user);
		}

		if($mail != $user["email"]){
			$key = md5($mail).uniqid();
			$query = Queries::updateverificationkey($user["id"],$key);
			if($this->query($query)){
				sendVerificationMail($mail, $name, $key);
			}
		}

		if(isset($pwd)){
			$query = Queries::updateuser($user["id"], $mail, $name, $pwd);
		}else{
			$query = Queries::updateuserwithoutpassword($user["id"], $mail, $name);
		}
		return $this->query($query);
	}

	public function getAllUsers(){
		$user = $this->getUser();
		if(!isset($user)
			||$user===false
			||$user["status"]!=DBConfig::$userStatus["admin"]){
			return false;
		}
		$query = Queries::getallusers();
		return $this->query($query);
	}

	private function registerDummy($user){
		$query = Queries::registerdummy($user["id"]);
		return $this->query($query);
	}

	public function createUser($mail, $name, $pwd){
		if(strlen($mail)==0&&strlen($name)==0)return $this->createDummyUser($pwd);
		// check whether username is long enough
		if(strlen($name)<3)return false;

		// username must not be a valid email !!!
		if (filter_var($name, FILTER_VALIDATE_EMAIL))return false;

		// check whether valid email
		if (!filter_var($mail, FILTER_VALIDATE_EMAIL))return false;

		// check whether user already exists
		$user = $this->getUser($mail);
		if(isset($user["id"]))return false;
		$user = $this->getUser($name);
		if(isset($user["id"]))return false;

		$status = DBConfig::$userStatus["newUser"];

		$key = md5($mail).uniqid();
		$query = Queries::createuser($key, $mail, $name, $pwd, $status);
		if($this->query($query)){
			sendVerificationMail($mail, $name, $key);
			return $mail;
		}else{
			return false;
		}
	}

	private function createDummyUser($pwd){
		$name = "User".uniqid();
		$mail = $name."@latrinalia.de";
		$status = DBConfig::$userStatus["unregistered"];
		$key = md5($mail).uniqid();
		$query = Queries::createuser($key, $mail, $name, $pwd, $status);
		if($this->query($query)){
			return $mail;
		}else{
			return false;
		}
	}

	public function deleteUser(){
		$query = Queries::deleteuser($this->authkey);
		return $this->query($query);
	}

	// logs in a user and returns an authkey (or false)
	// set an authkey to combine the newly logged in account with the old one
	public function login($email, $password){
		$query = Queries::getuserbyname($email, $password);
		$users = $this->query($query);
		if(count($users)==0)return false;
		if($users[0]["status"]==DBConfig::$userStatus["deleted"]
			||$users[0]["status"]==DBConfig::$userStatus["newUser"])return false;
		$user = $users[0];
		$oldUser = $this->getUser();
		if(isset($oldUser)
			&&$oldUser!==false
			&&$oldUser["status"]==DBConfig::$userStatus["unregistered"]){
			$this->mergeUser($oldUser["id"], $user["id"]);
		}
		$key = md5($email).uniqid();
		$query = Queries::login($user["id"], $key, md5($_SERVER['HTTP_USER_AGENT'])."@".$_SERVER['REMOTE_ADDR']);
		if($this->query($query)){
			return $key;
		}
		return false;
	}

	// logs out a user (returns whether successfull)
	// $authkey parameter is optional when you called "setAuthKey" before
	public function logout($authkey){
		if(!isset($authkey)){
			if(!$this->loggedin()){
				return false;
			}else{
				$authkey = $this->getAuthkey();
			}
		}
		if($this->getUser()){
			$query = Queries::logout($authkey);
			return $this->query($query);
		}else{
			return false;
		}
	}

	private function mergeUser($oldId, $newId){
		$success = true;
		$query = Queries::mergeuserentries($oldId, $newId);
		if(!$this->query($query))$success = false;
		$query = Queries::mergeuserinformation($oldId, $newId);
		if(!$this->query($query))$success = false;
		$query = Queries::mergeuserrating($oldId, $newId);
		if(!$this->query($query))$success = false;
		$query = Queries::mergeuserreports($oldId, $newId);
		if(!$this->query($query))$success = false;
		$this->deleteUser();
		if($success)$this->hardDeleteUser($oldId);
	}

	// USE WITH CAUTION AND ONLY USE WHEN ALL RELATED ENTRIES ARE
	// DELETED AS WELL OR ASSOCIATED TO ANOTHER USER
	private function hardDeleteUser($id){
		$query = Queries::harddeleteuser($id);
		return $this->query($query);
	}

	/**
	COMMENT FUNCTIONS
	**/

	// get the 10 previous comments (older than $commentid)
	// for $count=-1 delivers the 10 newest comments
	// (assuming the 10th newest comment has the id 123)
	// for $count=123 delivers the 11th to 20th newest comments
	// and so on ...
	// (for endless scrolling/pagination loading purposes)
	public function getComments($entryid, $commentid){
		if($commentid == -1)$commentid = PHP_INT_MAX;
		$query = Queries::getcomments($entryid, $commentid, Constants::NUMCOMMENTS);
		return $this->query($query);
	}

	// adds a comment to an entry
	// returns whether successfull
	public function addComment($entryid, $comment){
		$comment = trim($comment);
		if(strlen($comment)==0)return false;
		$user = $this->getUser();
		$entry = $this->getEntry($entryid);
		if(!isset($user["id"])||!isset($entry["id"])||$user["id"]==DBConfig::$userStatus["unregistered"]){
			return false;
		}
		$query = Queries::addcomment($entryid, $comment, $user["id"]);
		return $this->query($query);
	}

	// returns the complete comment of the given id
	public function getComment($commentid){
		$query = Queries::getcomment($commentid);
		return $this->query($query);
	}

	// delete a comment
	// returns whether successfull
	public function deleteComment($commentid){
		$user = $this->getUser();
		$comment = $this->getComment($commentid);
		if(!isset($user["id"])||!isset($comment[0]["id"])||$user["id"]==DBConfig::$userStatus["unregistered"]){
			return false;
		}
		if($user["status"] == DBConfig::$userStatus["admin"]){
			$id = $comment[0]["userid"];
		}else{
			$id = $user["id"];
		}
		$query = Queries::deletecomment($commentid, $id);
		return $this->query($query);
	}

	// this will only be called if a user is allowed to
	// so we dont have to check it here
	private function removeComments($entryid){
		$query = Queries::removecomments($entryid);
		return $this->query($query);
	}

	/**
	ENTRY FUNCTIONS
	**/

	// returns the complete entry of the given id
	public function getEntry($entryid){
		$query = Queries::getentry($entryid);
		$entry = $this->query($query);
		$user = $this->getUser();
		if(count($entry)==0||!$entry)return false;
		$entry = $entry[0];
		$query = Queries::getusertags($entryid);
		$entry["tags"]=$this->query($query);
		$query = Queries::getimages($entryid);
		$images = $this->query($query);
		foreach($images as $key=>$val){
			$path = $val["path"];
			$small = $this->getThumbnail($path, "s");
			$medium = $this->getThumbnail($path, "m");
			$large = $this->getThumbnail($path, "l");
			$images[$key]["thumbnail"]=$medium;
			$images[$key]["smallthumbnail"]=$small;
			$images[$key]["largethumbnail"]=$large;
		}
		$entry["images"]=$images;
		$query = Queries::getratings($entryid, $user["id"]);
		$entry["ratings"]=$this->query($query);
		$query = Queries::getinformation($entryid);
		$entry["information"]=$this->query($query);
		return $entry;
	}

	// returns the first 20 entries after $start ordered by $orderby
	// (for $orderby select a name of one of the attributes returned)
	// $where parameter is optional and mostly used intern
	public function getAllEntries($orderby, $start, $where, $num){
		if(!isset($start)){
			$start = 0;
		}
		if(!isset($num))$num = Constants::NUMENTRIES;
		$user = $this->getUser();
		if($orderby == "rating"){
			$entries = $this->getAllEntriesByRating($start, $where);
		}else{
			$query = Queries::getallentries($start, $num, $orderby, $where);
			$entries = $this->query($query);
		}
		$entries = $this->addExtras($entries, $user["id"]);
		return $entries;
	}

	// get all entries of a specific user
	public function getAllEntriesByUser($userid, $orderby, $start){
		$user = $this->getUser($userid);
		if(!isset($user["id"]))return false;
		$e = DBConfig::$tables["entries"];
		$where = "`$e`.userid = ".$user["id"];
		return $this->getAllEntries($orderby, $start, $where);
	}

	public function getAllEntriesRatedByMe($start){
		if(!isset($start))$start = 0;
		$user = $this->getUser();
		if(!isset($user["id"]))return false;
		$e = DBConfig::$tables["entries"];
		$where = "`$e`.userid = ".$user["id"];
		$query = Queries::getentriesbyrating($start, Constants::NUMENTRIES, $where, $user["id"]);
		$entries = $this->query($query);
		$entries = $this->addExtras($entries, $user["id"]);
		return $entries;
	}

	// $where parameter is optional and mostly used intern
	private function getAllEntriesByRating($start, $where, $userid){
		$query = Queries::getentriesbyrating($start, Constants::NUMENTRIES, $where, $userid);
		$entries = $this->query($query);
		return $entries;
	}

	// returns the first 20 entries after $start ordered by $orderby
	// (for $orderby select a name of one of the attributes returned)
	// where entry.sex = $sex
	// (if $sex is neither "m" nor "w" neutral entries are returned)
	public function getAllEntriesBySex($sex, $orderby, $start){
		if($sex == "m" || $sex == "w"){
			$where = "`sex` = '$sex'";
		}else{
			$where = "(`sex`!='m' AND `sex`!='w')";
		}
		return $this->getAllEntries($orderby, $start, $where);
	}

	// returns the first 20 entries after $start ordered by $orderby
	// (for $orderby select a name of one of the attributes returned)
	// where entry.type = $type
	// here you can give a type or an array of types (typeid)
	public function getAllEntriesByType($type, $orderby, $start){
		$e = DBConfig::$tables["entries"];
		$t = DBConfig::$tables["types"];
		$where = "";
		if(is_array($type)){
			if(count($type)>0){
				$singletype = $type[0];
				if(is_string($singletype)){
					$where .= "($t.name='$singletype')";
				}else{
					$where .= "($e.typeid=$singletype)";
				}
				foreach($type as $singletype){
					if(is_string($singletype)){
						$where .= " OR ($t.name='$singletype')";
					}else{
						$where .= " OR ($e.typeid=$singletype)";
					}
				}
			}
		}else{
			if(is_string($type)){
				$where .= "($t.name='$type')";
			}else{
				$where .= "($e.typeid=$type)";
			}
		}
		return $this->getAllEntries($orderby, $start, $where);
	}

	// here you can give a tag or an array of tags (tagid:int or tagname:string (or mixed))
	public function getAllEntriesByTag($tag, $orderby, $start){
		$e = DBConfig::$tables["entries"];
		$tags = DBConfig::$tables["tags"];
		$usertags = DBConfig::$tables["usertags"];
		$where = "";
		if(is_array($tag)){
			if(count($tag)>0){
				$singletag = $tag[0];
				if(is_string($singletag)){
					$where .= "($tags.tag = '$singletag' AND $tags.tagid=$usertags.tagid AND $e.id=$usertags.entryid)";
				}else{
					$where .= "($usertags.tagid=$singletag AND $e.id=$usertags.entryid)";
				}
				foreach($tag as $singletag){
					if(is_string($singletag)){
						$where .= " OR ($tags.tag = '$singletag' AND $tags.tagid=$usertags.tagid AND $e.id=$usertags.entryid)";
					}else{
						$where .= " OR ($usertags.tagid=$singletag AND $e.id=$usertags.entryid)";
					}
				}
			}
		}else{
			if(is_string($tag)){
				$where = "($tags.tag = '$tag' AND $tags.tagid=$usertags.tagid AND $e.id=$usertags.entryid)";
			}else{
				$where = "($usertags.tagid=$tag AND $e.id=$usertags.entryid)";
			}
		}
		return $this->getAllEntries($orderby, $start, $where);
	}

	public function getAllEntriesByLocation($location, $orderby, $start){
		$e = DBConfig::$tables["entries"];
		$info = DBConfig::$tables["information"];
		$where = "";
		if(is_array($location)){
			if(count($location)>0){
				$singlelocation = $location[0];
				if(is_string($singlelocation)){
					$where .= "(`$info`.location LIKE '%$singlelocation%')";
				}else{
					return false;
				}
				foreach($location as $singlelocation){
					if(is_string($singlelocation)){
						$where .= " OR (`$info`.location LIKE '%$singlelocation%')";
					}else{
						return false;
					}
				}
			}
		}else{
			if(is_string($location)){
				$where .= "(`$info`.location = '$location')";
			}else{
				return false;
			}
		}
		$query = Queries::getentriesbylocation($start, Constants::NUMENTRIES, $orderby, $where);
		$entries = $this->query($query);

		$queriedEntries = array();

		foreach($entries as $singleEntry){
			$entry = $this->getEntry($singleEntry["id"]);
			array_push($queriedEntries, $entry);
		}

		return $queriedEntries;
	}

	// returns an array of random entries for the user to transcribe
	// (mostly new entries without a transcription)
	// $amount is the number of entries to return
	// (when not given one entry is returned)
	public function getRandomUntranscribedEntries($amount){
		if(!isset($amount))$amount = 1;

		// check whether logged in
		// and get lowest ratings
		$user = $this->getUser();
		$query = Queries::getrandomuntranscribedids();

		$ids = $this->query($query);
		if(!$ids||count($ids)==0)return false;

		if(count($ids)==1){
			return $this->getEntry($ids[0]["id"]);
		}

		// randomize list
		shuffle($ids);

		// get entries with those rating
		$e = DBConfig::$tables["entries"];
		$where = "`$e`.id = ".$ids[0]["id"];
		for($i=1;$i<count($ids)&&$i<$amount;$i++){
			$where .= " OR `$e`.id = ".$ids[$i]["id"];
		}
		$query = Queries::getEntry(false,$where);

		$entries = $this->query($query);

		if(!$entries)return false;
		$entries = $this->addExtras($entries, $user["id"]);
		shuffle($entries);
		return $entries;
	}

	// returns an array of random entries for the user to rate
	// (mostly new entries with few ratings)
	// $amount is the number of entries to return
	// (when not given one entry is returned)
	public function getRandomEntries($amount){
		if(!isset($amount))$amount = 1;

		// check whether logged in
		// and get lowest ratings
		$user = $this->getUser();
		if(!$user||!isset($user["id"])){
			$query = Queries::getrandomratings();
		}else{
			$query = Queries::getrandomratingsforuser($user["id"]);
		}

		$ratings = $this->query($query);
		if(!$ratings||count($ratings)==0)return false;

		if(count($ratings)==1){
			return $this->getEntry($ratings[0]["id"]);
		}

		// randomize list
		shuffle($ratings);

		// get entries with those rating
		$e = DBConfig::$tables["entries"];
		$where = "`$e`.id = ".$ratings[0]["id"];
		for($i=1;$i<count($ratings)&&$i<$amount;$i++){
			$where .= " OR `$e`.id = ".$ratings[$i]["id"];
		}
		$query = Queries::getEntry(false,$where);

		$entries = $this->query($query);

		if(!$entries)return false;
		$entries = $this->addExtras($entries, $user["id"]);
		shuffle($entries);
		return $entries;
	}

	// delete an entry by id
	// can only be done if you own the entry
	// or if you are an admin
	// (setauthkey before)
	public function deleteEntry($id){
		if(!isset($id))return false;
		$user = $this->getUser();
		if(!isset($user["id"]))return false;

		// check if the user is allowed to delete the entry
		// if not admin
		if(!$user["status"]==DBConfig::$userStatus["admin"]){
			$entry = $this->getEntry($id);
			if(!isset($entry["userid"])
				|| $entry["userid"]!=$user["id"]){
				return false;
			}
		}

		if(!$this->removeIndex($id))return false;
		if(!$this->removeTags($id))return false;
		if(!$this->removeComments($id))return false;
		if(!$this->removeRatings($id))return false;
		if(!$this->removeReports($id))return false;
		if(!$this->removeImages($id))return false;
		if(!$this->removeInformation($id))return false;

		$query = Queries::deleteentry($id);
		return $this->query($query);
	}

	/* ok here you need to pass me an associative array !!!
	 (too many parameters are bad -> use a parameter-object instead)
	 the associative array has to look like this:

	 everyting but title and type is optional!

	 {
		title : "blabla",
		type : "type or typeid",

		sex : "m or w (or anything else - 1 character only !!!)",
		artist : "tiki",
		transcription : "viel gelaber über nichts",
		location : "in einem land vor unserer zeit",
		lat : 48.9987627,
		long : 12.0969202,
		tags : [
			1,4,"comedy","family",7
		]

	 }
	*/
	public function createEntry($entry){
		// check for valid $entry
		// check for necessarry parameters
		if(!isset($entry["title"]))return false;
		if(!isset($entry["type"]))return false;
		// check for optional parameters
		if(!isset($entry["sex"])||strlen($entry["sex"])!=1)$entry["sex"]="?";
		if(!isset($entry["artist"]))$entry["artist"]="";
		if(!isset($entry["transcription"]))$entry["transcription"]="";
		if(!isset($entry["location"]))$entry["location"]="";
		if(!isset($entry["lat"]))$entry["lat"]="-1";
		if(!isset($entry["long"]))$entry["long"]="-1";
		if(!isset($entry["tags"])||!is_array($entry["tags"]))$entry["tags"]= array();

		// check whether logged in
		$user = $this->getUser();
		if(!isset($user["id"]))return false;

		// get the type (to get the id)
		$type = $this->getType($entry["type"]);
		if(!isset($type["id"]))return false;

		// create the entry
		$query = Queries::createentry($user["id"], $type["id"], $entry["title"], $entry["sex"]);
		$entryid = $this->query($query);
		if(!$entryid)return false;

		// add tags
		$this->addTag($entry["tags"], $entryid);

		// add information
		$this->addInformation($entryid,$entry["artist"],$entry["transcription"],$entry["location"],$entry["lat"],$entry["long"], $user["id"]);

		// index
		$taggedTitle = $entry["title"];
		foreach($entry["tags"] as $tag){
			if(is_numeric($tag)){
				$tagText = $this->getTag($tag)["tag"];
			}else{
				$tagText = $tag;
			}
			if($tagText)$taggedTitle .= " ".$tagText;
		}
		$this->index($entryid, $taggedTitle, $entry["transcription"]);

		return $entryid;
	}

	/* ok here you need to pass me an associative array !!!
	 (too many parameters are bad -> use a parameter-object instead)
	 the associative array has to look like this:

	 everyting but the id is optional!!!

	 {
	 	id : 1,
		title : "blabla",
		type : "type or typeid",
		sex : "m or w (or anything else - 1 character only !!!)",
		artist : "tiki",
		transcription : "viel gelaber über nichts",
		location : "in einem land vor unserer zeit",
		lat : 48.9987627,
		long : 12.0969202,
		tags : [
			1,4,"comedy","family",7
		]

	 }
	*/
	public function updateEntry($entry){

		// check for valid $entry
		// check for necessarry parameters
		if(!isset($entry["id"]))return false;

		// check whether logged in
		$user = $this->getUser();
		if(!isset($user["id"]))return false;

		// get the entry
		$e = $this->getEntry($entry["id"]);
		$type = $this->getType($e["typeid"]);

		// check whether allowed to make changes
		if(!$user["status"]==DBConfig::$userStatus["admin"]
			&&$user["id"]!=$e["userid"]){
			return false;
		}

		// whether to do what
		$updateEntry = false;
		$index = false;
		$tags = false;
		$information = false;

		// check for optional parameters
		if(!isset($entry["title"])
			||$entry["title"]==$e["title"])
			$entry["title"]=$e["title"];
		else{
			$index = true;
			$updateEntry = true;
		}
		if(!isset($entry["type"])
			||$entry["type"]==$type["id"]
			||$entry["type"]==$type["name"]){
			$entry["type"]=$type["id"];
		}else{
			$entry["type"]=$this->getType($entry["type"])["id"];
			$updateEntry = true;
		}
		if(!isset($entry["sex"])
			||$entry["sex"]==$e["sex"])
			$entry["sex"]=$e["sex"];
		else{
			$updateEntry = true;
			if(strlen($entry["sex"])!=1)
				$entry["sex"]="?";
		}

		if(!isset($entry["artist"])
			||$entry["artist"]==$e["information"][0]["artist"])
			$entry["artist"]=$e["information"][0]["artist"];
		else $information = true;
		if(!isset($entry["transcription"])
			||$entry["transcription"]==$e["information"][0]["transcription"])
			$entry["transcription"]=$e["information"][0]["transcription"];
		else{
			$index = true;
			$information = true;
		}
		if(!isset($entry["location"])
			||$entry["location"]==$e["information"][0]["location"])
			$entry["location"]=$e["information"][0]["location"];
		else $information = true;
		if(!isset($entry["lat"])
			||$entry["lat"]==$e["information"][0]["latitude"])
			$entry["lat"]=$e["information"][0]["latitude"];
		else $information = true;
		if(!isset($entry["long"])
			||$entry["long"]==$e["information"][0]["longitude"])
			$entry["long"]=$e["information"][0]["longitude"];
		else $information = true;

		if(isset($entry["tags"])&&is_array($entry["tags"])){
			if(count($entry["tags"])!=count($e["tags"])){
				$tags = true;
			}else{
				foreach($entry["tags"] as $newTag){
					if($tags)break;
					foreach($e["tags"] as $oldTag){
						if($newTag != $oldTag["tagid"]
							&& $newTag != $oldTag["tag"]){
							$tags = true;
							break;
						}
					}
				}
			}
		}

		// update the entry
		if($updateEntry){
			$query = Queries::updateentry($entry["id"], $entry["type"], $entry["title"], $entry["sex"]);
			$result = $this->query($query);
			if(!$result)return false;
		}

		// add tags
		if($tags){
			$this->removeTags($entry["id"]);
			$this->addTag($entry["tags"], $entry["id"]);
		}

		// add information
		if($information){
			$this->removeInformation($entry["id"]);
			$this->addInformation($entry["id"],$entry["artist"],$entry["transcription"],$entry["location"],$entry["lat"],$entry["long"], $user["id"]);
		}

		// index
		if($index || $tags){
			$this->removeIndex($entry["id"]);
			$taggedTitle = $entry["title"];
			foreach($entry["tags"] as $tag){
				if(is_numeric($tag)){
					$tagText = $this->getTag($tag)["tag"];
				}else{
					$tagText = $tag;
				}
				if($tagText)$taggedTitle .= " ".$tagText;
			}
			$this->index($entry["id"], $taggedTitle, $entry["transcription"]);
		}

		return $entry["id"];
	}

	public function reIndexEverything(){
		$entries = $this->getAllEntries("date", 0, null, -1);
		foreach($entries as $e){
			$this->removeIndex($e["id"]);
			$taggedTitle = $e["title"];
			foreach($e["tags"] as $t){;
				$tag = $t["tag"];
				if(is_numeric($tag)){
					$tagText = $this->getTag($tag)["tag"];
				}else{
					$tagText = $tag;
				}
				if($tagText)$taggedTitle .= " ".$tagText;
			}
			$this->index($e["id"], $taggedTitle, $e["information"][0]["transcription"]);
		}
	}

	private function addExtras($entries, $userid){
		foreach($entries as $key=>$value){
			$query = Queries::getusertags($value["id"]);
			$value["tags"]=$this->query($query);
			$query = Queries::getimages($value["id"]);
			$images = $this->query($query);
			foreach($images as $k=>$val){
				$path = $val["path"];
				$small = $this->getThumbnail($path, "s");
				$medium = $this->getThumbnail($path, "m");
				$large = $this->getThumbnail($path, "l");
				$images[$k]["thumbnail"]=$medium;
				$images[$k]["smallthumbnail"]=$small;
				$images[$k]["largethumbnail"]=$large;
			}
			$value["images"]=$images;
			$query = Queries::getratings($value["id"], $userid);
			$value["ratings"]=$this->query($query);
			$query = Queries::getinformation($value["id"]);
			$value["information"]=$this->query($query);
			$entries[$key]=$value;
		}
		return $entries;
	}

	/**
	INFORMATION FUNCTIONS
	*/

	// this will only be called if the user is allowed to
	// so we dont have to check it here
	private function removeInformation($entryid){
		$query = Queries::removeinformation($entryid);
		return $this->query($query);
	}

	private function addInformation($entryid,$artist,$transcription,$location,$lat,$long, $userid){
		$query = Queries::addinformation($entryid, $artist, trim($transcription), $location, $lat, $long, $userid);
		return $this->query($query);
	}

	// need to be owner of entry or transcription or an admin
	public function updateTranscription($entryid, $transcription){
		$entry = $this->getEntry($entryid);
		if(!isset($entry["id"]))return false;
		$info = $entry["information"][0];

		// do nothing if no update necessary
		if($info["transcription"]==$transcription)return true;

		$user = $this->getUser();
		if(!isset($user["id"]))return false;

		// check whether allowed to update
		if($user["status"]!=DBConfig::$userStatus["admin"]
			&&$user["id"]!=$entry["userid"]
			&&$user["id"]!=$info["transcriberid"]
			&&strlen(trim($info["transcription"]))>0)return false;

		if(!$this->removeInformation($entryid))return false;
		$this->addInformation(
			$entryid,
			$info["artist"],
			trim($transcription),
			$info["location"],
			$info["lat"],
			$info["long"],
			$user["id"]);

		if($this->removeIndex($entryid)){
			$taggedTitle = $entry["title"];
			foreach($entry["tags"] as $tag){
				if(is_numeric($tag)){
					$tagText = $this->getTag($tag)["tag"];
				}else{
					$tagText = $tag;
				}
				if($tagText)$taggedTitle .= " ".$tagText;
			}
			return $this->index($entryid, $taggedTitle, $transcription);
		}else
			return true;
	}

	/**
	TAG FUNCTIONS
	*/

	// Get a tag (as described in the database) by its id:int or name:string
	public function getTag($tag){
		if(is_string($tag)){
			$query = Queries::gettagbyname($tag);
		}else{
			$query = Queries::gettagbyid($tag);
		}
		$singletag = $this->query($query);
		if(count($singletag)==0)return false;
		return $singletag[0];
	}

	/* 
	*	Create a new tag (give single strings or an array of strings)
	*	Returns the id of the newly created tag or the id of an already
	*	existing tag with the same name
	*/
	public function createTag($tag){
		if(is_array($tag)){
			$success = true;
			foreach($tag as $t){
				if(!$this->createTag($t)){
					$success = false;
				}
			}
			return $success;
		}else{
			$tags = $this->getTag($tag);
			if(isset($tags["tagid"])){
				return $tags["tagid"];
			}
			if(strlen(trim($tag))<3)return false;
			$tag = strtolower($tag);
			$query = Queries::createtag($tag);
			return $this->query($query);
		}
	}

	// get all available tags (optional $status, see DBConfig::tagStatus)
	public function getAllTags($status){
		if(isset($status)){
			$query = Queries::getalltagsbystatus($status);
		}else{
			$query = Queries::getalltags();
		}
		return $this->query($query);
	}

	// delete a tag (or array of tags) by id:int or name:string
	// can only be done by admins
	// returns whether successfull
	public function deleteTag($tag){
		if(is_array($tag)){
			$success = true;
			foreach($tag as $t){
				if(!$this->deleteTag($t)){
					$success = false;
				}
			}
			return $success;
		}else{
			$user = $this->getUser();
			$singletag = $this->getTag($tag);
			if(!isset($user["id"])||!isset($singletag["tagid"])){
				return false;
			}
			if($user["status"] == DBConfig::$userStatus["admin"]){
				$query = Queries::deletetag($singletag["tagid"]);
				if(!$this->query($query))return false;
				$query = Queries::removetag($singletag["tagid"]);
				return $this->query($query);
			}else{
				return false;
			}
		}
	}

	// adds a tag to an entry (tagid or string)
	// if the tag doesnt exist its added
	// you can also give an array of tags
	// you need to be logged in to add tags to entries
	// admins can add tags to any entry
	//
	// $user is only used internally (ignore it)
	public function addTag($tag, $entryid, $user){
		if(!isset($user)){
			$user = $this->getUser();
		}
		if(!isset($entryid["id"])){
			$entry = $this->getEntry($entryid);
		}else{
			$entry = $entryid;
		}
		if(!$user
			||!$entry
			||($entry["userid"]!=$user["id"] && $user["status"]!=DBConfig::$userStatus["admin"])){
			return false;
		}

		if(is_array($tag)){
			$success = true;
			foreach($tag as $t){
				if(!$this->addTag($t, $entry, $user)){
					$success = false;
				}
			}
			return $success;
		}else{
			$tagid = $this->createTag($tag);
			if($tagid == false)return false;
			$query = Queries::addTag($tagid, $entry["id"]);
			return $this->query($query);
		}
	}

	// this will only be called if the user is allowed to
	// so we dont need to check it here
	private function removeTags($entryid){
		$query = Queries::removetags($entryid);
		return $this->query($query);
	}
	
	/**
	TYPE FUNCTIONS
	*/
	
	// returns a specific type
	// unset $type returns all types
	public function getType($type){
		if(!isset($type))return $this->getAllTypes();
		if(is_string($type)){
			$query = Queries::gettypebyname($type);
		}else{
			$query = Queries::gettypebyid($type);
		}
		$types = $this->query($query);
		if(count($types)==0)return false;
		return $types[0];
	}
	
	// create a new type or update it if it already exists
	// (set authkey before)
	// admin only
	public function createType($name, $description){
		$user = $this->getUser();
		if(!isset($user["id"])||$user["status"]!=DBConfig::$userStatus["admin"]){
			return false;
		}
		$type = $this->getType($name);
		if(isset($type["id"])){
			return $this->updateType($type["id"], $name, $description);
		}
		$query = Queries::createtype($name, $description);
		return $this->query($query);
	}

	// update an existing type (set authkey before)
	// admin only
	public function updateType($id, $name, $description){
		$user = $this->getUser();
		if(!isset($user["id"])||$user["status"]!=DBConfig::$userStatus["admin"]){
			return false;
		}
		$query = Queries::updatetype($id, $name, $description);
		return $this->query($query);
	}

	// remove an existing type (set authkey before)
	// admin only
	public function deleteType($type){
		$user = $this->getUser();
		if(!isset($user["id"])||$user["status"]!=DBConfig::$userStatus["admin"]){
			return false;
		}
		$type = $this->getType($type);
		if(!isset($type["id"]))return false;
		$query = Queries::deletetype($type["id"]);
		$result = $this->query($query);
		if(!$result)return false;
		$query = Queries::removetypefromentries($type["id"]);
		return $this->query($query);
	}

	// returns all types
	public function getAllTypes(){
		$query = Queries::getalltypes();
		return $this->query($query);
	}

	/**
	RATING FUNCTIONS
	*/

	// you need to be logged in to do that
	// $rating can be positive or negative (or 0 to reset it)
	public function addRating($entryid, $rating){
		$user = $this->getUser();
		if(!isset($user["id"])||$user["id"]==DBConfig::$userStatus["unregistered"])return false;
		$rating = $rating>0?1:($rating<0?-1:0);
		if($rating == 0){
			$query = Queries::deleterating($entryid, $user["id"]);
		}else{
			$query = Queries::addrating($entryid, $user["id"], $rating);
		}
		return $this->query($query);
	}

	// this will only be called if the user is allowed to
	// so we dont have to check it here
	private function removeRatings($entryid){
		$query = Queries::removeratings($entryid);
		return $this->query($query);
	}

	/**
	REPORT FUNCTIONS
	*/

	// There are two ways to call this method !!!!!!
	// First:
	//		Only give the $id (reportid) and get the full
	//		report with this id (you need to be logged in)
	// Second:
	//		Give the $id (entryid) and a $userid
	//		(you need to be logged on for that or an admin)
	//		to get all reports from that user on the given entry
	// 		(including possible reports on comments)
	public function getReport($id, $userid){
		if(isset($userid)){
			return $this->getReportOfUser($id, $userid);
		}else{
			$user = $this->getUser();

			if(!isset($user["id"]))return false;

			$query = Queries::getreport($id);
			$report = $this->query($query);

			if(count($report)==0)return false;

			if($user["status"]!=DBConfig::$userStatus["admin"]
				&& $user["id"]!=$report[0]["userid"])return false;

			return $report[0];
		}
	}

	// This is basically the second method of calling getReport()
	// returns all reports of a user about an entry (or its comments)
	// if youre the user (or an admin)
	public function getReportOfUser($entryid, $userid){
		$user = $this->getUser();

		if($user["status"]!=DBConfig::$userStatus["admin"]
				&& $user["id"]!=$userid)return false;

		$query = Queries::getreportofuser($entryid, $userid);
		return $this->query($query);
	}

	// you dont need to be logged in to do that
	// but you should be
	// $commentid doesnt have to be set ...
	public function addReport($entryid, $reportdescription, $commentid){
		if(strlen(trim($reportdescription))<10)return false;
		$user = $this->getUser();
		if(isset($user["id"])){
			$userid = $user["id"];
		}else{
			$userid = -1;
		}
		if(!isset($commentid))$commentid = -1;
		$query = Queries::addreport($entryid, $userid, DBConfig::$reportStatus["open"], $commentid, $reportdescription);
		return $this->query($query);
	}

	// you can only do this as an admin!
	public function updateReport($reportid, $status){
		$user = $this->getUser();
		if(!isset($user["id"])||$user["status"]!=DBConfig::$userStatus["admin"]){
			return false;
		}
		$report = $this->getReport($reportid);
		if(!isset($report["reportid"]))return false;
		$query = Queries::updatereportstatus($reportid, $status);
		return $this->query($query);
	}

	// this will only be called if the user is allowed to
	// so we dont have to check it here
	private function removeReports($entryid){
		$query = Queries::removereports($entryid);
		return $this->query($query);
	}

	/**
	IMAGE FUNCTIONS
	*/

	public function getImage($id){
		$query = Queries::getimage($id);
		return $this->query($query);
	}

	// you need to be logged on as owner of the entry (or admin)
	public function updateImage($id, $x, $y, $w, $h){
		// get user
		$user = $this->getUser();
		if(!isset($user["id"]))return false;
		// get image
		$img = $this->getImage($id);
		if(count($img)==0)return false;
		// check whether allowed to make changes
		if($user["status"]!=DBConfig::$userStatus["admin"]
				&& $user["id"]!=$img[0]["userid"])return false;
		$query = Queries::updateimage($id, $x, $y, $w, $h);
		return $this->query($query);
	}

	// this will only be called if the user is allowed to
	// so we dont have to check it here
	private function removeImages($entryid){
		$query = Queries::removeimages($entryid);
		return $this->query($query);
	}

	// saves a new image to the databse
	public function saveImage($entryid, $url, $x, $y, $w, $h){
		$query = Queries::saveimage($entryid, $url, $x, $y, $w, $h);
		return $this->query($query);
	}

	public function getThumbnail($path, $size){
		return str_lreplace(".", "$size.", $path);
	}

	/**
	INDEXING FUNCTIONS
	*/

	// this will only be called if the user is allowed to
	// so we dont have to check it here
	private function removeIndex($entryid){
		$query = Queries::removeindex($entryid);
		return $this->query($query);
	}

	private function index($entryid, $title, $transcription){
		$titleWords = de_stemmer_stem_list($title);
		$transcWords = de_stemmer_stem_list($transcription);
		$titleWordCount = 0;
		$transcWordCount = 0;
		$words = array();
		foreach($titleWords as $key=>$stem){
			if(isset($words[$stem["stem"]])){
				$words[$stem["stem"]]["titleoccurence"]+= $stem["count"];
			}else{
				$word = array(
					"word" => $stem["stem"],
					"transcriptionoccurence" => 0,
					"titleoccurence" => $stem["count"]
				);
				$words[$stem["stem"]]=$word;
			}
			$titleWordCount += $stem["count"];
		}
		foreach($transcWords as $key=>$stem){
			if(isset($words[$stem["stem"]])){
				$words[$stem["stem"]]["transcriptionoccurence"]+= $stem["count"];
			}else{
				$word = array(
					"word" => $stem["stem"],
					"transcriptionoccurence" => $stem["count"],
					"titleoccurence" => 0
				);
				$words[$stem["stem"]]=$word;
			}
			$transcWordCount += $stem["count"];
		}

		$success = true;
		foreach($words as $word){
			$query = Queries::index($word["word"], $entryid, $word["titleoccurence"], $word["transcriptionoccurence"]);
			$result = $this->query($query);
			if(!$result)$success = false;
		}
		return $success;
	}

	public function search($searchstring, $start){
		if(!isset($start))$start = 0;
		$stems = de_stemmer_stem_list($searchstring);
		if(count($stems)==1)$words = $stems[$searchstring]["stem"];
		else{
			$words = array();
			foreach($stems as $stem){
				$words[count($words)] = $stem["stem"];
			}
		}
		$query = Queries::search($words, $start, Constants::NUMSEARCHRESULTS);
		$entryids = $this->query($query);
		if(!$entryids||count($entryids)==0)return false;

		// create the query
		$entries = array();
		foreach($entryids as $id){
			$entry = $this->getEntry($id["id"]);
			if(!$entry)continue;
			$entries[count($entries)] = $entry;
		}

		return $entries;
	}

	/**
	TIMELINE FUNCTIONS
	*/

	// returns a list of timeline-events
	public function getTimeLine($start){
		$user = $this->getUser();
		if(!isset($user["id"]))return false;
		if(!isset($start))$start = 0;
		$query = Queries::gettimeline($user["id"], $start, Constants::NUMTIMELINE);
		$timeline = $this->query($query);
		if(!$timeline)return false;
		foreach($timeline as $key=>$val){
			$timeline[$key]["smallthumbnail"] = $this->getThumbnail($val["path"], "s");
		}
		return $timeline;
	}

	/**
	LOCATION FUNCTIONS
	*/

	// deletes a complete location (admin only)
	public function deleteLocation($id){
		$user = $this->getUser();
		if(!isset($user["id"])
			||$user["status"]!=DBConfig::$userStatus["admin"])
			return false;
		$query = Queries::deletelocation($id);
		return $this->query($query);
	}

	// creates a location (admin only)
	public function createLocation($locations, $flat, $flong, $tlat, $tlong){
		$user = $this->getUser();
		if(!isset($user["id"])
			||$user["status"]!=DBConfig::$userStatus["admin"])
			return false;
		$query = Queries::createlocation($locations, $flat, $flong, $tlat, $tlong);
		return $this->query($query);
	}

	// updates a location (admin only)
	public function updateLocation($id, $locations, $flat, $flong, $tlat, $tlong){
		$user = $this->getUser();
		if(!isset($user["id"])
			||$user["status"]!=DBConfig::$userStatus["admin"])
			return false;
		$query = Queries::updatelocation($id, $locations, $flat, $flong, $tlat, $tlong);
		return $this->query($query);
	}

	// returns a list of location-objects (with an array of location-names)
	// corresponding to the given latitude and longitude
	public function getLocations($lat, $long){
		if(!isset($lat)||!isset($long)){
			$user = $this->getUser();
			if(!isset($user["id"])
				||$user["status"]!=DBConfig::$userStatus["admin"])
				return false;
			else
				$locs = $this->getAllLocations();
		}else{
			$query = Queries::getalllocations($lat, $long);
			$locs = $this->query($query);
		}
		return $this->explodeLocs($locs);
	}

	public function getUsedLocations(){
		$query = Queries::getusedlocations();
		return $this->query($query);
	}

	private function getAllLocations(){
		$query = Queries::getalllocations();
		return $this->query($query);
	}

	private function explodeLocs($locs){
		foreach($locs as $key=>$val){
			$locations = explode(";", $val["locations"]);
			foreach($locations as $k=>$v){
				$locations[$k] = trim($v);
			}
			$locs[$key]["locations"] = $locations;
		}
		return $locs;
	}

}

?>