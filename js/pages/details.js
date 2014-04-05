var $submitComment = $("#submit-comment");


/*
var hoverLoginMenu = document.getElementById("hoverLoginMenu");
var logoutlink = document.getElementById("logout-link");

logoutlink.onclick = userLogout;
*/
var expanded;
var comments = [];

var entry={};
$(function(){
	// $("#image").css('width', '34px');
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
	var $usericon = getUserIcon(comment.userstatus, comment.usertitle);
	var userName = getUserName({status:comment.userstatus,name:comment.username});
	var $author = $('<div class="author"><a href="user.php?id='+comment.userid+'">'+userName+'</a></div>');
	$author.prepend($usericon);
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
	com = formatCommentText(com);
	var $text = $('<div class="text">'+com+'</div>');
	$comment.append($text);
	$("#comments-content").prepend($comment);
}

function formatCommentText(comment){
	var users = comment.match(/[^0-9]@\-?[0-9]@[a-zA-Z0-9]+/gi);
	if(users){
		for(var i=users.length-1; i>=0; i--){
			users[i] = users[i].trim();
			var userid = users[i].substring(1).match(/\-?[0-9]/);
			var username = users[i].replace("@"+userid+"@", "").trim();
			if(userid == "-1"){
				comment = comment.replace(users[i],"@"+username);
			}else{
				comment = comment.replace(users[i],'<a href="user.php?id='+userid+'">@'+username+'</a>');
			}
		}
	}
	return comment;
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
	else if(user.status=="4"||user.status==4)disableForDummy();
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
	
	$submitComment.click(function(event) {
		if($(this).hasClass('disabled')){
			return;
		}
		ImgurManager.addComment(initComments,id,$("#comment-input").val());
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
						if(success)window.location = "index.php";
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
		$('<div>Bitte beschreibe hier, warum du diesen Eintrag melden m&ouml;chtest.<br/><br/><form name="report" style="width:100%"><textarea maxlength="400" cols="20" rows="8" id="description" style="height:auto;width:100%" placeholder="Bitte beschreibe hier, warum du diesen Eintrag melden m&ouml;chtest."></textarea></form></div>').dialog({
			modal: true,
			"min-width":"30%",
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
								show: true,
								close: refresh
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
	$submitComment.addClass('disabled');
	$("#comment-input").attr("title","Melde dich an um Kommentare zu schreiben.");
	$("#comment-input").attr("placeholder","Melde dich an um Kommentare zu schreiben.");	
}

function disableForDummy(){
	$(".thumbs").css("display","none");
	$("#comment-input").attr("disabled","disabled");
	$submitComment.addClass('disabled');
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
				window.location = "index.php";
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
		$t.attr("href", "search.php?type=type&values="+entry.typename);

		setTags(entry);

		//set sex
		var sex = entry.sex.toLowerCase();
		$(".sex").removeClass("active");
		$(".sex").attr("title", "");
		switch(sex){
			case "m":
				$(".sex.icon-male-1").addClass("active");
				$(".sex").prop("title", "Männertoilette");
				break;
			case "w":
				$(".sex.icon-female-1").addClass("active");
				$(".sex").prop("title", "Frauentoilette");
				break;
			default:
				$(".sex.icon-help").addClass("active");
				$(".sex").prop("title", "Unisex-Toilette");
		}

		//set upload info
		$("#upload-info #date").html(formatTime(entry.date));
		$("#upload-info #date").attr("title", entry.date);
		var $usericon = getUserIcon(entry.userstatus, entry.usertitle);
		var userName = getUserName({status:entry.userstatus,name:entry.username});
		$("#upload-info #author").html(userName);
		$("#upload-info #author").prepend($usericon);
		$("#upload-info #author").attr("href", "user.php?id="+entry.userid);

		//set report
		if(entry.reports != null && entry.reports > 0){
			var $number = $('<div id="number">'+entry.reports+'</div>');
			$("#report").prepend($number);
			$("#report").addClass("active");
			if(entry.reports == 1)
				$("#report").attr("title","Es liegt eine Meldung von dir zu diesem Eintrag vor");
			else
				$("#report").attr("title","Es liegen "+entry.reports+" Meldungen von dir zu diesem Eintrag vor");
		}else{
			$("#report #number").remove();
			$("#report").removeClass("active");
			$("#report").attr("title","");
		}

		setTranscription();

		setNav();
	}
}

function setNav(){
	var next = entry.next;
	var prev = entry.prev;
	$("#navpanel a").css("opacity",1);
	$("#navpanel a").attr("href","#");
	if(next.length==0)$("#navpanel #next").css("opacity",.25);
	else{
		$("#navpanel #next").attr("href","details.php?id="+next[0].id);
		$("#navpanel #next").attr("title",next[0].title);
	}
	if(prev.length==0)$("#navpanel #prev").css("opacity",.25);
	else{
		$("#navpanel #prev").attr("href","details.php?id="+prev[0].id);
		$("#navpanel #prev").attr("title",prev[0].title);
	}
}

function setTags(entry){
	//set tags
	var $tags = $("#tags");
	$tags.html("");
	for(var i=0; i<entry.tags.length; i++){
		var tag = entry.tags[i];
		var $tag = $('<span id="tag-'+tag.tagid+'" class="tag" title="Nach weiteren Eintr&auml;gen mit dem Tag \''+tag.tag+'\' suchen.">'+tag.tag+'</span>');
		$tag.attr("href", "search.php?type=tag&values="+escape(tag.tag));
		$tag.click(function(){
			window.location = $(this).attr("href");
		})
		$tags.append($tag);
	}
}

function setInfo(entry){
	//set artist
	$("#artist").html(entry.information[0].artist);

	//set location
	var loc = entry.information[0].location;
	if(loc.trim().length==0){
		$("#location").css("display","none");
	}else{
		$("#locationdescription").html(loc);
	}
	//$("locationdescription").attr("title", "Nach weiteren Eintr&auml;gen mit dem Ort \''+entry.information[0].location+'\' suchen.");
	//$("#locationdescription").attr("href", "search.php?type=location&values="+entry.information[0].location);
}

function setImage(entry){
	//set image
	var $image = $("#image");
	$("#image").css('opacity', '0');
	var $entryTitle = $("#entry-title");
	$image.attr("src", entry.images[0].largethumbnail);
	$image.attr("title", entry.title);

	Foundation.lib_methods.loaded($image, function(){
		$("#image").css('width', '100%');
		$("#image").css('opacity', '1');
	});	
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
		trans += '<button class="tiny">Transkription hinzuf&uuml;gen</button>';
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
	var $submitContainer = $('<div id="transcription-submit-container" class="columns"></div>');
	$input = $('<input id="input-transcription" class="columns" type="text"></input>');
	$input.val($("<p>"+entry.information[0]["transcription"]+"</p>").text());
	$ok = $('<button class="tiny small-3 medium-4 large-2 columns">OK</ok>');
	$help = $('<div id="howtotranscribe">'
		+'<a href="howto.php#transcription" target="_blank"><i class="icon-info"></i>Wie transkribiere ich richtig?</a>'
	+'</div>');
	$container.append($input);
	$submitContainer.append($ok);
	var $tou = false;
	if(!user.status || user.status == 4 || user.status == "4"){
		$tou = $('<label class="small-9 medium-8 large-10 columns" id="transcribe-tou-container"><input id="transcribe-tou" type="checkbox" required></input>Ich akzeptiere die <a href="tou.php" target="_blank">Nutzungsbedingungen</a>.</label>');
		$submitContainer.append($tou);
	}
	$container.append($submitContainer);
	$container.append($help);
	$("#transcription #content").html($container);

	$ok.click(function(){
		if($tou){
			if(!$("#transcribe-tou").prop("checked")){
				$tou.addClass("error");
				return;
			}
			$tou.removeClass("error");
		}
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
		message("Oops!", "Leider konnten wir keinen Account anlegen um Transkriptionen hinzuzuf&uuml;gen.<br/>Wende dich an einen Systemadministrator oder versuche es sp&auml;ter nochmal.");
	}else{
		ImgurManager.loginUser(onDummyLoginSuccess, data, user.password);
	}
}

function onDummyLoginSuccess(data){
	if(data==null){
		message("Oops!", "Leider konnten wir keinen Account einloggen um Transkriptionen hinzuzuf&uuml;gen.<br/>Wende dich an einen Systemadministrator oder versuche es sp&auml;ter nochmal.");
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
	var authkey = document.cookie.replace(/(?:(?:^|.*;\s*)authkey\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	var logoutURL = "php/backend/logout.php?authkey="+authkey;
	$.get(logoutURL, function(data){
		if(!data["success"]){
			alert("Es gibt Probleme bei der Kommunikation mit dem Server");
		}
		else
		{
			switch(data["success"]){
				case 1:
				document.cookie = "authkey= ; expires= Thu, 01 Jan 1970 00:00:00 GMT";
				window.location = "index.php";
					break;
				default: //console.log(data);					
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