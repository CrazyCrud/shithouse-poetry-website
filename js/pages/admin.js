var map;
var rectangles = [];
var locationlist = [];
var $users = $("#users-table-content");
var $reports = $("#reports-table-content");
var $locations = $("#locations-table-content");
var $tags = $("#tags-content #tagscontainer");
var $types = $("#types-content");
var $logs = $("#logs-content");
var $overviewButton = $("#notifications-header #overview");
var $userButton = $("#notifications-header #users");
var $reportButton = $("#notifications-header #reports");
var $locationButton = $("#notifications-header #locations");
var $tagsButton = $("#notifications-header #tags");
var $typesButton = $("#notifications-header #types");
var $logsButton = $("#notifications-header #logs");
var $addLocationButton = $("#add-location");
var $addTagButton = $("#addtagbutton");
var $newTypeButton = $("#newtypebutton");
var $addTypeButton = $("#addtypebutton");
var $newTypeName = $("#newtype-name");
var $newTypeDescription = $("#newtype-description");

var STROKE_DEFAULT = "#000";
var STROKE_FOCUS = "#008CBA";

$(function(){
	initGUI();
	//loadStatistics();
	loadUsers();
	loadReports();
	loadTags();
	loadTypes();
	$overviewButton.trigger("click");
});

function initGUI(){
	$overviewButton.click(function(){
		$("#notifications-header a").removeClass("active");
		$(this).addClass("active");
		$(".section").css("display","none");
		$(".section#overview").css("display","block");
		loadStatistics();
	});
	$userButton.click(function(){
		$("#notifications-header a").removeClass("active");
		$(this).addClass("active");
		$(".section").css("display","none");
		$(".section#users").css("display","block");
		loadUsers();
	});
	$reportButton.click(function(){
		$("#notifications-header a").removeClass("active");
		$(this).addClass("active");
		$(".section").css("display","none");
		$(".section#reports").css("display","block");
		loadReports();
	});
	$locationButton.click(function(){
		$("#notifications-header a").removeClass("active");
		$(this).addClass("active");
		$(".section").css("display","none");
		$(".section#locations").css("display","block");
		loadLocations();
	});
	$tagsButton.click(function(){
		$("#notifications-header a").removeClass("active");
		$(this).addClass("active");
		$(".section").css("display","none");
		$(".section#tags").css("display","block");
		loadTags();
	});
	$typesButton.click(function(){
		$("#notifications-header a").removeClass("active");
		$(this).addClass("active");
		$(".section").css("display","none");
		$(".section#types").css("display","block");
		loadTypes();
	});
	$logsButton.click(function(){
		$("#notifications-header a").removeClass("active");
		$(this).addClass("active");
		$(".section").css("display","none");
		$(".section#logs").css("display","block");
		loadLogs();
	});
	$addLocationButton.click(createLocation);
	$addTagButton.click(createTag);
	$newTypeButton.click(function(){
		showCreateTypeDialog(true);
	});
	$addTypeButton.click(createType);
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
	$(document).on("click",".location-table-row .map a", function(){
		goToMap(this);
	});
	$(document).on("click","#tagscontainer .tag a", function(){
		deleteTag(this);
	});
	$(document).on("click",".location-table-row .delete a", function(){
		deleteLocation(this);
	});
	$(document).on("click","#types-content .type .edit a", function(){
		editTypeClicked(this);
	});
	$(document).on("click",".log-date", function(){
		editLogClicked(this);
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

function showCreateTypeDialog(visible){
	if(visible){
		$("#newtypebutton").css("display","none");
		$("#add-type-container").css("display","block");
	}else{
		$("#newtypebutton").css("display","");
		$("#add-type-container").css("display","none");
	}
}

function loadStatistics(){
	ImgurManager.getStatistics(fillStatisticsUI);
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

function loadTags(){
	ImgurManager.getSystemTags(fillTagsUI);
}

function loadTypes(){
	showCreateTypeDialog(false);
	ImgurManager.getTypes(fillTypesUI);
}

function loadLogs(){
	ImgurManager.getLogs(fillLogsUI);
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

function fillTagsUI(data){
	if(!data||data==null)return;
	$tags.empty();
	for(i in data){
		var $tag = $('<div class="tag">'
			+'<span>'+data[i].tag+'</span>'
			+'<a title="L&ouml;schen" href="#">'
			+'<i class="icon-cancel"></i>'
			+'</a></div>');
		$tags.append($tag);
	}
}

function fillLogsUI(data){
	if(!data||data==null){
		$("#logs-content").html("keine Logs gefunden.");
		return;
	}
	$logs.empty();
	for(i in data){
		var $log = $('<div class="log" id="log'+data[i]+'"><a href="#" class="log-date">'+data[i]+'</a><div class="log-content"></div></div>');
		$logs.prepend($log);
	}
}

function fillTypesUI(data){
	if(!data||data==null)return;
	$types.empty();
	for(i in data){
		var $type = $('<div typeid="'+data[i].id+'" class="type row">'
			+'<div class="columns name small-2 medium-2 large-2">'
			+'<span class="text">'+data[i].name+'</span>'
			+'<input class="input" value="'+data[i].name+'"></input>'
			+'</div>'
			+'<div class="columns description small-9 medium-9 large-9">'
			+'<span class="text">'+data[i].description+'</span>'
			+'<input class="input" value="'+data[i].description+'"></input>'
			+'</div>'
			+'<div class="columns edit small-1 medium-1 large-1"><a href="#"><i class="icon-pencil"></i></a></div>'
			+'</div>');
		$types.append($type);
	}
}

function arrayToDataTable(array){
	var result = new google.visualization.DataTable();
	result.addColumn('date', "Datum");
	result.addColumn('number', "Nutzer");
	result.addColumn('number', "Beiträge");
	for(i in array){
		array[i][0] = new Date(array[i][0]);
		result.addRow(array[i]);
	}
	return result;
}

function getStatisticArray(joins, uploads){
	var result = [];//[["Datum", "Nutzer", "Beiträge"]];
	var numbers = mergeStatisticArrays(joins, uploads);
	for(i in numbers){
		var length = result.length;
		var users = parseInt(numbers[i].join);
		var entries = parseInt(numbers[i].entries);
		result[length] = [i, users, entries];
	}
	result = result.sort(function(a,b){
		if(a[0]=="Datum")return -1;
		return a[0].localeCompare(b[0]);
	});
	for(var i=1; i<result.length; i++){
		result[i][1] += result[i-1][1];
		result[i][2] += result[i-1][2];
	}
	return result;
}

function mergeStatisticArrays(joins, uploads){
	var array = [];
	for(i in joins){
		array[joins[i].day] = {join:joins[i].users, entries:0};
	}
	for(i in uploads){
		if(array[uploads[i].day]){
			array[uploads[i].day].entries = uploads[i].entries;
		}else{
			array[uploads[i].day] = {join:0, entries:uploads[i].entries};
		}
	}
	return array;
}

var googleloaded = false;
function fillStatisticsUI(data){
	if(!googleloaded){
		google.load("visualization", "1", {callback:function(){
	    	drawStatisticsUI(data);
		},packages:["corechart","controls"]});
	}else{
    	drawStatisticsUI(data);
    }
}

function drawStatisticsUI(data){
	googleloaded = true;
	drawStatisticGraphs(data);
	drawStatisticPie(data.genders[0]);
}

function drawStatisticGraphs(data){
	var array = getStatisticArray(data.joins, data.uploads);
	var data = arrayToDataTable(array);

	$("#chart-div span").remove();
	$("#chart-div div").html("");

	var dashboard = new google.visualization.Dashboard(
       document.getElementById('chart-div'));

	var colors = ['#99cc00', '#8901a7'];

	var options = {
		title: 'Nutzer und Beiträge',
		hAxis: {
			title: 'Datum', 
			titleTextStyle: {color: '#333'}
		},
		vAxis: {title: 'Anzahl'},
		explorer:{ keepInBounds: true },
		colors:colors
	};

	var twoWeeksAgo = new Date();
	twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

	var control = new google.visualization.ControlWrapper({
		'controlType': 'ChartRangeFilter',
		'containerId': 'chart-control-div',
		'options': {
			// Filter by the date axis.
			'filterColumnIndex': "0",
			'ui': {
				'chartType': 'LineChart',
				'chartOptions': {
					'chartArea': {'width': '90%'},
					'hAxis': {'baselineColor': 'none'},
					colors:colors
				},
				// Display a single series that shows the closing value of the stock.
				// Thus, this view has two columns: the date (axis) and the stock value (line series).
				'chartView': {
					'columns': [0, 1, 2]
				},
				// 1 day in milliseconds = 24 * 60 * 60 * 1000 = 86,400,000
				'minRangeSize': 8*86400000
			}
		},
		// Initial range
		'state': {'range': {'end': new Date(), 'start': twoWeeksAgo}}
	});

	var chart = new google.visualization.ChartWrapper({
		'chartType': 'LineChart',
		//dataTable: data,
		containerId: 'chart-chart-div',
		options: options
	});

	dashboard.bind(control, chart);
	dashboard.draw(data);
}

function drawStatisticPie(data){
	var data = google.visualization.arrayToDataTable([
		['Geschlecht', 'Beiträge'],
		['Männertoiletten', parseInt(data.male)],
		['Frauentoiletten', parseInt(data.female)],
		['Unisex-Toiletten', parseInt(data.unisex)]
	]);

	var options = {
		title: 'Geschlechterverteilung',
		slices: {
			0:{color:"#32a2b8"},
			1:{color:"#d22091"},
			2:{color:"#999"}
		}
	};

	var chart = new google.visualization.PieChart(document.getElementById('pie-div'));
	chart.draw(data, options);
}

function fillUsersUI(data){
	$users.html("");
	if(!data)return;
	var newUserCount = 0;
	for(var i=0; i<data.length; i++){
		var user = data[i];
		if(isNewUser(user))newUserCount++;
		addUser(user);
	}
    if(newUserCount==0)
    	$("#notifications-header #users #usercount").html("");
    else
    	$("#notifications-header #users #usercount").html(newUserCount);
    $("#notifications-header #users").attr("title",newUserCount+" neue(r) Nutzer in den letzten 24 Stunden");

    $("#users-table").trigger("update");
}

function fillLocationsUI(data){
	$locations.html("");
	clearMap();
	if(!data)return;
	for(i in data){
		var loc = data[i];
		if(loc)
			addLocation(loc);
	}
    
    $("#locations-table").trigger("update");
}

function fillReportsUI(data){
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
    	$("#notifications-header #reports #reportcount").html("");
    else
    	$("#notifications-header #reports #reportcount").html(newReportsCount);
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
			return;// dont show dummy-users
			//icon = '<i class="icon-help-circled user-unregistered"></i>';
			//status = "Unregistriert";
			break;
	}

	var s = queriedUser.status;
	var options = '<select userid="'+queriedUser.id+'" class="small-10 medium-10 large-10 useroption">';
	if(s==-1)options += '<option selected status="-1" value>Gel&ouml;scht</option>';
	options += '<option '+(s==0?"selected":"")+' status="0" value>Nutzer</option>';
	options += '<option '+(s==1?"selected":"")+' status="1" value>Admin</option>';
	options += '<option '+(s==2?"selected":"")+' status="2" value>neuer Nutzer</option>';
	options += '<option '+(s==3?"selected":"")+' status="3" value>Gebannt</option>';
	//options += '<option '+(s==4?"selected":"")+' status="4" value>Unregistriert</option></select>';

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

	$users.prepend($container);
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
		+'<td class="date" title="'+report.reportdate+'" sort="'+report.reportdate+'">'+formatTime(report.reportdate)+'</td>'
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
		+'<td class="description">'+locations+'</a></td>'
		+'<td class="delete">'+icon+'</a></td>'
		+'</tr>'
	);

	$locations.prepend($container);

	var rectangle = new google.maps.Rectangle({
	    strokeColor: STROKE_DEFAULT,
	    strokeOpacity: 0.75,
	    strokeWeight: 2,
	    fillColor: STROKE_DEFAULT,
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

	rectangles[location.id] = rectangle;
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

function goToMap(target){
	var $row = $($(target).closest(".location-table-row"));
	var id = $row.attr("locationid");
	hideOverlays();
	rectangles[id].setOptions({strokeColor : STROKE_FOCUS});
	var flat = rectangles[id].bounds.Aa.j;
	var tlat = rectangles[id].bounds.Aa.k;
	var flong = rectangles[id].bounds.qa.j;
	var tlong = rectangles[id].bounds.qa.k;
	var latitude = (flat+tlat)/2;
	var longitude = (flong+tlong)/2;

	var latDelta = Math.abs(flat-tlat);
	var longDelta = Math.abs(flong-tlong);

	var delta = latDelta;
	if(longDelta>latDelta)delta = longDelta;

	var center = new google.maps.LatLng(latitude, longitude);
	map.fitBounds(rectangles[id].bounds);
}

function hideOverlays(){
	for(i in rectangles){
		rectangles[i].setOptions({strokeColor : STROKE_DEFAULT});
	}
}

function deleteTag(target){
	var $tag = $($(target).closest(".tag"));
	var name = $tag.find("span")[0].innerHTML;
	ImgurManager.updateTag(loadTags, name, 0);
}

function deleteLocation(target){
	var $row = $($(target).closest(".location-table-row"));
	var id = $row.attr("locationid");
	ImgurManager.deleteLocation(onLocationDeleted,id);
	locationlist[id]=false;
}

function onLocationDeleted(success){
	if(!success||success==null){
		//console.log("Error deleting location");
	}else{
		fillLocationsUI(locationlist);
	}
}

function createTag(){
	var tag = $("#taginput").val();
	$("#taginput").val("");
	ImgurManager.updateTag(loadTags, tag, 1);
}

function createType(){
	var name = $("#newtype-name").val();
	$("#newtype-name").val("");
	var txt = $("#newtype-description").val();
	$("#newtype-description").val("");
	ImgurManager.createType(loadTypes, name, txt);
}

function createLocation(){
	map.setZoom(map.getZoom()+1);
	var flat = map.getBounds().Aa.j;
	var tlat = map.getBounds().Aa.k;
	var flong = map.getBounds().qa.j;
	var tlong = map.getBounds().qa.k;
	map.setZoom(map.getZoom()-1);
	var locations = "";
	ImgurManager.createLocation(onLocationCreated, locations, flat, flong, tlat, tlong);
}

function onLocationCreated(){
	loadLocations();
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
		//console.log("Error updating location ...");
	}else{
		endLocationEdit();
	}
}

function initLocationEdit(target){
	var input = $(target).find("input");
	if(input&&input.length!=0)return;
	var $row = $($(target).closest(".location-table-row"));
	var id = $row.attr("locationid");	
	endLocationEdit();
	rectangles[id].setOptions({strokeColor : STROKE_FOCUS});
	var $input = $('<input type="text"></input>');
	var $button = $('<button class="tiny ok-button">OK</button>');
	$input.val($(target).html());
	$(target).html("");
	$(target).append($input);
	$(target).append($button);
}

function editTypeClicked(target){
	var $type = $(target).closest(".type");
	var $inputs = $($type.find(".input"));
	var $texts = $($type.find(".text"));
	if($inputs.css("display")=="none"){
		$inputs.css("display", "block");
		$texts.css("display", "none");
	}else{
		$inputs.css("display", "none");
		var id = $type.attr("typeid");
		var name = $($type.find(".name input.input")).val();
		var text = $($type.find(".description input.input")).val();
		ImgurManager.updateType(loadTypes, id, name, text);
	}
}

function editLogClicked(target){
	if($(".log .tablesorter").length==0){
		loadLog($(target).html());
	}
	$(".log-content").html("");
}

function loadLog(date){
	ImgurManager.getLogs(onSingleLogLoaded, date);
}

function onSingleLogLoaded(data){
	if(data.length==0)return;
	var date = data[0].substring(0,10);
	var $log = $("#log"+date);
	var $container = $($log.find(".log-content")[0]);
	$container.html("");
	var $table = $('<table id="logs-table" class="tablesorter">'
		+'<thead>'
		+'<tr>'
		+'<th>Zeit</th>'
		+'<th>NutzerId</th>'
		+'<th>BeitragsId</th>'
		+'<th style="width:100%">Log</th>'
		+'</tr>'
		+'</thead>'
		+'</table>');
	var $tableBody = $('<tbody></tbody>');

	for(i in data){
		var log = formatLog(data[i]);
		if(!log)continue;
		var $row = $('<tr>'
			+'<td>'+log.time+'</td>'
			+'<td sort="'+log.userid+'"><a href="user.php?id='+log.userid+'" target="_blank">'+log.userid+'</a></td>'
			+'<td sort="'+log.entryid+'"><a href="details.php?id='+log.entryid+'" target="_blank">'+log.entryid+'</a></td>'
			+'<td>'+log.text+'</td>'
			+'</tr>');
		$tableBody.prepend($row);
	}

	$table.append($tableBody);
	$container.append($table);

	$table.tablesorter({ 
		sortList: [[0,1],[1,0],[2,0]],
        textExtraction: function(node) { 
        	if(node.hasAttribute("sort"))
        		return node.getAttribute("sort");
            return node.innerHTML; 
        } 
    });
}

function formatLog(logLine){
	if(logLine.trim().length==0)return false;
	var time = logLine.substring(11,19);
	var text = logLine.substring(21);
	var uid = text.match(/@[0-9]+/ig);
	if(uid){
		uid = uid[0].substring(1);
		text = text.replace("@"+uid,'<a href="user.php?id='+uid+'" target="_blank">User'+uid+'</a>');
	}else uid = "";
	var eid = text.match(/#[0-9]+/ig);
	if(eid){
		eid = eid[0].substring(1);
		text = text.replace("#"+eid,'<a href="details.php?id='+eid+'" target="_blank">Entry'+eid+'</a>');
	}else eid = "";
	return {
		time : time,
		userid : uid,
		entryid : eid,
		text : text
	}
}

function endLocationEdit(){	
	hideOverlays();
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
		zoom: 12,
		center: new google.maps.LatLng(49, 12.1),
		disableDefaultUI: true
	};
	map = new google.maps.Map(document.getElementById('locations-map'),mapOptions);
}