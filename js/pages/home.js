var vpWidth = null;
var imageData = null;
var currentImage = 0;
var defaultNumOfImages = 10;
var currentTag = "all";
var $imageContainer = $("#images");

$(document).ready(function() {
	$(window).resize(function(event) {
		vpWidth = $(window).width();
	});
	requestImages();
	setupInfiniteScroll();
});

function setupInfiniteScroll(){
	$imageContainer.waypoint(function(direction){
		if(direction == "down"){
			appendImages();
		}
	}, {
			offset: function(){
				return -$(this).height() + $(window).height();
			}
		});
}

function requestImages(){
	if(rootFolder == ''){
		return;
	}else{
		$.post(rootFolder + '/php/pages/home.php', {tag: currentTag}, function(data) {
			if(data == null || data == undefined){
				return;
			}else{
				imageData = data;
				appendImages();
			}
		});
	}
}

function appendImages(){
	if(imageData == null){
		return;
	}else{
		for(var i = 0; i < defaultNumOfImages; i++){
			if(currentImage >= imageData.length){
				break;;
			}else{
				var img = imageData[currentImage];
				imagesDisplayed++;
			}
		}
	}
}