<?php

// How to use this page:
// open it with your admin authkey
//
// getStatistics.php?authkey=abc123
//
// required parameters are:
// authkey
//
// The answer looks as follows:
// a json with a successcode and the data about the type:
/* 
{
    "data": {
        "genders": [
            {
                "female": "7", 
                "male": "32", 
                "unisex": "0"
            }
        ], 
        "joins": [
            {
                "day": "2014-03-18", 
                "users": "1"
            }, 
            {
                "day": "2014-03-14", 
                "users": "2"
            }
        ], 
        "uploads": [
            {
                "day": "2014-03-17", 
                "entries": "1"
            }, 
            {
                "day": "2014-03-14", 
                "entries": "2"
            }
        ]
    }, 
    "success": 1
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

if(!isset($_GET["authkey"])){
	$json["message"]="authkey missing";
	echo json_encode($json);
	exit();
}

$db = new DBHelper();

if(isset($_GET["authkey"])){
	$db->setAuthKey($_GET["authkey"]);
}

$result = $db->getStatistics();

if($result == false){
	$json["success"]=$CODE_ERROR;
	if(DBConnection::getInstance()->status == DBConfig::$dbStatus["offline"]){
		$json["message"] = "Database error";
	}else{
		$json["success"] = $CODE_NOT_FOUND;
		$json["message"] = "Type not found";
	}
	echo json_encode($json);
	exit();
}

$json["data"] = $result;

$json["success"] = $CODE_SUCCESS;
echo json_encode($json);

?>