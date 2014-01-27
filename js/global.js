var iconOffsetX = 5;
var iconOffsetY = 0;

$(document).ready(function() {
	$(document).foundation();
	setupNavigation();
});

function setupNavigation(){
	var $uploadLink = $("#link-upload");
	$("#upload-button").waypoint(function(direction){
		if(direction == "down"){
			var $stickyElement = $uploadLink.clone(false);

			var transX = (($uploadLink.children('i').offset().left) * (-1)) - iconOffsetX;
			var transY = ($("#mainnav").offset().top) + iconOffsetY - ($uploadLink.offset().top);

			$(".li-upload-container").append($stickyElement);

			$stickyElement.css({'opacity': 0});
			

			$uploadLink.transition({
				x: transX, y: transY, scale: 0.4, opacity : 0.2
			}, 600, 'easeOutSine', function(){
				$(".upload-button-container").css('z-index', 1);
				$uploadLink.css('opacity', 0);
			});
			$stickyElement.transition({
				opacity : 1
			}, 800, 'easeInQuart', function(){
				
			});
		}else{
			var $stickyElement = $(".li-upload-container > #link-upload");

			var pos = $uploadLink.css('translate').split(',');
			var transX = parseFloat(pos[0]);
			var transY = parseFloat(pos[1]) + 
				($("#mainnav").offset().top) - ($uploadLink.offset().top);

			$uploadLink.css({translate: [transX, transY]});

			$stickyElement.css({'opacity': 1.0});
			$stickyElement.transition({
							opacity: 0}, 300, 'easeOutSine', function() {
								$(".li-upload-container").empty();
						});
			$(".upload-button-container").css('z-index', 100);
			$uploadLink.transition({
				x: 0, y: 0, scale: 1, opacity: 1
			});
		}
	}, {offset: 100});
}