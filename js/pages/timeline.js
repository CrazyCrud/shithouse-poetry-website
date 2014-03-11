var user = {};

var actions = [];

$(function(){
	loadTimeline();
	initGUI();
});

function initGUI(){
	$("#moreactions").click(function(){
		var count = actions.length;
		console.log("loading action #"+count);
		ImgurManager.getTimeline(fillUI, count);
	});
}

function loadTimeline(){
	ImgurManager.getTimeline(fillUI);
}

function fillUI(ac){
	if(!ac||ac.length == 0){
		console.log("Error getting timeline");
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
			if(actions[j].date == ac[i].date){
				add = false;
				break;
			}
		}
		if(add){
			actions[actions.length]=action;
		}
	}
}

function addAction(comment){
	if(comment.comment != null)addComment(comment);
	else addUpload(comment);
}

function addComment(comment){
	if(comment.userid == user.id)comment.username = "Du";
	if(comment.comment.trim().length == 0)return;
	var $container = $('<div class="action"></div>');
	var $img = $('<a href="details.php?id='+comment.entryid+'"><img src="'+comment.smallthumbnail+'" title="'+comment.title+'"></img></a>');
	var $user = $('<a href="user.php?id='+comment.userid+'">'+comment.username+"</a>");
	if(comment.comment.trim().length == 0)comment.comment = '<span class="missing">Kommentar gel&ouml;scht</span>';
	var $comment = $('<div class="comment">'+comment.comment+'</div>');
	var $left = $('<div class="leftcontainer container"></div>');
	var $right = $('<div class="rightcontainer container"></div>');
	var $info = $('<div class="info"><i class="icon-comment"/></div>');
	var $time = $('<div class="time">'+formatTime(comment.date)+'</div>');

	$info.append($user);
	if(comment.userid == user.id) $info.append(" hast ein Bild kommentiert:");
	else $info.append(" hat ein Bild von dir kommentiert:");
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

	$("#actions").append($container);
}