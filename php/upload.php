<?php

	// HEADER
	header('Content-Type: application/json; charset=utf-8');
	include("config.php");
	include("helper.php");
	// END HEADER
	
	// PREPARE RESULT
	$json = array();
	$json["success"]=$CODE_INSUFFICIENT_PARAMETERS;
	
	if(!isset($_POST['editcode'])){
		$json["message"] = "project editcode (editcode) missing";
		echo json_encode($json);
		exit();
	}
	$json["success"]=$CODE_ERROR;

	$path = "../uploads/project_screenshots/";
	
	// GET PROJECT ID FROM EDITCODE
	// DB Connection
	$link = mysql_connect($sqllocation , $sqluser , $sqlpwd ) or die('Couldnt connect to database');
	mysql_select_db($sqldb, $link) or die('Couldnt select database: ' . mysql_error());
	mysql_query("SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'", $link);
	
	// CHECK IF EDITCODE EXISTS
	$query = "SELECT * FROM $table_projects WHERE editcode='".$_POST['editcode']."'";
	$result = mysql_query($query, $link) or die(mysql_error());
	if($row = mysql_fetch_array($result)){
		$project_id = $row["id"];
	}else{
		$json["success"]=$CODE_NOT_FOUND;
		echo json_encode($json);
		exit();
	}

	file_put_contents($path."log.txt", date('d/m/Y == H:i:s')." ".$path);

	if(!(file_exists($path."project-".$project_id))){
		mkdir($path."project-".$project_id, 0777, true);
	}

	$path = $path."project-".$project_id."/";

	for($i = 0; $i < count($_FILES['images']['name']); $i++){
		if ($_FILES['images']['error'][$i] == UPLOAD_ERR_OK) {
	    	$fileName = $path.$i."_".basename($_FILES['images']['name'][$i]);
	        move_uploaded_file($_FILES['images']['tmp_name'][$i], $fileName);
	        $isDirEmpty = false;
	    }else {	          
            continue;
	    }
	}

	if(count(glob($path)) === 0){
		rmdir($path);
	}

	$json["success"]=$CODE_SUCCESS;
	echo json_encode($json);
?>