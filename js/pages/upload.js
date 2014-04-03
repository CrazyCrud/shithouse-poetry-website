var latitude_g = -1000;
var longitude_g = -1000;

var entry = {};
var crop;
var $imageContainer = $(".image-container");
var $addImageContainer = $(".add-image-container");
var $addImageText = $(".add-image-text");
var $addLocationContainer = $(".add-location-container");
var $addImageInput = $("input.file-input");
var $customTagInput = $("#custom-tag");
var $locationInput = $("select#location");
var $typeInput = $("select#type");
var $tagsContainer = $(".entry-tags-container");
var $tagList = $("#entry-tag-list");
var $uploadSubmit = $("#upload-submit");
var $form = $(".upload-forms-container > form");
var $imageError = $(".image-error-container");
var $tagError = $(".tag-error");
var $locError = $(".location-error");

$(document).ready(function() {
	initUpload();
	initImageUpload();
	getType();
	getTags();
	initDialog();
	getLocation();
});

function getLocation(){
	ImgurManager.getMyLocationFromIP(function(loc){
		latitude_g = loc[0];
		longitude_g = loc[1];
	});
}

function cropMe(target){
	var target = $(target.currentTarget);
	crop = $.Jcrop(target);
	var bounds = crop.getBounds();
	var x = 10;
	var y = 10;
	var w = bounds[0]-10;
	var h = bounds[1]-10;
	crop.setSelect([x,y,w,h]);
}

function computeCropBounds(){
	var selection = crop.tellSelect();
	var bounds = crop.getBounds();
	var result = {};
	result.x = 100*selection.x/bounds[0];
	result.y = 100*selection.y/bounds[1];
	result.w = 100*selection.w/bounds[0];
	result.h = 100*selection.h/bounds[1];
	return result;
}

function initEdit(){
	if(user&&user.status&&user.status!="4"&&user.status!=4){
		$("#tou").remove();
	}
	if(id < 1){
		$(".add-image-container").css("display","block");
		return;
	}else{
		document.title = "Bearbeiten";
		$uploadSubmit.html("Speichern");
		ImgurManager.getEntry(fillUI, id);
		$(".add-image-container").css("display","none");
		$("#rights").remove();
	}
}

function fillUI(e){
	entry = e;
	var $img = $('<img id="img-upload" exif="true" src="'+entry.images[0].thumbnail+'"/>');
	$imageContainer.append($img);
	$imageContainer.css("display","block");
	$("#title").val($('<p>'+entry.title+'</p>').text());
	$("#transcription").val($('<p>'+entry.information[0].transcription+'</p>').text());
	$("#type option[value="+entry.typename.replace(/[^a-zA-Z0-9]/g,"_")+"]").attr("selected", "selected");
	$(".add-sex-container input[value=U]").attr("checked", true);
	$(".add-sex-container input[value="+entry.sex.toUpperCase()+"]").attr("checked", true);
	ImgurManager.getLocations(retrieveLocations, entry.information[0].latitude, entry.information[0].longitude);
	var $loc = $("#location option[value="+entry.information[0].location.replace(/[^a-zA-Z0-9]/g,"")+"]");
	if($loc.length!=0)$loc.attr("selected", "selected");	
	else{
		var content = "<option value='" + entry.information[0].location.replace(/[^a-zA-Z0-9]/g,"") + "'>" + entry.information[0].location + "</option>";
		var $content = $(content);
		$content.attr("selected","selected");
		$locationInput.append($content);
	}

	$("#artist").val($('<p>'+entry.information[0].artist+'</p>').text());
	var $tagElements = $tagList.find('li span');
	var availableTags = _.pluck($tagElements, 'innerHTML');

	for(var i = 0; i < availableTags.length; i++){
		availableTags[i] = availableTags[i].toLowerCase();
	}

	for(var i=0; i<entry.tags.length; i++){
		var tagText = $('<p>'+entry.tags[i].tag+'</p>').text().toLowerCase();
		var index = _.indexOf(availableTags, tagText);
		if(index == -1){
			appendSingleTag(entry.tags[i].tag, true, entry.tags[i].status!=1);
		}else{
			$($tagElements[index]).parent('li').addClass('tag-active');
			$($tagElements[index]).addClass('tag-active-text');
		}
	}
}

function initDialog(){
	if(!$("<div></div>").dialog){
		
	}
}

