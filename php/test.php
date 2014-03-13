<?php

header('Content-Type: application/json; charset=utf-8');
//error_reporting(0);
include("helpers/dbhelper.php");

$db = new DBHelper();
$db->setAuthKey("d04678ebe7ca9c4698f856e796a687585321be3fa3e7d");
//$r = $db->deleteEntry(1);
//$r = $db->index(1,"Hallo Kaktus", "Hallo kleiner Kaktus, wie geht es deinem kleinen Kaktus?");
//$id = $db->updateEntry($entry);
//$r = $db->getTimeLine();
//$r = $db->getRandomEntries(20);
//$r = $db->search("ganz");
//$r = $db->getEntry(1);
//echo "response: ".(($r===false)?"false":"$r");
//echo $db->getThumbnail("http://i.imgur.com/OVvRkHL.png", "s");
$db->updateTranscription(42, "Hunde müssen leider drausen warten");
//echo print_r($r);

?>