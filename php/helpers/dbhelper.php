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

	public static $reportStatus = array(
		"closed" => -1,
		"open" => 0,
		"important" => 1
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
		$id = mysql_insert_id();
		if(strpos($q,"INSERT")!==false&&$id!=0)return $id;
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
		if(isset($password)){
			$and = "AND `password` = '$password'";
		}
		return
		"SELECT id, email, username, joindate, lastaction, status
		FROM `".DBConfig::$tables["users"]."`
		WHERE (`username` = '$uname'
		 OR `email` = '$uname') $and";
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
	public static function getentry($entryid, $where){
		$e = DBConfig::$tables["entries"];
		$u = DBConfig::$tables["users"];
		$t = DBConfig::$tables["types"];
		$tags = DBConfig::$tables["tags"];
		$usertags = DBConfig::$tables["usertags"];
		if(!isset($where)){
			$where = "";
		}else{
			$where = " AND (".$where.")";
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
			(`$e`.typeid = `$t`.id
			OR `$e`.typeid = -1)
			$where

			GROUP BY
			`$e`.id";
		return $query;
	}
	public static function getentriesbyrating($start, $limit, $where, $userid){
		$e = DBConfig::$tables["entries"];
		$u = DBConfig::$tables["users"];
		$t = DBConfig::$tables["types"];
		$tags = DBConfig::$tables["tags"];
		$usertags = DBConfig::$tables["usertags"];
		$r = DBConfig::$tables["ratings"];
		if(!isset($where)){
			$where = "";
		}else{
			$where = " AND (".$where.")";
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
			(`$e`.typeid = `$t`.id
			OR `$e`.typeid = -1)
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
	/**
	IMAGE QUERIES
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
	TAG QUERIES
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
	public static function getalltagsbystatus($status){
		$t = DBConfig::$tables["tags"];
		$query = "SELECT * FROM `$t` WHERE `$t`.status = $status";
		return $query;
	}
	public static function getalltags(){
		$t = DBConfig::$tables["tags"];
		$query = "SELECT * FROM `$t`";
		return $query;
	}
	public static function deletetag($id){
		$t = DBConfig::$tables["tags"];
		$query = 
		"DELETE FROM `$t`
		WHERE `$t`.tagid=$id";
		return $query;
	}
	public static function removetag($id){
		$u = DBConfig::$tables["usertags"];
		$query = 
		"DELETE FROM `$u`
		WHERE `$u`.tagid=$id;";
		return $query;
	}
	public static function addtag($tagid, $entryid){
		$t = DBConfig::$tables["usertags"];
		$query =
		"INSERT INTO `$t`
		(entryid, tagid)
		VALUES
		($entryid, $tagid)
		ON DUPLICATE KEY UPDATE tagid=tagid";
		return $query;
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
	RATING QUERIES
	*/
	public static function getratings($entryid, $userid){
		$r = DBConfig::$tables["ratings"];
		if(isset($entryid)){
			$id = "`$r`.entryid = $entryid";
		}else{
			$id = "1";
		}
		if(isset($userid)){
			$rated = ",SUM(CASE WHEN `$r`.userid=$userid THEN `$r`.rating ELSE 0 END) AS ratedbyme";
		}else{
			$rated = "";
		}
		$query = 
			"SELECT
			`$r`.entryid AS entryid,
			AVG(`$r`.rating) AS rating,
			COUNT(`$r`.rating) AS ratingcount
			$rated
			FROM $r
			WHERE $id";
		return $query;
	}
	public static function getrandomratings(){
		$r = DBConfig::$tables["ratings"];
		$e = DBConfig::$tables["entries"];
		$query =
		"SELECT 
		`$e`.id, COUNT(`$r`.entryid) as 'count' 
		FROM `$e`
		LEFT OUTER JOIN `$r`
		ON `$e`.id = `$r`.entryid
		GROUP BY `$r`.entryid
		ORDER BY `count` ASC
		LIMIT 0,100";
		return $query;
	}
	public static function getrandomratingsforuser($userid){
		if(!isset($userid)){
			return Queries::getrandomratings();
		}
		$r = DBConfig::$tables["ratings"];
		$e = DBConfig::$tables["entries"];
		$query =
		"SELECT `id`, `count`
		FROM(
		    SELECT
		    `$e`.id,
		    COUNT(`$r`.entryid) as 'count',
		    sum(case when `$r`.userid=$userid THEN 1 ELSE 0 END) as 'rated'
		    
		    FROM (`$e`
		    LEFT OUTER JOIN `$r`
		    ON `$e`.id = `$r`.entryid)
		    GROUP BY `$r`.entryid
		) a
		    
		WHERE `rated` = 0

		ORDER BY `count` ASC

		LIMIT 0,100";
		return $query;
	}
	public static function deleterating($entryid, $userid){
		$r = DBConfig::$tables["ratings"];
		$query = 
		"DELETE FROM `$r`
		WHERE `$r`.userid = $userid
		AND `$r`.entryid = $entryid";
		return $query;
	}
	public static function addrating($entryid, $userid, $rating){
		$r = DBConfig::$tables["ratings"];
		$query =
		"INSERT INTO `$r`
		(entryid, userid, rating, date)
		VALUES
		($entryid, $userid, $rating, CURRENT_TIMESTAMP)
		ON DUPLICATE KEY UPDATE
		`$r`.rating = $rating,
		`$r`.date = CURRENT_TIMESTAMP";
		return $query;
	}
	/**
	TYPE QUERIES
	*/
	public static function gettypebyname($name){
		$t = DBConfig::$tables["types"];
		$query=
		"SELECT * FROM `$t` WHERE `$t`.name = '$name'";
		return $query;
	}
	public static function gettypebyid($id){
		$t = DBConfig::$tables["types"];
		$query=
		"SELECT * FROM `$t` WHERE `$t`.id = $id";
		return $query;
	}
	public static function createtype($name, $desc){
		$t = DBConfig::$tables["types"];
		$query=
		"INSERT INTO `$t`
		(`name`, `description`)
		VALUES
		('$name', '$desc')";
		return $query;
	}
	public static function updatetype($id, $name, $desc){
		$t = DBConfig::$tables["types"];
		$query=
		"UPDATE `$t`
		SET
		`$t`.name = '$name',
		`$t`.description = '$desc'
		WHERE
		`$t`.id = $id";
		return $query;
	}
	public static function deletetype($id){
		$t = DBConfig::$tables["types"];
		$query=
		"DELETE FROM `$t`
		WHERE `$t`.id = $id";
		return $query;
	}
	public static function getalltypes(){
		$t = DBConfig::$tables["types"];
		$query=
		"SELECT * FROM `$t` WHERE 1";
		return $query;
	}
	public static function removetypefromentries($id){
		$e = DBConfig::$tables["entries"];
		$query =
		"UPDATE `$e`
		SET
		`$e`.typeid = -1
		WHERE `$e`.typeid = $id";
		return $query;
	}
	/**
	REPORT QUERIES
	*/
	public static function addreport($entryid, $userid, $status, $commentid, $reportdescription){
		$r = DBConfig::$tables["reports"];
		$query =
		"INSERT INTO `$r`
		(entryid, userid, status, commentid, reportdescription, reportdate)
		VALUES
		($entryid, $userid, $status, $commentid, '$reportdescription', CURRENT_TIMESTAMP)
		ON DUPLICATE KEY UPDATE
		status = $status,
		reportdescription = '$reportdescription'";
		return $query;
	}
	public static function getreport($reportid){
		$r = DBConfig::$tables["reports"];
		$u = DBConfig::$tables["users"];
		$e = DBConfig::$tables["entries"];
		$c = DBConfig::$tables["comments"];
		$query = 
		"SELECT
		`$r`.id AS reportid,
		`$r`.status as status,
		`$r`.commentid as commentid,
		`$c`.comment as comment,
		`$r`.reportdescription as reportdescription,
		`$r`.reportdate as reportdate,
		`$e`.id as entryid,
		`$e`.title as entrytitle,
		`$e`.sex as entrysex,
		`$u`.id as userid,
		`$u`.username as username,
		`$u`.lastaction as lastaction

		FROM `$r`,`$u`,`$e`,`$c`

		WHERE (`$r`.userid = `$u`.id OR `$r`.userid = -1)
		AND (`$r`.commentid = `$c`.id OR `$r`.commentid = -1)
		AND `$r`.entryid = `$e`.id
		AND `$r`.id = $reportid";
		return $query;
	}
	public static function getreportofuser($entryid, $userid){
		$r = DBConfig::$tables["reports"];
		$u = DBConfig::$tables["users"];
		$e = DBConfig::$tables["entries"];
		$c = DBConfig::$tables["comments"];
		$query = 
		"SELECT
		`$r`.id AS reportid,
		`$r`.status as status,
		`$r`.commentid as commentid,
		`$c`.comment as comment,
		`$r`.reportdescription as reportdescription,
		`$r`.reportdate as reportdate,
		`$e`.id as entryid,
		`$e`.title as entrytitle,
		`$e`.sex as entrysex,
		`$u`.id as userid,
		`$u`.username as username,
		`$u`.lastaction as lastaction

		FROM `$r`,`$u`,`$e`,`$c`

		WHERE `$r`.userid = `$u`.id
		AND (`$r`.commentid = `$c`.id OR `$r`.commentid = -1)
		AND `$u`.id = $userid
		AND `$r`.entryid = `$e`.id
		AND `$e`.id = $entryid";
		return $query;
	}
	public static function updatereportstatus($reportid, $status){
		$r = DBConfig::$tables["reports"];
		$query =
		"UPDATE `$r`
		SET `$r`.status = $status
		WHERE `$r`.id = $reportid";
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
	// or a user by id or username or email
	public function getUser($id){
		if(isset($id)){
			if(is_string($id)){
				$query = Queries::getuserbyname($id);
			}else{
				$query = Queries::getuserbyid($id);
			}
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
	public function login($email, $password){
		$query = Queries::getuserbyname($email, $password);
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
		$user = $this->getUser();
		if(count($entry)==0||!$entry)return false;
		$entry = $entry[0];
		$query = Queries::getusertags($entryid);
		$entry["tags"]=$this->query($query);
		$query = Queries::getimages($entryid);
		$entry["images"]=$this->query($query);
		$query = Queries::getratings($entryid, $user["id"]);
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
		$user = $this->getUser();
		if($orderby == "rating"){
			$entries = $this->getAllEntriesByRating($start, $where);
		}else{
			$query = Queries::getallentries($start, Constants::NUMENTRIES, $orderby, $where);
			$entries = $this->query($query);
		}
		foreach($entries as $key=>$value){
			$query = Queries::getusertags($value["id"]);
			$value["tags"]=$this->query($query);
			$query = Queries::getimages($value["id"]);
			$value["images"]=$this->query($query);
			$query = Queries::getratings($value["id"], $user["id"]);
			$value["ratings"]=$this->query($query);
			$query = Queries::getinformation($value["id"]);
			$value["information"]=$this->query($query);
			$entries[$key]=$value;
		}
		return $entries;
	}

	// $where parameter is optional and mostly used intern
	private function getAllEntriesByRating($start, $where, $userid){
		$query = Queries::getentriesbyrating($start, Constants::NUMENTRIES, $where, $userid);
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
		shuffle($entries);
		return $entries;
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
		if(!isset($user["id"]))return false;
		$rating = $rating>0?1:($rating<0?-1:0);
		if($rating == 0){
			$query = Queries::deleterating($entryid, $user["id"]);
		}else{
			$query = Queries::addrating($entryid, $user["id"], $rating);
		}
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
	// $commentid doenst have to be set ...
	public function addReport($entryid, $reportdescription, $commentid){
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

}

?>