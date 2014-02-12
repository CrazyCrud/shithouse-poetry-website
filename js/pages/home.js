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
var resizeTimer = null;
var imgLinks = null;
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
	if(rootFolder == ''){
		imgLinks = null;
	}else{
		imgLinks = ImgurManager.loadImages();
	}
	appendImages();
}

function appendImages(){
	if(imgLinks == null){
		var imgLoaded = 0;
		var numImages = images.length;
		for(var i = 0; i < numImages; i++){
			var image = images[Math.floor(Math.random() * (numImages))];
			var $imgToAppend = $('<a href=""><img src="' + image + '"/></a>');
			$imageContainer.append($imgToAppend);
			Foundation.lib_methods.loaded($imgToAppend, function(){
				imgLoaded++;
				if(imgLoaded == numImages){
					displayImages();
				}
			});
		}
	}else{
		
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
		'margins': 3
	});
}