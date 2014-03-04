<?php

header('Content-Type: application/json; charset=utf-8');
//error_reporting(0);
include("helpers/dbhelper.php");

$db = new DBHelper();
$db->setAuthKey("xxx");
$r = $db->deleteEntry(1);
//echo "response: ".(($r===false)?"false":"$r");
echo print_r($r);

?>