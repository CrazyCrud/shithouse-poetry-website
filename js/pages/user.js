var queriedUser = {};
var following = false;
var NO_RESULTS = "Der Nutzer hat noch keine Bilder hochgeladen!";
var NO_MORE_RESULTS = "Dieser Nutzer hat nicht mehr Bilder hochgeladen!";
var NO_MORE_RESULTS_USER = "Du hast keine weiteren Bilder hochgeladen!";
var NO_RESULTS_USER = "Du hast noch keine Bilder hochgeladen!";

$(function(){
	if(id>0){
		loadUser(id);
		setupImageClick();
		if(user.id){
			$("#follow-button a").click(onFollowClicked);
		}
	}
});

function loadUser(id){
	ImgurManager.getUser(fillUI, id);
}

$(document).on("complete", function(){
	setupOnce();
	$.waypoints('refresh');
});

function setupImageClick(){
	$(document).on("click", ".jg-image",function(){
		var id = $($(this).find("a")[0]).attr("title");
		window.location = "details.php?id=" + id;
	});
}

function setupInfiniteScroll(){
	$("html").waypoint(function(direction) {
		if(direction == "down"){
			if($.waypoints('viewportHeight') < $(this).height()){
				ImgurManager.getEntriesForUser(fillImages, id, GalleryView.getLastEntry());
			}		
		}
	}, { offset: 'bottom-in-view'
	});
}

var setupOnce = _.once(setupInfiniteScroll);

function fillUI(u){
	if(!u){
		$("#username").html("Dieser Nutzer existiert nicht.");
		return;
	}else{
		queriedUser = u;
	}
	var usericon = getUserIcon(queriedUser.status);
	var userName = getUserName(queriedUser);
	$("#username").html(usericon+userName);
	$("#membersince").html(formatTime(queriedUser.joindate));
	$("#lastseen").html(formatTime(queriedUser.lastaction));
	$("#lastseen").attr("title",queriedUser.lastaction);	
	if(u.stats){
		$("#stats #entries .amount").html(u.stats.entries);
		$("#stats #comments .amount").html(u.stats.comments);
		$("#stats #ratings .amount").html(u.stats.ratings);
		$("#stats #transcriptions .amount").html(u.stats.transcriptions);
		drawAchievements(u.stats);
		var today = new Date();
		var timeObj = convertDateTime(queriedUser.joindate);
		var timestamp = timeObj.getTime();
		var difference = today-timestamp;
		var lvl = computeLevel(u.stats.entries, u.stats.comments, u.stats.ratings, u.stats.transcriptions, difference);
		$("#level").html("(Level "+lvl+")");
	}
	if(u.follows){
		drawFollows(u.follows);
	}
	ImgurManager.getEntriesForUser(fillImages, id);
}

function fillImages(searchData){
	if(!searchData||searchData.length==0){
		if($('.jg-row').length > 0){
			if(queriedUser.username == document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1")){
				resultsError(NO_MORE_RESULTS_USER);
			}else{
				resultsError(NO_MORE_RESULTS);
			}
		}else{
			if(queriedUser.username == document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1")){
				resultsError(NO_RESULTS_USER);
			}else{
				resultsError(NO_RESULTS);
			}
		}
	}else{
		GalleryView.init($("#images"));
		showResults(searchData);
	}
}

function drawFollows(follows){
	console.log(follows);
	if(!user.id)return;
	if(queriedUser.id==user.id){
		drawMyFollows(follows);
	}else{
		checkWhetherFollowingMe(follows);
		checkWhetherImFollowing(follows);
	}
}

function drawMyFollows(follows){
	var $container = $("#follows-container");
	$container.html("");
	for(i in follows){
		if(parseInt(follows[i].targetid)!=user.id){
			var $user = $('<div class="following-user"><a href="user.php?id='+follows[i].targetid+'"><i class="icon-user-1"></i>'+follows[i].targetname+'</a></div>');
			$container.append($user);
		}
	}
	if($("#follows-container a").length>0){
		$(".myfollows").css("display","block");
	}
}

function checkWhetherFollowingMe(follows){
	var followsMe = false;
	for(i in follows){
		if(parseInt(follows[i].targetid) == user.id){
			followsMe = true;
			break;
		}
	}
	if(followsMe){
		$("#follows").css("display","block");
		$("#follows #follows-title").css("display","block");
		$("#follows #follows-title").html("+<i class='icon-user-1'></i>Dieser Nutzer hat dich abonniert ;)");
	}
}

