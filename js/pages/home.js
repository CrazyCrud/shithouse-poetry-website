var currentOrder = null;
var NO_SINGLE_IMAGE = "Wir können dir leider kein weiteres Bild liefern";
var NO_IMAGES = "Wir können dir leider keine weiteren Bilder mehr liefern";

var $homeButton = $("#link-home");
var $infiniteContainer = $(".infinite-container");
var $imageContainer = $("#images");
var $tabsContainer = $(".tabs");
var $hotLink = $("#tab-hot");
var $newLink = $("#tab-new");
var $voteLink = $("#tab-vote");
var $transcribeLink = $("#tab-transcribe");
var $votingContainer = $(".vote-container");
var $transcribeContainer = $(".transcribe-container");
var $upVote = $("#up-vote");
var $downVote = $("#down-vote");
var $transcribeInput = $("#transcription-input");
var $submitTranscription = $("#transcription-submit");
var $skipTranscription = $("#skip-transcription");
var $mainheader = $("#mainheader");

$(document).ready(function() {
	setupTabFunctionality();
	setupVoting();
	setupTranscribing();
	setupImageClick();
	getEntries();
});


$(document).on("complete", function(){
	console.log("complete");
	setupOnce();
	refreshWaypoints();
});

$(document).on("sizesmall", function(){
	if(getActiveState() == "transcribe" || getActiveState() == undefined){
		$newLink.trigger('click');
	}	
});

$(document).on("votingend", function(){
	console.log("votingend");
	clearRequests();
	var state = getActiveState();
	if(state == "vote"){
		getVoteEntries();
	}else if(state == "transcribe"){
		getUntranscribedEntries();
	}	
});

function setupTabFunctionality(){
	var lazyHotClick = _.throttle(handleHotClick, 2000);
	var lazyNewClick = _.throttle(handleNewClick, 2000);
	var lazyVoteClick = _.throttle(handleVoteClick, 2000);
	var lazyTranscribeClick = _.throttle(handleTranscribeClick, 2000);
	$hotLink.click(lazyHotClick);
	$newLink.click(lazyNewClick);
	$voteLink.click(lazyVoteClick);
	$(document).on("click", "#tab-transcribe", lazyTranscribeClick);
}

function handleHotClick(){
	deleteMessage();
	GalleryView.setMaxwidth(true);
	setActive($hotLink.parent("dd"));
	enableInfiniteScroll();
	disableVoting();
	disableTranscribing();
	setOrder(ImgurManager.OrderBy.properties[ImgurManager.OrderBy.RATING].name);
	clearRequests();
	getEntries(ImgurManager.OrderBy.properties[ImgurManager.OrderBy.RATING].name);
}

function handleNewClick(){
	deleteMessage();
	GalleryView.setMaxwidth(true);
	setActive($newLink.parent("dd"));
	enableInfiniteScroll();
	disableVoting();
	disableTranscribing();
	setOrder(ImgurManager.OrderBy.properties[ImgurManager.OrderBy.DATE].name);
	clearRequests();
	getEntries(ImgurManager.OrderBy.properties[ImgurManager.OrderBy.DATE].name);
}

function handleVoteClick(){
	deleteMessage();
	GalleryView.setMaxwidth(false);
	setActive($voteLink.parent("dd"));
	disableTranscribing();
	disableInfiniteScroll();
	clearRequests();
	if(loggedIn()){
		getVoteEntries();
	}else{
		appendMessage("Bitte melde dich an um Bilder zu bewerten.");
	}
}

function handleTranscribeClick(){
	deleteMessage();
	GalleryView.setMaxwidth(false);
	setActive($transcribeLink.parent("dd"));
	disableInfiniteScroll();
	disableVoting();
	enableTranscribing();
	clearRequests();
	getUntranscribedEntries();
}

function setupImageClick(){
	$(document).on("click", ".jg-image",function(){
		var id = $($(this).find("a")[0]).attr("title");
		window.location = "details.php?id=" + id;
	});
}

function setupVoting(){
	$upVote.click(function(event) {
		event.preventDefault();
		lazyVoteClick(false);
	});
	$downVote.click(function(event) {
		event.preventDefault();
		lazyVoteClick(true);
	});
}

function setupTranscribing(){
	$skipTranscription.click(function(event) {
		lazyTranscribeClick(event);
	});
	$submitTranscription.click(function(event) {
		lazyTranscribeClick(event);
	});
}

