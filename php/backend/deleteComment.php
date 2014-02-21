<?php

// ############# NOT TESTED ####################

// How to use this page:
// open it with the info about the course to create
// as described in the database and your sessionkey:
//
// getUser.php?authkey=123&commentid=123
//
// required parameters are:
// authkey, commentid
//
// The answer looks as follows:
// a json with a successcode and the course id:
/* 
{
	"success":1,
	"data":[
		{
			"0":"1",
			"id":"1",
			"1":"1",
			"entryid":"1",
			"2":"1",
			"userid":"1",
			"3":"Toller Eintrag",
			"comment":"Toller Eintrag",
			"4":"2014-02-13 22:46:23",
			"timestamp":"2014-02-13 22:46:23"
		}
	]
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

if(isset($_GET["commentid"])){
	$commentid = $_GET["commentid"];
}else{
	$json["message"]="commentid missing";
	echo json_encode($json);
	exit();
}

$db = new DBHelper();
$db->setAuthKey($key);
$status = $db->getComment($commentid);

if($status == false){
	$json["success"]=$CODE_ERROR;
	if(DBConnection::getInstance()->status == DBConfig::$dbStatus["offline"]){
		$json["message"] = "Database error";
	}else{
		$json["success"] = $CODE_NOT_FOUND;
		$json["message"] = "User or comment not found";
	}
	echo json_encode($json);
	exit();
}

$json["data"] = $status;

$json["success"] = $CODE_SUCCESS;
echo json_encode($json);

?>