<?php

header('Content-Type: application/json; charset=utf-8');
error_reporting(E_ALL);
include("helpers/dbhelper.php");

//$db = new DBHelper();
//$db->setAuthKey("d41d8cd98f00b204e9800998ecf8427e5322bfcf7c5fe");
//$r = $db->deleteEntry(1);
//$r = $db->index(1,"Hallo Kaktus", "Hallo kleiner Kaktus, wie geht es deinem kleinen Kaktus?");
//$id = $db->updateEntry($entry);
//$r = $db->getTimeLine();
//$r = $db->getRandomEntries(20);
//$r = $db->search("ganz");
//$r = $db->logout();
//echo "response: ".(($r===false)?"false":"$r");
//echo $db->getThumbnail("http://i.imgur.com/OVvRkHL.png", "s");
//$db->updateTranscription(42, "Hunde müssen leider drausen warten");

sendVerificationMail("bastian.hinterleitner@gmail.com", "Basti Hilei", "abd123");

echo print_r($r);

?>