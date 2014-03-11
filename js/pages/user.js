var user = {};

$(function(){
	if(id>0){
		loadUser(id);
	}
});

function loadUser(id){
	ImgurManager.getUser(fillUI, id);
}

function fillUI(u){
	if(!u){
		console.log("Error getting user");
		return;
	}else{
		user = u;
	}
	$("#username").html(user.username);
	$("#membersince").html(formatTime(user.joindate));
	$("#lastseen").html(formatTime(user.lastaction));
	$("#lastseen").attr("title",user.lastaction);
}