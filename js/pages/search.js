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

	$backButton.click(function(event) {
		removeOverlayBackground();
		$overlay.remove();
	});

	$submitButton.click(function(event) {
		if($searchInput.val().length > 2){
			window.location = 'search.php?query=' + $.trim($searchInput.val());
		}
	});

	$searchInput.on('keypress', function(event) {
		var code = event.which;
		if(code == 13){
			$submitButton.trigger('click');
		}
	});
}





