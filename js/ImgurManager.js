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
				callback(links, searchProps.orderby);
			});
		},
		getRandomUnstranscribedEntries : function(callback){
			var links = null;
			var authkey = document.cookie.replace(/(?:(?:^|.*;\s*)authkey\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			var url = 'getRandomUntranscribedEntries.php?authkey=' + authkey + "&amount=20"; 
			console.log(url);
			$.get('php/backend/' + url, function(data) {
				if(data.success == 1){
					links = data.data;
				}	
				callback(links);
			});
		},
		getEntriesForUser : function(callback, userid, start){
			start = start || 0;
			var url = 'getFilteredEntries.php?filter=user&values='+userid+"&start="+start;
			$.get('php/backend/' + url, function(data) {
				var links = false;
				if(data.success == 1){
					links = data.data;
				}	
				callback(links);
			});
		},
		getTimeline : function(callback, start){
			start = start || 0;
			var authkey = document.cookie.replace(/(?:(?:^|.*;\s*)authkey\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			var url = 'getTimeline.php?authkey='+authkey+'&start='+start;
			$.get("php/backend/"+url, function(data){
				var d = false;
				if(data.success == 1){
					d = data.data;
				}
				callback(d);
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
		searchByType : function(callback, types, order, currentEntry){
			types = types || 1;
			order = order || orderby.properties[orderby.DATE].name;
			start = currentEntry || 0;

			var links = null;

			var url = 'getFilteredEntries.php?filter=type&' + 
				'values=' + types + '&start=' + start + 
				'&orderby=' + order;
			$.get('php/backend/' + url, function(data) {
				if(data.success == 1){
					links = data.data;
				}	
				callback(links);	
			});
		},
		searchByTag : function(callback, tags, order, currentEntry){
			tags = tags || 1;
			order = order || orderby.properties[orderby.DATE].name;
			start = currentEntry || 0;

			var links = null;

			var url = 'getFilteredEntries.php?filter=tag&' + 
				'values=' + tags + '&start=' + start + 
				'&orderby=' + order;
				console.log(url);
			$.get('php/backend/' + url, function(data) {
				if(data.success == 1){
					links = data.data;
				}	
				callback(links);	
			});
		},
		searchBySex : function(callback, sex, order, currentEntry){
			sex = sex || "m";
			order = order || orderby.properties[orderby.DATE].name;
			start = currentEntry || 0;

			var links = null;

			var url = 'getFilteredEntries.php?filter=sex&' + 
				'values=' + sex + '&start=' + start + 
				'&orderby=' + order;
			$.get('php/backend/' + url, function(data) {
				if(data.success == 1){
					links = data.data;
				}	
				callback(links);	
			});
		},
		searchByUser : function(callback, userid, order, currentEntry){
			user = user || 1;
			order = order || orderby.properties[orderby.DATE].name;
			start = currentEntry || 0;

			var links = null;

			var url = 'getFilteredEntries.php?filter=user&' + 
				'values=' + user + '&start=' + start + 
				'&orderby=' + order;
			$.get('php/backend/' + url, function(data) {
				if(data.success == 1){
					links = data.data;
				}	
				callback(links);	
			});
		},
		searchByLocation : function(callback, locations, order, currentEntry){
			locations = locations || "Universität";
			order = order || orderby.properties[orderby.DATE].name;
			start = currentEntry || 0;

			var links = null;

			var url = 'getFilteredEntries.php?filter=location&' + 
				'values=' + locations + '&start=' + start + 
				'&orderby=' + order;
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
			if(authkey.length == AUTH_KEY_LENGTH){
				url += ('&authkey=' + authkey);
			}
			$.post('php/backend/' + url, function(data) {
				if(data.success == 1){
					links = data.data;
				}
				callback(links);
			});
		},
		getRandomUntranscribedEntries : function(callback){
			var authkey = document.cookie.replace(/(?:(?:^|.*;\s*)authkey\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			var links = null;
			var url = 'getRandomUntranscribedEntries.php?amount=10';
			if(authkey.length == AUTH_KEY_LENGTH){
				url += ('&authkey=' + authkey);
			}
			$.post('php/backend/' + url, function(data) {
				if(data.success == 1){
					links = data.data;
				}
				callback(links);
			});
		},
		updateTranscription : function(callback, entryid, transcription){
			var authkey = document.cookie.replace(/(?:(?:^|.*;\s*)authkey\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			var links = null;
			var url = 'updateTranscription.php?authkey='+authkey+"&entryid="+entryid+"&transcription="+transcription;
			$.post('php/backend/' + url, function(data) {
				if(data.success == 1){
					links = data.data;
				}
				callback(links);
			});
		},
		addRating : function(callback, entryid, rating){
			var authkey = document.cookie.replace(/(?:(?:^|.*;\s*)authkey\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			var url = 'addRating.php?authkey=' + authkey + 
				'&entryid=' + entryid + '&rating=' + rating;
			console.log(url);
			$.post('php/backend/' + url, function(data) {
				if(data.success == 1){
					callback();
					return;
				}
				callback();
			});
		},
		addEntry : function(callback, formData){
			var authkey = document.cookie.replace(/(?:(?:^|.*;\s*)authkey\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			if(formData == null || formData == undefined){
				return;
			}else{
				var data = $.param(formData, false);
				var url = "addEntry.php?authkey=" + authkey + "&" + data;
				console.log(url);
				$.post("php/backend/" + url, function(data){
					if(data.success == 1){
						callback(data.data);
					}else{
						console.log("Error");
					}
				});
			}
		},
		updateEntry : function(callback, formData){
			var authkey = document.cookie.replace(/(?:(?:^|.*;\s*)authkey\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			if(formData == null || formData == undefined){
				return;
			}else{
				var data = $.param(formData, false);
				var url = "updateEntry.php?authkey=" + authkey + "&" + data;
				console.log(url);
				$.post("php/backend/" + url, function(data){
					console.log(data);
					if(data.success == 1){
						callback(data.data);
					}else{
						console.log("Error");
					}
				});
			}
		},
		deleteEntry : function(entryid, callback){
			var authkey = document.cookie.replace(/(?:(?:^|.*;\s*)authkey\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			var url = "deleteEntry.php?entryid=" + entryid + 
				"&authkey=" + authkey;
			console.log(url);
			$.post("php/backend/" + url, function(data){
				if(data.success == 1){
					console.log("Entry deleted...");
				}else{
					console.log("Error");
				}
				callback(data.success==1);
			});
		},
		getEntry : function(callback, id){
			var authkey = document.cookie.replace(/(?:(?:^|.*;\s*)authkey\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			var url;
			if(authkey.length == AUTH_KEY_LENGTH){
				url = "getEntry.php?entryid=" + id + "&authkey=" + authkey;
			}else{
				url = "getEntry.php?entryid=" + id;
			}
			$.post("php/backend/" + url, function(data){
				if(data.success == 1){
					callback(data["data"]);
				}else{
					callback("Error");
					console.log("Error");
				}
			});
		},
		getLocations : function(callback, latitude, longitude){
			var locations = null;
			var url = "getLocations.php?lat=" + latitude + 
				"&long=" + longitude;
			$.post("php/backend/" + url, function(data){
				if(data.success == 1){
					locations = data.data;
				}
				callback(locations);
			});
		},
		getUsedLocations : function(callback){
			var locations = null;
			var url = "getUsedLocations.php";
			$.post("php/backend/" + url, function(data){
				if(data.success == 1){
					locations = data.data;
				}
				callback(locations);
			});
		},
		getDefaultLocations : function(callback){
			var locations = null;
			var url = "getLocations.php?lat=-1&long=-1";
			$.post("php/backend/" + url, function(data){
				if(data.success == 1){
					locations = data.data;
				}
				callback(locations);
			});
		},
		getTypes : function(callback){
			var types = null;
			var url = "getTypes.php";
			$.post("php/backend/" + url, function(data){
				if(data.success == 1){
					types = data.data;
				}
				callback(types);
			});
		},
		getComments: function(callback, entryid, start){
			var comments = null;
			start = start || -1;
			var url = "getComments.php?entryid=" + entryid + "&commentid=" + start;
			$.post("php/backend/" + url, function(data){
				if(data.success == 1){
					comments = data.data;
				}
				callback(comments);
			});
		},
		addComment : function(callback, entryid, comment){
			var authkey = document.cookie.replace(/(?:(?:^|.*;\s*)authkey\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			if(authkey.length != AUTH_KEY_LENGTH)callback(false);
			var url = "addComment.php?entryid=" + entryid + "&comment=" + comment + "&authkey=" + authkey;
			$.post("php/backend/" + url, function(data){
				if(data.success == 1){
					callback(true);
				}else{
					callback(false);
				}	
			});
		},
		deleteComment : function(callback, commentid){
			var authkey = document.cookie.replace(/(?:(?:^|.*;\s*)authkey\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			if(authkey.length != AUTH_KEY_LENGTH)callback(false);
			var url = "deleteComment.php?commentid=" + commentid + "&authkey=" + authkey;
			console.log(url);
			$.post("php/backend/" + url, function(data){
				if(data.success == 1){
					callback(true, commentid);
				}else{
					callback(false);
				}	
			});
		},
		getReports : function(callback){
			var authkey = document.cookie.replace(/(?:(?:^|.*;\s*)authkey\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			var url = "getReports.php?authkey=" + authkey;
			$.post("php/backend/" + url, function(data){
				if(data.success == 1){
					callback(data.data);
				}else{
					callback(false);
				}	
			});
		},
		addReport : function(callback, entryid, reportdesc, commentid){
			var authkey = document.cookie.replace(/(?:(?:^|.*;\s*)authkey\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			var url = "addReport.php?entryid=" + entryid + "&reportdesc=" + reportdesc +
				"&commentid" + commentid + "&authkey=" + authkey;
			$.post("php/backend/" + url, function(data){
				if(data.success == 1){
					callback(true);
				}else{
					callback(false);
				}	
			});
		},
		updateReport : function(callback, reportid, status){
			var authkey = document.cookie.replace(/(?:(?:^|.*;\s*)authkey\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			var url = "updateReport.php?reportid=" + reportid + "&status=" + status +
				"&authkey=" + authkey;
			$.post("php/backend/" + url, function(data){
				if(data.success == 1){
					callback(data);
				}else{
					callback(false);
				}	
			});
		},
		uploadImage : function(callback, entryid, file){
			var authkey = document.cookie.replace(/(?:(?:^|.*;\s*)authkey\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			
			var formData = new FormData();
			formData.append('authkey', authkey);
			formData.append('id', entryid);
			formData.append('images[0]', file);

			var url = "imgurUpload.php";

			$.ajax({
				url: 'php/backend/' + url,
				type: 'POST',
				contentType: false,
				processData: false,
				cache: false,
				data: formData,
			})
			.done(function(data) {
				console.log(data);
				callback(true, entryid);
			})
			.fail(function(data) {
				callback(false, entryid);
			})
			.always(function() {
				console.log("complete");
			});
		},
		getTags: function(callback){
			var url = 'getTags.php?';
			var tagData = null;

			$.get('php/backend/' + url, function(data) {
				if(data.success == 1){
					tagData = data.data;
				}
				callback(tagData);
			});
		},
		getSystemTags: function(callback){
			var url = 'getTags.php?status=1';
			var tagData = null;

			$.get('php/backend/' + url, function(data) {
				if(data.success == 1){
					tagData = data.data;
				}
				callback(tagData);
			});
		},
		getUserTags: function(callback){
			var url = 'getTags.php?status=0';
			var tagData = null;

			$.get('php/backend/' + url, function(data) {
				if(data.success == 1){
					tagData = data.data;
				}
				callback(tagData);
			});
		},
		createUser : function(callback, username, pw, mail){
			var url = 'createUser.php?name=' + username + '&pwd=' + pw + 
				'&mail=' + mail;
			var userData = null;
			console.log(url);
			$.get('php/backend/' + url, function(data) {
				if(data.success == 1){
					userData = data.data;
				}
				callback(userData);
			});
		},
		loginUser : function(callback, mail, password){
			var authkey = document.cookie.replace(/(?:(?:^|.*;\s*)authkey\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			var url = 'login.php?mail=' + mail + '&password=' + password;
			if(authkey && authkey.length == AUTH_KEY_LENGTH){
				url += "&authkey="+authkey;
			}
			var userData = null;
			console.log(url);
			$.get('php/backend/' + url, function(data) {
				if(data.success == 1){
					userData = data.data;
					var d = new Date();
					var oneYear = 31536000000;
					d.setTime(d.getTime() + oneYear);
					document.cookie = "authkey=" + userData + "; expires=" + d.toGMTString();
				}
				callback(userData);
			});
		},
		updateUserStatus : function(callback, userid, status){
			var authkey = document.cookie.replace(/(?:(?:^|.*;\s*)authkey\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			var url = 'updateUser.php?status=' + status + '&id=' + userid + '&authkey='+authkey;
			var userData = null;
			$.get('php/backend/' + url, function(data) {
				if(data.success == 1){
					userData = data.data;
				}
				callback(userData);
			});
		},
		updateUser : function(callback, mail, username, password){
			var authkey = document.cookie.replace(/(?:(?:^|.*;\s*)authkey\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			var url = 'updateUser.php?mail=' + mail + '&pwd=' + password + '&name=' + username + '&authkey='+authkey;
			var userData = null;
			console.log(url);
			$.get('php/backend/' + url, function(data) {
				if(data.success == 1){
					userData = data.data;
				}
				callback(userData);
			});
		},
		getUser : function(callback, id){
			var authkey = document.cookie.replace(/(?:(?:^|.*;\s*)authkey\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			var url = 'getUser.php?id='+id;
			if(authkey.length == 45)
				url += "&authkey="+authkey;
			console.log(url);
			$.get("php/backend/"+url,function(data){
				if(data.success == 1){
					callback(data.data);
				}else{
					callback(false);
				}
			});
		},
		getUsers : function(callback){
			var authkey = document.cookie.replace(/(?:(?:^|.*;\s*)authkey\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			var url = 'getUsers.php?authkey='+authkey;
			if(authkey.length != 45)
				callback(false);
			console.log(url);
			$.get("php/backend/"+url,function(data){
				if(data.success == 1){
					callback(data.data);
				}else{
					callback(false);
				}
			});
		},
		getUserAuth: function(callback, authkey){
			var url = 'getUser.php?authkey=' + authkey;
			$.get("php/backend/" + url, function(data){
				if(data.success == 1){
					callback(data.data);
				}else{
					callback(null);
				}
			});
		},
		search: function(callback, searchcontent, start){
			start = start || 0;
			var url = 'search.php?search=' + searchcontent + '&start=' + start;
			var searchData = null;

			$.get('php/backend/' + url, function(data) {
				if(data.success == 1){
					searchData = data.data;
				}
				callback(searchData);
			});
		},
		logout: function(callback, authkey){
			var authkey = document.cookie.replace(/(?:(?:^|.*;\s*)authkey\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			var url = 'logout.php?authkey=' + authkey;
			$.get('php/backend/' + url, function(data) {
				callback(data.success);
			});
		},
		Tags : tags,
		OrderBy: orderby,
		Sex : sex
	}
}());