
/*
var hoverLoginMenu = document.getElementById("hoverLoginMenu");
var logoutlink = document.getElementById("logout-link");

logoutlink.onclick = userLogout;
*/
var expanded;
var comments = [];

var entry={};
$(function(){
	$("#image").css('width', '34px');
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
	var $date = $('<div class="date">'+formatTime(comment.time)+'</div>');
	$date.attr("title",comment.time);
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
	if(!loggedIn())disable();
	else if(user.status=="4")disableForDummy();
	$("#transcription #content").click(changeTranscription);
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
	$("#report-icon").click(function(){
		$('<form name="report"><textarea maxlength="400" cols="20" rows="8" id="description" style="height:auto;width:auto" placeholder="Bitte beschreibe hier, warum du diesen Eintrag melden m&ouml;chtest."></textarea></form>').dialog({
			modal: true,
			width: "auto",
			autoResize: true,
			title: "Eintrag melden?",
			buttons:{
				"OK":function(){
					var desc =  $('#description').val();
					ImgurManager.addReport(function(success){
							$dialog = "";
						if(success){
							$dialog = $('<div>Die Meldung wurde erfolgreich gesendet.</div>');
							$dialog.dialog({
								modal: false,
								width: "auto",
								title: "Vielen Dank für deine Meldung",
								show: true
							});
						}else{
							$dialog = $('<div><br>Deine Meldung wurde nicht erfolgreich eingetragen.<br>&Uuml;berpr&uuml;fe bitte, dass diese mindestens 10 Zeichen lang ist.</div>');
							$dialog.dialog({
								modal: false,
								width: "auto",
								title: "Leider gab es Probleme mit deiner Meldung",
								show: true
							});
						}

						$(this).mouseup(function (e)
						{
							if($dialog.hasClass('ui-dialog-content')){
							    if (!$dialog.is(e.target) && $dialog.has(e.target).length === 0) {
							        $dialog.dialog('close');
									$dialog.dialog("destroy");
							    }
							}   
						});
	
					}, id, desc, -1);
					$(this).dialog("close");
					$(this).dialog("destroy");
				},
				"Abbrechen":function(){
					$(this).dialog("close");
					$(this).dialog("destroy");
				}
			}
		});
	});
}

function disable(){
	$(".thumbs").css("display","none");
	$("#report").css("display","none");
	//$("#rating").attr("title","Melde dich an um diesen Eintrag zu bewerten.");
	$("#comment-input").attr("disabled","disabled");
	$("#comment-input").attr("title","Melde dich an um Kommentare zu schreiben.");
	$("#comment-input").attr("placeholder","Melde dich an um Kommentare zu schreiben.");	
}

function disableForDummy(){
	$(".thumbs").css("display","none");
	$("#comment-input").attr("disabled","disabled");
	$("#comment-input").attr("title","Melde dich an um Kommentare zu schreiben.");
	$("#comment-input").attr("placeholder","Melde dich an um Kommentare zu schreiben.");	
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
	if(e == "Error"){
		$dialog = $('<div>Der Eintrag wurde leider gel&ouml;scht.</div>');
		$dialog.dialog({
			modal: true,
			width: "auto",
			title: "Eintrag nicht vorhanden",
			close: function(){
				window.location = "index.html";
			}
		});
	}else{
		entry = e;
		document.title = e.title;
		if(e.userid == user.id || user.admin){
			$("#controlpanel").css("display","block");
		}
		
		setRating(entry);

		setImage(entry);

		//set title
		document.getElementById("title").innerHTML=entry.title;

		setInfo(entry);

		//set type
		var $t = $("#typedescription");
		$t.html(entry.typename);
		$t.attr("title",entry.typedescription);

		setTags(entry);

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

		setTranscription();
	}
}

function setTags(entry){
	//set tags
	var $tags = $("#tags");
	$tags.html("");
	for(var i=0; i<entry.tags.length; i++){
		var tag = entry.tags[i];
		var $tag = $('<span id="tag-'+tag.tagid+'" class="tag" title="Filter nach '+tag.tag'">'+tag.tag+'</span>');
		$tag.attr("href", "search.php?type=tag&values="+tag.tag);
		$tags.append($tag);
	}
}

function setInfo(entry){
	//set artist
	$("#artist").html(entry.information[0].artist);

	//set location
	$("#locationdescription").html(entry.information[0].location);
}

function setImage(entry){
	//set image
	var $image = $("#image");
	$("#image").css('width', '100%');
	var $entryTitle = $("#entry-title");
	$image.attr("src", entry.images[0].largethumbnail);
	$image.attr("title", entry.title);
}

function setRating(entry){
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

	$(".thumbs").removeClass("mine");
	if(entry.ratings[0].ratedbyme){
		if(entry.ratings[0].ratedbyme==-1){
			$("#thumbsdown").addClass("mine");
		}else if(entry.ratings[0].ratedbyme==1){
			$("#thumbsup").addClass("mine");
		}
	}

	var user = entry.ratings[0].ratingcount+" Nutzern";
	if(entry.ratings[0].ratingcount==1)user = "einem Nutzer";

	var title = "Dieser Beitrag wurde von "+user+" zu "+Math.floor(j)+"% positiv bewertet.";
	if(entry.ratings[0].ratingcount==0)title="Dieser Beitrag wurde noch nicht bewertet.";
	$("#rating").attr("title",title);
}

function setTranscription(){
	//set transcription
	var trans = entry.information[0].transcription.trim();
	if(trans.length==0){
		trans = '<p class="missing">keine Transkription angegeben</p>';
		if(canTranscribe()){
			trans += '<button class="tiny">Transkription hinzuf&uuml;gen</button>';
		}else{
			trans += "(Melde dich an um selbst eine Transkription hinzuzuf&uuml;gen.)"
		}
	}else{
		if(canTranscribe()){
			$("#transcription #content").attr("title","zum Bearbeiten klicken");
		}else{
			$("#transcription #content").attr("title","");
		}
	}
	$("#transcription #content").html(trans);
}

function canTranscribe(){
	if($("#edittranscription").length != 0)return false;
	var permission = false;
	if(user.admin!==false)permission = true;
	if(user.id == entry.userid)permission = true;
	if(user.id == entry.information[0].userid)permission = true;
	if(entry.information[0]["transcription"].length == 0)permission = true;
	return permission;
}

function changeTranscription(){
	if(!canTranscribe())return;

	var $container = $('<div id="edittranscription"></div>');
	$input = $('<input id="input-transcription" type="text"></input>');
	$input.val(entry.information[0]["transcription"]);
	$ok = $('<button class="tiny">OK</ok>');
	$container.append($input);
	$container.append($ok);
	$("#transcription #content").html($container);

	$ok.click(function(){
		updateTranscription($input.val());
	});
}

function updateTranscription(newTrans){
	if(!loggedIn())
		createDummy();
	else{
		ImgurManager.updateTranscription(onTranscriptionUpdated, entry["id"], newTrans);
	}
}

function createDummy(){
	message("Speichern", "Wir legen f&uuml;r dich einen Account an damit du deine Transkriptionen sp&auml;ter bearbeiten kannst.<br/>Bitte habe etwas Gedult.");
	user = {};
	user.password = guid();
	ImgurManager.createUser(onDummyCreated, "", user.password, "");
}

function onDummyCreated(data){
	if(data==null){
		message("Oops!", "Leider konnte wir keinen Account anlegen um Transkriptionen hinzuzuf&uuml;gen.<br/>Wende dich an einen Systemadministrator oder versuche es sp&auml;ter nochmal.");
	}else{
		ImgurManager.loginUser(onDummyLoginSuccess, data, user.password);
	}
}

function onDummyLoginSuccess(data){
	if(data==null){
		message("Oops!", "Leider konnte wir keinen Account einloggen um Transkriptionen hinzuzuf&uuml;gen.<br/>Wende dich an einen Systemadministrator oder versuche es sp&auml;ter nochmal.");
	}else{
		ImgurManager.getUserAuth(onGetUser, data);
	}
}

function onGetUser(data){
	saveUser(data);
	var newTrans = $("#input-transcription").val();
	ImgurManager.updateTranscription(onTranscriptionUpdated, entry["id"], newTrans);
}

function onTranscriptionUpdated(success){
	if(success!=null){
		entry.information[0]["transcription"] = $("#input-transcription").val();
		entry.information[0]["userid"] = user.id;
		entry.information[0]["username"] = user.username;
	}
	cookieUser();
	setTranscription();
	$(".error-dialog").dialog("close");
	$(".error-dialog").remove();
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

function message(title, message){
	$(".error-dialog").dialog("close");
	$(".error-dialog").remove();
	var $dialog = $('<div class="error-dialog">'+message+"</div>");
	$dialog.dialog({
		modal: true,
		width: "80%",
		title: title
	});
}