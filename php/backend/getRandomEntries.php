<?php

// How to use this page:
// open it with nothing and you get entries, additionally you can 
// give the authkey or the amount of entries you wish to get:
//
// getRandomEntries.php?authkey=xxx&amount=20
//
// required parameters are:
// none
//
// optional parameters are:
// authkey, amount
//
// The answer looks as follows:
// a json with a successcode and the data about the entries:
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
include_once("../settings/config.php");
include_once("../helpers/dbhelper.php");
// END HEADER

// PREPARE RESULT
$json = array();
$json["success"]=$CODE_ERROR;

if(isset($_POST["authkey"]) || isset($_POST["amount"])){
	$_GET = $_POST;
}

if(isset($_GET["amount"])){
	$amount = $_GET["amount"];
}

$db = new DBHelper();
if(isset($_GET["authkey"])){
	$db->setAuthKey($_GET["authkey"]);
}

$entries = $db->getRandomEntries($amount);

if($entries == false){
	$json["success"]=$CODE_ERROR;
	if(DBConnection::getInstance()->status == DBConfig::$dbStatus["offline"]){
		$json["message"] = "Database error";
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