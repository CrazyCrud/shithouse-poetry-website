<?php

class Constants{
	const NUMCOMMENTS = 10;
	const NUMENTRIES = 20;
}

/*
Configuration class containing only constants concerning the database
*/
class DBConfig{

	public static $settings = array(
		"sqllocation" => "localhost",
		"sqluser" => "root",
		"sqlpwd" => "",
		"sqldb" => "latrinalia"
	);

	public static $tables = array(
		"comments" => "comment",
		"entries" => "entry",
		"images" => "images",
		"information" => "information",
		"ratings" => "rating",
		"reports" => "report",
		"tags" => "tags",
		"types" => "type",
		"users" => "user",
		"usertags" => "usertags"
	);

	public static $dbStatus = array(
		"idle" => 0,
		"ready" => 1,
		"busy" => 2,
		"offline" => 3
	);

	public static $userStatus = array(
		"deleted" => -1,
		"newUser" => 0,
		"default" => 0,
		"admin" =>1
	);

	public static $tagStatus = array(
		"usercreated" => 0,
		"global" => 1
	);

}

/*
Generic Database Helper
*/
class DBConnection{
	
	private $link;
	private static $singleton;
	public $status = 0;

	// DO NOT CALL THIS!!! USE getInstance() INSTEAD
	function __construct() {
		$this->initConnection();
	}

	private function initConnection(){
		$link = mysql_connect(
			DBConfig::$settings["sqllocation"],
			DBConfig::$settings["sqluser"],
			DBConfig::$settings["sqlpwd"])
		or $this->error(DBConfig::$dbStatus["offline"]);
		mysql_select_db(
			DBConfig::$settings["sqldb"],
			$link)
		or $this->error(DBConfig::$dbStatus["offline"]);
		mysql_query("SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'", $link);
		$this->link = $link;
		$this->status = DBConfig::$dbStatus["ready"];
	}

	private function error($status){
		$this->status = $status;
	}

	public function query($q){
		$rows = array();
		$result = mysql_query($q, $this->link)
		or $this->error(DBConfig::$dbStatus["offline"]);
		if(strpos($q,"INSERT")!==false)return mysql_insert_id();
		if(is_bool($result))return $result;
		while ($row = mysql_fetch_assoc($result)){
			$rows[count($rows)]=$row;
		}
		return $rows;
	}

	// Use this function to get the singleton
	public static function getInstance(){
		if(!isset(self::$singleton)){
			self::$singleton = new DBConnection();
		}
		return self::$singleton;
	}

}


