<?php

// How to use this page:
// open it without info the get the first entries ordered by date
// you can change the start and the order with optional parameters:
//
// getEntries.php?start=10&orderby=rating
//
// required paramters are:
// none
// 
// optional parameters are:
// orderby , start
//
//	Orderby options:
//	date, rating
// 	default: date
//
// The answer looks as follows:
// a json with a successcode and entries data:
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

if(isset($_POST["start"]) || isset($_POST["orderby"])){
	$_GET = $_POST;
}

if(isset($_GET["start"])){
	$start = $_GET["start"];
}else{
	$start = 0;
}

if(isset($_GET["orderby"])){
	$orderby = $_GET["orderby"];
}else{
	$orderby = "date";
}



$db = new DBHelper();
if(isset($_GET["authkey"])){
	$db->setAuthKey($_GET["authkey"]);
}
$entries = $db->getAllEntries($orderby, $start);

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