function saveImage(){
	message("Speichern", "Bild wird gespeichert, bitte warten ...");
	var data = {};
	var title = $.trim($("input#title").val());
	var artist = $.trim($("input#artist").val());
	var transcription = $.trim($("input#transcription").val());
	var location = $.trim($locationInput.find('option:selected').html());
	var sex = $.trim($("input:radio[name=sex]:checked").val());

	var tags = _.pluck($tagList.find('.tag-active-text'), 'innerHTML');

	tags = tags.join(',');

	var type = $.trim($("#type").find('option:selected').html());

	if(location.length > 2){
		data['location'] = location;
	}
	if(($locationInput.find('option:selected').html()==$locationInput.children()[0].innerHTML)){
		data['location'] = "";
	}
	if(transcription.length > 2){
		data['transcription'] = transcription;
	}
	if(artist.length > 2){
		data['artist'] = artist;
	}
	if((latitude_g != -1000 && longitude_g != -1000)){
		data['lat'] = latitude_g;
		data['long'] = longitude_g;
	}
	if(tags.length > 0){
		data['tags'] = tags;
	}

	data['sex'] = sex;
	data['title'] = title;
	data['type'] = type;

	if(entry.id){
		data["entryid"] = entry.id;
		ImgurManager.updateEntry(function(){
			window.location = "details.php?id="+entry.id;
		}, data);
	}else{
		ImgurManager.addEntry(uploadImage, data);
	}
}

function createDummy(){
	message("Speichern", "Wir legen f&uuml;r dich einen Account an damit du deine Bilder sp&auml;ter bearbeiten kannst.<br/>Bitte habe etwas Gedult.");
	user = {};
	user.password = guid();
	ImgurManager.createUser(onDummyCreated, "", user.password, "");
}

function onDummyCreated(data){
	if(data==null){
		message("Oops!", "Leider konnten wir keinen Account anlegen um Bilder hochzuladen.<br/>Wende dich an einen Systemadministrator oder versuche es sp&auml;ter nochmal.");
	}else{
		ImgurManager.loginUser(onLoginDummmySuccess, data, user.password);
	}
}

function onLoginDummmySuccess(data){
	if(data==null){
		message("Oops!", "Leider konnten wir keinen Account einloggen um Bilder hochzuladen.<br/>Wende dich an einen Systemadministrator oder versuche es sp&auml;ter nochmal.");
	}else{
		ImgurManager.getUserAuth(onGetUser, data);
	}
}

function onGetUser(data){
	saveUser(data);
	saveImage();
}

function initUpload(){
	$form.on('invalid', function(event) {
    	checkForImage();
	}).on('valid', function(event) {
		event.preventDefault();
		if(checkForImage()){
			if(loggedIn())
				saveImage();
			else
				createDummy();
		}
	});

	$form.bind("keyup keypress", function(e) {
		var code = e.keyCode || e.which; 
		if (code  == 13) {               
			e.preventDefault();
			return false;
	  	}
	});

	$form.on('submit', function(event) {
		event.preventDefault();
	});

	$customTagInput.bind("keyup", function(event) {
        var code = event.which;
        if(code == 13 || code == 9 || code == 188 || code == 186 || code == 190){
        	var text = $.trim($(this).val());
        	text = text.replace(",","");
        	text = text.replace(";","");
        	if(text.length > 2){
        		var $tagElements = $tagList.find('li span');
				var availableTags = _.pluck($tagElements, 'innerHTML');
        		if(_.indexOf(availableTags, text.toLowerCase()) == -1){
        			appendSingleTag(text, true, true);
        		}
        	}
        	$(this).val('');
        }
  	});

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
			$img.load(cropMe);
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
}

function extractImageData(data){
	if(data && data.exif){
		var latitude = data.exif.getText('GPSLatitude');
		var longitude = data.exif.getText('GPSLongitude');
		if((latitude != 'undefined') && (longitude != 'undefined')){
			latitude_array = latitude.split(',');
			longitude_array = longitude.split(',');
			latitude = parseFloat(parseInt(latitude_array[0]) + 
				parseFloat(latitude_array[1] / 60) + parseFloat(latitude_array[2] / 3600));
			longitude = parseFloat(parseInt(longitude_array[0]) + 
				parseFloat(longitude_array[1] / 60) + parseFloat(longitude_array[2] / 3600));
			
			latitude_g = latitude;
			longitude_g = longitude;

			ImgurManager.getLocations(retrieveLocations, latitude, longitude);
			return;
		}
	}
	ImgurManager.getDefaultLocations(retrieveLocations);
}

