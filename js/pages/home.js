var currentEntry = 0;
var currentOrder = null;
var NO_SINGLE_IMAGE = "Wir können dir leider kein weiteres Bild liefern";
var NO_IMAGES = "Wir können dir leider keine weiteren Bilder mehr liefern";
var imgData = {};

var $homeButton = $("#link-home");
var $infiniteContainer = $(".infinite-container");
var $imageContainer = $("#images");
var $tabsContainer = $(".tabs");
var $hotLink = $("#tab-hot");
var $newLink = $("#tab-new");
var $voteLink = $("#tab-vote");
var $votingContainer = $(".vote-container");
var $upVote = $("#up-vote");
var $downVote = $("#down-vote");
var $mainheader = $("#mainheader");

$(document).ready(function() {
	setupTabFunctionality();
	getEntries();
	setupVoting();
});

var lazyRearrange = _.debounce(rearrangeImages, 500);

$(window).resize(lazyRearrange);

var setupOnce = _.once(setupInfiniteScroll);

function setupInfiniteScroll(){
	var vpTopOffset = $mainheader.height() + $tabsContainer.height();
	$homeButton.click(function(event) {
		event.preventDefault();
		$("html, body").animate({scrollTop: 0}, 400);
	});
	$infiniteContainer.waypoint(function(direction) {
		if(direction == "down"){
			if($.waypoints('viewportHeight') < $(this).height()){
				getEntries();
			}		
		}
	}, { offset: function(){
		var magicNumber = 284;
		var vpTopOffset = $mainheader.height() + $tabsContainer.height() - magicNumber;
		if(($.waypoints('viewportHeight') - vpTopOffset) < $(this).height()){
			console.log(($(this).height() - ($.waypoints('viewportHeight') - vpTopOffset)) * -1);
			return ($(this).height() - ($.waypoints('viewportHeight') - vpTopOffset)) * -1;
		}else{
			return -($.waypoints('viewportHeight') + 1); // never reached
		}
		
	} })
}

function appendImages(){
	var imgLoaded = 0;
	var numImages = _.keys(imgData).length;
	for(var i = 0; i < numImages; i++){
		var htmlData = imgData[i].image_m;
		var $imgContent = $(htmlData).find('img');
		Foundation.lib_methods.loaded($imgContent, function(){
			imgLoaded++;
			if(imgLoaded == numImages){
				clearScreen();
				for(var index in imgData){
					$imageContainer.append(imgData[index].image_m);
				}
				displayImages();
			}
		});
	}
	currentEntry = numImages + 1;
}

function appendSingleImage(){
	if(_.keys(imgData).length == 0){
		return;
	}else if(_.keys(imgData).length == currentEntry){
		resetImgData();
		getSingleEntry();
		return;
	}else{
		clearScreen();
		var htmlData = imgData[currentEntry].image_l;
		var $imgContent = $(htmlData).find('img');
		Foundation.lib_methods.loaded($imgContent, function(){
			$imageContainer.append(htmlData);
			displayImages();
		});
		currentEntry++;
	}
}

function appendMessage(message){
	if($(".message").length > 0){
		return;
	}else{
		message = message || "Es gibt leider keine weiteren Bilder mehr";
		var content = "<div class='small-12 columns message-container'><span class='message'>" + message + "</span></div>";
		$imageContainer.append(content);
	}
}

function chacheImages(entries){
	if(entries == null){

	}else{
		var numImages = entries.length;
		for(var i = 0; i < numImages; i++){
			var entry = entries[i];
			var id = parseInt(entry.id);
			if((_.chain(imgData).pluck("id").indexOf(id).value()) > -1){
				continue;
			}else{
				var gender = entry.sex;
				var transcription = entry.title;
				var imgContent_m = '<a href="" title="' + id + '"><img src="' + 
					entry.images[0].thumbnail + '"/></a>';	
				var imgContent_l = '<a href="" title="' + id + '"><img src="' + 
					entry.images[0].largethumbnail + '"/></a>';
				imgData[i] = {
					id: id,
					gender: gender,
					transcription: transcription,
					image_m: imgContent_m,
					image_l: imgContent_l,
					date: entry.date,
					rating: parseFloat(entry.ratings.rating)
				};
			}
		}
	}
}

