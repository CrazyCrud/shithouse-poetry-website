<?php

// How to use this page:
// open it with the info about the entry you wish to delete
// and your authkey:
//
// deleteEntry.php?authkey=xxx&entryid=1
//
// required parameters are:
// authkey, entryid
//
// The answer looks as follows:
// a json with a successcode and true if the operation was succesfull:
/* 
{
	success : 1 ,
	data : true
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

$db = new DBHelper();
$db->setAuthKey($key);
$status = $db->deleteEntry($entryid);

if($status == false){
	$json["success"]=$CODE_ERROR;
	if(DBConnection::getInstance()->status == DBConfig::$dbStatus["offline"]){
		$json["message"] = "Database error";
	}else{
		$json["message"] = "Entry not found";
	}
	echo json_encode($json);
	exit();
}

$json["data"] = $status;

$json["success"] = $CODE_SUCCESS;
echo json_encode($json);

?>