<?php

// ############# NOT TESTED ####################

// How to use this page:
// open it with the info about the course to create
// as described in the database and your sessionkey:
//
// getUser.php?entryid=123&commentid=123
//
// required parameters are:
// entryid, commentid
//
// The answer looks as follows:
// a json with a successcode and the course id:
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
include("../settings/config.php");
include("../helpers/dbhelper.php");
// END HEADER

// PREPARE RESULT
$json = array();
$json["success"]=$CODE_INSUFFICIENT_PARAMETERS;

if(isset($_POST["entryid"])){
	$_GET = $_POST;
}

if(isset($_GET["entryid"])){
	$entryid = $_GET["entryid"];
}else{
	$json["message"]="entryid missing";
	echo json_encode($json);
	exit();
}

if(isset($_GET["commentid"])){
	$commentid = $_GET["commentid"];
}else{
	$json["message"]="commentid missing";
	echo json_encode($json);
	exit();
}

$db = new DBHelper();
$comments = $db->getComments($entryid, $commentid);

if($comments == false){
	$json["success"]=$CODE_ERROR;
	if(DBConnection::getInstance()->status == DBConfig::$dbStatus["offline"]){
		$json["message"] = "Database error";
	}else{
		$json["success"] = $CODE_NOT_FOUND;
		$json["message"] = "No comments found";
	}
	echo json_encode($json);
	exit();
}

$json["data"] = $comments;

$json["success"] = $CODE_SUCCESS;
echo json_encode($json);

?>