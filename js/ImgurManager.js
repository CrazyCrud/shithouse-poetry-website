var ImgurManager = (function(){
	var tags = {
		ALL: 1,
		FUNNY: 2,
		properties: {
			1: {name: "all"},
			2: {name: "funny"}
		}
	};

	var orderby = {
		DATE: 1,
		RATING: 2,
		properties: {
			1: {name: "date"},
			2: {name: "rating"}
		}
	};

	var sex = {
		ALL: 1,
		MEN: 2,
		WOMEN: 3,
		NONE: 4,
		properties: {
			1: {name: "all"},
			2: {name: "m"},
			3: {name: "w"},
			4: {name: "u"}
		}
	};

	var clientID = "9e45d882d3b4055";

	return {
		getEntries : function(callback, order, currentEntry){
			var searchProps = {};
			searchProps.orderby = order || orderby.properties[orderby.DATE].name;
			searchProps.start = currentEntry || 0;

			var links = null;

			$.post('php/backend/getEntries.php', {postData : JSON.stringify(searchProps)}, function(data) {
				if(data.success == 1){
					links = data.data;
					callback(links);
				}else{
					console.log("Error");
				}		
			});
		},
		getFilteredEntries : function(callback, searchProps, currentEntry){
			searchProps = searchProps || {};
			if(searchProps.tags == null && searchProps.sex == null){
				searchProps.sex = sex.properties[sex.MEN].name;
			}
			searchProps.orderby = searchProps.orderby || orderby.properties[orderby.DATE].name;
			searchProps.start = currentEntry || 0;

			var links = null;

			$.post('php/backend/getFilteredEntries.php', {postData : JSON.stringify(searchProps)}, 
				function(data) {
					if(data.success == 1){
						links = data.data;
						callback(links);
					}else{
						console.log("Error");
					}		
				}
			);
		},
		getSingleEntry : function(callback){
			/*
			var link = null;

			$.post('php/backend/getRandomEntry.php', function(data) {
				if(data.success == 1){
					link = data.data;
					callback(link);
				}else{
					console.log("Error");
				}
			});
			*/
		},
		uploadImages : function(imgData){
			if(imgData == null || imgData == undefined){
				return false;
			}else{
				return true;
			}
		},
		Tags : tags,
		OrderBy: orderby,
		Sex : sex
	}
}());