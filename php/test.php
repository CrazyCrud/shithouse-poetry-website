<?php

include("helpers/dbhelper.php");

$db = new DBHelper();
$db->setAuthKey("xxx");
echo print_r($db->getUser());

?>