<?php

function standarize_array($arr){
	$new_array = [];

	foreach($arr as $element){
		if(is_numeric($element)){
			array_push($new_array, intval($element));
		}else{
			array_push($new_array, $element);
		}
	}

	return $new_array;
}


?>