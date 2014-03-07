var thumbsupButton = document.getElementById("thumbs-up");
var thumbsdownButton = document.getElementById("thumbs-down");
var $outerRating = $("#outer-rating");
var hoverLoginMenu = document.getElementById("hoverLoginMenu");
var logoutlink = document.getElementById("logout-link");
var expanded;
thumbsupButton.onclick = showRating;
thumbsdownButton.onclick = showRating;
logoutlink.onclick = userLogout;

var entry={};
$(function(){
	ImgurManager.getEntry(fillUI, id);
})


function fillUI(e){
	entry = e;

	$innerRating = $("#inner-rating");

	//calculation of "green"-percentage of the rating
	var i = parseFloat(entry.ratings[0].rating);
	var j = (1+i)*50;
	var width = j + "%";
	$innerRating.css("width", width);

	//set image
	var $image = $("#image");
	var $entryTitle = $("#entry-title");
	$image.attr("src", entry.images[0].largethumbnail);
	$image.attr("title", entry.title);

	//set title
	document.getElementById("entry-title").innerHTML=entry.title;

	//set location

	//set tags
}




var getUserURL= "php/backend/getUser.php?"+document.cookie;
$.get(getUserURL, function(data){
		if(!data["success"]){
			alert("Es gibt Probleme bei der Kommunikation mit dem Server");
		}
		else
		{
			switch(data["success"]){
				case 1: menuHoverEffect();
					break;
				default: console.log(data);					
			}
		}

	});

function menuHoverEffect(){

$("#link-login").hover(
	function() 
	{	
		hoverLoginMenu.style.display = "block";
		$("#hoverLoginMenu").hover(function() 
			{	
				hoverLoginMenu.style.display = "block";
			},
			function()
			{
				hoverLoginMenu.style.display = "none";
			});
	}, 
	function()
	{	
		hoverLoginMenu.style.display = "none";
	}
);
}


function userLogout(){
	console.log("userLogout");
	var logoutURL = "php/backend/logout.php?"+document.cookie;
	$.get(logoutURL, function(data){
	console.log(data);
		if(!data["success"]){
			alert("Es gibt Probleme bei der Kommunikation mit dem Server");
		}
		else
		{
			switch(data["success"]){
				case 1: //delete cookies, call index.html 
				document.cookie = "authkey= ; expires= Thu, 01 Jan 1970 00:00:00 GMT";
				window.location = "index.html";
					break;
				default: console.log(data);					
			}
		}

	});

}


function showRating(){
	if(!expanded){
		$outerRating.animate({width: "100"}, 500);
		expanded=true;
	}
}



