var user = {};

var actions = [];

$(function(){
	loadTimeline();
	initGUI();
});

function initGUI(){
	$("#moreactions").click(function(){
		var count = actions.length;
		ImgurManager.getTimeline(fillUI, count);
	});
}

function loadTimeline(){
	ImgurManager.getTimeline(fillUI);
}

function fillUI(ac){
	if(!ac||ac.length == 0){
		$("#moreactions").css("display","none");
		return;
	}
	fillActions(ac);
	$(".action").remove();
	for(var i=0; i<actions.length; i++){
		addAction(actions[i]);
	}
}

function fillActions(ac){
	for(var i=0; i<ac.length; i++){
		var action = ac[i];
		var add = true;
		for(var j=0; j<actions.length; j++){
			if(actions[j].date == ac[i].date
				&&actions[j].transcription == ac[i].transcription
				&&actions[j].rating == ac[i].rating
				&&actions[j].comment == ac[i].comment
				&&actions[j].userid == ac[i].userid){
				add = false;
				break;
			}
		}
		if(add){
			console.log(action);
			action["username"] = getUserName(action["username"]);
			actions[actions.length]=action;
		}
	}
}

function addAction(action){
	if(action.path == null)addFollow(action);
	else if(action.comment != null)addComment(action);
	else if(action.rating != null)addRating(action);
	else if(action.transcription != null)addTranscription(action);
	else addUpload(action);
}

function addComment(comment){
	if(comment.userid == user.id)comment.username = "Du";
	if(comment.comment.trim().length == 0)return;
	var $container = $('<div class="action"></div>');
	var $img = $('<a href="details.php?id='+comment.entryid+'"><img src="'+comment.smallthumbnail+'" title="'+comment.title+'"></img></a>');
	var $user = $('<a href="user.php?id='+comment.userid+'">'+comment.username+"</a>");
	if(comment.comment.trim().length == 0)comment.comment = '<span class="missing">Kommentar gel&ouml;scht</span>';
	var commentText = formatCommentText(comment.comment);
	var $comment = $('<div class="comment">'+commentText+'</div>');
	var $left = $('<div class="leftcontainer container"></div>');
	var $right = $('<div class="rightcontainer container"></div>');
	var $info = $('<div class="info"><i class="icon-comment"/></div>');
	var $time = $('<div class="time">'+formatTime(comment.date)+'</div>');

	$info.append($user);
	if(comment.userid == user.id) $info.append(" hast ein Bild kommentiert:");
	else if(comment.comment.indexOf("@"+user.id+"@")!=-1){
		$info.append(" hat dich in einem Kommentar erwähnt:");
	}else 
		$info.append(" hat ein Bild von dir kommentiert:");
	$left.append($img);
	$right.append($info);
	$right.append($comment);

	var $content = $('<div class="content"></div>');
	$content.append($left);
	$content.append($right);
	
	$container.append($time);
	$container.append($content);

	$("#actions").append($container);
}

function addUpload(entry){
	if(entry.userid == user.id)entry.username = "Du";
	var $container = $('<div class="action entry gender-'+entry.sex.toLowerCase()+'"></div>');
	var $img = $('<a href="details.php?id='+entry.entryid+'"><img src="'+entry.smallthumbnail+'" title="'+entry.title+'"></img></a>');
	var $user = $('<a href="user.php?id='+entry.userid+'">'+entry.username+"</a>");
	if(entry.title.trim().length == 0)entry.title = '<span class="missing">Bild gel&ouml;scht</span>';
	var $title = $('<div class="comment">'+entry.title+'</div>');
	var $left = $('<div class="leftcontainer container"></div>');
	var $right = $('<div class="rightcontainer container"></div>');
	var $info = $('<div class="info"><i class="icon-upload"/></div>');
	var $time = $('<div class="time">'+formatTime(entry.date)+'</div>');

	switch(entry.sex.toLowerCase()){
		case "m":
			$icon = $('<i class="gender icon-male-1"></i>');
			$icon.prop("title", "Männertoilette");
		break;
		case "w":
			$icon = $('<i class="gender icon-female-1"></i>');
			$icon.prop("title", "Frauentoilette");
		break;
		default:
			$icon = $('<i class="gender icon-help"></i>');
			$icon.prop("title", "Unisex-Toilette");
	}

	$info.append($user);
	if(entry.userid == user.id) $info.append(" hast ein Bild hochgeladen:");
	else $info.append(" hat ein Bild hochgeladen:");
	$left.append($img);
	$right.append($info);
	$right.append($title);

	var $content = $('<div class="content"></div>');
	$content.append($left);
	$content.append($right);
	
	$container.append($time);
	$container.append($content);
	$container.append($icon);

	$("#actions").append($container);
}

