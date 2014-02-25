var images = ["http://placehold.it/350x150/69d2e7",
	"http://placehold.it/540x360/a7dbd8",
	"http://placehold.it/320x300/e0e4cc",
	"http://placehold.it/800x600/c02942",
	"http://placehold.it/400x120/542437",
	"http://placehold.it/300x300/53777a",
	"http://placehold.it/350x150/69d2e7",
	"http://placehold.it/540x360/a7dbd8",
	"http://placehold.it/320x300/e0e4cc",
	"http://placehold.it/800x600/c02942",
	"http://placehold.it/400x120/542437",
	"http://placehold.it/300x300/53777a"];
var genders = ["w","m","?"];
var currentEntry = 0;
var imgData = {};

var $infiniteContainer = $(".infinite-container");
var $imageContainer = $("#images");

$(document).ready(function() {
	requestImages();
	setupInfiniteScroll();
});

$(window).resize(function(event) {
	// rearrangeImages();
});

function setupInfiniteScroll(){
	$infiniteContainer.waypoint(function(direction) {
		if(direction == "down"){
			if($.waypoints('viewportHeight') < $(this).height()){
				requestImages();
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

function requestImages(){
	if(rootFolder != ''){
		ImgurManager.loadImages(appendImages, null, currentEntry);
	}
}

function appendImages(entries){
	var imgLoaded = 0;
	var numImages = entries.length;
	for(var i = 0; i < numImages; i++){
		var entry = entries[i];
		var id = entry.id;
		if(Helper.hasIndex(imgData, id)){
			numImages--;
			continue;
		}else{
			var gender = entry.sex;
			var transcription = entry.title;
			var image = entry.images[0].path;
			var imgContent = '<a href="" title="' + id + '"><img src="' + image + '"/></a>';	
			imgData[id] = {
				gender: gender,
				transcription: transcription,
				htmlData: imgContent
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

function rearrangeImages(){
	if($imageContainer.children().length > 0){
		console.log("rearrangeImages()");
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
	console.log("imagesFullyDisplayed");
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
		elementData = imgData[id];
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