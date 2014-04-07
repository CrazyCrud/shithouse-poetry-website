var KEY_ENTER = 13;

var $loginLink = $("#link-login");
var $overlay;
var $backButton;
var $loginButton;
var $registerButton;
var $registerInput;
var $mailInput;
var $passwordInput;
var $loginForm;

var loginTemplate = null; 
var userTemplate = null;

$(document).ready(function() {
	loginTemplate = _.template($("script.login-template").html());
	userTemplate = _.template($("script.overlay-user").html());

	$loginLink.click(function(event) {
		if(isLoggedIn()&&user.status!="4"&&user.status!=4){
			manageLoginOverlay();
		}else{
			appendLoginOverlay();
		}
	});

	$(this).mouseup(function (e)
	{
	    var container = $("#user-overlay");
	    if (!container.is(e.target) && $(e.target).parent("a").attr('id') !=  "link-login" &&
	    	container.has(e.target).length === 0) {
	        $(container).remove();
	    }
	});
});

function isLoggedIn(){
	return loggedIn();
}

function manageLoginOverlay(){
	if($("#user-overlay").length < 1){
		$("#mainnav").append(userTemplate());
		$("#link-logout").click(function(event) {
			/*
			var d = new Date(1970, 1);
			document.cookie = "username=''	; expires=" + d.toGMTString();
			document.cookie = "userid=''; expires=" + d.toGMTString();
			document.cookie = "admin=''; expires=" + d.toGMTString();
			document.cookie = "authkey=''; expires=" + d.toGMTString();
			ImgurManager.logout(logoutSuccess);
			window.location = "index.php";
			*/
			logoutUser(null);
		});
		$("#link-myimages").attr('href', 'user.php?id=' + user.id);
		if(user.status == 1 || user.status == "1"){
			$($("#link-adminpanel").parent()).css("display","block");
		}
		$("#link-user").attr('href', 'register.php?edit=true');
	}else{
		$("#user-overlay").remove();
	}
}


function appendLoginOverlay(){
	createOverlayBackground();
	$("body").append(loginTemplate());
	document.body.style.overflow = "hidden";

	$overlay = $(".overlaycontent");
	$backButton = $("#back-button");
	$loginButton = $("#login-button");
	$fbLoginButton = $("#fblogin-button");
	$registerButton = $("#register-button");
	$registerInput = $("#register-input");
	$mailInput = $("#mail-input");
	$passwordInput = $("#password-input");
	$loginForm = $("#login-form");

	$fbLoginButton.click(FBLogin);

	$mailInput.on('keypress', function(event) {
		var code = event.which;
		if(code == KEY_ENTER){
			$loginButton.trigger('click');
		}
	});

	$passwordInput.on('keypress', function(event) {
		var code = event.which;
		if(code == KEY_ENTER){
			$loginButton.trigger('click');
		}
	});

	$backButton.click(function(event) {
		removeOverlayBackground();
		$overlay.remove();
		document.body.style.overflow = "auto";
	});

	$loginButton.click(function(event) {
		userLogin();
	});

	$registerButton.click(function(event){
		var mail = $mailInput.val();
		if(mail){
			window.location = "register.php?mail=" + escape(mail);
		}else{
			window.location = "register.php";
		}
	});
}

function userLogin(){
	var authkey = document.cookie.replace(/(?:(?:^|.*;\s*)authkey\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	var md5_pwd = $.md5($passwordInput.val());
	var url = "php/backend/login.php?mail=" + $mailInput.val() + "&password=" + md5_pwd;
	if(authkey && authkey.length == AUTH_KEY_LENGTH){
		url += "&authkey="+authkey;
	}

	$.get(url, function(data){
		if(!data["success"]){
			error("Es gibt Probleme bei der Kommunikation mit dem Server");
		}
		else
		{
			switch(data["success"]){
				case 1: 
					onLoginSuccess(data["data"]);
					break;
				case 3: 
					error("Es fehlt ein Parameter. Bitte wenden Sie sich an den Admin.");
					break;
				case 0: 
					//console.log(data["message"]);
					break;
				case -1: 
					//console.log("code not logged in");
					break;
				case 7:
					error("Nutzername oder Passwort nicht gefunden oder Email noch nicht best&auml;tigt.");
					break;
				default: 
					//console.log(data);					
			}
		}
	});
}

function getUser(authkey){
	var url = "php/backend/getUser.php?authkey=" + authkey;
	console.log(url);
	$.get(url, function(data){
		if(!data["success"]){
			error("Es gibt Probleme bei der Kommunikation mit dem Server.");
		}
		else
		{
			switch(data["success"]){
				case 1: 
					saveUser(data["data"]);
					console.log(window.location.href,"index: "+window.location.href.indexOf("verify.php"));
					if(window.location.href.indexOf("verify.php")>0){
						window.location = "index.php";
					}else
						window.location.reload(true);
					break;
				case 3: 
					error("Es fehlt ein Parameter. Bitte wenden Sie sich an den Admin.");
					break;
				case 0: 
					//console.log(data["message"]);
					break;
				case -1: 
					//console.log("code not logged in");
					break;
				case 7:
					error("Nutzername oder Passwort nicht gefunden oder Email noch nicht best&auml;tigt.");
					break;
				default: 
					//console.log(data);					
			}
		}
	});
}

function error(message){
	var $dialog = $('<div class="error-dialog">' + message + "</div>");
	$dialog.dialog({
		modal: true,
		width: "auto",
		title: "Oops!"
	});
}

function onLoginSuccess(authkey){
	var d = new Date();
	var thirtyDays = 2592000000;
	d.setTime(d.getTime() + thirtyDays);
	document.cookie = "authkey=" + authkey + "; expires=" + d.toGMTString();
	getUser(authkey);
}

/**
FACEBOOK
*/

FB.init({
	appId  : '802057676490367',
	status : true, // check login status
	cookie : true, // enable cookies to allow the server to access the session
	xfbml  : true, // parse XFBML
	//channelUrl : 'http://WWW.MYDOMAIN.COM/channel.html', // channel.html file containing only <script src="//connect.facebook.net/en_US/all.js"></script>
	oauth  : true // enable OAuth 2.0
});

function checkFBLogin(){
	FB.getLoginStatus(function(response) {
		if(response.authResponse&&response.authResponse.accessToken){
			var fbAuthkey = response.authResponse.accessToken;
			var authkey = document.cookie.replace(/(?:(?:^|.*;\s*)authkey\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			if(authkey != fbAuthkey)
				onLoginSuccess(fbAuthkey);
		}
	});
}

function FBLogin(){
	FB.login(function(response) {
		if (response.authResponse) {
			FB.api('/me', function(response) {
				checkFBLogin();
			});
		} else {
			error("Leider hat etwas mit dem Facebook Login nicht geklappt.");
		}
	});
}