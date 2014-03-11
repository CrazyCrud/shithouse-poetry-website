<?php

// How to use this page:
// open it with the info about the tag(s) you wish to create:
//
// createTag.php?tags=tag1,tag2,tag3
//
// required parameters are:
// tags (array with strings)
//
// The answer looks as follows:
// a json with a successcode and true if the operation was successful:
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

if(isset($_POST["tags"])){
	$_GET = $_POST;
}

if(isset($_GET["tags"])){
	$tags = $_GET["tags"];
}else{
	$json["message"]="tag(s) missing";
	echo json_encode($json);
	exit();
}

$tags = explode("," , $tags);

$db = new DBHelper();

if(isset($_GET["authkey"])){
	$db->setAuthKey($_GET["authkey"]);
}
$status = $db->createTag($tags);

if($status == false){
	$json["success"]=$CODE_ERROR;
	if(DBConnection::getInstance()->status == DBConfig::$dbStatus["offline"]){
		$json["message"] = "Database error";
	}else{
		$json["message"] = "(Some) Tag(s) could not be created";
	}
	echo json_encode($json);
	exit();
}

$json["data"] = $status;

$json["success"] = $CODE_SUCCESS;
echo json_encode($json);

?>