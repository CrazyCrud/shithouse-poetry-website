var linkLogin = document.getElementById("link-login");
var loginContent = document.getElementById("logincontent");
var loginOverlayBackButton = document.getElementById("loginOverlayBackButton");
var registerButton = document.getElementById("registerButton");
var loginButton = document.getElementById("loginButton");
$mail = $("#emailInput");
$password = $("#passwordInput");

$(function(){
	if(!$("<div></div>").dialog){
		$("body").append('<script src="js/plugins/jquery-ui-custom/jquery-ui-1.10.4.custom.min.js"></script>'
		+'<link rel="stylesheet" type="text/css" href="css/plugins/custom-jqui-theme/jquery-ui-1.10.4.custom.css"/>');
	}
});

registerButton.onclick = openRegisterPage;
loginButton.onclick = userLogin;
linkLogin.onclick = showLoginOverlay;
loginOverlayBackButton.onclick = hideLoginOverlay;



function showLoginOverlay(){
	if(!document.getElementById("overlay")) {
			div = document.createElement("div");
			div.setAttribute('id', 'overlay');
			document.getElementsByTagName("body")[0].appendChild(div);
			document.getElementsByTagName("body")[0].appendChild(loginContent);
			loginContent.style.display="block";				
	}
}

function hideLoginOverlay(){
	if(document.getElementById("overlay")) 
		{
		document.getElementsByTagName("body")[0].removeChild(loginContent);
		document.getElementsByTagName("body")[0].removeChild(document.getElementById("overlay"));
	}
}

function openRegisterPage(){
	hideLoginOverlay;
	document.loginForm.action = "register.php";		
	document.loginForm.submit();
}

function userLogin(){
	var md5_pwd = $.md5($password.val());
	var url = "php/backend/login.php?mail="+$mail.val()+"&password="+md5_pwd;
	console.log(url);
	$.get(url, function(data){
		if(!data["success"]){
			alert("Es gibt Probleme bei der Kommunikation mit dem Server");
		}
		else
		{
			switch(data["success"]){
				case 1: onLoginSuccess(data["data"]);
					break;
				//missing parameter
				case 3: 
					error("Es fehlt ein Parameter. Bitte wenden Sie sich an den Admin.");
					break;
				case 0: console.log(data["message"]);
					break;
				case -1: console.log("code not logged in");
					break;
				case 7:
					error("Nutzername oder Passwort nicht gefunden.");
				default: console.log(data);					
			}
		}
	});
}

function getUser(authkey){
	var url = "php/backend/getUser.php?authkey="+authkey;
	$.get(url, function(data){
		if(!data["success"]){
			alert("Es gibt Probleme bei der Kommunikation mit dem Server beim");
		}
		else
		{
			switch(data["success"]){
				case 1: saveUser(data["data"]);
					break;
				case 3: 
					error("Es fehlt ein Parameter. Bitte wenden Sie sich an den Admin.");
					break;
				case 0: console.log(data["message"]);
					break;
				case -1: console.log("code not logged in");
					break;
				case 7:
					error("Nutzername oder Passwort nicht gefunden.");
				default: console.log(data);					
			}
		}
	});
}

function saveUser(user){
	var d = new Date();
	var oneYear = 31536000000;
	d.setTime(d.getTime()+oneYear);
	document.cookie = "username="+user.username+"; expires="+d.toGMTString();
	document.cookie = "userid="+user.id+"; expires="+d.toGMTString();
	document.cookie = "admin="+user.status+"; expires="+d.toGMTString();
	window.location = "index.html";
}

function error(message){
	var $dialog = $('<div class="error-dialog">'+message+"</div>");
	$dialog.dialog({
		modal: true,
		width: "80%",
		title: "Oops!"
	});
}

function onLoginSuccess(authkey){
	var d = new Date();
	var oneYear = 31536000000;
	d.setTime(d.getTime()+oneYear);
	document.cookie = "authkey="+authkey+"; expires="+d.toGMTString();
	getUser(authkey);
}