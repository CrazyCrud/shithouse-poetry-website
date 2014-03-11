
/*
var hoverLoginMenu = document.getElementById("hoverLoginMenu");
var logoutlink = document.getElementById("logout-link");

logoutlink.onclick = userLogout;
*/
var expanded;
var comments = [];

var entry={};
$(function(){
	cookieUser();
	refresh();
	showRating();
	initGUI();
	initComments();
});

function initComments(success){
	if(success){
		$("#comment-input").val("");
	}
	ImgurManager.getComments(showComments, id);
}

function showComments(c){
	if(!c || c.length == 0){
		$("#morecomments").css("display","none");
		return;
	}
	$(".comment").remove();
	addComments(c);
	comments.sort(function(a,b){
		return a.time.localeCompare(b.time);
	});
	for(var i=0; i<comments.length; i++){
		buildComment(comments[i]);
	}
}

function buildComment(comment){
	var $comment = $('<div comment-id="'+comment.commentid+'" class="comment"></div>');
	var $author = $('<div class="author"><a href="user.php?id='+comment.userid+'">'+comment.username+'</a></div>');
	var $date = $('<div class="date">'+comment.time+'</div>');
	if(user.admin || user.id == comment.userid){
		var $del = $('<i title="Kommentar l&ouml;schen" class="deletecomment icon-cancel"></i>');
		$date.append($del);
	}
	
	var com = comment.comment.trim();
	if(com.length==0){
		com = '<span class="missing">Kommentar gel&ouml;scht.</span>';
	}else{
		$comment.append($date);
		$comment.append($author);
	}
	var $text = $('<div class="text">'+com+'</div>');
	$comment.append($text);
	$("#comments-content").prepend($comment);
}

function addComments(c){
	for(var i=0; i<c.length; i++){
		var comment = c[i];
		var add = true;
		for(var j=0; j<comments.length; j++){
			if(comments[j].commentid == comment.commentid){
				add = false;
				break;
			}
		}
		if(add){
			comments[comments.length] = comment;
		}
	}
}

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
	$("#comment-input").keyup(function(e){
		if ( e.which == 13 ) {
			ImgurManager.addComment(initComments,id,$(this).val());
		}
	});
	$("#morecomments").click(function(){
		var lastComment = $(".comment").last().attr("comment-id");
		ImgurManager.getComments(showComments, id, lastComment);
	});
	$(document).on("click",".deletecomment",function(){
		var commentid = $($(this).closest(".comment")).attr("comment-id");
		ImgurManager.deleteComment(onCommentDeleted,commentid);
	});
	$("#deleteentry").click(function(){
		$('<div>Diesen Eintrag wirklich l&ouml;schen?</div>').dialog({
			modal: true,
			width: "auto",
			title: "Löschen?",
			buttons:{
				"OK":function(){
					ImgurManager.deleteEntry(id, function(success){
						if(success)window.location = "index.html";
					});
					$(this).dialog("close");
				},
				"Abbrechen":function(){
					$(this).dialog("close");
				}
			}
		});
	});
	$("#editentry").click(function(){
		window.location = "upload.php?id="+id;
	});
}

function onCommentDeleted(success, commentid){
	if(success){
		for(var i=0; i<comments.length; i++){
			if(comments[i].commentid==commentid){
				comments[i].comment = "";
				break;
			}
		}
		showComments(comments);
	}
}

function refresh(){
	ImgurManager.getEntry(fillUI, id);
}


function fillUI(e){
	entry = e;
	document.title = e.title;
	if(e.userid == user.id || user.admin){
		$("#controlpanel").css("display","block");
	}
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
			$("#sex").addClass("icon-help");
	}

	//set upload info
	$("#upload-info #date").html(formatTime(entry.date));
	$("#upload-info #date").attr("title", entry.date);
	$("#upload-info #author").html(entry.username);
	$("#upload-info #author").attr("href", "user.php?id="+entry.userid);

	//set transcription
	var trans = entry.information[0].transcription.trim();
	if(trans.length==0){
		trans = '<p class="missing">keine Transkription angegeben</p>';
	}
	$("#transcription #content").html(trans);
}

function userLogout(){
	console.log("userLogout");
	var authkey = document.cookie.replace(/(?:(?:^|.*;\s*)authkey\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	var logoutURL = "php/backend/logout.php?authkey="+authkey;
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
		expanded = true;
	}
}



