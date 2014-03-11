<?php

// How to use this page:
// open it with the info about the image you wish to update
// and the values you wish to give:
//
// updateImage.php?authkey=123&id=1&x=20&y=10&w=120&h=130
//
// required parameters are:
// authkey, id, x, y, w, h
//
// The answer looks as follows:
// a json with a successcode and true if the operation was successfull:
/* 
{
	success : 1 ,
	data : true
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

if(isset($_GET["id"])){
	$id = $_GET["id"];
}else{
	$json["message"]="id missing";
	echo json_encode($json);
	exit();
}

if(isset($_GET["x"])){
	$x = $_GET["x"];
}else{
	$json["message"]="x-coordinates missing";
	echo json_encode($json);
	exit();
}

if(isset($_GET["y"])){
	$y = $_GET["y"];
}else{
	$json["message"]="y-coordinates missing";
	echo json_encode($json);
	exit();
}

if(isset($_GET["w"])){
	$w = $_GET["w"];
}else{
	$json["message"]="width missing";
	echo json_encode($json);
	exit();
}

if(isset($_GET["h"])){
	$h = $_GET["h"];
}else{
	$json["message"]="height missing";
	echo json_encode($json);
	exit();
}

$db = new DBHelper();
$db->setAuthKey($key);
$data = $db->updateImage($id, $x, $y, $w, $h);

if($data == false){
	$json["success"]=$CODE_ERROR;
	if(DBConnection::getInstance()->status == DBConfig::$dbStatus["offline"]){
		$json["message"] = "Database error";
	}else{
		$json["message"] = "image not found";
	}
	echo json_encode($json);
	exit();
}

$json["data"] = $data;

$json["success"] = $CODE_SUCCESS;
echo json_encode($json);

?>