/*
Latrinalia DataBase Queries
*/
class Queries{
	/**
	USER QUERIES
	**/
	public static function getuser($sessionkey){
		return
		"SELECT id, email, username, joindate, lastaction, status
		FROM `".DBConfig::$tables["users"]."` WHERE `sessionkey` = \"$sessionkey\"";
	}
	public static function getuserbyid($id){
		return
		"SELECT id, email, username, joindate, lastaction, status
		FROM `".DBConfig::$tables["users"]."` WHERE `id` = \"$id\"";
	}
	public static function update($key){
		$u = DBConfig::$tables["users"];
		$date = date( 'Y-m-d H:i:s', time());
		return "UPDATE $u
		SET lastaction='$date'
		WHERE sessionkey='$key'";
	}
	public static function updateuserwithoutpassword($userid, $mail, $name){
		return "UPDATE $u
		SET email='$mail',
		username='$name'
		WHERE id=$userid";
	}
	public static function updateuser($userid, $mail, $name, $pwd){
		$u = DBConfig::$tables["users"];
		return "UPDATE $u
		SET email='$mail',
		username='$name',
		password='$pwd'
		WHERE id=$userid";
	}
	public static function createuser($key, $mail, $name, $pwd){
		$u = DBConfig::$tables["users"];
		return "INSERT INTO $u
		(email, username, joindate, lastaction, status, sessionkey, password)
		VALUES
		('$mail','$name','$date','$date',".DBConfig::$userStatus["newUser"].",'$key','$pwd')";
	}
	public static function deleteuser($authkey){
		$u = DBConfig::$tables["users"];
		return "UPDATE $u
		SET sessionkey='".uniqid()."',
		status = ".DBConfig::$userStatus["deleted"]."
		WHERE sessionkey='$authkey'";
	}
	public static function getuserbyname($uname, $password){
		return
		"SELECT id, email, username, joindate, lastaction, status
		FROM `".DBConfig::$tables["users"]."`
		WHERE (`username` = '$uname'
		 OR `email` = '$uname')
		AND `password` = '$password'";
	}
	public static function login($userid, $authkey){
		$u = DBConfig::$tables["users"];
		return "UPDATE $u
		SET sessionkey='$authkey'
		WHERE id = $userid";
	}
	public static function logout($authkey){
		$u = DBConfig::$tables["users"];
		return "UPDATE $u
		SET sessionkey='".uniqid()."'
		WHERE sessionkey='$authkey'";
	}
	/**
	COMMENT QUERIES
	**/
	public static function getcomments($entryid, $commentid){
		$u = DBConfig::$tables["users"];
		$c = DBConfig::$tables["comments"];
		return "SELECT 
		`$c`.id AS 'commentid',
		`$c`.comment AS 'comment',
		`$c`.timestamp AS 'time',
		`$u`.id AS 'userid',
		`$u`.username AS 'username'
		FROM `$c`, `$u`
		WHERE `$u`.id = `$c`.userid
		AND `comment`.id<$commentid
		AND `$c`.entryid = $entryid
		ORDER BY `$c`.timestamp DESC
		LIMIT 0,".Constants::NUMCOMMENTS;
	}
	public static function addcomment($entryid, $comment, $userid){
		$c = DBConfig::$tables["comments"];
		$date = date( 'Y-m-d H:i:s', time());
		return "INSERT INTO $c
		(entryid, userid, comment, timestamp)
		VALUES
		($entryid, $userid, '$comment', '$date')";
	}
	public static function getcomment($commentid){
		$c = DBConfig::$tables["comments"];
		return "SELECT * FROM $c
		WHERE id = $commentid";
	}
	public static function deletecomment($commentid, $uid){
		$c = DBConfig::$tables["comments"];
		return "UPDATE $c
		SET comment=''
		WHERE id=$commentid
		AND userid=$uid";
	}
	/**
	ENTRY QUERIES
	**/
	public static function getinformation($entryid){
		$i = DBConfig::$tables["information"];
		if(isset($entryid)){
			$id = "`$i`.entryid = $entryid";
		}else{
			$id = "1";
		}
		$query = 
			"SELECT
			`$i`.entryid AS entryid,
			`$i`.artist AS artist,
			`$i`.transcription AS transcription,
			`$i`.location AS location,
			`$i`.longitude AS longitude,
			`$i`.latitude AS latitude
			FROM $i
			WHERE $id";
		return $query;
	}
	public static function getratings($entryid){
		$r = DBConfig::$tables["ratings"];
		if(isset($entryid)){
			$id = "`$r`.entryid = $entryid";
		}else{
			$id = "1";
		}
		$query = 
			"SELECT
			`$r`.entryid AS entryid,
			AVG(`$r`.rating) AS rating,
			COUNT(`$r`.rating) AS ratingcount
			FROM $r
			WHERE $id";
		return $query;
	}
	public static function getentry($entryid, $where){
		$e = DBConfig::$tables["entries"];
		$u = DBConfig::$tables["users"];
		$t = DBConfig::$tables["types"];
		$tags = DBConfig::$tables["tags"];
		$usertags = DBConfig::$tables["usertags"];
		if(!isset($where)){
			$where = "";
		}else{
			$where = " AND ".$where;
		}
		if(isset($entryid) && $entryid!=false){
			$id = "`$e`.id = $entryid AND";
		}else{
			$id = "";
		}
		$query = 
			"SELECT
			`$e`.id AS id,
			`$e`.title AS title,
			`$e`.date AS date,
			`$e`.sex AS sex,
			`$e`.userid AS userid,
			`$u`.username AS username,
			`$t`.id AS typeid,
			`$t`.name AS typename,
			`$t`.description AS typedescription

			FROM
			`$e`, `$u`, `$t`, `$tags`, `$usertags`

			WHERE
			$id
			`$e`.userid = `$u`.id
			AND
			`$e`.typeid = `$t`.id
			$where

			GROUP BY
			`$e`.id";
		return $query;
	}
	public static function getentriesbyrating($start, $limit, $where){
		$e = DBConfig::$tables["entries"];
		$u = DBConfig::$tables["users"];
		$t = DBConfig::$tables["types"];
		$tags = DBConfig::$tables["tags"];
		$usertags = DBConfig::$tables["usertags"];
		$r = DBConfig::$tables["ratings"];
		if(!isset($where)){
			$where = "";
		}else{
			$where = " AND ".$where;
		}
		$query = 
			"SELECT
			`$e`.id AS id,
			`$e`.title AS title,
			`$e`.date AS date,
			`$e`.sex AS sex,
			`$e`.userid AS userid,
			`$u`.username AS username,
			`$t`.id AS typeid,
			`$t`.name AS typename,
			`$t`.description AS typedescription,
			AVG(`$r`.rating) AS ratings

			FROM
			`$e`, `$u`, `$t`, `$r`, `$tags`, `$usertags`

			WHERE
			`$e`.userid = `$u`.id
			AND
			`$e`.typeid = `$t`.id
			AND
			`$e`.id = `$r`.entryid
			$where

			GROUP BY
			`$r`.entryid
			ORDER BY
			ratings DESC
			LIMIT $start, $limit";
		return $query;
	}
	public static function getimages($entryid){
		$img = DBConfig::$tables["images"];
		$query =
			"SELECT id, path, xposition, yposition, width, height
			FROM `$img`
			WHERE `$img`.entryid=".$entryid;
		return $query;
	}
	public static function getallentries($start, $limit, $order, $where){
		if(!isset($order)){
			$order = "date";
		}
		return Queries::getentry(false, $where)." ORDER BY ".$order." DESC LIMIT $start, $limit";
	}
	public static function getusertags($entryid){
		$u = DBConfig::$tables["usertags"];
		$t = DBConfig::$tables["tags"];
		if(isset($entryid)){
			$id = "`$u`.entryid = $entryid AND";
		}else{
			$id = "";
		}
		$query = "SELECT 
			`$t`.tagid, `$t`.tag
			FROM `$t`, `$u`
			WHERE $id
			`$u`.tagid = `$t`.tagid";
		return $query;
	}
	/**
	IMAGE FUNCTIONS
	*/
	public static function saveimage($entryid, $path, $x, $y, $w, $h){
		$i = DBConfig::$tables["images"];
		$query = 
		"INSERT INTO `$i`
		(entryid, path, xposition, yposition, width, height)
		VALUES
		($entryid, '$path', $x, $y, $w, $h)
		";
		return $query;
	}
	/**
	TAG FUNCTIONS
	*/
	public static function gettagbyid($tagid){
		$t = DBConfig::$tables["tags"];
		$status = DBConfig::$tagStatus["usercreated"];
		$query = "SELECT * FROM `$t` WHERE `$t`.tagid = $tagid";
		return $query;
	}
	public static function gettagbyname($tag){
		$t = DBConfig::$tables["tags"];
		$status = DBConfig::$tagStatus["usercreated"];
		$query = "SELECT * FROM `$t` WHERE `$t`.tag = '$tag'";
		return $query;
	}
	public static function createtag($tag){
		$t = DBConfig::$tables["tags"];
		$status = DBConfig::$tagStatus["usercreated"];
		$query =
		"INSERT INTO `$t`
		(tag, status)
		VALUES
		('$tag', $status)";
		return $query;
	}
}

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
	// or a user by id
	public function getUser($id){
		if(isset($id)){
			$query = Queries::getuserbyid($id);
			$users = $this->query($query);
			if(count($users)==0)return false;
			return $users[0];
		}else{
			$query = Queries::getuser($this->authkey);
			$users = $this->query($query);
			if(count($users)==0)return false;
			return $users[0];
		}
	}

	public function updateUser($mail, $name, $pwd){
		$user = $this->getUser();
		if(!isset($user["id"])){
			return false;
		}
		if(isset($pwd)){
			$query = Queries::updateuser($user["id"], $mail, $name, $pwd);
		}else{
			$query = Queries::updateuserwithoutpassword($user["id"], $mail, $name);
		}
		return $this->query($query);
	}

	public function createUser($mail, $name, $pwd){
		$key = md5($mail).uniqid();
		$query = Queries::createuser($key, $mail, $name, $pwd);
		if($this->query($query)){
			return $key;
		}else{
			return false;
		}
	}

	public function deleteUser(){
		$query = Queries::deleteuser($this->authkey);
		return $this->query($query);
	}

	// logs in a user and returns an authkey (or false)
	public function login($username, $password){
		$query = Queries::getuserbyname($username, $password);
		$users = $this->query($query);
		if(count($users)==0)return false;
		$user = $users[0];
		$key = md5($mail).uniqid();
		$query = Queries::login($user["id"], $key);
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
		$query = Queries::getcomments($entryid, $commentid);
		return $this->query($query);
	}

	// adds a comment to an entry
	// returns whether successfull
	public function addComment($entryid, $comment){
		$comment = trim($comment);
		if(strlen($comment)==0)return false;
		$user = $this->getUser();
		$entry = $this->getEntry($entryid);
		if(!isset($user["id"])||!isset($entry["id"])){
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
		if(!isset($user["id"])||!isset($comment["id"])){
			return false;
		}
		if($user["status"] == DBConfig::$userStatus["admin"]){
			$id = $comment["userid"];
		}else{
			$id = $user["id"];
		}
		$query = Queries::deletecomment($commentid, $id);
		return $this->query($query);
	}

	/**
	ENTRY FUNCTIONS
	**/

	// returns the complete entry of the given id
	public function getEntry($entryid){
		$query = Queries::getentry($entryid);
		$entry = $this->query($query);
		if(count($entry)==0||!$entry)return false;
		$entry = $entry[0];
		$query = Queries::getusertags($entryid);
		$entry["tags"]=$this->query($query);
		$query = Queries::getimages($entryid);
		$entry["images"]=$this->query($query);
		$query = Queries::getratings($entryid);
		$entry["ratings"]=$this->query($query);
		$query = Queries::getinformation($entryid);
		$entry["information"]=$this->query($query);
		return $entry;
	}

	// returns the first 20 entries after $start ordered by $orderby
	// (for $orderby select a name of one of the attributes returned)
	// $where parameter is optional and mostly used intern
	public function getAllEntries($orderby, $start, $where){
		if(!isset($start)){
			$start = 0;
		}
		if($orderby == "rating"){
			$entries = $this->getAllEntriesByRating($start, $where);
		}else{
			$query = Queries::getallentries($start, Constants::NUMENTRIES, $orderby, $where);
			$entries = $this->query($query);
		}
		if(!$entries)return false;
		foreach($entries as $key=>$value){
			$query = Queries::getusertags($value["id"]);
			$value["tags"]=$this->query($query);
			$query = Queries::getimages($value["id"]);
			$value["images"]=$this->query($query);
			$query = Queries::getratings($value["id"]);
			$value["ratings"]=$this->query($query);
			$query = Queries::getinformation($value["id"]);
			$value["information"]=$this->query($query);
			$entries[$key]=$value;
		}
		return $entries;
	}

	// $where parameter is optional and mostly used intern
	private function getAllEntriesByRating($start, $where){
		$query = Queries::getentriesbyrating($start, Constants::NUMENTRIES, $where);
		$entries = $this->query($query);
		return $entries;
	}

	// saves a new image to the databse
	public function saveImage($entryid, $url, $x, $y, $w, $h){
		$query = Queries::saveimage($entryid, $url, $x, $y, $w, $h);
		return $this->query($query);
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
				for($i=1; $i<count($type);$i++){
					$singletype = $type[$i];
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
				for($i=1; $i<count($tag);$i++){
					$singletag = $tag[$i];
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
		return $this->query($query);
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
			if(count($tags)>0){
				return $tags[0]["tagid"];
			}
			$query = Queries::createtag($tag);
			return $this->query($query);
		}
	}

}

?>