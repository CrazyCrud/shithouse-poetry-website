var map;
var rectangles = [];
var locationlist = [];
var $users = $("#users-table-content");
var $reports = $("#reports-table-content");
var $locations = $("#locations-table-content");
var $userButton = $("#notifications-header #users");
var $reportButton = $("#notifications-header #reports");
var $locationButton = $("#notifications-header #locations");

$(function(){
	initGUI();
	loadUsers();
	loadReports();
});

function initGUI(){
	$userButton.click(function(){
		$(".section").css("display","none");
		$(".section#users").css("display","block");
		loadUsers();
	});
	$reportButton.click(function(){
		$(".section").css("display","none");
		$(".section#reports").css("display","block");
		loadReports();
	});
	$locationButton.click(function(){
		$(".section").css("display","none");
		$(".section#locations").css("display","block");
		loadLocations();
	});
	$(document).on("change",".useroption",function(){
		var userid = $(this).attr("userid");
		var status = $(this).find(":selected").attr("status");
		updateUser(userid, status);
	});
	$(document).on("change",".reportoption",function(){
		var reportid = $(this).attr("reportid");
		var status = $(this).find(":selected").attr("status");
		updateReport(reportid, status);
	});
	$(document).on("click","#locations-table-content .description",function(){
		initLocationEdit(this);
	});
	$(document).on("click","#locations-table-content .ok-button",function(){
		updateEditedLocation(this);
	});
	$("#reports-table").tablesorter({ 
		sortList: [[4,1],[3,1]],
        textExtraction: function(node) { 
        	if(node.hasAttribute("sort"))
        		return node.getAttribute("sort");
            return node.innerHTML; 
        } 
    });
	$("#users-table").tablesorter({ 
		sortList: [[3,1]],
        textExtraction: function(node) { 
        	if(node.hasAttribute("sort"))
        		return node.getAttribute("sort");
            return node.innerHTML; 
        } 
    });
    $("#locations-table").tablesorter({ 
        textExtraction: function(node) { 
        	if(node.hasAttribute("sort"))
        		return node.getAttribute("sort");
            return node.innerHTML; 
        } 
    });
}

function updateUser(userid, status){
	ImgurManager.updateUserStatus(function(data){
		if(data!=null){
			var $user = $("#user"+userid);
			var $icon = $($user.find(".status i")[0]);
			$icon.removeClass();
			switch(status){
				case "-1":
					$icon.addClass("icon-cancel user-deleted");
					break;
				case "0":
					$icon.addClass("icon-user user-default");
					break;
				case "1":
					$icon.addClass("icon-cog user-admin");
					break;
				case "2":
					$icon.addClass("icon-user-1 user-new");
					break;
				case "3":
					$icon.addClass("icon-block user-banned");
					break;
				case "4":
					$icon.addClass("icon-help-circled user-unregistered");
					break;
			}
		}
	}, userid, status);
}

function updateReport(reportid, status){
	ImgurManager.updateReport(function(data){
		if(data!=null){
			var $report = $("#report"+reportid);
			var $icon = $($report.find(".status i")[0]);
			$icon.removeClass();
			switch(status){
				case "-1":
					$icon.addClass("icon-ok report-ok");
					break;
				case "0":
					$icon.addClass("icon-block report-default");
					break;
				case "1":
					$icon.addClass("icon-attention report-important");
					break;
			}
		}
	}, reportid, status);
}

function loadUsers(){
	ImgurManager.getUsers(fillUsersUI);
}

function loadLocations(){
	// if map is empty
	if(!$.trim($("#locations-map").html())){
		initMap();
	}
	ImgurManager.getLocations(fillLocationsUI);
}

function loadReports(){
	ImgurManager.getReports(fillReportsUI);
}

function isNewUser(user){
	var ONE_SEC = 1000;
	var ONE_MIN = 60*ONE_SEC;
	var ONE_HOUR = 60*ONE_MIN;
	var ONE_DAY = 24*ONE_HOUR;
	var ONE_WEEK = 7*ONE_DAY;
	var timeObj = convertDateTime(user.joindate);
	var today = new Date();
	var timestamp = timeObj.getTime();
	var difference = today-timestamp;
	return(difference<=ONE_DAY)
}

function fillUsersUI(data){
	console.log(data);
	$users.html("");
	if(!data)return;
	var newUserCount = 0;
	for(var i=0; i<data.length; i++){
		var user = data[i];
		if(isNewUser(user))newUserCount++;
		addUser(user);
	}
    if(newUserCount==0)
    	$("#notifications-header #users").html("");
    else
    	$("#notifications-header #users").html(newUserCount);
    $("#notifications-header #users").attr("title",newUserCount+" neue(r) Benutzer in den letzten 24 Stunden");

    $("#users-table").trigger("update");
}

