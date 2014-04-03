<?php

// How to use this page:
// open it without any info:
//
// getTypes.php
//
// required parameters are:
// none
//
// The answer looks as follows:
// a json with a successcode and the data about all types:
/* 
{
	"success":1,
	"data":
	[
		{
			"id":"1",
			"name":"Text",
			"description":"Ein an eine Wand, T\u00fcr oder auf einen anderen Gegenstand geschriebener Text."
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

$db = new DBHelper();

if(isset($_GET["authkey"])){
	$db->setAuthKey($_GET["authkey"]);
}
$types = $db->getAllTypes();

if($types == false){
	$json["success"]=$CODE_ERROR;
	if(DBConnection::getInstance()->status == DBConfig::$dbStatus["offline"]){
		$json["message"] = "Database error";$json["success"] = $CODE_DB_ERROR;
	}else{
		$json["success"] = $CODE_NOT_FOUND;
		$json["message"] = "Types not found";
	}
	echo json_encode($json);
	exit();
}

$json["data"] = $types;

$json["success"] = $CODE_SUCCESS;
echo json_encode($json);

?>