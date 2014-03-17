<?php

// How to use this page:
// open it with your admin-authkey 
// to get all users
//
// getUsers.php?authkey=xxx
//
// required parameters are:
// authkey
//
// The answer looks as follows:
// a json with a successcode and the data about the user:
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

$user = "";
$db = new DBHelper();

if(isset($_GET["authkey"])){
	$db->setAuthkey($_GET["authkey"]);
	$user = $db->getAllUsers();
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