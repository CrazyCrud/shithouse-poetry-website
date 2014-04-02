<?php

/*
Generic Database Helper
*/
class DBConnection{
	
	private $link;
	private $saltLink;
	private static $singleton;
	public $status = 0;

	// DO NOT CALL THIS!!! USE getInstance() INSTEAD
	function __construct() {
		$this->initConnection();
		$this->initSaltConnection();
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

	private function initSaltConnection(){
		$saltLink = mysql_connect(
			DBConfig::$settings["sqllocation"],
			DBConfig::$settings["sqluser"],
			DBConfig::$settings["sqlpwd"], true)
		or $this->error(DBConfig::$dbStatus["offline"]);
		mysql_select_db(
			DBConfig::$settings["saltdb"],
			$saltLink)
		or $this->error(DBConfig::$dbStatus["offline"]);
		mysql_query("SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'", $saltLink);
		$this->saltLink = $saltLink;
	}

	private function error($status){
		$this->status = $status;
	}

	public function query($q, $salt){
		$link = $this->link;
		if(isset($salt)&&$salt===true){
			$link = $this->saltLink;
		}
		$rows = array();
		$result = mysql_query($q, $link)
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

?>