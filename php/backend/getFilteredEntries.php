<?php

// ############# NOT TESTED ####################

// How to use this page:
// open it with the info about the course to create
// as described in the database and your sessionkey:
//
// getFilteredEntries.php?filter=sex&values=value1,value2,value3&start=10&orderby=rating
//
// required parameters are:
// filter,values (array), orderby [optional], start [optional]
//
// filter options:
// sex (m or w), 
// type (all types as id or text), 
// tag (all tags as id or text)
//
// it is possible to filter for multiple types or tags
//
//	Orderby options:
//	date, rating
// 	default: date
//
// The answer looks as follows:
// a json with a successcode and the course id:
/* 
{
	"success":1,
	"data":
		[
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
						{"tagid":"1","tag":"comedy"},
						{"tagid":"2","tag":"family"}
					],
				"images":
					[
						{
							"id":"1",
							"path":"http:\/\/i.imgur.com\/YZmJoCz.jpg",
							"xposition":"50",
							"yposition":"50",
							"width":"350",
							"height":"250"
						},
						{
							"id":"2",
							"path":"http:\/\/i.imgur.com\/9WrZiJV.png",
							"xposition":"-1",
							"yposition":"-1",
							"width":"-1",
							"height":"-1"
						},
						{
							"id":"3",
							"path":"http:\/\/i.imgur.com\/j1WdvLo.png",
							"xposition":"-1",
							"yposition":"-1",
							"width":"-1",
							"height":"-1"
						}
					],
				"ratings":
					[
						{
							"entryid":"1",
							"rating":"0.0000",
							"ratingcount":"2"
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
		]
}
*/
// for success codes see ../php/config.php

// HEADER
header('Content-Type: application/json; charset=utf-8');
error_reporting(0);
include_once("../settings/config.php");
include_once("../helpers/dbhelper.php");
include_once("../helpers/util.php");
// END HEADER

// PREPARE RESULT
$json = array();
$json["success"]=$CODE_ERROR;

if(isset($_POST["filter"])){
	$_GET = $_POST;
}

if(isset($_GET["filter"])){
	$filter = $_GET["filter"];
}else{
	$json["message"]="filter missing";
	echo json_encode($json);
	exit();
}

if(isset($_GET["values"])){
	$values = $_GET["values"];
}else{
	$json["message"]="values missing";
	echo json_encode($json);
	exit();
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

$values = explode("," , $values);

$values = standarize_array($values);

$db = new DBHelper();

if(isset($_GET["authkey"])){
	$db->setAuthKey($_GET["authkey"]);
}
$entries = false;
if($filter == "sex"){
	$entries = $db->getAllEntriesBySex($values[0], $orderby, $start);
}else if($filter == "type"){
	$entries = $db->getAllEntriesByType($values, $orderby, $start);
}else if($filter == "tag"){
	$entries = $db->getAllEntriesByTag($values, $orderby, $start);
}else{
	$json["message"]="Wrong filter";
	echo json_encode($json);
	exit();
}

if($entries == false){
	$json["success"]=$CODE_ERROR;
	if(DBConnection::getInstance()->status == DBConfig::$dbStatus["offline"]){
		$json["message"] = "Database error";
	}else{
		$json["success"] = $CODE_NOT_FOUND;
		$json["message"] = "No entries found. Filtered by ".$filter;
	}
	echo json_encode($json);
	exit();
}

$json["data"] = $entries;

$json["success"] = $CODE_SUCCESS;
echo json_encode($json);

?>