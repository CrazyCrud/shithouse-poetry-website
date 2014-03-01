<?php

// How to use this page:
// open it with the info about the course to create
// as described in the database and your sessionkey:
//
// getTags.php?status="system"
//
// required parameters are:
// status [optional]
//
//	Status options:
//	all/system/ usercreated?
// 	default: all
//
// The answer looks as follows:
// a json with a successcode and the course id:
/* 
{
	"success":1,
	"data":[
		{
			"id":"1",
			"title":"lustiges bild",
			"date":"2014-02-18 13:29:28",
			"sex":"m",
			"userid":"1",
			"username":"tikiblue",
			"typename":"Text",
			"typedescription":"Ein an eine Wand, T\u00fcr oder auf einen anderen Gegenstand geschriebener Text.",
			"artist":"slivr33",
			"transcription":"dont hate me because im beautiful, hate me because i did your dad.\r\n\r\ngo home mom, youre drunk",
			"location":"in einer toilette irgendwo im nirgendwo",
			"longitude":"-1",
			"latitude":"-1",
			"imageid":"1",
			"path":"http:\/\/i.imgur.com\/YZmJoCz.jpg",
			"x":"50",
			"y":"50",
			"width":"350",
			"height":"250",
			"rating":"0.0000",
			"ratingcount":"6"
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
$json["success"]=$CODE_ERROR;

if(isset($_POST["status"])){
	$_GET = $_POST;
}

if(isset($_GET["status"])){
	$status = $_GET["status"];
}

$db = new DBHelper();
$tags = $db->getAllTags($status);

if($tags == false){
	$json["success"]=$CODE_ERROR;
	if(DBConnection::getInstance()->status == DBConfig::$dbStatus["offline"]){
		$json["message"] = "Database error";
	}else{
		$json["success"] = $CODE_NOT_FOUND;
		$json["message"] = "No tags found";
	}
	echo json_encode($json);
	exit();
}

$json["data"] = $tags;

$json["success"] = $CODE_SUCCESS;
echo json_encode($json);

?>