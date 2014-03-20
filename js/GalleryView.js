var GalleryView = (function(){
	var settings = {
		imgData : [],
		currentEntry : 0,
		currentVerticalPosition: 0,
		imageContainer : null,
		imageContainerTmp : null,
		displaySingleImage: false,
		rowHeight : 200,
		fixedHeight : false,
		justifyLastRow: false
	};

	var displayImages = function(){
		if(settings.displaySingleImage){
			if(StateManager.getState() == 
				StateManager.States.properties[StateManager.States.SMALL].name){
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
					'fixedHeight' : false,
					'onComplete': complete
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
					'justifyLastRow': settings.justifyLastRow,
					'onComplete': complete
				});
			}
		}else{
			if(_.isNull(settings.imageContainerTmp) || 
				_.isUndefined(settings.imageContainerTmp)){
				return;
			}
			if(StateManager.getState() == 
				StateManager.States.properties[StateManager.States.SMALL].name){
				settings.imageContainerTmp.justifiedGallery({
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
					'fixedHeight' : false,
					'onComplete': complete
				});
			}else{
				settings.imageContainerTmp.justifiedGallery({
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
					'justifyLastRow': settings.justifyLastRow,
					'onComplete': complete
				});
			}
		}

	};

	var complete = function(){
		if(!_.isNull(settings.imageContainerTmp) && 
			settings.imageContainerTmp.prev().length > 0){
			$.when(settings.imageContainerTmp.prev().remove()).then(function(){
				$.event.trigger({
					type : "complete",
					message: "Images are completely loaded",
					time: new Date()
				});
				addOverlay();
			});
		}else{
			$.event.trigger({
				type : "complete",
				message: "Images are completely loaded",
				time: new Date()
			});
			$(window).scrollTop(settings.currentVerticalPosition);
			addOverlay();
		}
	};

	var endOfVoting = function(){
		$.event.trigger({
			type : "votingend",
			message: "No images are availabe",
			time: new Date()
		});
	};

	var addOverlay = function(){
		var isDesktop = StateManager.isDesktop();
		$(".jg-image a").each(function(index, value) {
			var $parent = $(this).parent(".jg-image");
			var id = parseInt($(this).attr('title'));
			$(this).attr('href', 'javascript:void()');
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
	};

	/*
		should ne called if multiple images were appended and should be displayed
	*/
	var loadAllImages = function(){
		var imgLoaded = 0;
		// clearScreen();
		settings.displaySingleImage = false;
		settings.justifyLastRow = false;
		if(_.isEmpty(settings.imgData) || settings.imageContainer.length < 1){
			return;
		}else{
			var numImages = settings.imgData.length;
			settings.imageContainerTmp = $("<div></div>");
			settings.imageContainer.append(settings.imageContainerTmp);
			for(var i = 0; i < settings.imgData.length; i++){
				if(_.isUndefined(settings.imgData[i]) || _.isEmpty(settings.imgData[i])){
					numImages--;
					continue;
				}

				var htmlData = settings.imgData[i].image_m;
				var $imgContent = $(htmlData).find('img');
				Foundation.lib_methods.loaded($imgContent, function(){
					imgLoaded++;
					if(imgLoaded == numImages){
						for(var index in settings.imgData){
							settings.imageContainerTmp.append(settings.imgData[index].image_m);
						}
						displayImages();
					}
				});
			}
		}
	};

	/*
		should ne called if multiple images were appended but only one should be displayed
	*/
	var loadSingleImage = function(){
		clearScreen();
		settings.displaySingleImage = true;
		settings.justifyLastRow = true;
		if(_.isEmpty(settings.imgData) || settings.imageContainer.length < 1){
			return;
		}else if(getCurrentEntry() >= getLastEntry()){
			endOfVoting();
			return;
		}else{
			if(_.isNull(settings.imgData[getCurrentEntry()]) ||
				_.isUndefined(settings.imgData[getCurrentEntry()])){
				incrementCurrentEntry();
				loadSingleImage();
				return;
			}
			var htmlData = settings.imgData[getCurrentEntry()].image_m;
			var $imgContent = $(htmlData).find('img');
			Foundation.lib_methods.loaded($imgContent, function(){
				settings.imageContainer.append(htmlData);
				displayImages();
				incrementCurrentEntry();
			});
		}
	};

	var setCurrentEntry = function(newValue){
		settings.currentEntry = newValue;
	};

	var incrementCurrentEntry = function(){
		settings.currentEntry++;
	};

	var getCurrentEntry = function(){
		return settings.currentEntry;
	};

	var getLastEntry = function(){
		return settings.imgData.length;
	};

	var appendEntries = function(entries){
		var imgDataChanged = false;
		if(_.isEmpty(entries)){
			return imgDataChanged;
		}else{
			var numImages = entries.length;
			var lastImageIndex = getLastEntry();
			for(var i = 0; i < numImages; i++){
				var entry = entries[i];
				var id = parseInt(entry.id);
				if(!entry.images || entry.images.length==0 || !entry.images[0].thumbnail || 
						!entry.images[0].largethumbnail){
					continue;
				}else if((_.chain(settings.imgData).pluck("id").indexOf(id).value()) > -1){
					continue;
				}else{
					imgDataChanged = true;
					var gender = entry.sex||"u";
					var rating = 0;
					var ratingCount = 0;
					if(entry.ratings && entry.ratings.length != 0 && entry.ratings.rating){
						rating = entry.ratings.rating;
						ratingCount = entry.ratings.ratingcount;
					}
					var transcription = entry.title||"";
					var imgContent_m = '<a href="" title="' + id + '"><img src="' + 
						entry.images[0].thumbnail + '"/></a>';	
					var imgContent_l = '<a href="" title="' + id + '"><img src="' + 
						entry.images[0].largethumbnail + '"/></a>';
					settings.imgData[lastImageIndex + i] = {
						id: id,
						gender: gender,
						transcription: transcription,
						image_m: imgContent_m,
						image_l: imgContent_l,
						date: entry.date||"",
						rating: parseFloat(rating),
						ratingcount: ratingCount
					};
				}
			}
			return imgDataChanged;
		}
	};

	var setMaxwidth = function(fullscreen){
		if(fullscreen){
			settings.imageContainer.removeClass('images-vote');
		}else{
			settings.imageContainer.addClass('images-vote');
		}
	};

	var getEntry = function(){
		var entry = null;
		if(getCurrentEntry() < 1){
			entry = settings.imgData[0];
		}else{
			entry = settings.imgData[getCurrentEntry() - 1]
		}
		if(_.isNull(entry) || _.isUndefined(entry)){
			entry = null;
		}
		return entry;
	};

	var resetEntries = function(){
		setCurrentEntry(0);
		settings.imgData = [];
	};

	var resizeImages = function(){
		if(StateManager.getWidth() != StateManager.getInitialWidth()){
			if(settings.displaySingleImage){
				clearScreen();
				if(getCurrentEntry() > 0){
					settings.imageContainer.append(settings.imgData[getCurrentEntry() - 1].image_l);
				}else{
					settings.imageContainer.append(settings.imgData[getCurrentEntry()].image_l);
				}
			}else{
				settings.imageContainerTmp = $("<div></div>");
				settings.imageContainer.append(settings.imageContainerTmp);
				for(var index in settings.imgData){
					settings.imageContainerTmp.append(settings.imgData[index].image_m);
				}
			}
			displayImages();
		}
	};

	var clearScreen = function(){
		settings.currentVerticalPosition = $(window).scrollTop();
		settings.imageContainer.empty();
		settings.imageContainerTmp = null;
	};

	var lazyRearrange = _.debounce(resizeImages, 500);

	var setupContainer = function(element){
		settings.imageContainer = $(element);
		$(window).resize(lazyRearrange);
	};

	var init = _.once(setupContainer);

	/* not used 
	var resetImageContainer = function(element){
		setupContainer(element);
	};
	*/

	return {
		init: init,
		resetEntries: resetEntries,
		appendEntries: appendEntries,
		loadAllImages: loadAllImages,
		loadSingleImage: loadSingleImage,
		getLastEntry: getLastEntry,
		setMaxwidth: setMaxwidth,
		getEntry: getEntry,
		settings: settings
	}
}());