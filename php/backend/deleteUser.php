<?php

// How to use this page:
// open it with the info about the course to create
// as described in the database and your sessionkey:
//
// getUser.php?authkey=123
//
// required parameters are:
// authkey
//
// The answer looks as follows:
// a json with a successcode and the course id:
/* 
{
	success : 1 ,
	data : true
}
*/
// for success codes see ../php/config.php

// HEADER
header('Content-Type: application/json; charset=utf-8');
error_reporting(0);
include("../settings/config.php");
include("../helpers/dbhelper.php");
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

$db = new DBHelper();
$db->setAuthKey($key);
$user = $db->deleteUser();

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