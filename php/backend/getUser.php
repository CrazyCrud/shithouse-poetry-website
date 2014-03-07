<?php

// How to use this page:
// open it with the info about the course to create
// as described in the database and your sessionkey:
//
// getUser.php?id=123
// ODER
// getUser.php?authkey=xxx
//
// required parameters are:
// id, authkey
//
// The answer looks as follows:
// a json with a successcode and the course id:
/* 
{
	success : 1 ,
	data : [
		{
			"id":"123",
			"email":"mustermann@mail.com",
			"username":"mustermann",
			"joindate":"2014-02-13 22:06:03",
			"lastaction":"2014-02-17 13:47:16",
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

if(isset($_POST["id"]) || isset($_POST["authkey"])){
	$_GET = $_POST;
}

$user = "";
$db = new DBHelper();

if(isset($_GET["id"])){
	$id = $_GET["id"];
	$user = $db->getUser($id);
}else if(isset($_GET["authkey"])){
	$key = $_GET["authkey"];
	$db->setAuthKey($key);
	$user = $db->getUser();
}else{
	$json["message"]="identifier missing";
	echo json_encode($json);
	exit();
}




if($user == false){
	$json["success"]=$CODE_ERROR;
	if(DBConnection::getInstance()->status == DBConfig::$dbStatus["offline"]){
		$json["message"] = "Database error";
	}else{
		$json["message"] = "User not found";
	}
	echo json_encode($json);
	exit();
}

$json["data"] = $user;

$json["success"] = $CODE_SUCCESS;
echo json_encode($json);

?>