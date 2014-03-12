var GalleryView = (function(document){
	var settings = {
		imgData : {},
		currentEntry : 0,
		imageContainer : null,
		rowHeight : 120,
		fixedHeight : true
	};

	var displayImages = function(){
		if(StateManager.getState() == StateManager.States.
			properties[StateManager.States.SMALL].name){
			settings.imageContainer.justifiedGallery({
				'sizeRangeSuffixes': {'lt100':'',
					'lt240':'', 
					'lt320':'', 
					'lt500':'', 
					'lt640':'', 
					'lt1024':''},
				'captions': false,
				'target': "_blank",
				'margins': 3,
				'refreshTime': 500,
				'justifyLastRow': true,
				'rowHeight': 250,
				'fixedHeight' : true,
				'onComplete': addOverlay
			});
		}else{
			settings.imageContainer.justifiedGallery({
				'sizeRangeSuffixes': {'lt100':'',
					'lt240':'', 
					'lt320':'', 
					'lt500':'', 
					'lt640':'', 
					'lt1024':''},
				'captions': false,
				'target': "_blank",
				'margins': 3,
				'fixedHeight': settings.fixedHeight,
				'rowHeight': settings.rowHeight,
				'refreshTime': 500,
				'justifyLastRow': true,
				'onComplete': addOverlay
			});
		}
	};

	var addOverlay = function(){
		var isDesktop = StateManager.isDesktop();
		$(".jg-image a").each(function(index, value) {
			var $parent = $(this).parent(".jg-image");
			var id = parseInt($(this).attr('title'));

			var index = _.chain(settings.imgData).pluck("id").indexOf(id).value();

			elementData = settings.imgData[index];
			if(elementData){
				var overlayClass = "";
				switch(elementData.gender.toLowerCase()){
					case "w":
						overlayClass = "women";
						break;
					case "m":
						overlayClass = "men";
						break;
					default:
						overlayClass = "unisex";
				}
				var content = '<div class="' + overlayClass + '"></div><div class="transcription-container"><div><span class="transcription"><i>' + elementData.transcription + '</i></span></div></div>';
				$parent.prepend(content);
			}

			var $transcription = $parent.children('.transcription-container');
			var $genderOverlay = null;
			var $image = $parent.find('img');
			if($parent.children('div.women').length > 0){
				$genderOverlay = $parent.children('div.women');
			}else if($parent.children('div.men').length > 0){
				$genderOverlay = $parent.children('div.men');
			}else{
				$genderOverlay = $parent.children('div.unisex');
			}
			if(!isDesktop){
				var newClass = $transcription.attr('class') + "-touch";
				$transcription.removeAttr('class');
				$transcription.addClass(newClass);
				newClass = $genderOverlay.attr('class') + "-touch";
				$genderOverlay.removeAttr('class');
				$genderOverlay.addClass(newClass);
			}else{
				$parent.hover(function() {
					$genderOverlay.stop(true, true);
					$transcription.stop(true, true);
					$image.stop(true, true);
					$image.transition({scale:[1.1, 1.1]});
					$genderOverlay.fadeIn({
						duration : 300,
						queue: false
					});
					$transcription.fadeIn({
						duration: 300,
						start: function(){
							$(this).css({
								'display': 'table',
								'height': $parent.parent('.jg-row').height() + 'px',
								'width': $parent.width() + 'px'
							});
							$(this).find('.transcription').css('width', $parent.width() + 'px');
						},
						queue: false
					});
				}, function() {
					$genderOverlay.stop(true, true);
					$transcription.stop(true, true);
					$image.stop(true, true);
					$image.transition({scale:[1.0, 1.0]});
					$genderOverlay.fadeOut({
						duration: 300,
						queue: false
					});
					$transcription.fadeOut({
						duration: 300,
						queue: false
					});
				});
			}
		});
	}

	var reload = function(){
		var imgLoaded = 0;
		if(_.isEmpty(settings.imgData) || settings.imageContainer.length < 1){
			return;
		}else{
			var numImages = _.keys(settings.imgData).length;
			for(var i = 0; i < numImages; i++){
				var htmlData = settings.imgData[i].image_m;
				var $imgContent = $(htmlData).find('img');
				Foundation.lib_methods.loaded($imgContent, function(){
					imgLoaded++;
					if(imgLoaded == numImages){
						for(var index in settings.imgData){
							settings.imageContainer.append(settings.imgData[index].image_m);
						}
						displayImages();
					}
				});
			}
			setCurrentEntry(numImages + 1);
		}
	};

	var setCurrentEntry = function(newValue){
		currentEntry = newValue;
	}

	var getCurrentEntry = function(){
		return currentEntry;
	}

	var appendEntries = function(entries){
		if(_.isEmpty(entries)){
			return;
		}else{
			var numImages = entries.length;
			for(var i = 0; i < numImages; i++){
				var entry = entries[i];
				var id = parseInt(entry.id);
				if((_.chain(settings.imgData).pluck("id").indexOf(id).value()) > -1){
					continue;
				}else{
					var gender = entry.sex;
					var transcription = entry.title;
					var imgContent_m = '<a href="" title="' + id + '"><img src="' + 
						entry.images[0].thumbnail + '"/></a>';	
					var imgContent_l = '<a href="" title="' + id + '"><img src="' + 
						entry.images[0].largethumbnail + '"/></a>';
					settings.imgData[i] = {
						id: id,
						gender: gender,
						transcription: transcription,
						image_m: imgContent_m,
						image_l: imgContent_l,
						date: entry.date,
						rating: parseFloat(entry.ratings.rating)
					};
				}
			}
		}
	};

	var resizeImages = function(){
		settings.imageContainer.empty();
		for(var index in settings.imgData){
			settings.imageContainer.append(settings.imgData[index].image_m);
		}
		displayImages();
	}

	var lazyRearrange = _.debounce(resizeImages, 500);

	var setupContainer = function(element){
		settings.imageContainer = $(element);
		$(window).resize(lazyRearrange);
	};

	var init = _.once(setupContainer);

	var reset = function(element){
		setupContainer(element);
	};

	return {
		init: init,
		reset: reset,
		appendEntries: appendEntries,
		reload: reload,
		getCurrentEntry: getCurrentEntry,
		settings: settings
	}
}(document));