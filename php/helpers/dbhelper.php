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
	public static function getcomments($entryid, $count){
		$u = DBConfig::$tables["users"];
		$c = DBConfig::$tables["comments"];
		$query = "SELECT 
		`$c`.id AS 'commentid',
		`$c`.comment AS 'comment',
		`$c`.timestamp AS 'time',
		`$u`.id AS 'userid',
		`$u`.username AS 'username'
		FROM `$c`, `$u`
		WHERE `$u`.id = `$c`.userid
		AND `$c`.entryid = $entryid
		ORDER BY `$c`.timestamp DESC
		LIMIT $count,".($count+10);
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

	// get 10 comments for an entry starting with the $count(th) comment
	// for $count=0 delivers the 10 newest comments
	// for $count=10 delivers the 11th to 20th newest comments
	// and so on ...
	// (for endless scrolling/pagination loading purposes)
	public function getComments($entryid, $count){
		$query = Queries::getcomments($entryid, $count);
		return $this->query($query);
	}

}

?>