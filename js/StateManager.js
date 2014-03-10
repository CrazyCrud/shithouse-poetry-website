var StateManager = (function(){
	var state = null;

	var viewportWidth = null;
	
	var initialViewportWidth = null;

	var states = {
		SMALL: 1,
		MEDIUM: 2,
		LARGE: 3,
		properties: {
			1: {name: "Small", value: 640},
			2: {name: "Medium", value: 1024},
			3: {name: "Large"}
		}
	};

	var setState = function(){
		if (viewportWidth <= states.properties[states.SMALL].value) {
			state = states.properties[states.SMALL].name;
		}
		else if (viewportWidth > states.properties[states.SMALL].value &&
			viewportWidth <= states.properties[states.MEDIUM].value){
			state = states.properties[states.MEDIUM].name;
		}else{
			state = states.properties[states.LARGE].name;
		}
	};

	var hasTouchSupport = function(){
		return $("html").hasClass("touch");
	};

	return {
		init : function(){
			$(window).resize(function(event) {
				viewportWidth = $(window).width();
				if(initialViewportWidth == null){
					initialViewportWidth = viewportWidth;
				}
				setState();
			});
		},
		getState : function(){
			return state;
		},
		getWidth : function(){
			return viewportWidth;
		},
		getInitialWidth : function(){
			return initialViewportWidth;
		},
		hasTouchSupport : function(){
			return hasTouchSupport();
		},
		isDesktop: function(){
			if(state == states.properties[states.LARGE].name || hasTouchSupport()){
				return true;
			}else{
				return false;
			}
		},
		States : states
	}
}());

StateManager.init();