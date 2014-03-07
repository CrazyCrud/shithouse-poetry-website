var $imageContainer = $(".image-container");
var $addImageContainer = $(".add-image-container");
var $addImageText = $(".add-image-text");
var $addLocationContainer = $(".add-location-container");
var $addImageInput = $("input.file-input");
var $customTagInput = $("#custom-tag");
var $locationInput = $("select#location");
var $tagsContainer = $(".tags-container");
var $tagList = $("#tag-list");
var $uploadSubmit = $("#upload-submit");
var $form = $(".upload-forms-container > form");
var $imageError = $(".image-error");
var $tagError = $(".tag-error");
var $locError = $(".location-error");

$(document).ready(function() {
	initImageUpload();
	getLocations();
	getTags();
});

function initImageUpload(){
	$addImageContainer.click(function(event) {
		$addImageInput.trigger('click');
	});

	$addImageInput.change(function(event) {
		var files = event.target.files;
		if(files.length){
			var $img = $("<img id='img-upload'/>");
			var src = window.URL.createObjectURL(files[0]);
			$img.attr('src', src);
			$imageContainer.empty();
			$imageContainer.append($img);
			showError("image", false);
			$imageContainer.fadeIn('slow', function() {
				$addImageText.html("Bild</br>ändern");
			});
		}
	});

	$form.on('invalid', function(event) {
		// var invalid_fields = $(this).find('[data-invalid]');
    	checkForImage();
    	checkForTags();
	}).on('valid', function(event) {
		if(checkForImage() && checkForTags()){
			var data = new FormData();
			// var file = $addImageInput[0].files[0];
			var title = $.trim($("input#title").val());
			var artist = $.trim($("input#artist").val());
			var transcription = $.trim($("input#transcription").val());
			var location = $locationInput.val();
			var sex = $("input:radio[name=sex]").val();
			var tags = _.pluck($tagList.children('.tag-active'), 'innerHTML');
			
			data.append('stuff&location', location);
			data.append('title', title);
			data.append('artist', artist);
			data.append('sex', sex);
			data.append('transcription', transcription);
			data.append('tags', tags);
			data.append('lat', -1);
			data.append('long', -1)

			ImgurManager.addEntry(null, data);
		}
	});;
}

function getLocations(){
	if(Modernizr.geolocation){
		$locationInput.prop('disabled', true);
		var options = {
			enableHighAccuracy : false,
			timeout : 5000,
			maximumAge : 3600000 // one hour cache
		};
		navigator.geolocation.getCurrentPosition(handleGeolocation, handleGeolocationErrors, 
			options);
	}else{
		retrieveLocations(null);
	}
}

function handleGeolocation(position){
	var loc = {
		latitude : position.coords.latitude,
		longitude : position.coords.longitude
	};
	retrieveLocations(loc);
}

function handleGeolocationErrors(error){
	switch(error.code)
    {
        case error.PERMISSION_DENIED: 
        	console.log("User did not share geolocation data...");
        	break;
        case error.POSITION_UNAVAILABLE: 
        	console.log("Could not detect current position...");
        	break;
        case error.TIMEOUT: 
        	console.log("Retrieving position timed out...");
        	break;
        default: 
        	console.log("Unknown error..");
    }
    retrieveLocations(null);
}

function retrieveLocations(loc){
	$locationInput.children().first().html("Wähle einen Ort aus...");
	$locationInput.prop('disabled', false);
	if(loc == null){

	}else{

	}
}

function showError(which, yep){
	var $which = null;
	switch(which){
		case "tag":
			$which = $tagError;
			break;
		case "image":
			$which = $imageError;
			break;
	}
	if(yep && $which != null){
		$which.css('display', 'block');
		$which.fadeIn('slow');
	}else{
		$which.fadeOut('slow');
	}
}

function checkForImage(){
	if($imageContainer.children().length > 0){
		showError("image", false);
		return true;
	}else{
		showError("image", true);
		return false;
	}
}

function checkForTags(){
	if($tagList.children('.tag-active').length > 0 ||
			$customTagInput.val().length > 2){
		showError("tag", false);
		return true;
	}else{
		showError("tag", true);
		return false;
	}
}

function getTags(){
	var url = 'getTags.php?status=system';
	var tagData = null;

	$.get('php/backend/' + url, function(data) {
		if(data.success == 1){
			tagData = data.data;
			appendTags(tagData);
		}else{
			console.log("Error");
		}
	});

	url = 'getTags.php?status=usercreated';
	$.get('php/backend/' + url, function(data) {
		if(data.success == 1){
			tagData = data.data;
			var tags = _.pluck(tagData, 'tag');

			function split(val) {
		    	return val.split( /,\s*/ );
		    }
		    function extractLast(term) {
		    	return split(term).pop();
		    }

			$customTagInput
		    	.bind("keydown", function(event) {
			        if(event.keyCode === $.ui.keyCode.TAB &&
			            $(this).data("ui-autocomplete").menu.active) {
			        	event.preventDefault();
			        }
		      	})
		      	.autocomplete({
		        	minLength: 0,
		        	source: function( request, response ) {
		          		response($.ui.autocomplete.filter(
		            		tags, extractLast(request.term)));
			        },
			        focus: function() {
			        	return false;
			        },
			        select: function(event, ui) {
			        	var terms = split(this.value);
			          	terms.pop();
			          	terms.push(ui.item.value);
			          	terms.push("");
			          	this.value = terms.join(", ");
			          	return false;
			        }
		      	});
		}else{
			console.log("Error");
		}
	});
}

function appendTags(tagData){
	var tags = _.pluck(tagData, 'tag');
	for(var i = 0; i < tags.length; i++){
		$tagItem = $("<li>" + tags[i] + "</li>");
		$tagItem.click(function(event) {
			tagFunctionality($(this));
		});
		$tagList.append($tagItem);
	}
}

function tagFunctionality(tag){
	var $tag = $(tag);
	if($tag.hasClass('tag-active')){
		$tag.removeClass('tag-active');
	}else{
		$tag.addClass('tag-active');
	}
}