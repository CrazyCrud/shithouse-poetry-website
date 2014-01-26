$(document).ready(function() {
	$(document).foundation();
	setupNavigation();
});

function setupNavigation(){
	var $uploadLink = $("#link-upload");
	$("#upload-button").waypoint(function(direction){
		if(direction == "down"){
			var $stickyElement = $uploadLink.clone(true);
			$(".li-upload-container").append($stickyElement);
			$stickyElement.css({'opacity': 0})
						.animate({'opacity': 1.0}, 600);
			$uploadLink.animate({'opacity': 0}, 300);
		}else{
			var $stickyElement = $(".li-upload-container > #link-upload");
			$stickyElement.css({'opacity': 1.0})
						.animate({
							'opacity': 0}, 300, function() {
								$(".li-upload-container").empty();
						});
			$uploadLink.animate({'opacity': 1.0}, 300);
		}
	});
}