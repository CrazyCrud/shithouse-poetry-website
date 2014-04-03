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
		$link = mysqli_connect(
			DBConfig::$settings["sqllocation"],
			DBConfig::$settings["sqluser"],
			DBConfig::$settings["sqlpwd"], DBConfig::$settings["sqldb"])
		or $this->error(DBConfig::$dbStatus["offline"]);
		mysqli_query($link, "SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'");
		$this->link = $link;
		$this->status = DBConfig::$dbStatus["ready"];
	}

	private function initSaltConnection(){
		$saltLink = mysqli_connect(
			DBConfig::$settings["sqllocation"],
			DBConfig::$settings["sqluser"],
			DBConfig::$settings["sqlpwd"], DBConfig::$settings["saltdb"])
		or $this->error(DBConfig::$dbStatus["offline"]);
		mysqli_query($saltLink, "SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'");
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
		$result = mysqli_query($link, $q)
		or $this->error(DBConfig::$dbStatus["offline"]);
		$id = mysqli_insert_id($link);
		if(strpos($q,"INSERT")!==false&&$id!=0)return $id;
		if(is_bool($result))return $result;
		while ($row = mysqli_fetch_assoc($result)){
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