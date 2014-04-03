<?php

// How to use this page:
// open it with the info about the course to create
// as described in the database and your sessionkey:
//
// removeTag.php?tags=tag1,tag2,tag3
//
// required parameters are:
// tag (array with ids or tag-strings)
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
include_once("../helpers/util.php");
// END HEADER

// PREPARE RESULT
$json = array();
$json["success"]=$CODE_INSUFFICIENT_PARAMETERS;

if(isset($_POST["tags"])){
	$_GET = $_POST;
}

if(isset($_GET["tags"])){
	$tags = $_GET["tags"];
}else{
	$json["message"]="tag(s) missing";
	echo json_encode($json);
	exit();
}

$tags = explode("," , $tags);

$tags = standarize_array($tag);

$db = new DBHelper();


if(isset($_GET["authkey"])){
	$db->setAuthKey($_GET["authkey"]);
}
$status = $db->deleteTag($tags);

if($status == false){
	$json["success"]=$CODE_ERROR;
	if(DBConnection::getInstance()->status == DBConfig::$dbStatus["offline"]){
		$json["message"] = "Database error";$json["success"] = $CODE_DB_ERROR;
	}else{
		$json["message"] = "(Some) Tag(s) could not be deleted";
	}
	echo json_encode($json);
	exit();
}

$json["data"] = $status;

$json["success"] = $CODE_SUCCESS;
echo json_encode($json);

?>