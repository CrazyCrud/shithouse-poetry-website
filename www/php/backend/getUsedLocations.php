<?php

// How to use this page:
// open it with the info about the latitude and longitude:
//
// getUsedLocations.php
//
// required parameters are:
// none
//
// The answer looks as follows:
// a json with a successcode and data about the location(s):
/* 
{
	"success":1,
	"data":
		[
			{
				"location":"Sprach-, Literatur- und Kulturwissenschaften",
				"count":"22"
			},
			{
				"location":"Universit\u00e4t",
				"count":"16"
			},
			{
				"location":"Bar",
				"count":"1"
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

if(isset($_POST["authkey"])){
	$_GET = $_POST;
}

$db = new DBHelper();

if(isset($_GET["authkey"])){
	$db->setAuthKey($_GET["authkey"]);
}

$locations = $db->getUsedLocations();

if($locations == false){
	$json["success"]=$CODE_ERROR;
	if(DBConnection::getInstance()->status == DBConfig::$dbStatus["offline"]){
		$json["message"] = "Database error";$json["success"] = $CODE_DB_ERROR;
	}else{
		$json["success"] = $CODE_NOT_FOUND;
		$json["message"] = "No locations found";
	}
	echo json_encode($json);
	exit();
}

$json["data"] = $locations;

$json["success"] = $CODE_SUCCESS;
echo json_encode($json);

?>