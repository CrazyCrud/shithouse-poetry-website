<?php

/*

Example Data: 
{
	"data": {
		"id":"UMOhRe0",
		"title":null,
		"description":null,
		"datetime":1392734493,
		"type":"image\/jpeg",
		"animated":false,
		"width":100,
		"height":100,
		"size":4419,
		"views":0,
		"bandwidth":0,
		"favorite":false,
		"nsfw":null,
		"section":null,
		"deletehash":"xP4DarL6wL9vJkZ",
		"link":"http:\/\/i.imgur.com\/UMOhRe0.jpg"
	},
	"success":true,
	"status":200
}

{
    "data": {
        "id": "SbBGk",
        "title": null,
        "description": null,
        "datetime": 1341533193,
        "type": "image/jpeg",
        "animated": false,
        "width": 2559,
        "height": 1439,
        "size": 521916,
        "views": 1,
        "bandwidth": 521916,
        "deletehash": "eYZd3NNJHsbreD1"
        "section": null,
        "link": "http://i.imgur.com/SbBGk.jpg",
    },
    "success": true,
    "status": 200
}

*/

	$client_id = "d86755ff44b7f13";
	$image = file_get_contents("test.jpg");

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_URL, 'https://api.imgur.com/3/image.json');
	curl_setopt($ch, CURLOPT_POST, TRUE);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
	curl_setopt($ch, CURLOPT_HTTPHEADER, array('Authorization: Client-ID ' . $client_id));
	curl_setopt($ch, CURLOPT_POSTFIELDS, array('image' => base64_encode($image)));

	$reply = curl_exec($ch);
	curl_close($ch);

	echo($reply);

	$reply = json_decode($reply);
	printf('<img height="180" src="%s" >', $reply->data->link);
?>