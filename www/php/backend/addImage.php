<?php

// How to use this page:
// id 		as the entryID to add the image to
// authkey 	as your authkey
//
// required parameters are:
// id, authkey
//
// The answer looks as follows:
// a json with a successcode:
/* 
{
	success : 1
}
*/
// for success codes see ../php/config.php

/**
IMAGE UPLAOD
*/

// MAX IMAGE SIZE IN PIXELS
$MAX_SIZE = 1024;

// HEADER
header('Content-Type: application/json; charset=utf-8');
include_once("../settings/config.php");
include_once("../helpers/dbhelper.php");
error_reporting(0);
// END HEADER

// PREPARE RESULT
$json = array();
$json["success"]=$CODE_INSUFFICIENT_PARAMETERS;

if(isset($_POST["authkey"])){
	$_GET = $_POST;
}

if(!isset($_GET['authkey'])){
	$json["message"] = "user authentication (authkey) missing";
	echo json_encode($json);
	exit();
}
if(!isset($_GET['id'])){
	$json["message"] = "entryid (id) missing";
	echo json_encode($json);
	exit();
}
$json["success"]=$CODE_ERROR;

// GET USER AND ENTRY
// DB Connection
$db = new DBHelper();
$db->setAuthKey($_GET['authkey']);
$user = $db->getUser();
$entry = $db->getEntry($_GET['id']);

// USER OR ENTRY NOT FOUND
if(!$user || !$entry){
	$json["success"]=$CODE_NOT_FOUND;
	echo json_encode($json);
	exit();
}

// USER NOT ALLOWED TO CHANGE TO ENTRY
if($user["status"]!=DBConfig::$userStatus["admin"] && $user["id"]!=$entry["userid"]){
	$json["success"]=$CODE_PERMISSION_DENIED;
	echo json_encode($json);
	exit();
}

$url = "php/backend/image.php?id=".$entry["id"];

$status = $db->saveImage($entry["id"], $url, -1,-1,-1,-1);

if($status == false){
	$json["success"]=$CODE_ERROR;
	if(DBConnection::getInstance()->status == DBConfig::$dbStatus["offline"]){
		$json["message"] = "Database error";$json["success"] = $CODE_DB_ERROR;
	}else{
		$json["success"] = $CODE_NOT_FOUND;
		$json["message"] = "User or Entry not found";
	}
	echo json_encode($json);
	exit();
}

$json["data"] = $status;

$json["success"]= $CODE_SUCCESS;

echo json_encode($json);