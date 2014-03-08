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

	return {
		getEntries : function(callback, order, currentEntry){
			var searchProps = {};
			searchProps.orderby = order || orderby.properties[orderby.DATE].name;
			searchProps.start = currentEntry || 0;

			var links = null;

			var url = 'getEntries.php?orderby=' + searchProps.orderby + '&start=' + searchProps.start; 
			$.get('php/backend/' + url, function(data) {
				if(data.success == 1){
					links = data.data;
				}	
				callback(links);
			});
		},
		getFilteredEntries : function(callback, searchProps, currentEntry){
			searchProps = searchProps || {};
			searchProps.filter = searchProps.filter || "sex";
			searchProps.values = searchProps.values || "men";
			searchProps.orderby = searchProps.orderby || orderby.properties[orderby.DATE].name;
			searchProps.start = currentEntry || 0;

			var links = null;

			var url = 'getFilteredEntries.php?filter=' + searchProps.filter + 
				'&values=' + values + '&start=' + searchProps.start + 
				'orderby=' + searchProps.orderby;
			$.get('php/backend/' + url, function(data) {
				if(data.success == 1){
					links = data.data;
				}	
				callback(links);	
			});
		},
		getRandomEntries : function(callback){
			var authkey = document.cookie.replace(/(?:(?:^|.*;\s*)authkey\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			var links = null;
			var url = 'getRandomEntries.php?amount=10';
			if(authkey.length > 0){
				url += ('&authkey=' + authkey);
			}
			$.post('php/backend/' + url, function(data) {
				if(data.success == 1){
					links = data.data;
				}
				callback(links);
			});
		},
		addRating : function(callback, entryid, rating){
			var authkey = document.cookie.replace(/(?:(?:^|.*;\s*)authkey\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			var url = 'addEntry.php?authkey=' + authkey + 
				'&entryid=' + entryid + '&rating=' + rating;
			$.post('php/backend/' + url, function(data) {
				if(data.success == 1){
					callback();
				}else{
					console.log("Error");
				}
			});
		},
		addEntry : function(callback, formData){
			var authkey = document.cookie.replace(/(?:(?:^|.*;\s*)authkey\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			formData.append('authkey', authkey);
			
			if(formData == null || formData == undefined){
				return;
			}else{
				var url = "addEntry.php";
				$.post("php/backend/" + url, {data : formData}, function(data){
					if(data.success == 1){
						callback();
					}else{
						console.log("Error");
					}
				});
			}
		},
		deleteEntry : function(entryid){
			var authkey = document.cookie.replace(/(?:(?:^|.*;\s*)authkey\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			var url = "deleteEntry.php?entryid=" + id + 
				"authkey=" + authkey;
			$.post("php/backend/" + url, function(data){
				if(data.success == 1){
					console.log("Entry deleted...");
				}else{
					console.log("Error");
				}
			});
		},
		getEntry : function(callback, id){
			var url = "getEntry.php?entryid=" + id;
			$.post("php/backend/" + url, function(data){
				if(data.success == 1){
					callback(data["data"]);
				}else{
					console.log("Error");
				}
			});
		},
		getLocations : function(callback, lat, long){
			var locations = null;
			var url = "getLocations.php?lat=" + lat + 
				"&long=" + long;
			$.post("php/backend/" + url, function(data){
				if(data.success == 1){
					locations = data.data;
				}
				callback(locations);
			});
		},
		uploadImage : function(callback, entryid, file){
			var authkey = document.cookie.replace(/(?:(?:^|.*;\s*)authkey\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			var formData = new FormData();
			formData.append('authkey', authkey);
			formData.append('id', entryid);
			formData.append('file', file);

			var url = "imgurUpload.php?";
			$.post("php/backend/" + url, {data : formData} , function(data){
				if(data.success == 1){
					callback(true, entryid);
				}else{
					callback(false, entryid);
				}
			});
		},
		Tags : tags,
		OrderBy: orderby,
		Sex : sex
	}
}());