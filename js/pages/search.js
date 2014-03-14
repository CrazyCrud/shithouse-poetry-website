var $searchLink = $("#link-search");
var $overlayBackground;
var $overlay;
var $backButton;
var $submitButton;
var $searchInput;
var autocompleteList = [];
var tags = [];
var types = [];
var sex = ["Männer", "Frauen", "Unisex"];

var searchTemplate = null; 

$(document).ready(function() {
	searchTemplate = _.template($("script.search-template").html());

	$searchLink.click(function(event) {
		ImgurManager.getSystemTags(getSearchTags);
		ImgurManager.getUserTags(getSearchTags);
		ImgurManager.getTypes(getSearchTypes);
		appendSearchOverlay();
	});
});

function appendSearchOverlay(){
	createOverlayBackground();

	$("body").append(searchTemplate());

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
	});

	$submitButton.click(function(event) {
		if($searchInput.val().length > 0){
			var url = 'search.php?query=' + $.trim($searchInput.val());
			if($filterSwitch.is(":checked")){
				var filterFor = $("input:radio[name=filtertype]:checked").val();
				url += '&type=' + filterFor;
			}
			window.location = url;
		}
	});

	$filterSwitch.change(function(event) {
		if($(this).is(":checked")){
			$filterTypesContainer.fadeIn(400, function(){
				autocompleteList = tags;
				$searchInput.autocomplete(
				{
		        	minLength: 0,
		        	source: autocompleteList,
			        select: function(event, ui) {
			          	$searchInput.val(ui.item.value);
			          	return false;
			        }
		    	});
		    	$searchInput.autocomplete("enable");
		    	$(".ui-autocomplete").addClass('search-autocomplete');

		    	$("input:radio[name=filtertype]").change(function(event) {
		    		var filterFor = $("input:radio[name=filtertype]:checked").val();
		    		console.log(filterFor);
					if(filterFor == "tag"){
						autocompleteList = tags;
					}else if(filterFor == "type"){
						autocompleteList = types;
					}else{
						autocompleteList = sex;
					}
					$searchInput.autocomplete("disable");
					$searchInput.autocomplete(
					{
			        	minLength: 0,
			        	source: autocompleteList,
				        select: function(event, ui) {
				          	$searchInput.val(ui.item.value);
				          	return false;
				        }
			    	});
					$searchInput.autocomplete("enable");
		    		$(".ui-autocomplete").addClass('search-autocomplete');
		    	});
			});
			
		}else{
			$filterTypesContainer.fadeOut(400);
			$searchInput.autocomplete("disable");
		}
	});

	$searchInput.on('keypress', function(event) {
		var code = event.which;
		if(code == 13){
			$submitButton.trigger('click');
		}
	});
}

function getSearchTags(tagData){
	if(_.isUndefined(tagData) || _.isNull(tagData)){
		return;
	}else{
		if(_.isEmpty(tagData)){
			return;
		}else{
			tags = $.merge(tags, _.pluck(tagData, 'tag'));
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
			types = $.merge(types, _.pluck(typeData, 'name'));
		}
	}
}





