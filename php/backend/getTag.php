<?php

// How to use this page:
// open it with the info about the tag, id or the tagname:
//
// getTag.php?tag="xxx"
//
// required parameters are:
// tag ( id or tag-string)
//
// The answer looks as follows:
// a json with a successcode and the data about the tag:
/* 
{
"success":1,
"data":
	{
		"tagid":"1",
		"tag":"comedy",
		"status":"0"
	}
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

if(isset($_POST["tag"])){
	$_GET = $_POST;
}

if(isset($_GET["tag"])){
	$tag = $_GET["tag"];
}else{
	$json["message"]="tag missing";
	echo json_encode($json);
	exit();
}

if(is_numeric($tag)){
	$tag = intval($tag);
}

$db = new DBHelper();

if(isset($_GET["authkey"])){
	$db->setAuthKey($_GET["authkey"]);
}
$tag = $db->getTag($tag);

if($tag == false){
	$json["success"]=$CODE_ERROR;
	if(DBConnection::getInstance()->status == DBConfig::$dbStatus["offline"]){
		$json["message"] = "Database error";$json["success"] = $CODE_DB_ERROR;
	}else{
		$json["success"] = $CODE_NOT_FOUND;
		$json["message"] = "Tag not found";
	}
	echo json_encode($json);
	exit();
}

$json["data"] = $tag;

$json["success"] = $CODE_SUCCESS;
echo json_encode($json);

?>