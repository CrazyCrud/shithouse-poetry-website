<?php

// How to use this page:
// open it with the info about the entryid, your authkey
// and the tags you wish to add:
//
// addTag.php?authkey=xxx&entryid=123&tags=1,2,3
//
// required parameters are:
// authkey, entryid, tags (array with text or id)
//
// The answer looks as follows:
// a json with a successcode and true if it was successful:
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
include_once("../helpers/util.php");
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

if(isset($_GET["tags"])){
	$tags = $_GET["tags"];
}else{
	$json["message"]="tag(s) missing";
	echo json_encode($json);
	exit();
}

$tags = explode("," , $tags);

$tags = standarize_array($tags);

$db = new DBHelper();
$db->setAuthKey($key);
$status = $db->addTag($tags, $entryid);

if($status == false){
	$json["success"]=$CODE_ERROR;
	if(DBConnection::getInstance()->status == DBConfig::$dbStatus["offline"]){
		$json["message"] = "Database error";$json["success"] = $CODE_DB_ERROR;
	}else{
		$json["success"] = $CODE_NOT_FOUND;
		$json["message"] = "Tag(s) or Entry not found";
	}
	echo json_encode($json);
	exit();
}

$json["data"] = $status;

$json["success"] = $CODE_SUCCESS;
echo json_encode($json);

?>