function fillLocationsUI(data){
	console.log(data);
	$locations.html("");
	clearMap();
	if(!data)return;
	for(var i=0; i<data.length; i++){
		var loc = data[i];
		addLocation(loc);
	}
    
    $("#locations-table").trigger("update");
}

function fillReportsUI(data){
	console.log(data);
	$reports.html("");
	if(!data)return;
	var newReportsCount = 0;
	for(var i=0; i<data.length; i++){
		var report = data[i];
		if(report["status"]!=-1){
			newReportsCount++;
		}
		addReport(report);
	}
    if(newReportsCount == 0)
    	$("#notifications-header #reports").html("");
    else
    	$("#notifications-header #reports").html(newReportsCount);
    $("#notifications-header #reports").attr("title",newReportsCount+" unbehandelte Meldung(en)");

    $("#reports-table").trigger("update");
}

function addUser(queriedUser){
	var icon = "<i class='icon-help user-unknown'></i>";
	var status = "Unbekannt";
	switch(queriedUser.status){
		case "-1":
			icon = '<i class="icon-cancel user-deleted"></i>';
			status = "Gel&ouml;scht";
			break;
		case "0":
			icon = '<i class="icon-user user-default"></i>';
			status = "Nutzer";
			break;
		case "1":
			icon = '<i class="icon-cog user-admin"></i>';
			status = "Admin";
			break;
		case "2":
			icon = '<i class="icon-user-1 user-new"></i>';
			status = "neuer Nutzer";
			break;
		case "3":
			icon = '<i class="icon-block user-banned"></i>';
			status = "Gebannt";
			break;
		case "4":
			icon = '<i class="icon-help-circled user-unregistered"></i>';
			status = "Unregistriert";
			break;
	}

	var s = queriedUser.status;
	var options = '<select userid="'+queriedUser.id+'" class="small-10 medium-10 large-10 useroption">';
	options += '<option '+(s==-1?"selected":"")+' status="-1" value>Gel&ouml;scht</option>';
	options += '<option '+(s==0?"selected":"")+' status="0" value>Nutzer</option>';
	options += '<option '+(s==1?"selected":"")+' status="1" value>Admin</option>';
	options += '<option '+(s==2?"selected":"")+' status="2" value>neuer Nutzer</option>';
	options += '<option '+(s==3?"selected":"")+' status="3" value>Gebannt</option>';
	options += '<option '+(s==4?"selected":"")+' status="4" value>Unregistriert</option></select>';

	if(user.id == queriedUser.id)options = "";

	var verified = "";
	if(queriedUser.sessionkey.length!=45){
		verified = '<i class="icon-ok" title="Email verifiziert"></i>';
	}

	var $container = $('<tr class="user-table-row" id="user'+queriedUser.id+'"> '
    +'<td class="id">'+queriedUser.id+'</td> '
    +'<td class="mail">'+queriedUser.email+verified+'</td> '
    +'<td class="username"><a href="user.php?id='+queriedUser.id+'" target="_blank">'+queriedUser.username+'</a></td> '
    +'<td class="date" title="'+queriedUser.joindate+'" sort="'+queriedUser.joindate+'">'+formatTime(queriedUser.joindate)+'</td> '
    +'<td class="date" title="'+queriedUser.lastaction+'" sort="'+queriedUser.lastaction+'">'+formatTime(queriedUser.lastaction)+'</td> '
    +'<td class="status" sort="'+queriedUser.status+'">'+icon+options+'</td> '
	+'</tr>');

	$users.append($container);
}

function addReport(report){
	var icon = "<i class='icon-help report-unknown'></i>";
	var status = "Unbekannt";
	switch(report.status){
		case "-1":
			icon = '<i class="icon-ok report-ok"></i>';
			status = "Gel&ouml;&szlig;t";
			break;
		case "0":
			icon = '<i class="icon-block report-default"></i>';
			status = "Meldung";
			break;
		case "1":
			icon = '<i class="icon-attention report-important"></i>';
			status = "Wichtig";
	}

	var s = report.status;
	var options = '<select reportid="'+report.reportid+'" class="small-10 medium-10 large-10 reportoption">';
	options += '<option '+(s==-1?"selected":"")+' status="-1" value>Gel&ouml;&szlig;t</option>';
	options += '<option '+(s==0?"selected":"")+' status="0" value>Meldung</option>';
	options += '<option '+(s==1?"selected":"")+' status="1" value>Wichtig</option></select>';

	var $container = $('<tr class="report-table-row" id="report'+report.reportid+'">'
		+'<td class="title"><a href="details.php?id='+report.entryid+'" target="_blank">'+report.entrytitle+'</a></td>'
		+'<td class="user"><a href="user.php?id='+report.userid+'" target="_blank">'+report.username+'</a></td>'
		+'<td class="report">'+report.reportdescription+'</td>'
		+'<td class="date" sort="'+report.reportdate+'">'+formatTime(report.reportdate)+'</td>'
		+'<td class="status" sort="'+report.status+'" >'+icon+options+'</td>'
		+'</tr>'
	);

	$reports.append($container);
}

