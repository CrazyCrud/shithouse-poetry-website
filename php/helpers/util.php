<?php

foreach($_GET as $key=>$val){
	if(!mb_check_encoding($val,"UTF-8")){
		$val = utf8_encode($val);
	}
	$_GET[$key] = mysql_escape_string(htmlspecialchars($val));
}
foreach($_POST as $key=>$val){
	if(!mb_check_encoding($val,"UTF-8")){
		$val = utf8_encode($val);
	}
	$_GET[$key] = mysql_escape_string(htmlspecialchars($val));
}

function standarize_array($arr){
	$new_array = [];

	foreach($arr as $element){
		if(is_numeric(trim($element))){
			array_push($new_array, intval(trim($element)));
		}else{
			array_push($new_array, trim($element));
		}
	}

	return $new_array;
}

function str_lreplace($search, $replace, $subject)
{
    $pos = strrpos($subject, $search);

    if($pos !== false)
    {
        $subject = substr_replace($subject, $replace, $pos, strlen($search));
    }

    return $subject;
}

/*
returns the current page url
*/
function curPageURL() {
	$pageURL = 'http';
	if ($_SERVER["HTTPS"] == "on") {$pageURL .= "s";}
	$pageURL .= "://";
	if ($_SERVER["SERVER_PORT"] != "80") {
		$pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];
	} else {
		$pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
	}
	return $pageURL;
}


?>