function checkWhetherImFollowing(follows){
	$("#follow-button").css("display","block");
	var imFollowing = false;
	for(i in follows){
		if(parseInt(follows[i].followerid) == user.id){
			imFollowing = true;
			break;
		}
	}
	following = imFollowing;
	if(imFollowing){
		$("#follow-button").attr("title","Du hast diesen Nutzer abonniert");
		$("#follow-button a").html("-<i class='icon-user-1'></i>Diesen Nutzer nicht mehr abonnieren");
	}else{
		$("#follow-button").attr("title","Uploads dieses Nutzers in meiner Timeline anzeigen");
		$("#follow-button a").html('+<i class="icon-user-1"></i>Abonnieren');
	}
}

function onFollowClicked(){
	ImgurManager.followUser(onFollowChanged, queriedUser.id, !following);
}

function onFollowChanged(status){
	if(status==null)return;
	var follows = [];
	if(status){
		follows[0] = {
			followerid: "1",
			targetid: queriedUser.id
		};
	}
	drawFollows(follows);
}

function resultsError(msg){
	var content = "<div class='error-message secondary label'>" + msg + "</div>";
	if($(".error-message").length < 1){
		$("#images").append(content);
	}
}

function showResults(searchData){
	GalleryView.appendEntries(searchData);
	GalleryView.loadAllImages();
}

function drawAchievements(stats){
	drawEntryAchievements(stats.entries);
	drawCommentAchievements(stats.comments);
	drawRatingAchievements(stats.ratings);
	drawTranscriptionAchievements(stats.transcriptions);
	if($(".achievement").length == 0){
		var $none = $('<div class="missing">Dieser Nutzer hat noch keine Erfolge.</div>');
		$("#achievements").append($none);
	}
}

function computeLevel(entries, comments, ratings, transcriptions, ageInMillis){
	var ageInDays = ageInMillis/1000 /60 /60 /24;
	var level = 1;

	var entryMulti = .05;
	var commentMulti = .01;
	var ratingMulti = .02;
	var ageMulti = .01;
	var transMulti = .05;

	var extralevel = entries*entryMulti;
	extralevel += comments*commentMulti;
	extralevel += ratings*ratingMulti;
	extralevel += ageInDays*ageMulti;
	extralevel += transcriptions*transMulti;

	level = Math.floor(level+extralevel);
	return level;
}

