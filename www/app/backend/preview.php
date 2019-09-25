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
		||!isset($entry["images"][0]["thumbnail"])){
		printIcon();
	}else{
		$file = $entry["images"][0]["thumbnail"];
		readfile($file);
	}
}

function printIcon(){
	$file = "http://latrinalia.de/img/global/icon.png";
	readfile($file);
}

?>