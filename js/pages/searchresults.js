var $searchTermLabel = $(".search-term");
var $imageContainer = $("#images");
var NO_RESULTS = "Für diesen Suchbegriff gab es leider keine Treffer!";
var NO_MORE_IMAGES = "Wir können dir leider keine weiteren Bilder mehr liefern";

$(document).ready(function() {
	if(query != null){
		setupImageClick();
		ImgurManager.search(computeSearch, query, 0);
	}else if(type != null){
		setupImageClick();
		switch(type){
			case "sex":
				var sex = "";
				if(values == "Männer"){
					sex = "m";
				}else if(values == "Frauen"){
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
		}
	}else{
		resultsError(NO_RESULTS);
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
			resultsError(NO_MORE_IMAGES);
		}else{
			resultsError(NO_RESULTS);
		}
	}else if(_.isEmpty(searchData)){
		if($('.jg-row').length > 0){
			resultsError(NO_MORE_IMAGES);
		}else{
			resultsError(NO_RESULTS);
		}
	}else{
		GalleryView.init($imageContainer);
		showResults(searchData);
	}
}

function resultsError(msg){
	var content = "<div class='error-message secondary label'>" + msg + "</div>";
	if($(".error-message").length < 1){
		$imageContainer.append(content);
	}
}

function showResults(searchData){
	GalleryView.appendEntries(searchData);
	GalleryView.loadAllImages();
}