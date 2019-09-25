<?php

// How to use this page:
// open it with your authkey, the entryid and the transcription you wish to update:
//
// updateTranscription.php?authkey=123&entryid=1&transcription=This IS SPARTA!
//
// required parameters are:
// authkey, entryid, transcription
//
// The answer looks as follows:
// a json with a successcode and true if the operation was successfull:
/* 
{
	"success":1,
	"data":"test"
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

if(isset($_GET["entryid"])){
	$entryid = $_GET["entryid"];
}else{
	$json["message"]="entryid missing";
	echo json_encode($json);
	exit();
}

if(isset($_GET["transcription"])){
	$transcription = $_GET["transcription"];
}else{
	$json["message"]="transcription missing";
	echo json_encode($json);
	exit();
}

$db = new DBHelper();
$db->setAuthKey($key);
$data = $db->updateTranscription($entryid, $transcription);

if($data == false){
	$json["success"]=$CODE_ERROR;
	if(DBConnection::getInstance()->status == DBConfig::$dbStatus["offline"]){
		$json["message"] = "Database error";$json["success"] = $CODE_DB_ERROR;
	}else{
		$json["message"] = "Transcription could not be updated!";
	}
	echo json_encode($json);
	exit();
}

$json["data"] = $transcription;

$json["success"] = $CODE_SUCCESS;
echo json_encode($json);

?>