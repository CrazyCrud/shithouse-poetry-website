var $searchTermLabel = $(".search-term");
var $imageContainer = $("#images");
var NO_RESULTS = "Für diesen Suchbegriff gab es leider keine Treffer!";
var NO_MORE_IMAGES = "Wir können dir leider keine weiteren Bilder mehr liefern";

$(document).ready(function() {
	if(term != null){
		// ImgurManager.search(computeSearch, term, 0);
		ImgurManager.getEntries(computeSearch);
	}
});

function computeSearch(searchData){
	$searchTermLabel.html(term);
	if(_.isNull(searchData) || _.isUndefined(searchData)){
		resultsError(NO_RESULTS);
	}else if(_.isEmpty(searchData)){
		resultsError(NO_RESULTS);
	}else{
		GalleryView.init($imageContainer);
		showResults(searchData);
	}
}

function resultsError(msg){
	var content = "<div class='error-message secondary label'>" + msg + "</div>";
	$imageContainer.append(content);
}

function showResults(searchData){
	GalleryView.appendEntries(searchData);
	GalleryView.reload();
}