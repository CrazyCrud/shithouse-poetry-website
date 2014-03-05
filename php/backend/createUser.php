<?php

// How to use this page:
// open it with the info about the course to create
// as described in the database and your sessionkey:
//
// createUser.php?mail=mustermann@mail.com&name=mustermann&pwd=123
//
// required parameters are:
// mail, name, pwd
//
// The answer looks as follows:
// a json with a successcode and the course id:
/* 
{
	success : 1 ,
	data : "97dfebf4098c0f5c16bca61e2b76c37353021f00128a6"
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

if(isset($_GET["name"])){
	$name = $_GET["name"];
}else{
	$json["message"]="name missing";
	echo json_encode($json);
	exit();
}

if(isset($_GET["pwd"])){
	$pwd = $_GET["pwd"];
}else{
	$json["message"]="password missing";
	echo json_encode($json);
	exit();
}

$db = new DBHelper();

if(isset($_GET["authkey"])){
	$db->setAuthKey($_GET["authkey"]);
}
$data = $db->createUser($mail, $name, $pwd);

if($data == false){
	$json["success"]=$CODE_ERROR;
	if(DBConnection::getInstance()->status == DBConfig::$dbStatus["offline"]){
		$json["message"] = "Database error";
	}else{
		$json["success"] = $CODE_USER_ALREADY_EXISTS;
		$json["message"] = "Email already exists";
	}
	echo json_encode($json);
	exit();
}

$json["data"] = $data;

$json["success"] = $CODE_SUCCESS;
echo json_encode($json);

?>