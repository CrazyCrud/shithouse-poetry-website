<?php

// How to use this page:
// open it with the info about the tags to get
// as described in the database:
//
// getTags.php
//
// optional parameters are:
// status
//
//	Status options:
//	0 : usercreated
//  1 : global
// 	default: all
//
// The answer looks as follows:
// a json with a successcode and the tags:
/* 
{
	"success":1,
	"data":[
		{
			"tagid":"1",
			"tag":"comedy",
			"status":"0"
		},
		{
			"tagid":"2",
			"tag":"family",
			"status":"0"
		},
		{
			"tagid":"4",
			"tag":"politics",
			"status":"0"
		},
		{
			"tagid":"5",
			"tag":"relations",
			"status":"0"
		},
		{
			"tagid":"6",
			"tag":"nichtlustig",
			"status":"0"
		},
		{
			"tagid":"7",
			"tag":"schonlustig",
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
$json["success"]=$CODE_ERROR;

if(isset($_POST["status"])){
	$_GET = $_POST;
}

if(isset($_GET["status"])){
	$status = $_GET["status"];
}

$db = new DBHelper();

if(isset($_GET["authkey"])){
	$db->setAuthKey($_GET["authkey"]);
}
$tags = $db->getAllTags($status);

if($tags == false){
	$json["success"]=$CODE_ERROR;
	if(DBConnection::getInstance()->status == DBConfig::$dbStatus["offline"]){
		$json["message"] = "Database error";$json["success"] = $CODE_DB_ERROR;
	}else{
		$json["success"] = $CODE_NOT_FOUND;
		$json["message"] = "No tags found";
	}
	echo json_encode($json);
	exit();
}

$json["data"] = $tags;

$json["success"] = $CODE_SUCCESS;
echo json_encode($json);

?>