function rearrangeImages(){
	if(StateManager.getWidth() != StateManager.getInitialWidth()){
		clearScreen();
		if(getActiveState() == "vote"){
			if(currentEntry > 0){
				$imageContainer.append(imgData[currentEntry - 1].image_l);
			}else{
				$imageContainer.append(imgData[currentEntry].image_l);
			}
		}else{
			for(var index in imgData){
				$imageContainer.append(imgData[index].image_m);
			}
		}
		displayImages();
	}
}

function displayImages(){
	if(StateManager.getState() == StateManager.States.
		properties[StateManager.States.SMALL].name){
		$imageContainer.justifiedGallery({
			'sizeRangeSuffixes': {'lt100':'',
				'lt240':'', 
				'lt320':'', 
				'lt500':'', 
				'lt640':'', 
				'lt1024':''},
			'captions': false,
			'target': "_blank",
			'margins': 3,
			'refreshTime': 500,
			'justifyLastRow': true,
			'rowHeight': 250,
			'fixedHeight' : true,
			'onComplete': imagesFullyDisplayed
		});
	}else{
		$imageContainer.justifiedGallery({
			'sizeRangeSuffixes': {'lt100':'',
				'lt240':'', 
				'lt320':'', 
				'lt500':'', 
				'lt640':'', 
				'lt1024':''},
			'captions': false,
			'target': "_blank",
			'margins': 3,
			'refreshTime': 500,
			'justifyLastRow': true,
			'onComplete': imagesFullyDisplayed
		});
	}
	
}

function imagesFullyDisplayed(){
	setupOnce();
	$.waypoints('refresh');
	addOverlay();
}

function addOverlay(){
	var isDesktop = StateManager.isDesktop();
	$(".jg-image a").each(function(index, value) {
		var $parent = $(this).parent(".jg-image");
		var id = parseInt($(this).attr('title'));

		var index = _.chain(imgData).pluck("id").indexOf(id).value();

		elementData = imgData[index];
		if(elementData){
			var overlayClass = "";
			switch(elementData.gender.toLowerCase()){
				case "w":
					overlayClass = "women";
					break;
				case "m":
					overlayClass = "men";
					break;
				default:
					overlayClass = "unisex";
			}
			var content = '<div class="' + overlayClass + '"></div><div class="transcription-container"><div><span class="transcription"><i>' + elementData.transcription + '</i></span></div></div>';
			$parent.prepend(content);
		}
		addOverlayFunctionality($parent, isDesktop);
	});
}

function addOverlayFunctionality(container, isDesktop){
	var $container = $(container);
	var $transcription = $container.children('.transcription-container');
	var $genderOverlay = null;
	var $image = $container.find('img');
	if($container.children('div.women').length > 0){
		$genderOverlay = $container.children('div.women');
	}else if($container.children('div.men').length > 0){
		$genderOverlay = $container.children('div.men');
	}else{
		$genderOverlay = $container.children('div.unisex');
	}
	if(!isDesktop){
		var newClass = $transcription.attr('class') + "-touch";
		$transcription.removeAttr('class');
		$transcription.addClass(newClass);
		newClass = $genderOverlay.attr('class') + "-touch";
		$genderOverlay.removeAttr('class');
		$genderOverlay.addClass(newClass);
	}else{
		$container.hover(function() {
			$genderOverlay.stop(true, true);
			$transcription.stop(true, true);
			$image.stop(true, true);
			$image.transition({scale:[1.1, 1.1]});
			$genderOverlay.fadeIn({
				duration : 300,
				queue: false
			});
			$transcription.fadeIn({
				duration: 300,
				start: function(){
					$(this).css({
						'display': 'table',
						'height': $container.parent('.jg-row').height() + 'px',
						'width': $container.width() + 'px'
					});
					$(this).find('.transcription').css('width', $container.width() + 'px');
				},
				queue: false
			});
		}, function() {
			$genderOverlay.stop(true, true);
			$transcription.stop(true, true);
			$image.stop(true, true);
			$image.transition({scale:[1.0, 1.0]});
			$genderOverlay.fadeOut({
				duration: 300,
				queue: false
			});
			$transcription.fadeOut({
				duration: 300,
				queue: false
			});
		});
	}
}

