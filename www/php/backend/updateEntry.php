<?php

// How to use this page:
// open it with the info about the entry you wish to update:
//
// updateEntry.php?authkey=xxx&entryid=1&title=moep&type=Text&sex=m&
// artist=McWolff&transcription=Cool stuff&location=PT Toilette&
// lat=123&long=1245&tags=1,2,3
//
// required parameters are:
// authkey, entryid
//
// optional parameters are:
//	title, type (text or id), sex (only one character), artist, 
//transcription, location, lat, long, tags (array with texts or ids)
//
// The answer looks as follows:
// a json with a successcode and the entry id:
/* 
{
	"success":1,
	"data":2
}
*/
// for success codes see ../php/config.php

// HEADER
header('Content-Type: application/json; charset=utf-8');
error_reporting(0);
include_once("../settings/config.php");
include_once("../helpers/dbhelper.php");
include_once("../helpers/util.php");
// END HEADER

// PREPARE RESULT
$json = array();
$json["success"]=$CODE_INSUFFICIENT_PARAMETERS;

if(isset($_POST["authkey"])){
	$_GET = $_POST;
}

$entry = [];

if(isset($_GET["authkey"])){
	$key = $_GET["authkey"];
}else{
	$json["message"]="authkey missing";
	echo json_encode($json);
	exit();
}

if(isset($_GET["entryid"])){
	$entry["id"] = intval($_GET["entryid"]);
}else{
	$json["message"]="entryid missing";
	echo json_encode($json);
	exit();
}

if(isset($_GET["title"])){
	$entry["title"] = $_GET["title"];
}

if(isset($_GET["type"])){
	$type = $_GET["type"];
	if(is_numeric($type)){
		$type = intval($type);
	}
	$entry["type"] = $type;
}

if(isset($_GET["sex"])){
	$entry["sex"] = $_GET["sex"];
}

if(isset($_GET["artist"])){
	$entry["artist"] = $_GET["artist"];
}

if(isset($_GET["transcription"])){
	$entry["transcription"] = $_GET["transcription"];
}

if(isset($_GET["location"])){
	$entry["location"] = $_GET["location"];
}

if(isset($_GET["lat"])){
	$entry["lat"] = $_GET["lat"];
}

if(isset($_GET["long"])){
	$entry["long"] = $_GET["long"];
}

if(isset($_GET["tags"])){
	$tags = $_GET["tags"];
	$entry["tags"] = standarize_array(explode(",",$tags));
}

$db = new DBHelper();
$db->setAuthKey($key);
$data = $db->updateEntry($entry);

if($data == false){
	$json["success"]=$CODE_ERROR;
	if(DBConnection::getInstance()->status == DBConfig::$dbStatus["offline"]){
		$json["message"] = "Database error";$json["success"] = $CODE_DB_ERROR;
	}else{
		$json["success"] = $CODE_NOT_FOUND;
		$json["message"] = "Entry not found";
	}
	echo json_encode($json);
	exit();
}

$json["data"] = $data;

$json["success"] = $CODE_SUCCESS;
echo json_encode($json);

?>