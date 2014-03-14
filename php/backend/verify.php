<?php

// How to use this page:
// open it with the verification key for the user to verify
//
// verify.php?key=xxx
//
// required parameters are:
// key
//
// The answer looks as follows:
// a json with a successcode and the data about the user just verified:
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

if(isset($_POST["key"])){
	$_GET = $_POST;
}

$user = "";
$db = new DBHelper();

if(isset($_GET["key"])){
	$key = $_GET["key"];
	$user = $db->verify($key);
}else{
	$json["message"]="identifier missing";
	echo json_encode($json);
	exit();
}




if($user == false || !isset($user[0]["id"])){
	$json["success"]=$CODE_ERROR;
	if(DBConnection::getInstance()->status == DBConfig::$dbStatus["offline"]){
		$json["message"] = "Database error";
	}else{
		$json["message"] = "User not found";
	}
	echo json_encode($json);
	exit();
}

$json["data"] = $user[0];

$json["success"] = $CODE_SUCCESS;
echo json_encode($json);

?>