<?php

###################### ADMIN OR USER DIFFERENT USAGE ############

// How to use this page:
// open it with the info about the latitude and longitude:
//
// getLocations.php?lat=12.2&long=12.4
//
// user required parameters are:
// lat,long
// 
// OR IF YOU ARE ADMIN
// give the authkey and get a list of all locations:
// getLocations.php?authkey=xxx
//
// admin required parameters are:
// authkey
//
// The answer looks as follows:
// a json with a successcode and data about the location(s):
/* 
{
	"success":1,
	"data":
		[
			{
				"id":"1",
				"locations":
					[
						"Turnhalle",
						"Kneipe",
						"Bar",
						"Kirche",
						"Cafe",
						"Restaurant",
						"Schule",
						"Universit\u00e4t"
					],
				"fromlatitude":"-90",
				"fromlongitude":"-180",
				"tolatitude":"90",
				"tolongitude":"180"
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
		$json["message"] = "Database error";$json["success"] = $CODE_DB_ERROR;
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