function setupInfiniteScroll(){
	var vpTopOffset = $mainheader.height() + $tabsContainer.height();
	$homeButton.click(function(event) {
		event.preventDefault();
		$("html, body").animate({scrollTop: 0}, 400);
	});
	$("html").waypoint(function(direction) {
		if(direction == "down"){
			if($.waypoints('viewportHeight') < $(this).height()){
				console.log("Load more images...");
				if(getActiveState() == "transcribe"){
					getUntranscribedEntries();
				}else{
					getEntries();
				}				
			}		
		}
	}, { offset: 'bottom-in-view'
	});
}

var setupOnce = _.once(setupInfiniteScroll);


function appendMessage(message){
	message = message || "Es gibt leider keine weiteren Bilder mehr";
	$(".message").html(message);
	$(".message").addClass('label secondary');
}

function deleteMessage(){
	$(".message").html("");
	$(".message").removeClass('label secondary round');
}

function enableVoting(){
	$votingContainer.css('display', 'block');
}

function enableTranscribing(){
	$transcribeContainer.css('display', 'block');
}

function handleVote(sucks){
	var rating = 0;
	var entryid = $imageContainer.find('.jg-image').find('a').attr('title');
	if(sucks){
		rating = -1;
	}else{
		rating = 1;
	}
	addRating(entryid, rating);
}

function handleTranscription(e){
	console.log(e.target.id);
	if(e.target.id == "transcription-submit"){
		var entryid = $imageContainer.find('.jg-image').find('a').attr('title');
		var transcription = $transcribeInput.val();
		if(_.isUndefined(transcription)){
			return;
		}
		if(transcription.length > 1){
			$transcribeInput.val("Transkription...");
			addTranscribtion(entryid, transcription);
		}
	}else{
		GalleryView.loadSingleImage();
	}
}

var lazyVoteClick = _.throttle(handleVote, 2000);

var lazyTranscribeClick = _.throttle(handleTranscription);

function disableVoting(){
	$votingContainer.css('display', 'none');
}

function disableTranscribing(){
	$transcribeContainer.css('display', 'none');
}

function enableInfiniteScroll(){
	$("html").waypoint('enable');
}

function disableInfiniteScroll(){
	$("html").waypoint('disable');
}

function refreshWaypoints(){
	$.waypoints('refresh');
}

function setActive(linkContainer){
	$(linkContainer).siblings('dd.active').removeClass('active');
	$(linkContainer).addClass('active');
}

function getActiveState(){
	return $tabsContainer.children('.active').find('a').html().toLowerCase();
}

function getEntries(orderby){
	var order = orderby || currentOrder;
	ImgurManager.getEntries(computeEntries, order, GalleryView.getLastEntry());
}

function getFilteredEntries(){
	ImgurManager.getFilteredEntries(computeEntries, null, GalleryView.getLastEntry());
}

function getVoteEntries(){
	ImgurManager.getRandomEntries(computeVoteEntries);
}

function getUntranscribedEntries(){
	ImgurManager.getRandomUnstranscribedEntries(computeTranscribeEntries);
}

function addRating(entryid, rating){
	ImgurManager.addRating(GalleryView.loadSingleImage, entryid, rating);
}

function addTranscribtion(entryid, transcription){
	ImgurManager.updateTranscription(GalleryView.loadSingleImage, entryid, transcription);
}

function computeEntries(entries){
	if(_.isNull(entries) || _.isEmpty(entries)){
		appendMessage(NO_IMAGES);
	}else{
		GalleryView.init($imageContainer);
		if(GalleryView.appendEntries(entries)){
			GalleryView.loadAllImages();
		}else{
			appendMessage(NO_IMAGES);
		}
	}
}

function computeTranscribeEntries(entries){
	if(_.isNull(entries) || _.isEmpty(entries)){
		disableTranscribing();
		clearScreen();
		appendMessage(NO_SINGLE_IMAGE);
	}else{
		enableTranscribing();
		GalleryView.init($imageContainer);
		GalleryView.appendEntries(entries);
		GalleryView.loadSingleImage();
	}
}

function computeVoteEntries(entries){
	if(_.isNull(entries) || _.isEmpty(entries)){
		disableVoting();
		clearScreen();
		appendMessage(NO_SINGLE_IMAGE);
	}else{
		enableVoting();
		GalleryView.init($imageContainer);
		GalleryView.appendEntries(entries);
		GalleryView.loadSingleImage();
	}
}

function setOrder(newOrder){
	if(newOrder == currentOrder){
		return;
	}
	currentOrder = newOrder;
}

function clearRequests(){
	GalleryView.resetEntries();
	if($imageContainer.children().length > 0){
		clearScreen();
	}
}

function clearScreen(){
	$imageContainer.empty();
}