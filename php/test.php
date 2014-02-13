<?php

include("helpers/dbhelper.php");

$db = new DBHelper();
echo print_r($db->getComplete(DBConfig::$tables["users"]));

?>