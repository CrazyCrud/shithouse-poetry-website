<?php

// How to use this page:
// open it with the info about the course to create
// as described in the database and your sessionkey:
//
// getLocations.php?lat=12.2&long=12.4
//
// getLocations.php?authkey=xxx
//
// user required parameters are:
// lat,long
//
// admin required parameters are:
//
// authkey
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

if(isset($_POST["authkey"]) || isset($_POST["lat"])){
	$_GET = $_POST;
}

if(isset($_GET["lat"])){
	$lat = $_GET["lat"];
}else if(!isset($_GET["authkey"])){
	$json["message"]="lat missing";
	echo json_encode($json);
	exit();
}

if(isset($_GET["long"])){
	$long = $_GET["long"];
}else if(!isset($_GET["authkey"])){
	$json["message"]="long missing";
	echo json_encode($json);
	exit();
}

$db = new DBHelper();

if(isset($_GET["authkey"])){
	$db->setAuthKey($_GET["authkey"]);
	$user = $db->getUser();
	if(!isset($user["id"])){
		$json["success"] = $CODE_NOT_FOUND;
		$json["message"]="User not existing!";
		echo json_encode($json);
		exit();
	}else if($user["status"]!=DBConfig::$userStatus["admin"]){

		if(!isset($lat)){
			$json["message"]="lat missing";
			echo json_encode($json);
			exit();
		}

		if(!isset($long)){
			$json["message"]="long missing";
			echo json_encode($json);
			exit();
		}
	}
}

$locations = $db->getLocations($lat, $long);

if($locations == false){
	$json["success"]=$CODE_ERROR;
	if(DBConnection::getInstance()->status == DBConfig::$dbStatus["offline"]){
		$json["message"] = "Database error";
	}else{
		$json["success"] = $CODE_NOT_FOUND;
		$json["message"] = "No locations found";
	}
	echo json_encode($json);
	exit();
}

$json["data"] = $locations;

$json["success"] = $CODE_SUCCESS;
echo json_encode($json);

?>