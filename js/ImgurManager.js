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
				}else if(data.success == 8){
					window.location = "maintenance.php";
				}
				callback(links, searchProps.orderby);
			});
		},
		getRandomUnstranscribedEntries : function(callback){
			var links = null;
			var authkey = document.cookie.replace(/(?:(?:^|.*;\s*)authkey\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			var url = 'getRandomUntranscribedEntries.php?authkey=' + authkey + "&amount=20"; 
			$.get('php/backend/' + url, function(data) {
				if(data.success == 1){
					links = data.data;
				}	
				callback(links);
			});
		},
		getEntriesForUser : function(callback, userid, start){
			start = start || 0;
			var url = 'getFilteredEntries.php?filter=user&values='+userid+"&start="+start+"&orderby=rating";
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

			var url = 'getFilteredEntries.php?filter=' + escape(searchProps.filter) + 
				'&values=' + escape(values) + '&start=' + searchProps.start + 
				'orderby=' + escape(searchProps.orderby);
			$.get('php/backend/' + url, function(data) {
				if(data.success == 1){
					links = data.data;
				}	
				callback(links);	
			});
		},
		searchByType : function(callback, types, order, currentEntry){
			types = types || 1;
			order = order || orderby.properties[orderby.RATING].name;
			start = currentEntry || 0;

			var links = null;

			var url = 'getFilteredEntries.php?filter=type&' + 
				'values=' + escape(types) + '&start=' + start + 
				'&orderby=' + escape(order);
			$.get('php/backend/' + url, function(data) {
				if(data.success == 1){
					links = data.data;
				}	
				callback(links);	
			});
		},
		searchByTag : function(callback, tags, order, currentEntry){
			tags = tags || 1;
			order = order || orderby.properties[orderby.RATING].name;
			start = currentEntry || 0;

			var links = null;

			var url = 'getFilteredEntries.php?filter=tag&' + 
				'values=' + escape(tags) + '&start=' + start + 
				'&orderby=' + escape(order);
			$.get('php/backend/' + url, function(data) {
				if(data.success == 1){
					links = data.data;
				}	
				callback(links);	
			});
		},
		searchBySex : function(callback, sex, order, currentEntry){
			sex = sex || "m";
			order = order || orderby.properties[orderby.RATING].name;
			start = currentEntry || 0;

			var links = null;

			var url = 'getFilteredEntries.php?filter=sex&' + 
				'values=' + escape(sex) + '&start=' + start + 
				'&orderby=' + escape(order);
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
				'values=' + escape(user) + '&start=' + start + 
				'&orderby=' + escape(order);
			$.get('php/backend/' + url, function(data) {
				if(data.success == 1){
					links = data.data;
				}	
				callback(links);	
			});
		},
		searchByLocation : function(callback, locations, order, currentEntry){
			locations = locations || "Universität";
			order = order || orderby.properties[orderby.RATING].name;
			start = currentEntry || 0;

			var links = null;

			var url = 'getFilteredEntries.php?filter=location&' + 
				'values=' + escape(locations) + '&start=' + start + 
				'&orderby=' + escape(order);
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
			if(authkey.length >= AUTH_KEY_LENGTH){
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
			if(authkey.length >= AUTH_KEY_LENGTH){
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
			var url = 'updateTranscription.php?authkey='+authkey+"&entryid="+entryid+"&transcription="+escape(transcription);
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

			$.post('php/backend/' + url, function(data) {				
				if(data.success == 1){
					callback(rating);
					return;
				}
				callback(rating);
			});
		},
		addEntry : function(callback, formData){
			var authkey = document.cookie.replace(/(?:(?:^|.*;\s*)authkey\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			if(formData == null || formData == undefined){
				return;
			}else{
				var data = $.param(formData, false);
				var url = "addEntry.php?authkey=" + authkey + "&" + data;
				$.post("php/backend/" + url, function(data){
					if(data.success == 1){
						callback(data.data);
					}else{
						//console.log("Error");
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
				$.post("php/backend/" + url, function(data){
					if(data.success == 1){
						callback(data.data);
					}else{
						//console.log("Error");
					}
				});
			}
		},
		deleteEntry : function(entryid, callback){
			var authkey = document.cookie.replace(/(?:(?:^|.*;\s*)authkey\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			var url = "deleteEntry.php?entryid=" + entryid + 
				"&authkey=" + authkey;
			$.post("php/backend/" + url, function(data){
				// if(data.success == 1){
				// 	console.log("Entry deleted...");
				// }else{
				// 	console.log("Error");
				// }
				callback(data.success==1);
			});
		},
		getEntry : function(callback, id){
			var authkey = document.cookie.replace(/(?:(?:^|.*;\s*)authkey\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			var url;
			if(authkey.length >= AUTH_KEY_LENGTH){
				url = "getEntry.php?entryid=" + id + "&authkey=" + authkey;
			}else{
				url = "getEntry.php?entryid=" + id;
			}
			$.post("php/backend/" + url, function(data){
				if(data.success == 1){
					callback(data["data"]);
				}else{
					callback("Error");
					//console.log("Error");
				}
			});
		},
		getLocations : function(callback, latitude, longitude){
			var authkey = document.cookie.replace(/(?:(?:^|.*;\s*)authkey\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			var locations = null;
			var url = "getLocations.php?";
			if(authkey.length >= AUTH_KEY_LENGTH){
				url += "authkey="+authkey+"&";
			}
			if(latitude&&longitude){
				url+= "lat=" + latitude
					+"&long=" + longitude;
			}
			$.post("php/backend/" + url, function(data){
				if(data.success == 1){
					locations = data.data;
				}
				callback(locations);
			});
		},
		updateLocation : function(callback, locationid, locations, flat, flong, tlat, tlong){
			var authkey = document.cookie.replace(/(?:(?:^|.*;\s*)authkey\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			if(authkey.length < AUTH_KEY_LENGTH)callback(false);
			var url = "updateLocation.php?authkey="+authkey;
			url += "&locationid="+locationid;
			url += "&locations="+escape(locations);
			url += "&flat="+flat;
			url += "&flong="+flong;
			url += "&tlat="+tlat;
			url += "&tlong="+tlong;
			$.post("php/backend/"+url, function(data){
				if(data.success == 1){
					callback(true);
				}else{
					callback(false);
				}
			});
		},
		createLocation : function(callback, locations, flat, flong, tlat, tlong){
			var authkey = document.cookie.replace(/(?:(?:^|.*;\s*)authkey\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			if(authkey.length < AUTH_KEY_LENGTH)callback(false);
			var url = "createLocation.php?authkey="+authkey;
			url += "&locations="+escape(locations);
			url += "&flat="+flat;
			url += "&flong="+flong;
			url += "&tlat="+tlat;
			url += "&tlong="+tlong;
			$.post("php/backend/"+url, function(data){
				if(data.success == 1){
					callback(true);
				}else{
					callback(false);
				}
			});
		},
		deleteLocation : function(callback, id){
			var authkey = document.cookie.replace(/(?:(?:^|.*;\s*)authkey\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			if(authkey.length < AUTH_KEY_LENGTH)callback(false);
			var url = "deleteLocation.php?authkey="+authkey+"&locationid="+id;
			$.post("php/backend/"+url, function(data){
				if(data.success == 1){
					callback(true);
				}else{
					callback(false);
				}
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
		getMyLocationFromIP : function(callback){
			$.get("http://ipinfo.io", function(response) {
				var locs = response.loc.split(",");
				callback(locs);
			}, "jsonp");
		},
		getDefaultLocations : function(callback){
			ImgurManager.getMyLocationFromIP(function(locs) {
				var latitude = locs[0];
				var longitude = locs[1];
				var locations = null;
				var url = "getLocations.php?lat="+latitude+"&long="+longitude;
				$.post("php/backend/" + url, function(data){
					if(data.success == 1){
						locations = data.data;
					}
					callback(locations);
				});
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
		updateType : function(callback, id, name, text){
			var authkey = document.cookie.replace(/(?:(?:^|.*;\s*)authkey\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			var url = "updateType.php?id=" + id + "&name=" + escape(name) +
				"&desc=" + escape(text) + "&authkey=" + authkey;
			$.post("php/backend/" + url, function(data){
				if(data.success == 1){
					callback(true);
				}else{
					callback(false);
				}	
			});
		},
		createType : function(callback, name, text){
			var authkey = document.cookie.replace(/(?:(?:^|.*;\s*)authkey\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			var url = "createType.php?name=" + escape(name) + "&desc=" + escape(text) +
				"&authkey=" + authkey;
			$.post("php/backend/" + url, function(data){
				if(data.success == 1){
					callback(true);
				}else{
					callback(false);
				}	
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
			if(authkey.length < AUTH_KEY_LENGTH)callback(false);
			var url = "addComment.php?entryid=" + entryid + "&comment=" + escape(comment) + "&authkey=" + authkey;
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
			if(authkey.length < AUTH_KEY_LENGTH)callback(false);
			var url = "deleteComment.php?commentid=" + commentid + "&authkey=" + authkey;
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
			var url = "addReport.php?entryid=" + entryid + "&reportdesc=" + escape(reportdesc) +
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
		uploadImage : function(callback, entryid, file, bounds){
			var authkey = document.cookie.replace(/(?:(?:^|.*;\s*)authkey\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			
			var formData = new FormData();
			formData.append('authkey', authkey);
			formData.append('id', entryid);
			formData.append('images[0]', file);
			formData.append('bounds-x',bounds.x);
			formData.append('bounds-y',bounds.y);
			formData.append('bounds-w',bounds.w);
			formData.append('bounds-h',bounds.h);

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
				callback(true, entryid);
			})
			.fail(function(data) {
				callback(false, entryid);
			})
			.always(function() {
			});
		},
		addImage : function(callback, entryid){
			var authkey = document.cookie.replace(/(?:(?:^|.*;\s*)authkey\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			var url = "addImage.php?authkey="+authkey+"&id="+entryid;
			$.get('php/backend/' + url, function(data) {
				console.log(data);
				if(data.success == 1){
					callback(true, entryid);
				}
				callback(false, entryid);
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
		updateTag : function(callback, id, status){
			var authkey = document.cookie.replace(/(?:(?:^|.*;\s*)authkey\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			var url = "updateTag.php?id=" + id + "&status=" + status +
				"&authkey=" + authkey;
			$.post("php/backend/" + url, function(data){
				if(data.success == 1){
					callback(true);
				}else{
					callback(false);
				}	
			});
		},
		createUser : function(callback, username, pw, mail){
			var url = 'createUser.php?name=' + escape(username) + '&pwd=' + pw + 
				'&mail=' + escape(mail);
			var userData = null;
			$.get('php/backend/' + url, function(data) {
				if(data.success == 1){
					userData = data.data;
				}
				callback(userData);
			});
		},
		loginUser : function(callback, mail, password){
			var authkey = document.cookie.replace(/(?:(?:^|.*;\s*)authkey\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			var url = 'login.php?mail=' + escape(mail) + '&password=' + password;
			if(authkey && authkey.length >= AUTH_KEY_LENGTH){
				url += "&authkey="+authkey;
			}
			var userData = null;
			$.get('php/backend/' + url, function(data) {
				if(data.success == 1){
					userData = data.data;
					var d = new Date();
					var thirtyDays = 2592000000;
					d.setTime(d.getTime() + thirtyDays);
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
			var url = 'updateUser.php?mail=' + escape(mail) + '&pwd=' + password + '&name=' + escape(username) + '&authkey='+authkey;
			var userData = null;
			$.get('php/backend/' + url, function(data) {
				if(data.success == 1){
					userData = data.data;
				}
				callback(userData);
			});
		},
		followUser : function(callback, userid, follow){
			var authkey = document.cookie.replace(/(?:(?:^|.*;\s*)authkey\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			var url = 'follow.php?authkey='+authkey+'&userid='+userid+'&follow='+follow;
			$.get("php/backend/"+url,function(data){
				if(data.success == 1){
					callback(follow);
				}else{
					callback(null);
				}
			});
		},
		getUser : function(callback, id){
			var authkey = document.cookie.replace(/(?:(?:^|.*;\s*)authkey\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			var url = 'getUser.php?id='+escape(id);
			if(authkey.length == 45)
				url += "&authkey="+authkey;
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
				}else if(data.success == 8){
					window.location = "maintenance.php";
				}else{
					callback(null);
				}
			});
		},
		search: function(callback, searchcontent, start){
			start = start || 0;
			var url = 'search.php?search=' + escape(searchcontent) + '&start=' + start;
			var searchData = null;

			$.get('php/backend/' + url, function(data) {
				if(data.success == 1){
					searchData = data.data;
				}
				callback(searchData);
			});
		},
		getStatistics : function(callback){
			var authkey = document.cookie.replace(/(?:(?:^|.*;\s*)authkey\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			var url = 'getStatistics.php?authkey=' + authkey;
			$.get('php/backend/' + url, function(data) {
				var result = false;
				if(data.success == 1){
					result = data.data;
				}
				callback(result);
			});
		},
		getLogs : function(callback, date){
			var authkey = document.cookie.replace(/(?:(?:^|.*;\s*)authkey\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			var url = 'getLogs.php?authkey=' + authkey;
			if(date){
				url += "&date="+escape(date);
			}
			$.get('php/backend/' + url, function(data) {
				var result = false;
				if(data.success == 1){
					result = data.data;
				}
				callback(result);
			});
		},
		logout: function(callback, authkey){
			var authkey = document.cookie.replace(/(?:(?:^|.*;\s*)authkey\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			var url = 'logout.php?authkey=' + authkey;
			$.get('php/backend/' + url, function(data) {
				callback(data.success);
			});
		},
		deleteUser: function(callback){
			var authkey = document.cookie.replace(/(?:(?:^|.*;\s*)authkey\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			var url = 'deleteUser.php?authkey=' + authkey;
			$.get('php/backend/' + url, function(data) {
				callback(data.success);
			});
		},
		Tags : tags,
		OrderBy: orderby,
		Sex : sex
	}
}());