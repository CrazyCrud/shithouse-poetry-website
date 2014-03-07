var linkLogin = document.getElementById("link-login");
var loginContent = document.getElementById("logincontent");
var loginOverlayBackButton = document.getElementById("loginOverlayBackButton");
var registerButton = document.getElementById("registerButton");
var loginButton = document.getElementById("loginButton");
$mail = $("#emailInput");
$password = $("#passwordInput");


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
				case 3: alert("Es fehlt ein Parameter. Bitte wenden Sie sich an den Admin.");
					break;
				case 0: console.log(data["message"]);
					break;
				case -1: console.log("code not logged in");
				default: console.log(data);					
			}
		}
	});
}

function onLoginSuccess(authkey){
	var d = new Date();
	var oneYear = 31536000000;
	d.setTime(d.getTime()+oneYear);
	document.cookie = "authkey="+authkey+"; expires="+d.toGMTString();
	window.location = "index.html";
}

