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
var resizeTimer = null;
var imgData = [];

var defaultNumOfImages = 9;
var $infiniteContainer = $(".infiniteContainer");
var $imageContainer = $("#images");

$(document).ready(function() {
	requestImages();
	setupInfiniteScroll();
});

function setupInfiniteScroll(){
	$infiniteContainer.waypoint(function(direction){
		if(direction == "down"){
			//appendImages();
		}
	}, {
			offset: function(){
				return -$(this).height() + $(window).height();
			}
		});
}

function requestImages(){
	if(rootFolder != ''){
		ImgurManager.loadImages(appendImages);
	}
}

function appendImages(entries){
	if(entries == null){
		var imgLoaded = 0;
		var numImages = images.length;
		for(var i = 0; i < numImages; i++){
			var image = images[Math.floor(Math.random() * (numImages))];
			var gender = genders[Math.floor(Math.random() * (genders.length))];
			var $imgToAppend = $('<a href="" data-gender="' + gender + '"><img src="' + image + '"/></a>');
			$imageContainer.append($imgToAppend);
			Foundation.lib_methods.loaded($imgToAppend, function(){
				imgLoaded++;
				if(imgLoaded == numImages){
					displayImages();
					addOverlay();
				}
			});
		}
	}else{
		var imgLoaded = 0;
		var numImages = entries.length;
		for(var i = 0; i < numImages; i++){
			var entry = entries[i];
			var id = entry.id;
			var gender = entry.sex;
			var transcription = entry.title;
			var image = entry.images[0].path;
			var $imgToAppend = $('<a href="" title="' + id + '"><img src="' + image + '"/></a>');
			$imageContainer.append($imgToAppend);
			imgData[id] = {
				gender: gender,
				transcription: transcription
			};
			Foundation.lib_methods.loaded($imgToAppend, function(){
				imgLoaded++;
				if(imgLoaded == numImages){
					displayImages();
				}
			});
		}
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
		'onComplete': addOverlay
	});
}

function addOverlay(){
	var isTouch = StateManager.isDesktop();
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
			var content = '<div class="' + overlayClass + '"></div><div class="transcribtion"><span>' + elementData.transcription + '</span></div>';
			$(this).parent(".jg-image").prepend(content);
		}
		addOverlayFunctionality($parent, isTouch);
	});
}

function addOverlayFunctionality(container, isTouch){
	var $container = $(container);
	var $transcribtion = $container.children('.transcribtion');
	var $genderOverlay = null;
	var $image = $container.find('img');
	if($container.children('div.women').length > 0){
		$genderOverlay = $container.children('div.women');
	}else if($container.children('div.men').length > 0){
		$genderOverlay = $container.children('div.men');
	}else{
		$genderOverlay = $container.children('div.unisex');
	}
	console.log($image);
	if(isTouch){
		var newClass = $transcribtion.attr('class') + "-touch";
		$transcribtion.removeAttr('class');
		$transcribtion.addClass(newClass);
		newClass = $genderOverlay.attr('class') + "-touch";
		$genderOverlay.removeAttr('class');
		$genderOverlay.addClass(newClass);
	}else{
		$container.hover(function() {
			$image.transition({scale:[1.1, 1.1]});
			$genderOverlay.fadeIn(400);
			$transcribtion.fadeIn(400);
		}, function() {
			$image.transition({scale:[1.0, 1.0]});
			$genderOverlay.fadeOut(400);
			$transcribtion.fadeOut(400);
		});
	}
}