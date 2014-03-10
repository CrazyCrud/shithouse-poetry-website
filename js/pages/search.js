var $searchLink = $("#link-search");
var $overlayBackground;
var $overlay;
var $backButton;
var $submitButton;
var $searchInput;

var searchTemplate = null; 

$(document).ready(function() {
	searchTemplate = _.template($("script.search-template").html());

	$searchLink.click(function(event) {
		appendOverlay();
	});
});

function appendOverlay(){
	createOverlayBackground();
	$("body").append(searchTemplate());

	$overlay = $(".overlaycontent");
	$searchLink = $("#link-search");
	$backButton = $("#back-button");
	$submitButton = $("#search-button");
	$searchInput = $("#search-input");

	$backButton.click(function(event) {
		removeOverlayBackground();
		$overlay.remove();
	});

	$submitButton.click(function(event) {
		if($searchInput.val().length > 2){
			
		}
	});
}





