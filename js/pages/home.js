var currentOrder = null;
var NO_SINGLE_IMAGE = "Wir können dir leider kein weiteres Bild liefern";
var NO_IMAGES = "Wir können dir leider keine weiteren Bilder mehr liefern";

var requests = [];

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
var $transcriptionTou = $("#transcription-tou");
var $mainheader = $("#mainheader");
var $loadingSpinner = $("#loading-spinner");

$(document).ready(function() {
	$(window).scroll(function(event) {
		if($(window).scrollTop() > 100){
			$homeButton.css('visibility', 'visible');
		}else{
			$homeButton.css('visibility', 'hidden');
		}
	});
	setupTabFunctionality();
	setupVoting();
	setupTranscribing();
	setupImageClick();
	setupCurrentTab();
});


$(document).on("complete", function(){
	setupOnce();
	refreshWaypoints();
});

$(document).on("sizesmall", function(){
	if(getActiveState() == "transcribe" || getActiveState() == undefined){
		$newLink.trigger('click');
	}	
});

$(document).on("votingend", function(){
	clearRequests();
	var state = getActiveState();
	if(state == "vote"){
		getVoteEntries();
	}else if(state == "transcribe"){
		getUntranscribedEntries();
	}	
});

function setupTabFunctionality(){
	GalleryView.init($imageContainer);
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
	loadingSpinner(true);
	setActive($hotLink.parent("dd"));
	window.location.hash="hot";
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
	loadingSpinner(true);
	setActive($newLink.parent("dd"));
	window.location.hash="new";
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
	loadingSpinner(false);
	setActive($voteLink.parent("dd"));
	window.location.hash="vote";
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
	loadingSpinner(false);
	setActive($transcribeLink.parent("dd"));
	window.location.hash="transcribe";
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
		$(this).blur();
		lazyVoteClick(false);
	});
	$downVote.click(function(event) {
		event.preventDefault();
		$(this).blur();
		lazyVoteClick(true);
	});
}

function setupTranscribing(){
	if(user&&user.status&&user.status!=4&&user.status!="4"){
		$transcriptionTou.css("display","none");
	}
	$skipTranscription.click(function(event) {
		$(this).blur();
		lazyTranscribeClick(event);
	});
	$submitTranscription.click(function(event) {
		$(this).blur();
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
				if(getActiveState() == "transcribe"){
					getUntranscribedEntries();
				}else{
					getEntries();
				}				
			}		
		}
	}, { offset: 'bottom-in-view'
	});
	if(getActiveState() == "vote" || getActiveState() == "transcribe"){
		$.waypoints("disable");
	}
}

function setupCurrentTab(){
	var url = document.URL;
	
	if(url.indexOf("#hot") != -1){
		handleHotClick();
	}else if(url.indexOf("#vote") != -1){
		handleVoteClick();
	}else if(url.indexOf("#transcribe") != -1){
		handleTranscribeClick();
	}else{
		handleNewClick();
	}
}

var setupOnce = _.once(setupInfiniteScroll);


function appendMessage(message){
	loadingSpinner(false);
	message = message || "Es gibt leider keine weiteren Bilder mehr";
	$(".message").html(message);
	$(".message").addClass('label secondary');
}

