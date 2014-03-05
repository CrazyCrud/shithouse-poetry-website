var currentEntry = 0;
var currentOrder = null;
var imgData = {};

var $infiniteContainer = $(".infinite-container");
var $imageContainer = $("#images");
var $hotLink = $("#tab-hot");
var $newLink = $("#tab-new");
var $voteLink = $("#tab-vote");

$(document).ready(function() {
	setupTabFunctionality();
	getEntries();
	setupInfiniteScroll();
});

var lazyRearrange = _.debounce(rearrangeImages, 500);

$(window).resize(lazyRearrange);

function setupInfiniteScroll(){
	$infiniteContainer.waypoint(function(direction) {
		if(direction == "down"){
			if($.waypoints('viewportHeight') < $(this).height()){
				getEntries();
			}		
		}
	}, { offset: function(){
		if($.waypoints('viewportHeight') < $(this).height()){
			return ($(this).height() - ($.waypoints('viewportHeight') + 1)) * -1;	
		}else{
			return -($.waypoints('viewportHeight') + 1);
		}
		
	} })
}

function appendImages(entries){
	var imgLoaded = 0;
	var numImages = entries.length;
	for(var i = 0; i < numImages; i++){
		var entry = entries[i];
		var id = parseInt(entry.id);
		if((_.chain(imgData).pluck("id").indexOf(id).value()) > -1){
			numImages--;
			continue;
		}else{
			var gender = entry.sex;
			var transcription = entry.title;
			var image = entry.images[0].path;
			var imgContent = '<a href="" title="' + id + '"><img src="' + image + '"/></a>';	
			imgData[i] = {
				id: id,
				gender: gender,
				transcription: transcription,
				htmlData: imgContent,
				date: entry.date,
				rating: parseFloat(entry.ratings.rating)
			};
			Foundation.lib_methods.loaded($(imgContent), function(){
				imgLoaded++;
				if(imgLoaded == numImages){
					$imageContainer.empty();
					for(var index in imgData){
						$imageContainer.append(imgData[index].htmlData);
					}
					displayImages();
				}
			});
		}
	}
	currentEntry = numImages + 1;
}

function appendSingleImage(entry){
	var gender = entry.sex;
	var transcription = entry.title;
	var image = entry.images[0].path;
	var imgContent = '<a href="" title="' + id + '"><img src="' + image + '"/></a>';
	Foundation.lib_methods.loaded($(imgContent), function(){
		$imageContainer.append(imgContent);
		displayImages();
	});
}

function rearrangeImages(){
	if(StateManager.getWidth() != StateManager.getInitialWidth()){
		$imageContainer.empty();
		for(var index in imgData){
			$imageContainer.append(imgData[index].htmlData);
		}
		displayImages();
	}
}

function displayImages(){
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

function imagesFullyDisplayed(){
	$.waypoints('refresh');
	addOverlay();
}

function addOverlay(){
	var isTouch = StateManager.isDesktop();
	var $hiddenElement = $("<div>").css('display', 'none').addClass('transcription');
	$("body").append($hiddenElement);
	var fontSize = parseInt($hiddenElement.css('font-size'));
	$hiddenElement.remove();
	$(".jg-image a").each(function(index, value) {
		var $parent = $(this).parent(".jg-image");
		var id = parseInt($(this).attr('title'));

		var index = _.chain(imgData).pluck("id").indexOf(id).value();

		console.log(index);

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
		addOverlayFunctionality($parent, isTouch);
	});
}

function addOverlayFunctionality(container, isTouch){
	isTouch = false;
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
	if(isTouch){
		var newClass = $transcription.attr('class') + "-touch";
		$transcription.removeAttr('class');
		$transcription.addClass(newClass);
		newClass = $genderOverlay.attr('class') + "-touch";
		$genderOverlay.removeAttr('class');
		$genderOverlay.addClass(newClass);
	}else{
		$container.hover(function() {
			$image.transition({scale:[1.1, 1.1]});
			$genderOverlay.fadeIn(300);
			$transcription.fadeIn({
				duration: 300,
				start: function(){
					$(this).css({
						'display': 'table',
						'height': $container.parent('.jg-row').height() + 'px',
						'width': $container.width() + 'px'
					});
					$(this).find('.transcription').css('width', $container.width() + 'px');
				}
			});
		}, function() {
			$image.transition({scale:[1.0, 1.0]});
			$genderOverlay.fadeOut(300);
			$transcription.fadeOut(300);
		});
	}
}

function setupTabFunctionality(){
	$hotLink.click(function(event) {
		event.preventDefault();
		setActive($(this).parent("dd"));
		enableInfiniteScroll();
		setOrder(ImgurManager.OrderBy.properties[ImgurManager.OrderBy.RATING].name);
		clearRequests();
		getEntries(ImgurManager.OrderBy.properties[ImgurManager.OrderBy.RATING].name);
	});
	$newLink.click(function(event) {
		event.preventDefault();
		setActive($(this).parent("dd"));
		enableInfiniteScroll();
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
	});
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

function getEntries(orderby){
	var order = orderby || currentOrder;
	if(rootFolder != ''){
		ImgurManager.getEntries(appendImages, order, currentEntry);
	}
}

function getFilteredEntries(){
	if(rootFolder != ''){
		ImgurManager.getFilteredEntries(appendImages, null, currentEntry);
	}
}

function getSingleEntry(){
	if(rootFolder != ''){
		ImgurManager.getSingleEntry(appendSingleImage);
	}
}

function setOrder(newOrder){
	if(newOrder == currentOrder){
		return;
	}
	currentOrder = newOrder;
}

function clearRequests(){
	imgData = {};
	currentEntry = 0;
	if($imageContainer.children().length > 0){
		$imageContainer.empty();
	}
}