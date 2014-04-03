<?php

// How to use this page:
// open it with the authkey of the user additionally you can
// give a start for the given information:
//
// getTimeLine.php?authkey=xxx&start=10
//
// required parameters are:
// authkey
//
// optional parameters are:
// start
//
// The answer looks as follows:
// a json with a successcode and the timeline informations:
/* 
{
	"success":1,
	"data":
		[
			{
				"userid":"1",
				"username":"tikiblue",
				"entryid":"1",
				"title":"lustiges bild",
				"sex":"m",
				"comment":"Toller Eintrag",
				"date":"2014-02-13 22:46:23",
				"path":"http:\/\/i.imgur.com\/YZmJoCz.jpg",
				"smallthumbnail":"http:\/\/i.imgur.com\/YZmJoCzs.jpg"
			},
			{
				"userid":"1",
				"username":"tikiblue",
				"entryid":"1",
				"title":"lustiges bild",
				"sex":"m",
				"comment":"Toller Eintrag",
				"date":"2014-02-13 22:46:23",
				"path":"http:\/\/i.imgur.com\/9WrZiJV.png",
				"smallthumbnail":"http:\/\/i.imgur.com\/9WrZiJVs.png"
			},
			{
				"userid":"1",
				"username":"tikiblue",
				"entryid":"1",
				"title":"lustiges bild",
				"sex":"m",
				"comment":"Toller Eintrag",
				"date":"2014-02-13 22:46:23",
				"path":"http:\/\/i.imgur.com\/j1WdvLo.png",
				"smallthumbnail":"http:\/\/i.imgur.com\/j1WdvLos.png"
			}
		]
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
$json["success"]=$CODE_ERROR;

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

if(isset($_GET["start"])){
	$start = $_GET["start"];
}

$db = new DBHelper();
$db->setAuthKey($key);

$entries = $db->getTimeLine($start);

if($entries == false){
	$json["success"]=$CODE_ERROR;
	if(DBConnection::getInstance()->status == DBConfig::$dbStatus["offline"]){
		$json["message"] = "Database error";$json["success"] = $CODE_DB_ERROR;
	}else{
		$json["success"] = $CODE_NOT_FOUND;
		$json["message"] = "No entries found";
	}
	echo json_encode($json);
	exit();
}

$json["data"] = $entries;

$json["success"] = $CODE_SUCCESS;
echo json_encode($json);

?>