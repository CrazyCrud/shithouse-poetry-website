<?php

// How to use this page:
// open it with your authkey, the id of the user you want to follow
// and whether to follow or to unfollow
//
// follow.php?authkey=xxx&userid=1&follow=true
//
// required parameters are:
// authkey, userid, follow (true, false)
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

if(isset($_GET["userid"])){
	$userid = $_GET["userid"];
}else{
	$json["message"]="userid missing";
	echo json_encode($json);
	exit();
}

if(isset($_GET["follow"])){
	$follow = filter_var($_GET["follow"], FILTER_VALIDATE_BOOLEAN);
}else{
	$json["message"]="follow missing";
	echo json_encode($json);
	exit();
}

$db = new DBHelper();
$db->setAuthKey($key);
$status = $db->follow($userid, $follow);

if($status == false){
	$json["success"]=$CODE_ERROR;
	if(DBConnection::getInstance()->status == DBConfig::$dbStatus["offline"]){
		$json["message"] = "Database error";
	}else{
		$json["success"] = $CODE_NOT_FOUND;
		$json["message"] = "user not found";
	}
	echo json_encode($json);
	exit();
}

$json["data"] = $status;

$json["success"] = $CODE_SUCCESS;
echo json_encode($json);

?>