<?php

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
		"tags" => "usertags"
	);

	public static $dbStatus = array(
		"idle" => 0,
		"ready" => 1,
		"busy" => 2,
		"offline" => 3
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
		while ($row = mysql_fetch_array($result)){
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
	public static function getuser($sessionkey){
		return
		"SELECT id, email, username, joindate, lastaction, status
		FROM `".DBConfig::$tables["users"]."` WHERE `sessionkey` = \"$sessionkey\"";
	}
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
		AND `commentid`<$commentid
		AND `$c`.entryid = $entryid
		ORDER BY `$c`.timestamp DESC
		LIMIT 0,10";
	}
	public static function addcomment($entryid, $comment, $userid){
		$c = DBConfig::$tables["comments"];
		$date = date( 'Y-m-d H:i:s', time());
		return "INSERT INTO $c
		(entryid, userid, comment, timestamp)
		VALUES
		($entryid, $userid, '$comment', '$date')";
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

	public function setAuthKey($key){
		$this->authkey = $key;
	}

	public function getAuthKey(){
		return $this->authkey;
	}

	private function query($query){
		if($this->connection->status != DBConfig::$dbStatus["ready"])
			return false;
		return $this->connection->query($query);
	}

	// use with caution!!!
	public function getComplete($table){
		return $this->query("SELECT * FROM `".$table."`");
	}

	public function getUser(){
		$query = Queries::getuser($this->authkey);
		return $this->query($query);
	}

	// get the 10 previous comments (older than $commentid)
	// for $count=-1 delivers the 10 newest comments
	// (assuming the 10th newest comment has the id 123)
	// for $count=123 delivers the 11th to 20th newest comments
	// and so on ...
	// (for endless scrolling/pagination loading purposes)
	public function getComments($entryid, $commentid){
		if($commentid = -1)$commentid = PHP_INT_MAX;
		$query = Queries::getcomments($entryid, $commentid);
		return $this->query($query);
	}

	// adds a comment to an entry
	// returns whether successfull
	public function addComment($entryid, $comment){
		$user = $this->getUser();
		if(!isset($user["id"])){
			return false;
		}
		$query = Queries::addcomment($entryid, $comment, $user["id"]);
		return $this->query($query);
	}

}

?>