function addFollow(entry){
	var $container = $('<div class="action follow"></div>');
	var $img = $('<a href="user.php?id='+entry.userid+'"><img src="img/user/follow.jpg" title="'+entry.username+'"></img></a>');
	var $user = $('<a href="user.php?id='+entry.userid+'">'+entry.username+"</a>");
	var icon = '<i class="icon-user-1"/>';
	var $title = $('<div class="comment"></div>');
	$title.append(icon);
	var $left = $('<div class="leftcontainer container"></div>');
	var $right = $('<div class="rightcontainer container"></div>');
	var $info = $('<div class="info"></div>');
	var $time = $('<div class="time">'+formatTime(entry.date)+'</div>');

	$info.append($user);
	if(entry.entryid == user.id) $title.append("... hat dich abonniert.");
	else $title.append("Du hast "+entry.username+" abonniert.");
	$left.append($img);
	$right.append($info);
	$right.append($title);

	var $content = $('<div class="content"></div>');
	$content.append($left);
	$content.append($right);
	
	$container.append($time);
	$container.append($content);

	$("#actions").append($container);
}

function addRating(entry){
	if(entry.userid == user.id)entry.username = "Du";
	var $container = $('<div class="action rating"></div>');
	var $img = $('<a href="details.php?id='+entry.entryid+'"><img src="'+entry.smallthumbnail+'" title="'+entry.title+'"></img></a>');
	var $user = $('<a href="user.php?id='+entry.userid+'">'+entry.username+"</a>");
	if(entry.title.trim().length == 0)entry.title = '<span class="missing">Bild gel&ouml;scht</span>';
	var icon = '<i class="icon-thumbs-up-1"/>';
	var sentiment = "positiv";
	if(entry.rating != 1){
		icon = '<i class="icon-thumbs-down-1"/>';
		sentiment = "negativ";
	}
	var $title = $('<div class="comment">'+icon+entry.title+'</div>');
	var $left = $('<div class="leftcontainer container"></div>');
	var $right = $('<div class="rightcontainer container"></div>');
	var $info = $('<div class="info"></div>');
	var $time = $('<div class="time">'+formatTime(entry.date)+'</div>');

	$info.append($user);
	if(entry.userid == user.id) $info.append(" hast ein Bild "+sentiment+" bewertet:");
	else $info.append(" hat ein Bild "+sentiment+" bewertet:");
	$left.append($img);
	$right.append($info);
	$right.append($title);

	var $content = $('<div class="content"></div>');
	$content.append($left);
	$content.append($right);
	
	$container.append($time);
	$container.append($content);

	$("#actions").append($container);
}

function addTranscription(entry){
	if(entry.userid == user.id)entry.username = "Du";
	var $container = $('<div class="action rating"></div>');
	var $img = $('<a href="details.php?id='+entry.entryid+'"><img src="'+entry.smallthumbnail+'" title="'+entry.title+'"></img></a>');
	var $user = $('<a href="user.php?id='+entry.userid+'">'+entry.username+"</a>");
	if(entry.transcription.length>100)entry.transcription = entry.transcription.substring(0,97)+"...";
	if(entry.transcription.trim().length == 0)entry.transcription = '<span class="missing">Transkription gel&ouml;scht</span>';
	var $title = $('<div class="comment">'+entry.transcription+'</div>');
	var $left = $('<div class="leftcontainer container"></div>');
	var $right = $('<div class="rightcontainer container"></div>');
	var $info = $('<div class="info"><i class="icon-feather"/></div>');
	var $time = $('<div class="time">'+formatTime(entry.date)+'</div>');

	$info.append($user);
	if(entry.userid == user.id) $info.append(" hast ein Bild transkribiert:");
	else $info.append(" hat ein Bild von dir transkribiert:");
	$left.append($img);
	$right.append($info);
	$right.append($title);

	var $content = $('<div class="content"></div>');
	$content.append($left);
	$content.append($right);
	
	$container.append($time);
	$container.append($content);

	$("#actions").append($container);
}