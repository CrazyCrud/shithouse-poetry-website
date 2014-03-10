
var hoverLoginMenu = document.getElementById("hoverLoginMenu");
var logoutlink = document.getElementById("logout-link");
var expanded;
logoutlink.onclick = userLogout;

var entry={};
$(function(){
	refresh();
	showRating();
	initGUI();
});

function initGUI(){
	$("#thumbsdown").click(function(){
		if($(this).hasClass("mine")){
			ImgurManager.addRating(refresh, entry.id, 0);
		}else{
			ImgurManager.addRating(refresh, entry.id, -1);
		}
	});
	$("#thumbsup").click(function(){
		if($(this).hasClass("mine")){
			ImgurManager.addRating(refresh, entry.id, 0);
		}else{
			ImgurManager.addRating(refresh, entry.id, 1);
		}
	});
}

function refresh(){
	ImgurManager.getEntry(fillUI, id);
}


function fillUI(e){
	entry = e;

	console.log(e);

	//set rating
	$innerRating = $("#inner-rating");
	//calculation of "green"-percentage of the rating
	var r = entry.ratings[0].rating;
	if(!r)r=0;
	var i = parseFloat(r);
	var j = (1+i)*50;
	var width = j + "%";
	$innerRating.css("width", width);
	$("#ratingcount").html(entry.ratings[0].ratingcount);

	if(entry.ratings[0].ratedbyme){
		$(".thumbs").removeClass("mine");
		if(entry.ratings[0].ratedbyme==-1){
			$("#thumbsdown").addClass("mine");
		}else if(entry.ratings[0].ratedbyme==1){
			$("#thumbsup").addClass("mine");
		}
	}

	//set image
	var $image = $("#image");
	var $entryTitle = $("#entry-title");
	$image.attr("src", entry.images[0].largethumbnail);
	$image.attr("title", entry.title);

	//set title
	document.getElementById("title").innerHTML=entry.title;

	//set artist
	$("#artist").html(entry.information[0].artist);

	//set location
	$("#locationdescription").html(entry.information[0].location);

	//set tags
	var $tags = $("#tags");
	$tags.html("");
	for(var i=0; i<entry.tags.length; i++){
		var tag = entry.tags[i];
		var $tag = $('<span id="tag-'+tag.tagid+'" class="tag">'+tag.tag+'</span>');
		$tags.append($tag);
	}

	//set sex
	var sex = entry.sex.toLowerCase();
	switch(sex){
		case "m":
			$("#sex").addClass("icon-male");
			break;
		case "w":
			$("#sex").addClass("icon-female");
			break;
		default:
			$("#sex").addClass("icon-female");
	}

	//set upload info
	$("#upload-info #date").html(entry.date);
	$("#upload-info #author").html(entry.username);
	$("#upload-info #author").attr("href", "user.php?id="+entry.userid);

	//set transcription
	var trans = entry.information[0].transcription.trim();
	if(trans.length==0){
		trans = '<p class="missing">keine Transkription angegeben</p>';
	}
	$("#transcription #content").html(trans);
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
		$("#outer-rating").animate({width: "100"}, 500);
		expanded=true;
	}
}



