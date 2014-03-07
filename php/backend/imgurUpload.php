<?php

// How to use this page:
// open it using a FormData or Form by sending via POST:
// id 		as the entryID to add the image to
// authkey 	as your authkey
// images[]	as the image[s] to upload
//
// required parameters are:
// id, authkey, images[]
//
// The answer looks as follows:
// a json with a successcode:
/* 
{
	success : 1
}
*/
// for success codes see ../php/config.php

/**
IMAGE UPLAOD
*/

// MAX IMAGE SIZE IN PIXELS
$MAX_SIZE = 1024;

// HEADER
header('Content-Type: application/json; charset=utf-8');
include_once("../settings/config.php");
include_once("../helpers/dbhelper.php");
// END HEADER

// PREPARE RESULT
$json = array();
$json["success"]=$CODE_INSUFFICIENT_PARAMETERS;

if(isset($_POST["authkey"])){
	$_GET = $_POST;
}

if(!isset($_POST['authkey'])){
	$json["message"] = "user authentication (authkey) missing";
	echo json_encode($json);
	exit();
}
if(!isset($_POST['id'])){
	$json["message"] = "entryid (id) missing";
	echo json_encode($json);
	exit();
}
$json["success"]=$CODE_ERROR;

// GET USER AND ENTRY
// DB Connection
$db = new DBHelper();
$db->setAuthKey($_POST['authkey']);
$user = $db->getUser();
$entry = $db->getEntry($_POST['id']);

// USER OR ENTRY NOT FOUND
if(!$user || !$entry){
	$json["success"]=$CODE_NOT_FOUND;
	echo json_encode($json);
	exit();
}

// USER NOT ALLOWED TO CHANGE TO ENTRY
if($user["status"]!=DBConfig::$userStatus["admin"] && $user["id"]!=$entry["userid"]){
	$json["success"]=$CODE_PERMISSION_DENIED;
	echo json_encode($json);
	exit();
}

$json["success"]= $CODE_SUCCESS;

for($i = 0; $i < count($_FILES['images']['name']); $i++){
	if ($_FILES['images']['error'][$i] == UPLOAD_ERR_OK) {

		// check if its an image
		$info = getimagesize($_FILES['images']['tmp_name'][$i]);
		if ($info === FALSE) {
		   $json["success"]=$CODE_MALFORMED;
		   continue;
		}
		if (($info[2] !== IMAGETYPE_GIF) && ($info[2] !== IMAGETYPE_JPEG) && ($info[2] !== IMAGETYPE_PNG)) {
		   $json["success"]=$CODE_MALFORMED;
		   continue;
		}

		// find data-type
		$extension = getExtension($_FILES['images']['name'][$i]);
  		$extension = strtolower($extension);

        $image = resizeImage($_FILES['images']['tmp_name'][$i], $extension, $MAX_SIZE);

		ob_start();
		imagepng($image);
		$buffer = ob_get_clean();
		ob_end_clean();

		$url = sendToImgur($buffer);
		if(!$url){
			$json["success"] = $CODE_ERROR;
			$json["message"] = "uploading error";
			exit();
		}
		if(!$db->saveImage($entry["id"], $url, -1,-1,-1,-1)){
			$json["success"] = $CODE_ERROR;
			$json["message"] = "database error";
			exit();
		}

		imagedestroy($image);

        $isDirEmpty = false;
    }
}

echo json_encode($json);


function resizeImage($img, $type, $max){

		// create image
	if($type=="jpg" || $type=="jpeg" )
	{
		$src = imagecreatefromjpeg($img);
	}
	else if($type=="png")
	{
		$src = imagecreatefrompng($img);
	}
	else 
	{
		$src = imagecreatefromgif($img);
	}

	list($width,$height)=getimagesize($img);

	// return it without resizing if its already small enough
	if($width<=$max && $height<=$max)return $src;

	// create resizing factor
	if($width>$height){
		$factor = $max/$width;
	}else{
		$factor = $max/$height;
	}

	// calculate new size
	$newWidth = $factor * $width;
	$newHeight = $factor * $height;

	// create new resized image
	$result=imagecreatetruecolor($newWidth,$newHeight);
	imagecopyresampled($result,$src,0,0,0,0,$newWidth,$newHeight,$width,$height);

	// free space
	imagedestroy($src);

	return $result;
}

function getExtension($str) {

     $i = strrpos($str,".");
     if (!$i) { return ""; } 
     $l = strlen($str) - $i;
     $ext = substr($str,$i+1,$l);
     return $ext;
}

 	/**
 	IMGUR
 	**/


function sendToImgur($image){
	$client_id = "d86755ff44b7f13";

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_URL, 'https://api.imgur.com/3/image.json');
	curl_setopt($ch, CURLOPT_POST, TRUE);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
	curl_setopt($ch, CURLOPT_HTTPHEADER, array('Authorization: Client-ID ' . $client_id));
	curl_setopt($ch, CURLOPT_POSTFIELDS, array('image' => base64_encode($image)));

	$reply = curl_exec($ch);
	curl_close($ch);

	$reply = json_decode($reply);

	if($reply->success == false){
		return false;
	}else{
		return $reply->data->link;
	}
}

?>