function setupTabFunctionality(){
	$hotLink.click(function(event) {
		event.preventDefault();
		setActive($(this).parent("dd"));
		enableInfiniteScroll();
		disableVoting();
		setOrder(ImgurManager.OrderBy.properties[ImgurManager.OrderBy.RATING].name);
		clearRequests();
		getEntries(ImgurManager.OrderBy.properties[ImgurManager.OrderBy.RATING].name);
	});
	$newLink.click(function(event) {
		event.preventDefault();
		setActive($(this).parent("dd"));
		enableInfiniteScroll();
		disableVoting();
		setOrder(ImgurManager.OrderBy.properties[ImgurManager.OrderBy.DATE].name);
		clearRequests();
		getEntries(ImgurManager.OrderBy.properties[ImgurManager.OrderBy.DATE].name);
	});
	$voteLink.click(function(event) {
		event.preventDefault();
		setActive($(this).parent("dd"));
		disableInfiniteScroll();
		clearRequests();
		getSingleEntry();
		enableVoting();
	});
}

function enableVoting(){
	$votingContainer.css('display', 'block');
}

function setupVoting(){
	$upVote.click(function(event) {
		console.log("Take my upvote, sir!");
		lazyClick(false);
	});
	$downVote.click(function(event) {
		console.log("You suck balls!");
		lazyClick(true);
	});
}

var lazyClick = _.throttle(handleVote, 200);

function handleVote(sucks){
	var rating = 0;
	var entryid = imgData[currentEntry].id;
	if(sucks){
		rating = -1;
	}else{
		rating = 1;
	}
	addRating(entryid, rating);
}

function disableVoting(){
	$votingContainer.css('display', 'none');
}

function enableInfiniteScroll(){
	$infiniteContainer.waypoint('enable');
}

function disableInfiniteScroll(){
	$infiniteContainer.waypoint('disable');
}

function setActive(linkContainer){
	$(linkContainer).siblings('dd.active').removeClass('active');
	$(linkContainer).addClass('active');
}

function getActiveState(){
	return $tabsContainer.children('.active').find('a').html().toLowerCase();
}

function getEntries(orderby){
	var order = orderby || currentOrder;
	if(rootFolder != ''){
		ImgurManager.getEntries(appendImagesCallback, order, currentEntry);
	}
}

function getFilteredEntries(){
	if(rootFolder != ''){
		ImgurManager.getFilteredEntries(appendImagesCallback, null, currentEntry);
	}
}

function getSingleEntry(){
	if(rootFolder != ''){
		ImgurManager.getRandomEntries(appendSingleImageCallback);
	}
}

function addRating(entryid, rating){
	if(rootFolder != ''){
		ImgurManager.addRating(appendSingleImage, entryid, rating);
	}
}

function appendImagesCallback(entries){
	if(entries == null){
		appendMessage(NO_IMAGES);
	}else{
		chacheImages(entries);
		appendImages();
	}
}

function appendSingleImageCallback(entries){
	if(entries == null){
		clearScreen();
		appendMessage(NO_SINGLE_IMAGE);
	}else{
		chacheImages(entries);
		appendSingleImage();
	}
}

function setOrder(newOrder){
	if(newOrder == currentOrder){
		return;
	}
	currentOrder = newOrder;
}

function clearRequests(){
	resetImgData();
	currentEntry = 0;
	if($imageContainer.children().length > 0){
		clearScreen();
	}
}

function clearScreen(){
	$imageContainer.empty();
}

function resetImgData(){
	imgData = {};
}