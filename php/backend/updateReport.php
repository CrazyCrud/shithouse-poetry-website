<?php

#################### ADMIN ONLY #######################

// How to use this page:
// open it with the info about the report you wish to update:
//
// updateReport.php?authkey=xxx&reportid=1&status=1
//
// required parameters are:
// authkey, reportid, status
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

if(isset($_GET["reportid"])){
	$reportid = $_GET["reportid"];
}else{
	$json["message"]="reportid missing";
	echo json_encode($json);
	exit();
}

if(isset($_GET["status"])){
	$status = $_GET["status"];
}else{
	$json["message"]="status missing";
	echo json_encode($json);
	exit();
}

$db = new DBHelper();
$db->setAuthKey($key);
$status = $db->updateReport($reportid, $status);

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