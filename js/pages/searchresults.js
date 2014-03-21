var $searchTermLabel = $(".search-term");
var $imageContainer = $("#images");
var $loadingSpinner = $("#loading-spinner");
var NO_RESULTS = "Für diesen Suchbegriff gab es leider keine Treffer!";
var NO_MORE_IMAGES = "Wir können dir leider keine weiteren Bilder mehr liefern";

$(document).ready(function() {
	loadingSpinner(true);
	if(query != null){
		setupImageClick();
		ImgurManager.search(computeSearch, query, 0);
	}else if(type != null){
		setupImageClick();
		switch(type){
			case "sex":
				var sex = "";
				if(values == "Männertoilette"){
					sex = "m";
				}else if(values == "Frauentoilette"){
					sex = "w";
				}else{
					sex = "u";
				}
				ImgurManager.searchBySex(computeSearch, sex, null, 0);
				return;
			case "type":
				ImgurManager.searchByType(computeSearch, values, null, 0);
				return;
			case "tag":
				ImgurManager.searchByTag(computeSearch, values, null, 0);
				return;
			case "location":
				ImgurManager.searchByLocation(computeSearch, values, null, 0);
				return;
			default:
				appendMessage(NO_RESULTS);
		}
	}else{
		appendMessage(NO_RESULTS);
	}
});

$(document).on("complete", function(){
	setupOnce();
	$.waypoints('refresh');
});

function setupImageClick(){
	$(document).on("click", ".jg-image",function(){
		var id = $($(this).find("a")[0]).attr("title");
		window.location = "details.php?id=" + id;
	});
}

function setupInfiniteScroll(){
	var vpTopOffset = $("#mainheader").height();
	$("html").waypoint(function(direction) {
		if(direction == "down"){
			if($.waypoints('viewportHeight') < $(this).height()){
				ImgurManager.search(computeSearch, query, GalleryView.getLastEntry());
			}		
		}
	}, { offset: 'bottom-in-view'
	});
}

var setupOnce = _.once(setupInfiniteScroll);

function computeSearch(searchData){
	if(query != null){
		$searchTermLabel.html(query);
	}else{
		$searchTermLabel.html(values);
	}
	
	if(_.isNull(searchData) || _.isUndefined(searchData)){
		if($('.jg-row').length > 0){
			appendMessage(NO_MORE_IMAGES);
		}else{
			appendMessage(NO_RESULTS);
		}
	}else if(_.isEmpty(searchData)){
		if($('.jg-row').length > 0){
			appendMessage(NO_MORE_IMAGES);
		}else{
			appendMessage(NO_RESULTS);
		}
	}else{
		GalleryView.init($imageContainer);
		showResults(searchData);
	}
}

function showResults(searchData){
	GalleryView.appendEntries(searchData);
	GalleryView.loadAllImages();
}

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