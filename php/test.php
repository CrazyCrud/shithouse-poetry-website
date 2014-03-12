<?php

header('Content-Type: application/json; charset=utf-8');
//error_reporting(0);
include("helpers/dbhelper.php");

$db = new DBHelper();
//$db->setAuthKey("d41d8cd98f00b204e9800998ecf8427e531de1cb5a4af");
//$r = $db->deleteEntry(1);
//$r = $db->index(1,"Hallo Kaktus", "Hallo kleiner Kaktus, wie geht es deinem kleinen Kaktus?");
//$id = $db->updateEntry($entry);
//$r = $db->getTimeLine();
//$r = $db->getRandomEntries(20);
//$r = $db->search("ganz");
//$r = $db->getEntry(1);
//echo "response: ".(($r===false)?"false":"$r");
//echo $db->getThumbnail("http://i.imgur.com/OVvRkHL.png", "s");
$db->reIndexEverything();
//echo print_r($r);

?>