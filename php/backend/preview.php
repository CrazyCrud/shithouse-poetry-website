<?php
$type = 'image/jpeg';
header('Content-Type:'.$type);
error_reporting(0);
include_once("../helpers/dbhelper.php");

if(isset($_GET["id"])){
	$entryid = $_GET["id"];
	printPreview($entryid);
}else{
	printIcon();
}

function printPreview($id){
	$db = new DBHelper();
	$entry = $db->getEntry($id);
	if(!isset($entry)
		||$entry==false
		||!isset($entry["images"])
		||!isset($entry["images"][0])
		||!isset($entry["images"][0]["smallthumbnail"])){
		printIcon();
	}else{
		$file = $entry["images"][0]["smallthumbnail"];
		header('Content-Length: ' . filesize($file));
		readfile($file);
	}
}

function printIcon(){
	$file = "http://latrinalia.de/img/global/favicon.jpg";
	header('Content-Length: ' . filesize($file));
	readfile($file);
}

?>