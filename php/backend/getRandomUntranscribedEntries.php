<?php

// How to use this page:
// open it with nothing and you get untranscribed entries, 
// additionally you can give the authkey or the amount of entries you 
// wish to get:
//
// getRandomUntranscribedEntries.php?authkey=xxx&amount=20
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
"data":
	[
		{
			"id":"48",
			"title":"1000 mal vermolst",
			"date":"2014-03-13 20:57:04",
			"sex":"M",
			"userid":"1",
			"username":"tikiblue",
			"typeid":"1",
			"typename":"Text",
			"typedescription":"Ein an eine Wand, T\u00fcr oder auf einen anderen Gegenstand geschriebener Text.",
			"tags":
				[
					{
						"tagid":"12",
						"tag":"vermolst"
					},
					{
						"tagid":"19",
						"tag":"Zitat"
					},
					{
						"tagid":"24",
						"tag":"Spruch"
					}
				],
			"images":
				[
					{
						"id":"46",
						"path":"http:\/\/i.imgur.com\/avA8IAo.png",
						"xposition":"-1",
						"yposition":"-1",
						"width":"-1",
						"height":"-1",
						"thumbnail":"http:\/\/i.imgur.com\/avA8IAom.png",
						"smallthumbnail":"http:\/\/i.imgur.com\/avA8IAos.png",
						"largethumbnail":"http:\/\/i.imgur.com\/avA8IAol.png"
					}
				],
			"ratings":
				[
					{
						"entryid":"48",
						"rating":"1.0000",
						"ratingcount":"1"
					}
				],
			"information":
				[
					{
						"entryid":"48",
						"artist":"",
						"transcription":"",
						"userid":"1",
						"username":"tikiblue",
						"location":"Sprach-, Literatur- und Kulturwissenschaften",
						"longitude":"12.0958969444444",
						"latitude":"48.9991333333333"
					}
				]
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

$entries = $db->getRandomUntranscribedEntries($amount);

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