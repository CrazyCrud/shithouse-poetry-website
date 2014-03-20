<?php

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
	if(!isset($entry)||$entry==false){
		printIcon();
	}else{
		echo '<img src="'.$entry["images"][0]["smallthumbnail"].'"></img>';
	}
}

function printIcon(){
	echo '<img src="http://latrinalia.de/img/global/favicon.jpg"></img>';
}

?>