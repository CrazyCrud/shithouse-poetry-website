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
	ImgurManager.getEntriesForUser(fillImages,id);
}

function fillImages(data){
	if(!data||data.length==0)return;
	var entry = data[0];
	$("#image").attr("src",entry.images[0].thumbnail);
	$("#lastlink").attr("href","details.php?id="+entry.id);

}