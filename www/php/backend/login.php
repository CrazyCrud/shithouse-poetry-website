<?php

// How to use this page:
// open it with the mail and the password of the user:
//
// login.php?mail=MaxMustermann@mail.com&password=123
//
// required parameters are:
// mail, password
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
include_once("../settings/config.php");
include_once("../helpers/dbhelper.php");
// END HEADER

// PREPARE RESULT
$json = array();
$json["success"]=$CODE_INSUFFICIENT_PARAMETERS;

if(isset($_POST["mail"])){
	$_GET = $_POST;
}

if(isset($_GET["mail"])){
	$mail = $_GET["mail"];
}else{
	$json["message"]="mail missing";
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

if(isset($_GET["authkey"])){
	$db->setAuthKey($_GET["authkey"]);
}
$authkey = $db->login($mail, $password);

if($authkey == false){
	$json["success"]=$CODE_ERROR;
	if(DBConnection::getInstance()->status == DBConfig::$dbStatus["offline"]){
		$json["message"] = "Database error";$json["success"] = $CODE_DB_ERROR;
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