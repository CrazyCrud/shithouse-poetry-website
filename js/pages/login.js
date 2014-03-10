var $loginLink = $("#link-login");
var $overlay;
var $backButton;
var $loginButton;
var $registerInput;
var $mailInput;
var $passwordInput;
var $loginForm;

var loginTemplate = null; 

$(document).ready(function() {
	loginTemplate = _.template($("script.login-template").html());

	$loginLink.click(function(event) {
		appendOverlay();
	});
});

function appendOverlay(){
	createOverlayBackground();
	$("body").append(loginTemplate());

	$overlay = $(".overlaycontent");
	$backButton = $("#back-button");
	$loginButton = $("#login-button");
	$registerInput = $("#register-input");
	$mailInput = $("#mail-input");
	$passwordInput = $("#password-input");
	$loginForm = $("#login-form");

	$backButton.click(function(event) {
		removeOverlayBackground();
		$overlay.remove();
	});

	$loginButton.click(function(event) {
		userLogin();
	});
}

function userLogin(){
	var md5_pwd = $.md5($passwordInput.val());
	var url = "php/backend/login.php?mail=" + $mailInput.val() + "&password=" + md5_pwd;

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
					console.log(data["message"]);
					break;
				case -1: 
					console.log("code not logged in");
					break;
				case 7:
					error("Nutzername oder Passwort nicht gefunden.");
					break;
				default: 
					console.log(data);					
			}
		}
	});
}

function getUser(authkey){
	var url = "php/backend/getUser.php?authkey=" + authkey;
	$.get(url, function(data){
		if(!data["success"]){
			alert("Es gibt Probleme bei der Kommunikation mit dem Server beim");
		}
		else
		{
			switch(data["success"]){
				case 1: 
					saveUser(data["data"]);
					break;
				case 3: 
					error("Es fehlt ein Parameter. Bitte wenden Sie sich an den Admin.");
					break;
				case 0: 
					console.log(data["message"]);
					break;
				case -1: 
					console.log("code not logged in");
					break;
				case 7:
					error("Nutzername oder Passwort nicht gefunden.");
					break;
				default: 
					console.log(data);					
			}
		}
	});
}

function saveUser(user){
	var d = new Date();
	var oneYear = 31536000000;
	d.setTime(d.getTime() + oneYear);
	document.cookie = "username=" + user.username + "; expires=" + d.toGMTString();
	document.cookie = "userid=" +user.id+ "; expires=" + d.toGMTString();
	document.cookie = "admin=" + user.status + "; expires=" + d.toGMTString();
	window.location = "index.html";
}

function error(message){
	var $dialog = $('<div class="error-dialog">' + message + "</div>");
	$dialog.dialog({
		modal: true,
		width: "80%",
		title: "Oops!"
	});
}

function onLoginSuccess(authkey){
	var d = new Date();
	var oneYear = 31536000000;
	d.setTime(d.getTime() + oneYear);
	document.cookie = "authkey=" + authkey + "; expires=" + d.toGMTString();
	getUser(authkey);
}




