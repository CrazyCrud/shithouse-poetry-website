var $searchLink = $("#link-search");
var $overlayBackground;
var $overlay;
var $backButton;
var $submitButton;
var $searchInput;
var tags = [];

var searchTemplate = null; 

$(document).ready(function() {
	searchTemplate = _.template($("script.search-template").html());

	$searchLink.click(function(event) {
		ImgurManager.getSystemTags(getSearchTags);
		ImgurManager.getUserTags(getSearchTags);
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

	$backButton.click(function(event) {
		removeOverlayBackground();
		$overlay.remove();
	});

	$submitButton.click(function(event) {
		if($searchInput.val().length > 2){
			window.location = 'search.php?query=' + $.trim($searchInput.val());
		}
	});

	$filterSwitch.change(function(event) {
		console.log(tags);
		if($(this).is(":checked")){
			$searchInput.autocomplete(
			{
	        	minLength: 0,
	        	source: tags,
		        select: function(event, ui) {
		          	$searchInput.val(ui.item.value);
		          	return false;
		        }
	    	});
		}else{
			$searchInput.autocomplete( "disable" );
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





