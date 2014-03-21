<?php

// How to use this page:
// open it with your admin-authkey:
//
// getLogs.php?authkey=abc123&date=2014-03-21
//
// required parameters are:
// authkey
//
// optional parameters are:
// date (formatting doesnt matter a lot, gets parsed as date)
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

$logs = $db->getLogs($_GET["date"]);

if($logs == false){
	$json["success"]=$CODE_ERROR;
	if(DBConnection::getInstance()->status == DBConfig::$dbStatus["offline"]){
		$json["message"] = "Database error";
	}else{
		$json["success"] = $CODE_NOT_FOUND;
		$json["message"] = "No logs found or permission denied";
	}
	echo json_encode($json);
	exit();
}

$json["data"] = $logs;

$json["success"] = $CODE_SUCCESS;
echo json_encode($json);

?>