<?php

// How to use this page:
// open it with the info about the type you wish to get:
//
// getType.php?type=1
//
// required parameters are:
// type
//
// The answer looks as follows:
// a json with a successcode and the data about the type:
/* 
{
	"success":1,
	"data":
	{
		"id":"1",
		"name":"Text",
		"description":"Ein an eine Wand, T\u00fcr oder auf einen anderen Gegenstand geschriebener Text."
	}
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

if(isset($_POST["type"])){
	$_GET = $_POST;
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

if(isset($_GET["authkey"])){
	$db->setAuthKey($_GET["authkey"]);
}
$type = $db->getType($type);

if($type == false){
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

$json["data"] = $type;

$json["success"] = $CODE_SUCCESS;
echo json_encode($json);

?>