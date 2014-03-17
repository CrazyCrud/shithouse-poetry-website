<?php

// How to use this page:
// open it with your admin-authkey:
//
// getReports.php?authkey=abc123
//
// required parameters are:
// authkey
//
// The answer looks as follows:
// a json with a successcode and the reports data:
//
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
}else{
	$json["message"]="authkey missing";
	echo json_encode($json);
	exit();
}

$reports = $db->getReport();

if($reports == false){
	$json["success"]=$CODE_ERROR;
	if(DBConnection::getInstance()->status == DBConfig::$dbStatus["offline"]){
		$json["message"] = "Database error";
	}else{
		$json["success"] = $CODE_NOT_FOUND;
		$json["message"] = "No comments found";
	}
	echo json_encode($json);
	exit();
}

$json["data"] = $reports;

$json["success"] = $CODE_SUCCESS;
echo json_encode($json);

?>