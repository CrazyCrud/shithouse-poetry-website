<?php
$type = 'image/jpeg';
header('Content-Type:'.$type);
error_reporting(0);
include_once("../helpers/dbhelper.php");

if(isset($_GET["text"])){
	$size = 1;
	if(isset($_GET["size"])){
		switch($_GET["size"]){
			case "l": $size=1;break;
			case "m": $size=.6;break;
			case "s": $size=.3;break;
		}
	}
	printOnWall($_GET["text"], $size);
	exit();
}

if(isset($_GET["id"])){
	$entryid = $_GET["id"];
	printPreview($entryid);
}else{
	printIcon();
}

function printPreview($id){
	$db = new DBHelper();
	$text = $db->getEntryText($id);
	if(!isset($text)
		||$text == FALSE){
		printIcon();
	}else{
		$size = 1;
		if(isset($_GET["size"])){
			switch($_GET["size"]){
				case "l": $size=1;break;
				case "m": $size=.6;break;
				case "s": $size=.3;break;
			}
		}
		printOnWall($text, $size);
	}
}

function printOnWall($text, $size){
	$charsPerLine = 48;
	if(strlen($text)<100){
		$charsPerLine = 25;
	}
	$url = "../../img/dummy/wall.jpg";

	$text = html_entity_decode($text);
	$text = iconv("utf-8","ascii//TRANSLIT",$text);
	$text = wordwrap($text, $charsPerLine, "\n", true);
	$img = writeOnImage($url, $text, $size);

	$lineheight = 36*$size;
	$charWidth = 16*$size;
	$lines = preg_match_all('/\n/s', $text);
	$height = $lines * $lineheight;
	$dst_height = $height + 2*126*$size;
	$dst_width = $charWidth*$charsPerLine + 2*128*$size;
	if($dst_width > 1024*$size){
		$dst_width = 1024*$size;
	}

	$x = 0;

	if($size < .5){
		$dst_width = 90;
		$dst_height = 90;
		$x = 45;
	}

	$dest = imagecreatetruecolor($dst_width, $dst_height);
	imagecopyresized($dest, $img, 0, 0, $x, 0, $dst_width, $dst_height, $dst_width, $dst_height);

	$icon = imagecreatefrompng("../../img/dummy/none.png");
	imagecopy($dest, $icon, 10, 10, 0, 0, 196, 32);

	imagejpeg($dest);
  	imagedestroy($dest);
}

function printIcon(){
	$file = "../../img/dummy/none.jpg";
	readfile($file);
}

function writeOnImage($url, $txt, $size){
  // Create Image From Existing File
  $jpg_image = imagecreatefromjpeg($url);

  // Allocate A Color For The Text
  $color = imagecolorallocate($jpg_image, 0, 0, 0);

  // Set Path to Font File
  $font_path = '../../img/dummy/font.ttf';

  // Set Text to Be Printed On Image
  $text = $txt;

  // Print Text On Image
  imagettftext($jpg_image, 25*$size, 0, 128*$size, 128*$size, $color, $font_path, $text);

  return $jpg_image;
}

?>