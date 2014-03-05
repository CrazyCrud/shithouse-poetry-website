<?php

// How to use this page:
// open it with the info about the course to create
// as described in the database and your sessionkey:
//
// addReport.php?entryid=1&reportdesc=bla&commentid=12
//
// required parameters are:
// entryid, reportdesc
//
// optional parameters are:
// authkey, commentid
//
// The answer looks as follows:
// a json with a successcode and the course id:
/* 
{
	success : 1 ,
	data : [
		{
			"0":"123",
			"id":"123",
			"1":"mustermann@mail.com",
			"email":"mustermann@mail.com",
			"2":"mustermann",
			"username":"mustermann",
			"3":"2014-02-13 22:06:03",
			"joindate":"2014-02-13 22:06:03",
			"4":"2014-02-17 13:47:16",
			"lastaction":"2014-02-17 13:47:16",
			"5":"0",
			"status":"0"
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

if(isset($_GET["reportdesc"])){
	$reportdesc = $_GET["reportdesc"];
}else{
	$json["message"]="reportdesc missing";
	echo json_encode($json);
	exit();
}

if(isset($_GET["commentid"])){
	$commentid = $_GET["commentid"];
}

$db = new DBHelper();
if(isset($_GET["authkey"])){
	$db->setAuthKey($_GET["authkey"]);
}
$status = $db->addReport($entryid, $reportdesc, $commentid);

if($status == false){
	$json["success"]=$CODE_ERROR;
	if(DBConnection::getInstance()->status == DBConfig::$dbStatus["offline"]){
		$json["message"] = "Database error";
	}else{
		$json["success"] = $CODE_NOT_FOUND;
		$json["message"] = "Type not found";
	}
	echo json_encode($json);
	exit();
}

$json["data"] = $status;

$json["success"] = $CODE_SUCCESS;
echo json_encode($json);

?>