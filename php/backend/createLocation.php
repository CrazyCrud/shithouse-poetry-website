<?php

// How to use this page:
// open it with the info about the course to create
// as described in the database and your sessionkey:
//
// createLocation.php?authkey=xxx&locations=location1,location2&flat=10&
// flong=30&tlat=60&tlong=50
//
// required parameters are:
// authkey, location (array with locations seperated by comma), flat, 
// flong, tlat, tlong
//
// The answer looks as follows:
// a json with a successcode and the course id:
/* 
{
	success : 1 ,
	data : [
		{
			"0":"123",
			"id":"123",
			"1":"mustermann@mail.com",
			"email":"mustermann@mail.com",
			"2":"mustermann",
			"username":"mustermann",
			"3":"2014-02-13 22:06:03",
			"joindate":"2014-02-13 22:06:03",
			"4":"2014-02-17 13:47:16",
			"lastaction":"2014-02-17 13:47:16",
			"5":"0",
			"status":"0"
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

if(isset($_GET["locations"])){
	$locations = $_GET["locations"];
}else{
	$json["message"]="locations missing";
	echo json_encode($json);
	exit();
}

if(isset($_GET["flat"])){
	$flat = $_GET["flat"];
}else{
	$json["message"]="flat missing";
	echo json_encode($json);
	exit();
}

if(isset($_GET["flong"])){
	$flong = $_GET["flong"];
}else{
	$json["message"]="flong missing";
	echo json_encode($json);
	exit();
}

if(isset($_GET["tlat"])){
	$tlat = $_GET["tlat"];
}else{
	$json["message"]="tlat missing";
	echo json_encode($json);
	exit();
}

if(isset($_GET["tlong"])){
	$tlong = $_GET["tlong"];
}else{
	$json["message"]="tlong missing";
	echo json_encode($json);
	exit();
}

$locations = str_replace(",", ";" , $locations);

$db = new DBHelper();

$db->setAuthKey($key);
$status = $db->createLocation($locations, $flat, $flong, $tlat, $tlong);

if($status == false){
	$json["success"]=$CODE_ERROR;
	if(DBConnection::getInstance()->status == DBConfig::$dbStatus["offline"]){
		$json["message"] = "Database error";
	}else{
		$json["message"] = "Location could not be created";
	}
	echo json_encode($json);
	exit();
}

$json["data"] = $status;

$json["success"] = $CODE_SUCCESS;
echo json_encode($json);

?>