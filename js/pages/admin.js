var $users = $("#users-table-content");
var $reports = $("#reports-table-content");
var $userButton = $("#notifications-header #users");
var $reportButton = $("#notifications-header #reports");

$(function(){
	initGUI();
	loadUsers();
	loadReports();
});

function initGUI(){
	$userButton.click(function(){
		$(".section").css("display","none");
		$(".section#users").css("display","block");
	});
	$reportButton.click(function(){
		$(".section").css("display","none");
		$(".section#reports").css("display","block");
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
			var $icon = $($reports.find(".status i")[0]);
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
	$("#users-table").tablesorter({ 
		sortList: [[3,1]],
        textExtraction: function(node) { 
        	if(node.hasAttribute("sort"))
        		return node.getAttribute("sort");
            return node.innerHTML; 
        } 
    });
    if(newUserCount==0)
    	$("#notifications-header #users").html("");
    else
    	$("#notifications-header #users").html(newUserCount);
    $("#notifications-header #users").attr("title",newUserCount+" neue(r) Benutzer in den letzten 24 Stunden");
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
	$("#reports-table").tablesorter({ 
		sortList: [[4,1]],
        textExtraction: function(node) { 
        	if(node.hasAttribute("sort"))
        		return node.getAttribute("sort");
            return node.innerHTML; 
        } 
    });
    if(newReportsCount == 0)
    	$("#notifications-header #reports").html("");
    else
    	$("#notifications-header #reports").html(newReportsCount);
    $("#notifications-header #reports").attr("title",newReportsCount+" unbehandelte Meldung(en)");
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