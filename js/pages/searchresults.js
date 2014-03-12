var $searchTermLabel = $(".search-term");
var $imageContainer = $("#images");
var NO_RESULTS = "Für diesen Suchbegriff gab es leider keine Treffer!";
var NO_MORE_IMAGES = "Wir können dir leider keine weiteren Bilder mehr liefern";

$(document).ready(function() {
	if(query != null){
		ImgurManager.search(computeSearch, query, 0);
		// ImgurManager.getEntries(computeSearch);
		setupImageClick();
		setupOnce();
	}
});

$(document).on("complete", function(){
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
				ImgurManager.search(computeSearch, query, GalleryView.getCurrentEntry());
			}		
		}
	}, { offset: 'bottom-in-view'
	});
}

var setupOnce = _.once(setupInfiniteScroll);

function computeSearch(searchData){
	$searchTermLabel.html(query);
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
	if($(".error-message").length < 1){
		$imageContainer.append(content);
	}
}

function showResults(searchData){
	GalleryView.appendEntries(searchData);
	GalleryView.reload();
}