function loadingSpinner(bitch){
	if(bitch){
		$loadingSpinner.css('display', 'inline-block');
	}else{
		$loadingSpinner.css('display', 'none');
	}
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
	if($("#images").length < 1){
		return;
	}
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
	if(e.target.id == "transcription-submit"){
		if($transcriptionTou.css("display")!="none"){
			if(!$('#transcription-tou-checkbox').prop("checked")){
				$transcriptionTou.addClass("error");
				return;
			}
			$transcriptionTou.removeClass("error");
		}
		var entryid = $imageContainer.find('.jg-image').find('a').attr('title');
		var transcription = $transcribeInput.val();
		if(_.isUndefined(transcription)){
			return;
		}
		if(transcription.length > 1){
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
	if(_.isUndefined($tabsContainer.children('.active').find('a').html())){
		return undefined;
	}
	return $tabsContainer.children('.active').find('a').html().toLowerCase();
}

function getEntries(orderby){
	var order = orderby || currentOrder;
	if(order == ImgurManager.OrderBy.properties[ImgurManager.OrderBy.DATE].name){
		setRequest("new");
	}else{
		setRequest("hot");
	}
	ImgurManager.getEntries(computeEntries, order, GalleryView.getLastEntry());
}

function getVoteEntries(){
	setRequest("vote");
	ImgurManager.getRandomEntries(computeVoteEntries);
}

function getUntranscribedEntries(){
	setRequest("transcribe");
	ImgurManager.getRandomUnstranscribedEntries(computeTranscribeEntries);
}

function computeEntries(entries, orderby){
	if(ImgurManager.OrderBy.properties[ImgurManager.OrderBy.DATE].name == orderby){
		if(!isLatestRequest("new")){
			return;
		}
	}else{
		if(!isLatestRequest("hot")){
			return;
		}
	}
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
	if(!isLatestRequest("transcribe")){
		return;
	}
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
	if(!isLatestRequest("vote")){
		return;
	}
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

function setRequest(which){
	requests[requests.length] = which;
	if(requests.length > 3){
		requests = requests.slice(1);
	}
}

function isLatestRequest(which){
	var lastRequest = _.last(requests);
	if(_.isUndefined(lastRequest)){
		return true;
	}
	if(_.last(requests) == which){
		return true;
	}else{
		return false;
	}
}

function addRating(entryid, rating){
	ImgurManager.addRating(requestRating, entryid, rating);
}

function addTranscribtion(entryid, transcription){
	if(!loggedIn())
		createDummy();
	else{
		ImgurManager.updateTranscription(GalleryView.loadSingleImage, entryid, transcription);
		$transcribeInput.val("");
	}
}

function requestRating(rating){
	var currentEntry = GalleryView.getEntry();
	if(currentEntry == null || _.isUndefined(currentEntry.rating) ||
		_.isUndefined(currentEntry.rating)){
		GalleryView.loadSingleImage();
		return;
	}else{
		currentEntry.ratingcount += 1;
		var ratingMeasure = parseFloat(1/currentEntry.ratingcount);
		currentEntry.rating *= (1-ratingMeasure);
		currentEntry.rating += (ratingMeasure * rating);
		$("#outer-rating").css('visibility', 'visible');
		var r = currentEntry.rating;
		if(!r)r=0;
		var i = parseFloat(r);
		var j = (1+i)*50;
		var newWidth = j + "%";
		$("#inner-rating").css('width', newWidth);
		$("#outer-rating").animate({'width': '100px'}, 300);
		$("#rating-count").html("(" + currentEntry.ratingcount + ")");
		$upVote.unbind('click');
		$downVote.unbind('click');
		_.delay(loadNextEntry, 2000);
	}
}

function loadNextEntry(){
	$("#outer-rating").css('visibility', 'hidden');
	$("#outer-rating").css('width', '0');
	$("#rating-count").html("");
	setupVoting();
	GalleryView.loadSingleImage();
}

function createDummy(){
	message("Speichern", "Wir legen f&uuml;r dich einen Account an damit du deine Transkriptionen sp&auml;ter bearbeiten kannst.<br/>Bitte habe etwas Gedult.");
	user = {};
	user.password = guid();
	ImgurManager.createUser(onDummyCreated, "", user.password, "");
}

function onDummyCreated(data){
	if(data==null){
		message("Oops!", "Leider konnte wir keinen Account anlegen um Transkriptionen hinzuzuf&uuml;gen.<br/>Wende dich an einen Systemadministrator oder versuche es sp&auml;ter nochmal.");
	}else{
		ImgurManager.loginUser(onDummyLoginSuccess, data, user.password);
	}
}

function onDummyLoginSuccess(data){
	if(data==null){
		message("Oops!", "Leider konnte wir keinen Account einloggen um Transkriptionen hinzuzuf&uuml;gen.<br/>Wende dich an einen Systemadministrator oder versuche es sp&auml;ter nochmal.");
	}else{
		ImgurManager.getUserAuth(onGetUser, data);
	}
}

function onGetUser(data){
	$(".error-dialog").dialog("close");
	$(".error-dialog").remove();
	saveUser(data);
	var entryid = $imageContainer.find('.jg-image').find('a').attr('title');
	var transcription = $transcribeInput.val();
	ImgurManager.updateTranscription(GalleryView.loadSingleImage, entryid, transcription);
	$transcribeInput.val("");
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