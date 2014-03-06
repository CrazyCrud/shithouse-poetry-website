<?php

header('Content-Type: application/json; charset=utf-8');
//error_reporting(0);
include("helpers/dbhelper.php");

$db = new DBHelper();
$db->setAuthKey("xxx");
//$r = $db->deleteEntry(1);
//$r = $db->index(1,"Hallo Kaktus", "Hallo kleiner Kaktus, wie geht es deinem kleinen Kaktus?");
//$id = $db->updateEntry($entry);
$r = $db->getEntry(1);
//$r = $db->getRandomEntries(20);
//$r = $db->search("ganz");
//$r = $db->getAllEntriesByTag("family");
//echo "response: ".(($r===false)?"false":"$r");
//echo $db->getThumbnail("http://i.imgur.com/OVvRkHL.png", "s");
echo print_r($r);

?>