function uploadImage(entryid){
	var file = $addImageInput[0].files[0];
	ImgurManager.uploadImage(uploadImageResult, entryid, file, computeCropBounds());
}

function uploadImageResult(uploadSuccesfull, entryid){
	if(uploadSuccesfull){
		window.location = "details.php?id="+entryid;
	}else{
		error("Bild konnte nicht hochgeladen werden.");
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
	for(var i=1; i<locData.length; i++){
		$.merge(locations, locData[i]["locations"]);
	}
	if(locations == null || locations.length < 1){
		return;
	}else{
		locations.sort();
		for(var i = 0; i < locations.length; i++){
			var location = locations[i];
			var content = "<option value='" + location.replace(/[^a-zA-Z0-9]/g,"") + "'>" + location + "</option>";
			var $content = $(content);
			if(entry.information && entry.information[0]){
				if(entry.information[0].location == location){
					$content.attr("selected","selected");
				}
			}
			$locationInput.append($content);
		}
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

function getType(){
	ImgurManager.getTypes(appendTypes);
}

function appendTypes(typeData){
	if(typeData == null){

	}else{
		var types = _.pluck(typeData, 'name');
		var typesDesc = _.pluck(typeData, 'description');

		for(var i = 0; i < types.length; i++){
			var type = types[i];
			var typeDesc = typesDesc[i];
			var content = "<option value='" + type.replace(/[^a-zA-Z0-9]/g,"_") + "' title='" + typeDesc + "'>" + type + "</option>";
			var $content = $(content);
			if(entry.typename){
				if(entry.typename == type){
					$content.attr("selected","selected");
				}
			}
			$typeInput.append($content);
		}
	}
}

function getTags(){
	ImgurManager.getSystemTags(appendSystemTags);
	ImgurManager.getUserTags(appendUserTags);
}

var editOnce = _.after(2, initEdit);

function appendSystemTags(tagData){
	if(tagData == null){

	}else{
		var tags = _.pluck(tagData, 'tag');
		for(var i = 0; i < tags.length; i++){
			appendSingleTag(tags[i], false, false);
		}
	}
	editOnce();
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

		$customTagInput.autocomplete(
			{
	        	minLength: 0,
	        	source: tags,
		        select: function(event, ui) {
		        	var text = ui.item.value;
		          	appendSingleTag(text, true, true);
		          	$customTagInput.val("");
		          	return false;
		        }
	    	});
	}
	editOnce();
}

function appendSingleTag(tag, state, isUserTag){
	var $tagItem;
	if(isUserTag){
		$tagItem = $("<li><span class='tag-active-text'>" + tag + "</span><i class='icon-cancel'></i></li>");
		$tagItem.addClass('tag-user');
		$tagItem.addClass('tag-active');
	}else{
		$tagItem = $("<li><span>" + tag + "</span></li>");
	}

	if(state && !isUserTag){
		$tagItem.addClass('tag-active');
		$tag.children('span').addClass('tag-active-text');
	}

	if(isUserTag){
		$tagItem.children('i').click(function(event) {
			$(this).parent('li').remove();
		});
	}else{
		$tagItem.click(function(event) {
			tagFunctionality($(this));
		});
	}

	$tagList.append($tagItem);
}

function tagFunctionality(tag){
	var $tag = $(tag);
	if($tag.hasClass('tag-active')){
		$tag.removeClass('tag-active');
		$tag.children('span').removeClass('tag-active-text');
	}else{
		$tag.addClass('tag-active');
		$tag.children('span').addClass('tag-active-text');
	}
}

function error(message){
	$(".error-dialog").dialog("close");
	$(".error-dialog").remove();
	var $dialog = $('<div class="error-dialog">'+message+"</div>");
	$dialog.dialog({
		modal: true,
		width: "80%",
		title: "Oops!",
		close : function(){
			window.location = "index.php";
		}
	});
}

function message(title, message){
	$(".error-dialog").dialog("close");
	$(".error-dialog").remove();
	var $dialog = $('<div class="error-dialog">'+message+"</div>");
	$dialog.dialog({
		modal: true,
		width: "80%",
		title: title
	});
}