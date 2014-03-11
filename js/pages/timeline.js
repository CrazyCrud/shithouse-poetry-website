var user = {};

$(function(){
	loadTimeline();
});

function loadTimeline(){
	ImgurManager.getTimeline(fillUI);
}

function fillUI(comments){
	if(!comments){
		console.log("Error getting timeline");
		return;
	}
	$(".action").remove();
	for(var i=0; i<comments.length; i++){
		addAction(comments[i]);
	}
}

function addAction(comment){
	if(comment.comment.trim().length == 0)return;
	var $container = $('<div class="action"></div>');
	var $img = $('<a href="details.php?id='+comment.entryid+'"><img src="'+comment.smallthumbnail+'" title="'+comment.title+'"></img></a>');
	var $user = $('<a href="user.php?id='+comment.userid+'">'+comment.username+"</a>");
	if(comment.comment.trim().length == 0)comment.comment = '<span class="missing">Kommentar gel&ouml;scht</span>';
	var $comment = $('<div class="comment">'+comment.comment+'</div>');
	var $left = $('<div class="leftcontainer container"></div>');
	var $right = $('<div class="rightcontainer container"></div>');
	var $info = $('<div class="info"></div>');
	var $time = $('<div class="time">'+formatTime(comment.date)+'</div>');

	$info.append($user);
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