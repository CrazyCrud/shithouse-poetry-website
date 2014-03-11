<?php

// How to use this page:
// open it with the authkey, the entryid and 
// the comment you wish to add
//
// addComment.php?authkey=530d03c697d60&entryid=2&comment=this%20is%20a%20test
//
// required parameters are:
// authkey, entryid, comment
//
// The answer looks as follows:
// a json with a successcode and the comment id:
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

if(isset($_GET["comment"])){
	$comment = $_GET["comment"];
}else{
	$json["message"]="comment missing";
	echo json_encode($json);
	exit();
}

$db = new DBHelper();
$db->setAuthKey($key);
$status = $db->addComment($entryid, $comment);

if($status == false){
	$json["success"]=$CODE_ERROR;
	if(DBConnection::getInstance()->status == DBConfig::$dbStatus["offline"]){
		$json["message"] = "Database error";
	}else{
		$json["success"] = $CODE_NOT_FOUND;
		$json["message"] = "User or Entry not found";
	}
	echo json_encode($json);
	exit();
}

$json["data"] = $status;

$json["success"] = $CODE_SUCCESS;
echo json_encode($json);

?>