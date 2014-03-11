<?php

################### ADMIN ONLY ###################

// How to use this page:
// open it with the info about the type you wish to delete and
// your authkey:
//
// deleteType.php?authkey=xxx&type=1
//
// required parameters are:
// authkey, type
//
// The answer looks as follows:
// a json with a successcode and true if the operation was successfull:
/* 
{
	"success":1,
	"data":true
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

if(isset($_GET["type"])){
	$type = $_GET["type"];
	if(is_numeric($type)){
		$type = intval($type);
	}
}else{
	$json["message"]="type missing";
	echo json_encode($json);
	exit();
}

$db = new DBHelper();
$db->setAuthKey($key);
$status = $db->deleteType($type);

if($status == false){
	$json["success"]=$CODE_ERROR;
	if(DBConnection::getInstance()->status == DBConfig::$dbStatus["offline"]){
		$json["message"] = "Database error";
	}else{
		$json["success"] = $CODE_NOT_FOUND;
		$json["message"] = "Type not found";
	}
	echo json_encode($json);
	exit();
}

$json["data"] = $status;

$json["success"] = $CODE_SUCCESS;
echo json_encode($json);

?>