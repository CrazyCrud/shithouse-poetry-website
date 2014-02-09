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
var vpWidth = null;
var imgLinks = null;
var defaultNumOfImages = 9;
var $infiniteContainer = $(".infiniteContainer");
var $imageContainer = $("#images");

$(document).ready(function() {
	$(window).resize(function(event) {
		vpWidth = $(window).width();
		// $('#images .img-container').css("opacity", 0);
	    if (resizeTimer){
	    	clearTimeout(resizeTimer);
	    }
	    resizeTimer = setTimeout(collage, 200);
		});
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
			var image = images[Math.floor(Math.random() * (images.length))];
			var $imgToAppend = $('<div class="img-container"><a href="#"><img src="' + image + '"/></a></div>');
			$imageContainer.append($imgToAppend);
			Foundation.lib_methods.loaded($imgToAppend, function(){
				imgLoaded++;
				if(imgLoaded == numImages){
					collage();
				}
			});
		}
	}else{
		
	}
}

function collage(){
	$imageContainer.removeWhitespace().collagePlus({
		'targetHeight' : 200,
		'fadeSpeed' : 'fast',
		'effect' : 'effect-1',
		'allowPartialLastRow' : false
	});
}