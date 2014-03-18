var queriedUser = {};
var NO_RESULTS = "Der Nutzer hat noch keine Bilder hochgeladen!";
var NO_MORE_RESULTS = "Dieser Nutzer hat nicht mehr Bilder hochgeladen!";
var NO_MORE_RESULTS_USER = "Du hast keine weiteren Bilder hochgeladen!";
var NO_RESULTS_USER = "Du hast noch keine Bilder hochgeladen!";

$(function(){
	if(id>0){
		loadUser(id);
		setupImageClick();
		// setupOnce();
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
		console.log("Error getting user");
		$("#username").html("Dieser Nutzer existiert nicht.");
		return;
	}else{
		queriedUser = u;
	}
	var usericon = getUserIcon(queriedUser.status);
	$("#username").html(usericon+queriedUser.username);
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

function drawEntryAchievements(amount){
	var $container = $('#achievements #entries');
	if(amount>=1)$container.append(achievement("<i class='lvl1 icon-upload'/>","Ein Bild hochgeladen"));
	if(amount>=10)$container.append(achievement("<i class='lvl2 icon-upload'/>","10 Bilder hochgeladen"));
	if(amount>=50)$container.append(achievement("<i class='lvl3 icon-upload'/>","50 Bilder hochgeladen"));
	if(amount>=100)$container.append(achievement("<i class='lvl4 icon-upload'/>","100 Bilder hochgeladen"));
	if(amount>=200)$container.append(achievement("<i class='lvl5 icon-upload'/>","200 Bilder hochgeladen"));
	if(amount>=500)$container.append(achievement("<i class='lvl6 icon-upload'/>","500 Bilder hochgeladen"));
	if(amount>=750)$container.append(achievement("<i class='lvl7 icon-upload'/>","750 Bilder hochgeladen"));
	if(amount>=1000)$container.append(achievement("<i class='lvl8 icon-upload'/>","1000 Bilder hochgeladen"));
	if(amount>=1500)$container.append(achievement("<i class='lvl9 icon-upload'/>","1500 Bilder hochgeladen"));
	if(amount>=2000)$container.append(achievement("<i class='lvl10 icon-upload'/>","2000 Bilder hochgeladen"));
	if(amount>=5000)$container.append(achievement("<i class='lvl11 icon-upload'/>","5000 Bilder hochgeladen"));
	if(amount>=7500)$container.append(achievement("<i class='lvl12 icon-upload'/>","7500 Bilder hochgeladen"));
	if(amount>=10000)$container.append(achievement("<i class='lvl13 icon-upload'/>","10000 Bilder hochgeladen"));
}
function drawCommentAchievements(amount){
	var $container = $('#achievements #comments');
	if(amount>0)$container.append(achievement("<i class='lvl1 icon-comment'/>","Einen Kommentar abgegeben"));
	if(amount>=10)$container.append(achievement("<i class='lvl2 icon-comment'/>","10 Kommentare abgegeben"));
	if(amount>=50)$container.append(achievement("<i class='lvl3 icon-comment'/>","50 Kommentare abgegeben"));
	if(amount>=100)$container.append(achievement("<i class='lvl4 icon-comment'/>","100 Kommentare abgegeben"));
	if(amount>=200)$container.append(achievement("<i class='lvl5 icon-comment'/>","200 Kommentare abgegeben"));
	if(amount>=500)$container.append(achievement("<i class='lvl6 icon-comment'/>","500 Kommentare abgegeben"));
	if(amount>=750)$container.append(achievement("<i class='lvl7 icon-comment'/>","750 Kommentare abgegeben"));
	if(amount>=1000)$container.append(achievement("<i class='lvl8 icon-comment'/>","1000 Kommentare abgegeben"));
	if(amount>=1500)$container.append(achievement("<i class='lvl9 icon-comment'/>","1500 Kommentare abgegeben"));
	if(amount>=2000)$container.append(achievement("<i class='lvl10 icon-comment'/>","2000 Kommentare abgegeben"));
	if(amount>=5000)$container.append(achievement("<i class='lvl11 icon-comment'/>","5000 Kommentare abgegeben"));
	if(amount>=7500)$container.append(achievement("<i class='lvl12 icon-comment'/>","7500 Kommentare abgegeben"));
	if(amount>=10000)$container.append(achievement("<i class='lvl13 icon-comment'/>","10000 Kommentare abgegeben"));
}
function drawRatingAchievements(amount){
	var $container = $('#achievements #ratings');
	if(amount>0)$container.append(achievement("<i class='lvl1 icon-thumbs-up-1'/>","Ein Bild bewertet"));
	if(amount>=10)$container.append(achievement("<i class='lvl2 icon-thumbs-up-1'/>","10 Bilder bewertet"));
	if(amount>=50)$container.append(achievement("<i class='lvl3 icon-thumbs-up-1'/>","50 Bilder bewertet"));
	if(amount>=100)$container.append(achievement("<i class='lvl4 icon-thumbs-up-1'/>","100 Bilder bewertet"));
	if(amount>=200)$container.append(achievement("<i class='lvl5 icon-thumbs-up-1'/>","200 Bilder bewertet"));
	if(amount>=500)$container.append(achievement("<i class='lvl6 icon-thumbs-up-1'/>","500 Bilder bewertet"));
	if(amount>=750)$container.append(achievement("<i class='lvl7 icon-thumbs-up-1'/>","750 Bilder bewertet"));
	if(amount>=1000)$container.append(achievement("<i class='lvl8 icon-thumbs-up-1'/>","1000 Bilder bewertet"));
	if(amount>=1500)$container.append(achievement("<i class='lvl9 icon-thumbs-up-1'/>","1500 Bilder bewertet"));
	if(amount>=2000)$container.append(achievement("<i class='lvl10 icon-thumbs-up-1'/>","2000 Bilder bewertet"));
	if(amount>=5000)$container.append(achievement("<i class='lvl11 icon-thumbs-up-1'/>","5000 Bilder bewertet"));
	if(amount>=7500)$container.append(achievement("<i class='lvl12 icon-thumbs-up-1'/>","7500 Bilder bewertet"));
	if(amount>=10000)$container.append(achievement("<i class='lvl13 icon-thumbs-up-1'/>","10000 Bilder bewertet"));
}
function drawTranscriptionAchievements(amount){
	var $container = $('#achievements #transcriptions');
	if(amount>0)$container.append(achievement("<i class='lvl1 icon-feather'/>","Ein Bild transkribiert"));
	if(amount>=10)$container.append(achievement("<i class='lvl2 icon-feather'/>","10 Bilder transkribiert"));
	if(amount>=50)$container.append(achievement("<i class='lvl3 icon-feather'/>","50 Bilder transkribiert"));
	if(amount>=100)$container.append(achievement("<i class='lvl4 icon-feather'/>","100 Bilder transkribiert"));
	if(amount>=200)$container.append(achievement("<i class='lvl5 icon-feather'/>","200 Bilder transkribiert"));
	if(amount>=500)$container.append(achievement("<i class='lvl6 icon-feather'/>","500 Bilder transkribiert"));
	if(amount>=750)$container.append(achievement("<i class='lvl7 icon-feather'/>","750 Bilder transkribiert"));
	if(amount>=1000)$container.append(achievement("<i class='lvl8 icon-feather'/>","1000 Bilder transkribiert"));
	if(amount>=1500)$container.append(achievement("<i class='lvl9 icon-feather'/>","1500 Bilder transkribiert"));
	if(amount>=2000)$container.append(achievement("<i class='lvl10 icon-feather'/>","2000 Bilder transkribiert"));
	if(amount>=5000)$container.append(achievement("<i class='lvl11 icon-feather'/>","5000 Bilder transkribiert"));
	if(amount>=7500)$container.append(achievement("<i class='lvl12 icon-feather'/>","7500 Bilder transkribiert"));
	if(amount>=10000)$container.append(achievement("<i class='lvl13 icon-feather'/>","10000 Bilder transkribiert"));
}

function achievement(title, description){
	var $ach = $('<div class="achievement">'+title+'</div>');
	$ach.attr("title",description);
	return $ach;
}