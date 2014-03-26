<?php

// How to use this page:
// open it with the info about the entry you wish to get:
//
// getEntry.php?entryid=123
//
// required parameters are:
// entryid
//
// The answer looks as follows:
// a json with a successcode and data about the entry:
/* 
{
	"success":1,
	"data":
		{
			"id":"1",
			"title":"lustiges bild",
			"date":"2014-02-18 13:29:28",
			"sex":"m",
			"userid":"1",
			"username":"tikiblue",
			"typeid":"1",
			"typename":"Text",
			"typedescription":"Ein an eine Wand, T\u00fcr oder auf einen anderen Gegenstand geschriebener Text.",
			"tags":
			[
				{
					"tagid":"1",
					"tag":"comedy"
				},
				{
					"tagid":"2",
					"tag":"family"
				},
				{
					"tagid":"3",
					"tag":"test"
				}
			],
		"images":
			[
				{
					"id":"1",
					"path":"http:\/\/i.imgur.com\/YZmJoCz.jpg",
					"xposition":"50",
					"yposition":"50",
					"width":"350",
					"height":"250",
					"thumbnail":"http:\/\/i.imgur.com\/YZmJoCzm.jpg",
					"smallthumbnail":"http:\/\/i.imgur.com\/YZmJoCzs.jpg",
					"largethumbnail":"http:\/\/i.imgur.com\/YZmJoCzl.jpg"
				},
				{
					"id":"2",
					"path":"http:\/\/i.imgur.com\/9WrZiJV.png",
					"xposition":"12",
					"yposition":"24",
					"width":"200",
					"height":"400",
					"thumbnail":"http:\/\/i.imgur.com\/9WrZiJVm.png",
					"smallthumbnail":"http:\/\/i.imgur.com\/9WrZiJVs.png",
					"largethumbnail":"http:\/\/i.imgur.com\/9WrZiJVl.png"
				},
				{
					"id":"3",
					"path":"http:\/\/i.imgur.com\/j1WdvLo.png",
					"xposition":"-1",
					"yposition":"-1",
					"width":"-1",
					"height":"-1",
					"thumbnail":"http:\/\/i.imgur.com\/j1WdvLom.png",
					"smallthumbnail":"http:\/\/i.imgur.com\/j1WdvLos.png",
					"largethumbnail":"http:\/\/i.imgur.com\/j1WdvLol.png"
				}
			],
		"ratings":
			[
				{
					"entryid":"1",
					"rating":"-1.0000",
					"ratingcount":"1"
				}
			],
		"information":
			[
				{
					"entryid":"1",
					"artist":"slivr33",
					"transcription":"dont hate me because im beautiful, hate me because i did your dad.\r\n\r\ngo home mom, youre drunk",
					"location":"in einer toilette irgendwo im nirgendwo",
					"longitude":"-1",
					"latitude":"-1"
				}
			]
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

$db = new DBHelper();

if(isset($_GET["authkey"])){
	$db->setAuthKey($_GET["authkey"]);
}
$entry = $db->getEntry($entryid);

if($entry == false){
	$json["success"]=$CODE_ERROR;
	if(DBConnection::getInstance()->status == DBConfig::$dbStatus["offline"]){
		$json["message"] = "Database error";
	}else{
		$json["success"] = $CODE_NOT_FOUND;
		$json["message"] = "Entry not found";
	}
	echo json_encode($json);
	exit();
}

$db->view($entryid);

$json["data"] = $entry;

$json["success"] = $CODE_SUCCESS;
echo json_encode($json);

?>