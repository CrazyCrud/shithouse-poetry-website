var $searchLink = $("#link-search");
var $overlayBackground;
var $overlay;
var $backButton;
var $submitButton;
var $searchInput;
var autocompleteList = [];
var tags = [];
var types = [];
var locations = [];
var sex = ["Männertoilette", "Frauentoilette", "Unisex-Toilette"];

var searchTemplate = null; 

$(document).ready(function() {
	searchTemplate = _.template($("script.search-template").html());

	$searchLink.click(function(event) {
		ImgurManager.getTags(getSearchTags);
		// ImgurManager.getUserTags(getSearchTags);
		ImgurManager.getTypes(getSearchTypes);
		ImgurManager.getUsedLocations(getSearchLocations);
		appendSearchOverlay();
	});
});

function appendSearchOverlay(){
	createOverlayBackground();
	$("body").append(searchTemplate());
	document.body.style.overflow = "hidden";

	 

	$overlay = $(".overlaycontent");
	$searchLink = $("#link-search");
	$backButton = $("#back-button");
	$submitButton = $("#search-button");
	$searchInput = $("#search-input");
	$filterSwitch = $("#myonoffswitch");
	$filterTypesContainer = $(".filter-type-container");

	$backButton.click(function(event) {
		removeOverlayBackground();
		$overlay.remove();
		document.body.style.overflow = "auto";
	});

	$submitButton.click(function(event) {
		if($searchInput.val().length > 0){
			var url = 'search.php?query=' + escape($.trim($searchInput.val()));
			window.location = url;
		}else if($filterSwitch.is(":checked")){
			var filterFor = $("input:radio[name=filtertype]:checked").val();
			var values = [];
			$.each($('#tag-search-list .tag-active').children('span'), function() {
				 values[values.length] = $(this).html();
			});
			if(values.length > 0){
				var url = 'search.php?type=' + escape(filterFor) + "&values=" + escape(values);
				window.location = url;
			}
		}
	});

	$filterSwitch.change(function(event) {
		if($(this).is(":checked")){
			$searchInput.animate({'opacity': 0}, 700);
			$filterTypesContainer.fadeIn(400, function(){
				$searchInput.prop('disabled', true);
				$searchInput.attr('placeholder', '');
				$("#tag-search-list").hide();
				appendSearchTags($("input:radio[name=filtertype]:checked").val());

				$submitButton.html("Filtern");

		    	$("input:radio[name=filtertype]").change(function(event) {
		    		var filterFor = $("input:radio[name=filtertype]:checked").val();
		    		$("#tag-search-list").hide();
		    		$("#tag-search-list").empty();
		    		if(filterFor == "sex"){
		    			appendSearchTags(filterFor, true);
		    		}else{
		    			appendSearchTags(filterFor, false);
		    		}
		    	});
			});
			
		}else{
			$("#tag-search-list").empty();
			$submitButton.html("Suchen");
			$searchInput.attr('placeholder', 'Suche nach...');
			$searchInput.animate({'opacity': 1}, 400);
			$searchInput.prop('disabled', false);
			$filterTypesContainer.fadeOut(400);
		}
	});

	$searchInput.on('keypress', function(event) {
		var code = event.which;
		if(code == 13){
			$submitButton.trigger('click');
		}
	});
}

function appendSearchTags(which, singleValue){
	switch(which){
		case "tag":
			for(var i = 0; i < tags.length; i++){
				if(!_.isUndefined(tags[i])){
					appendSingleSearchTag(tags[i], singleValue);
				}
			}
			break;
		case "type":
			for(var i = 0; i < types.length; i++){
				if(!_.isUndefined(types[i])){
					appendSingleSearchTag(types[i], singleValue);
				}
			}
			break;
		case "sex":
			for(var i = 0; i < sex.length; i++){
				if(!_.isUndefined(sex[i])){
					appendSingleSearchTag(sex[i], singleValue);
				}
			}
			break;
		case "location":
			for(var i = 0; i < locations.length; i++){
				if(!_.isUndefined(locations[i])){
					appendSingleSearchTag(locations[i], singleValue);
				}
			}
			break;
	}
	$("#tag-search-list").fadeIn();
}

function appendSingleSearchTag(tag, singleValue){
	var $tagItem = $("<li><span>" + tag + "</span></li>");

	$tagItem.click(function(event) {
		searchTagFunctionality($(this), singleValue);
	});

	$("#tag-search-list").append($tagItem);
}

function searchTagFunctionality(tag, singleValue){
	var $tag = $(tag);
	if($tag.hasClass('tag-active')){
		$tag.removeClass('tag-active');
		$tag.children('span').removeClass('tag-active-text');
	}else{
		if(singleValue){
			$.each($('.tag-active'), function() {
				$(this).removeClass('tag-active');
			});
		}
		$tag.addClass('tag-active');
		$tag.children('span').addClass('tag-active-text');
	}
}

function getSearchTags(tagData){
	if(_.isUndefined(tagData) || _.isNull(tagData)){
		return;
	}else{
		if(_.isEmpty(tagData)){
			return;
		}else{
			tags = _.pluck(tagData, 'tag');
			tags = tags.slice(0, 10);
		}
	}
}

function getSearchTypes(typeData){
	if(_.isUndefined(typeData) || _.isNull(typeData)){
		return;
	}else{
		if(_.isEmpty(typeData)){
			return;
		}else{
			types = _.pluck(typeData, 'name');
		}
	}
}

function getSearchLocations(locationData){
	if(_.isUndefined(locationData) || _.isNull(locationData)){
		return;
	}else{
		if(_.isEmpty(locationData)){
			return;
		}else{
			locations = _.pluck(locationData, 'location');
		}
	}
}