var entryAchievements = [
	{ level: 1, limit:1, text:"Mindestens ein Bild hochgeladen" },
	{ level: 2, limit:10, text:"Mindestens 10 Bilder hochgeladen" },
	{ level: 3, limit:50, text:"Mindestens 50 Bilder hochgeladen" },
	{ level: 4, limit:100, text:"Mindestens 100 Bilder hochgeladen" },
	{ level: 5, limit:200, text:"Mindestens 200 Bilder hochgeladen" },
	{ level: 6, limit:500, text:"Mindestens 500 Bilder hochgeladen" },
	{ level: 7, limit:750, text:"Mindestens 750 Bilder hochgeladen" },
	{ level: 8, limit:1000, text:"Mindestens 1000 Bilder hochgeladen" },
	{ level: 9, limit:1337, text:"Mindestens 1337 Bilder hochgeladen" },
	{ level: 10, limit:2000, text:"Mindestens 2000 Bilder hochgeladen" },
	{ level: 11, limit:5000, text:"Mindestens 5000 Bilder hochgeladen" },
	{ level: 12, limit:7500, text:"Mindestens 7500 Bilder hochgeladen" },
	{ level: 13, limit:9001, text:"Mindestens 9001 Bilder hochgeladen" }
];
var commentAchievements = [
	{ level: 1, limit:1, text:"Mindestens einen Kommentar abgegeben" },
	{ level: 2, limit:10, text:"Mindestens 10 Kommentare abgegeben" },
	{ level: 3, limit:50, text:"Mindestens 50 Kommentare abgegeben" },
	{ level: 4, limit:100, text:"Mindestens 100 Kommentare abgegeben" },
	{ level: 5, limit:200, text:"Mindestens 200 Kommentare abgegeben" },
	{ level: 6, limit:500, text:"Mindestens 500 Kommentare abgegeben" },
	{ level: 7, limit:750, text:"Mindestens 750 Kommentare abgegeben" },
	{ level: 8, limit:1000, text:"Mindestens 1000 Kommentare abgegeben" },
	{ level: 9, limit:1337, text:"Mindestens 1337 Kommentare abgegeben" },
	{ level: 10, limit:2000, text:"Mindestens 2000 Kommentare abgegeben" },
	{ level: 11, limit:5000, text:"Mindestens 5000 Kommentare abgegeben" },
	{ level: 12, limit:7500, text:"Mindestens 7500 Kommentare abgegeben" },
	{ level: 13, limit:9001, text:"Mindestens 9001 Kommentare abgegeben" }
];
var ratingAchievements = [
	{ level: 1, limit:1, text:"Mindestens ein Bild bewertet" },
	{ level: 2, limit:10, text:"Mindestens 10 Bilder bewertet" },
	{ level: 3, limit:50, text:"Mindestens 50 Bilder bewertet" },
	{ level: 4, limit:100, text:"Mindestens 100 Bilder bewertet" },
	{ level: 5, limit:200, text:"Mindestens 200 Bilder bewertet" },
	{ level: 6, limit:500, text:"Mindestens 500 Bilder bewertet" },
	{ level: 7, limit:750, text:"Mindestens 750 Bilder bewertet" },
	{ level: 8, limit:1000, text:"Mindestens 1000 Bilder bewertet" },
	{ level: 9, limit:1337, text:"Mindestens 1337 Bilder bewertet" },
	{ level: 10, limit:2000, text:"Mindestens 2000 Bilder bewertet" },
	{ level: 11, limit:5000, text:"Mindestens 5000 Bilder bewertet" },
	{ level: 12, limit:7500, text:"Mindestens 7500 Bilder bewertet" },
	{ level: 13, limit:9001, text:"Mindestens 9001 Bilder bewertet" }
];
var transcriptionAchievements = [
	{ level: 1, limit:1, text:"Mindestens ein Bild transkribiert" },
	{ level: 2, limit:10, text:"Mindestens 10 Bilder transkribiert" },
	{ level: 3, limit:50, text:"Mindestens 50 Bilder transkribiert" },
	{ level: 4, limit:100, text:"Mindestens 100 Bilder transkribiert" },
	{ level: 5, limit:200, text:"Mindestens 200 Bilder transkribiert" },
	{ level: 6, limit:500, text:"Mindestens 500 Bilder transkribiert" },
	{ level: 7, limit:750, text:"Mindestens 750 Bilder transkribiert" },
	{ level: 8, limit:1000, text:"Mindestens 1000 Bilder transkribiert" },
	{ level: 9, limit:1337, text:"Mindestens 1337 Bilder transkribiert" },
	{ level: 10, limit:2000, text:"Mindestens 2000 Bilder transkribiert" },
	{ level: 11, limit:5000, text:"Mindestens 5000 Bilder transkribiert" },
	{ level: 12, limit:7500, text:"Mindestens 7500 Bilder transkribiert" },
	{ level: 13, limit:9001, text:"Mindestens 9001 Bilder transkribiert" }
];

function drawEntryAchievements(amount){
	var $container = $('#achievements #entries');
	for(var i=0; i<entryAchievements.length; i++){
		var ac = entryAchievements[i];
		$container.append(achievement("<i class='lvl"+ac.level+" icon-upload'/>",ac.text));
		if(amount < ac.limit)break;
	}
	$container.find(".achievement").last().addClass("next-achievement");
}
function drawCommentAchievements(amount){
	var $container = $('#achievements #comments');
	for(var i=0; i<commentAchievements.length; i++){
		var ac = commentAchievements[i];
		$container.append(achievement("<i class='lvl"+ac.level+" icon-comment'/>",ac.text));
		if(amount < ac.limit)break;
	}
	$container.find(".achievement").last().addClass("next-achievement");
}
function drawRatingAchievements(amount){
	var $container = $('#achievements #ratings');
	for(var i=0; i<ratingAchievements.length; i++){
		var ac = ratingAchievements[i];
		$container.append(achievement("<i class='lvl"+ac.level+" icon-thumbs-up-1'/>",ac.text));
		if(amount < ac.limit)break;
	}
	$container.find(".achievement").last().addClass("next-achievement");
}
function drawTranscriptionAchievements(amount){
	var $container = $('#achievements #transcriptions');
	for(var i=0; i<transcriptionAchievements.length; i++){
		var ac = transcriptionAchievements[i];
		$container.append(achievement("<i class='lvl"+ac.level+" icon-feather'/>",ac.text));
		if(amount < ac.limit)break;
	}
	$container.find(".achievement").last().addClass("next-achievement");
}

function achievement(title, description){
	var $ach = $('<div class="achievement">'+title+'</div>');
	$ach.attr("title",description);
	return $ach;
}