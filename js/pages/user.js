var user = {};
var NO_RESULTS = "Hier gibt es leider keine Bilder mehr!";

$(function(){
	if(id>0){
		loadUser(id);
		setupImageClick();
		setupOnce();
	}
});

function loadUser(id){
	ImgurManager.getUser(fillUI, id);
}

$(document).on("complete", function(){
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
				ImgurManager.getEntriesForUser(fillImages, id, GalleryView.getCurrentEntry());
			}		
		}
	}, { offset: 'bottom-in-view'
	});
}

var setupOnce = _.once(setupInfiniteScroll);

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
	if(u.stats){
		$("#stats #entries .amount").html(u.stats.entries);
		$("#stats #comments .amount").html(u.stats.comments);
		$("#stats #ratings .amount").html(u.stats.ratings);
		drawAchievements(u.stats);
		var today = new Date();
		var timeObj = convertDateTime(user.joindate);
		var timestamp = timeObj.getTime();
		var difference = today-timestamp;
		var lvl = computeLevel(u.stats.entries, u.stats.comments, u.stats.ratings, difference);
		$("#level").html("(Level "+lvl+")");
	}
	ImgurManager.getEntriesForUser(fillImages, id);
}

function fillImages(searchData){
	if(!searchData||searchData.length==0){
		resultsError(NO_RESULTS);
	}else{
		GalleryView.init($("#images"));
		showResults(searchData);
	}
	/*
	var entry = data[0];
	$("#image").attr("src",entry.images[0].thumbnail);
	$("#lastlink").attr("href","details.php?id="+entry.id);
	*/
}

function resultsError(msg){
	var content = "<div class='error-message secondary label'>" + msg + "</div>";
	if($(".error-message").length < 1){
		$("#images").append(content);
	}
}

function showResults(searchData){
	GalleryView.appendEntries(searchData);
	GalleryView.reload();
}

function drawAchievements(stats){
	drawEntryAchievements(stats.entries);
	drawCommentAchievements(stats.comments);
	drawRatingAchievements(stats.ratings);
}

function computeLevel(entries, comments, ratings, ageInMillis){
	var ageInDays = ageInMillis/1000 /60 /60 /24;
	var level = 1;

	var entryMulti = .1;
	var commentMulti = .01;
	var ratingMulti = .02;
	var ageMulti = .01;

	var extralevel = entries*entryMulti;
	extralevel += comments*commentMulti;
	extralevel += ratings*ratingMulti;
	extralevel += ageInDays*ageMulti;

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

function achievement(title, description){
	var $ach = $('<div class="achievement">'+title+'</div>');
	$ach.attr("title",description);
	return $ach;
}