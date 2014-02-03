var vpWidth = null;
var thumbHeight = null;
var currentGallery = null;

$(document).ready(function() {
	thumbHeight = 120;
	$(window).resize(function(event) {
		vpWidth = $(window).width();
	});
	getImages();
	displayImages();
});

function getImages(){
	currentGallery = new Gallery();
	currentGallery.getImages();
}

function displayImages(){
	
}

function GalleryImage(src){
	this._isLoaded = false;
	this._img = new Image();
	this._img.src = undefined;
	this._img._src = src;
}

GalleryImage.prototype.isLoaded = function(){
	return this._isLoaded;
}

GalleryImage.prototype.loadImage = function(src){
	this._img.src = this._img._src;
	var me = this;
	this._img.onload = function(){
		me._isLoaded = true;
	}
	this._computeRatio();
}

GalleryImage.prototype._computeRatio = function(){
	this._ratio = (this.getWidth() / this.getHeight()).toFixed(2);
}

GalleryImage.prototype.getImage = function(){
	return this._img;
}

GalleryImage.prototype.getHeight = function(){
	if(this._img.src == undefined){
		return;
	}else{
		return this._img.height;
	}
}

GalleryImage.prototype.getWidth = function(){
	if(this._img.src == undefined){
		return;
	}else{
		return this._img.width;
	}
}

GalleryImage.prototype.getRatio = function(){
	if(this._img.src == undefined){
		return;
	}else{
		return this._ratio;
	}
}

GalleryImage.prototype.scale = function(){
	
}

function Gallery(){
	this._availableImages = [];
	this._displayImages = [];
}

Gallery.prototype.getImages = function(){
	for(var i = 0; i < 6; i++){
		this._addImage("/img/dummy/d0" + (i + 1) + ".png");
	}
}

Gallery.prototype._addImage = function(src){
	this._availableImages[this._images.length] = src;
}