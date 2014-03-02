var iconOffsetX = 0;
var iconOffsetY = 0;

$(document).ready(function() {
	setupNavigation();
});

function setupNavigation(){
	var $uploadLink = $("#link-upload");
	var $mainNav = $("#mainnav");
	$("#upload-button").waypoint(function(direction){
		if(direction == "down"){
			var $stickyElement = $uploadLink.clone(false);

			var transX = (($uploadLink.children('i').offset().left) * (-1)) + 
				$(".li-home-container").width() + parseInt($(".li-home-container").css('padding')) + 
				iconOffsetX;
			var transY = ($mainNav.offset().top) + iconOffsetY - ($uploadLink.offset().top);

			$(".li-upload-container").append($stickyElement);

			$stickyElement.css({'opacity': 0});
			

			$uploadLink.transition({
				x: transX, y: transY, scale: 0.4, opacity : 0.2
			}, 300, 'easeOutSine', function(){
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
				($mainNav.offset().top) - ($uploadLink.offset().top);

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

	

	$(window).scroll(function(event) {
		if(($mainNav.offset().top + $mainNav.height() >= 
			$("#upload").offset().top + $("#upload").height())){
			$mainNav.addClass('nav-bg');
		}else{
			$mainNav.removeClass('nav-bg');
		}
	});

	
}