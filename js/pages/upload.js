var latitude_g = -1000;
var longitude_g = -1000;
var DEFAULT_LOCATIONS = [
	"Bar", "Kino", "Restaurant", "Tankstelle", "Schule", "Hochschule"
];

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
var $imageError = $(".image-error-container");
var $tagError = $(".tag-error");
var $locError = $(".location-error");

$(document).ready(function() {
	initUpload();
	initImageUpload();
	// getLocations();
	getTags();
});

function initUpload(){
	$locationInput.prop('disabled', true);
	$uploadSubmit.click(function(event) {
		// nothing to do here...
	});
}

function initImageUpload(){
	$addImageContainer.click(function(event) {
		$addImageInput.trigger('click');
	});

	$addImageInput.change(function(event) {
		var files = event.target.files;
		if(files.length){
			var file = files[0];

			var $img = $("<img id='img-upload' exif='true'/>");
			// var src = window.URL.createObjectURL(file);
			$imageContainer.empty();
			$imageContainer.append($img);
			showError("image", false);
			$imageContainer.fadeIn('slow', function() {
				$addImageText.html("Bild</br>ändern");
			});
			
			var reader = new FileReader();
    		reader.onload = (function(aImg){ 
    			return function(e){ 
    				$(aImg).attr('src', e.target.result); 
    			}; 
    		})($img);
    		reader.readAsDataURL(file);

    		loadImage.parseMetaData(
			    file,
			    function (data) {
			    	extractImageData(data);		    	
			    },
			    {
			        disableExifGps: false
			    }
			);

		}
	});

	$form.on('invalid', function(event) {
		// var invalid_fields = $(this).find('[data-invalid]');
    	checkForImage();
    	// checkForTags();
	}).on('valid', function(event) {
		if(checkForImage()){
			event.preventDefault();
			var data = {};
			var title = $.trim($("input#title").val());
			var artist = $.trim($("input#artist").val());
			var transcription = $.trim($("input#transcription").val());
			var location = $.trim($locationInput.find('option:selected').val());
			var sex = $.trim($("input:radio[name=sex]:checked").val());
			var tags = _.pluck($tagList.children('.tag-active'), 'innerHTML');
			var type = $.trim($("#type").find('option:selected').val());

			if(location.length > 2){
				data['stuff&location'] = location;
			}
			if(transcription.length > 2){
				data['transcription'] = transcription;
			}
			if(artist.length > 2){
				data['artist'] = artist;
			}
			if((latitude_g != -1000 && longitude_g != -1000)){
				data['latitude'] = latitude_g;
				data['longitude'] = longitude_g;
			}
			if(tags.length > 0){
				data['tags'] = tags;
			}

			data['sex'] = sex;
			data['title'] = title;
			data['type'] = type;

			ImgurManager.addEntry(uploadImage, data);
		}
	});

	$form.on('submit', function(event) {
		event.preventDefault();
	});
}

function extractImageData(data){
	if(data){
		var latitude = data.exif.getText('GPSLatitude');
		var longitude = data.exif.getText('GPSLongitude');
		if((latitude != 'undefined') && (longitude != 'undefined')){
			latitude_g = latitude;
			longitude_g = longitude;
			ImgurManager.getLocations(retrieveLocations, latitude_g, longitude_g);
			return;
		}
	}
	ImgurManager.getDefaultLocations(retrieveLocations);
}

function uploadImage(entryid){
	var file = $addImageInput[0].files[0];
	ImgurManager.uploadImage(uploadImageResult, entryid, file);
}

function uploadImageResult(uploadSuccesfull, entryid){
	if(uploadSuccesfull){

	}else{
		ImgurManager.deleteEntry(entryid);
	}
}

/*
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
*/

function retrieveLocations(locData){
	$locationInput.children().first().html("Wähle einen Ort aus...");
	$locationInput.prop('disabled', false);
	var locations = locData[0]['locations'];
	var content = "";
	if(locations == null || locations.length < 1){
		return;
	}else{
		for(var i = 0; i < locations.length; i++){
			var location = locations[i];
			content += "<option value='" + location + "'>" + location + "</option>";
		}
		$locationInput.append(content);
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
	ImgurManager.getSystemTags(appendSystemTags);
	ImgurManager.getUserTags(appendUserTags);
}

function appendSystemTags(tagData){
	if(tagData == null){

	}else{
		var tags = _.pluck(tagData, 'tag');
		for(var i = 0; i < tags.length; i++){
			$tagItem = $("<li>" + tags[i] + "</li>");
			$tagItem.click(function(event) {
				tagFunctionality($(this));
			});
			$tagList.append($tagItem);
		}
	}
}

function appendUserTags(tagData){
	if(tagData == null){

	}else{
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