function addLocation(location){

	locationlist[location.id] = location;

	var mapIcon = '<a href="#map"><i class="icon-left-big"></i></a>';
	var icon = '<a href="javascript:void()"><i class="icon-cancel"></i></a>';

	var locations = buildLocationString(location.locations);

	var $container = $('<tr class="location-table-row" locationid="'+location.id+'" id="location'+location.id+'">'
		+'<td class="map">'+mapIcon+'</a></td>'
		+'<td class="description row">'+locations+'</a></td>'
		+'<td class="delete">'+icon+'</a></td>'
		+'</tr>'
	);

	$locations.append($container);

	var color = getRandomColor();

	var rectangle = new google.maps.Rectangle({
	    strokeColor: color,
	    strokeOpacity: 0.75,
	    strokeWeight: 2,
	    fillColor: color,
	    fillOpacity: 0,
	    map: map,
	    editable: true,
	    locationid: location.id,
	    bounds: new google.maps.LatLngBounds(
	    	new google.maps.LatLng(location.fromlatitude, location.fromlongitude),
	    	new google.maps.LatLng(location.tolatitude, location.tolongitude))
	});

	google.maps.event.addListener(rectangle,"bounds_changed",function(a,b,c){
		var flat = this.bounds.Aa.j;
		var flong = this.bounds.qa.j;
		var tlat = this.bounds.Aa.k;
		var tlong = this.bounds.qa.k;
		updateLocation(this.locationid,false,flat,flong,tlat,tlong);
	});

	rectangles.push(rectangle);
}

function updateEditedLocation(target){
	var $row = $($(target).closest(".location-table-row"));
	var id = $row.attr("locationid");
	var locationstring = $($row.find("input")[0]).val().replace(new RegExp(";( ){2,}"),"; ");
	var location = locationlist[id];
	location.locations = locationstring.split(";");
	ImgurManager.updateLocation(onLocationUpdated,
		id,
		locationstring,
		location.fromlatitude,
		location.fromlongitude,
		location.tolatitude,
		location.tolongitude);
}

function updateLocation(id, locations, flat, flong, tlat, tlong){
	var loc = locationlist[id];
	if(!locations){
		locations = buildLocationString(loc.locations);
	}
	loc.fromlatitude = flat;
	loc.fromlongitude = flong;
	loc.tolatitude = tlat;
	loc.tolongitude = tlong;
	loc.locations = locations.split(";");
	ImgurManager.updateLocation(onLocationUpdated, id, locations, flat, flong, tlat, tlong);
}

function onLocationUpdated(success){
	if(!success || success==null){
		console.log("Error updating location ...");
	}else{
		endLocationEdit();
	}
}

function initLocationEdit(target){
	var input = $(target).find("input");
	if(input&&input.length!=0)return;
	endLocationEdit();
	var $input = $('<input type="text"></input>');
	var $button = $('<button class="tiny ok-button">OK</button>');
	$input.val($(target).html());
	$(target).html("");
	$(target).append($input);
	$(target).append($button);
}

function endLocationEdit(){
	$("#locations-table-content .location-table-row").each(function(){
		var id = $(this).attr("locationid");
		var input = $(this).find("input");
		var description = $(this).find(".description");
		if(!input||input.length==0)return;
		var txt = buildLocationString(locationlist[id].locations);
		description.html(txt);
	});
}

function buildLocationString(list){
	if(list.length == 0)return "";
	var result = list[0].trim();
	for(var i=1; i<list.length; i++){
		result += "; "+list[i].trim();
	}
	return result;
}

function clearMap() {
  if (rectangles) {
    for (i in rectangles) {
      rectangles[i].setMap(null);
    }
  }
}

function initMap(){
	var mapOptions = {
		zoom: 8,
		center: new google.maps.LatLng(49, 12.1),
	};
	map = new google.maps.Map(document.getElementById('locations-map'),mapOptions);
}