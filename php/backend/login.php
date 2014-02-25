<?php

// How to use this page:
// open it with the info about the course to create
// as described in the database and your sessionkey:
//
// login.php?username=MaxMustermann&password=123
//
// required parameters are:
// username, password
//
// The answer looks as follows:
// a json with a successcode and the session key:
/* 
{
	"success":1,
	"data":"d41d8cd98f00b204e9800998ecf8427e530d0705f3ace"
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

if(isset($_POST["username"])){
	$_GET = $_POST;
}

if(isset($_GET["username"])){
	$username = $_GET["username"];
}else{
	$json["message"]="username missing";
	echo json_encode($json);
	exit();
}

if(isset($_GET["password"])){
	$password = $_GET["password"];
}else{
	$json["message"]="password missing";
	echo json_encode($json);
	exit();
}

$db = new DBHelper();
$authkey = $db->login($username, $password);

if($authkey == false){
	$json["success"]=$CODE_ERROR;
	if(DBConnection::getInstance()->status == DBConfig::$dbStatus["offline"]){
		$json["message"] = "Database error";
	}else{
		$json["success"] = $CODE_NOT_FOUND;
		$json["message"] = "User not found";
	}
	echo json_encode($json);
	exit();
}

$json["data"] = $authkey;

$json["success"] = $CODE_SUCCESS;
echo json_encode($json);

?>