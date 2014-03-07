<?php

// How to use this page:
// open it with the info about the course to create
// as described in the database and your sessionkey:
//
// createType.php?authkey=xxx&name=bla&desc=moep
//
// required parameters are:
// authkey, name, desc
//
// The answer looks as follows:
// a json with a successcode and the course id:
/* 
{
	success : 1 ,
	data : [
		{
			"0":"123",
			"id":"123",
			"1":"mustermann@mail.com",
			"email":"mustermann@mail.com",
			"2":"mustermann",
			"username":"mustermann",
			"3":"2014-02-13 22:06:03",
			"joindate":"2014-02-13 22:06:03",
			"4":"2014-02-17 13:47:16",
			"lastaction":"2014-02-17 13:47:16",
			"5":"0",
			"status":"0"
		}
	]
}
*/
// for success codes see ../php/config.php

// HEADER
header('Content-Type: application/json; charset=utf-8');
error_reporting(0);
include_once("../settings/config.php");
include_once("../helpers/dbhelper.php");
// END HEADER

// PREPARE RESULT
$json = array();
$json["success"]=$CODE_INSUFFICIENT_PARAMETERS;

if(isset($_POST["authkey"])){
	$_GET = $_POST;
}

if(isset($_GET["authkey"])){
	$key = $_GET["authkey"];
}else{
	$json["message"]="authkey missing";
	echo json_encode($json);
	exit();
}

if(isset($_GET["name"])){
	$name = $_GET["name"];
}else{
	$json["message"]="name missing";
	echo json_encode($json);
	exit();
}

if(isset($_GET["desc"])){
	$desc = $_GET["desc"];
}else{
	$json["message"]="description missing";
	echo json_encode($json);
	exit();
}

$db = new DBHelper();
$db->setAuthKey($key);
$type = $db->createType($name, $desc);

if($type == false){
	$json["success"]=$CODE_ERROR;
	if(DBConnection::getInstance()->status == DBConfig::$dbStatus["offline"]){
		$json["message"] = "Database error";
	}else{
		$json["message"] = "Type could not be created";
	}
	echo json_encode($json);
	exit();
}

$json["data"] = $type;

$json["success"] = $CODE_SUCCESS;
echo json_encode($json);

?>