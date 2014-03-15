var $form = $(".form-register");
var $submitButton = $("#register-submit");
var $mailInput = $("input#mail");
var $userNameInput = $("input#username");
var $passwordInput = $("input#password");
var $oldPasswordInput = $("input#old-password");

$(document).ready(function() {
	$form
  		.on('invalid', function () {
    		
  		})
  		.on('valid', function () {
  			console.log("Form valid");
  			if(edit&&user.status!="4"){
  				updateUser();
  			}else{
	    		registerUser();
	    	}
  		});

  	$form.on('submit', function(event) {
  		event.preventDefault();
  		console.log("Form submit");
  	});

  	$submitButton.click(function(event) {
  		
  	});

  	if(edit&&user.status!="4")initEditing();
  	else{
  		$("#old-pwd").remove();
  	}
});

function initEditing(){
	document.title = "Benutzer";
	$("#header").html("Benutzer");
	$("#register-submit").html("Speichern");
	$("#username").attr("disabled","disabled");
	$("#mail").attr("disabled","disabled");
	$("#new-pwd").html("Neues Password");
	ImgurManager.getUser(fillUser, user.id);
}

function fillUser(user){
	console.log(user);
	$("#username").val(user.username);
	$("#mail").val(user.email);
}

function registerUser(){
	if(user.status=="4")return updateDummy();
	else{
		var mail = $mailInput.val();
		var username = $userNameInput.val();
		var md5_pwd = $.md5($passwordInput.val());
		ImgurManager.createUser(onLoginSuccess, username, md5_pwd, mail);
	}
}

function updateDummy(){
	var md5_pwd = $.md5($passwordInput.val());
	var mail = $mailInput.val();
	var username = $userNameInput.val();
	ImgurManager.updateUser(onLoginSuccess, mail, username, md5_pwd);
}

function updateUser(){
	var old_md5_pwd = $.md5($oldPasswordInput.val());
	ImgurManager.loginUser(onLoginResult, user.username, old_md5_pwd);
}

function onLoginResult(data){
	if(data == null){
		$("<div>Ihr altes Passwort stimmt nicht.</div>").dialog(
		{
			dialogClass: "no-close",
			modal: true,
			width: 'auto',
			title: 'Speichern fehlgeschlagen',
			buttons: [
				{
					text: 'OK',
					click: function(){
						$(this).dialog('close');
					}
				}
			]
		});
	}else{
		var md5_pwd = $.md5($passwordInput.val());
		var mail = $mailInput.val();
		var username = $userNameInput.val();
		ImgurManager.updateUser(onUpdateResult, mail, username, md5_pwd);
	}
}

function onUpdateResult(success){
	if(success == null){
		$("<div>Speichern ist fehlgeschlagen!</br>Anscheinend gibt es Probleme mit dem Server.</br>Probieren Sie es später noch einmal</div>").dialog(
		{
			dialogClass: "no-close",
			modal: true,
			width: 'auto',
			title: 'Speichern fehlgeschlagen',
			close: function(event, ui) {
				window.location = "index.html";
			},
			buttons: [
				{
					text: 'OK',
					click: function(){
						$(this).dialog('close');
					}
				}
			]
		});
	}else{
		var username = $userNameInput.val();
		var d = new Date();
		var oneYear = 31536000000;
		d.setTime(d.getTime() + oneYear);
		document.cookie = "username=" + username + "; expires=" + d.toGMTString();
		document.cookie = "userid=" + user.id + "; expires=" + d.toGMTString();
		document.cookie = "admin=" + user.status + "; expires=" + d.toGMTString();
		window.location = "index.html";
		$("<div>Benutzerdaten erfolgreich aktualisiert.</div>").dialog(
		{
			dialogClass: "no-close",
			modal: true,
			width: 'auto',
			title: 'Speichern erfolgreich',
			close: function(event, ui) {
				window.location = "index.html";
			},
			buttons: [
				{
					text: 'OK',
					click: function(){
						$(this).dialog('close');
					}
				}
			]
		});
	}
}

function onLoginSuccess(authkey){
	if(authkey == null){
		$("<div>Die Registrierung ist fehlgeschlagen!</br>Anscheinend gibt es Probleme mit dem Server.</br>Probieren Sie es später noch einmal</div>").dialog(
		{
			dialogClass: "no-close",
			modal: true,
			width: 'auto',
			title: 'Registrierung fehlgeschlagen',
			close: function(event, ui) {
				window.location = "index.html";
			},
			buttons: [
				{
					text: 'OK',
					click: function(){
						$(this).dialog('close');
					}
				}
			]
		});
	}else{
		$("<div>Die Registrierung war erfolgreich!</br>Wir haben eine Email an "+authkey+" geschickt, die du noch best&auml;tigen musst bevor du dich einloggen kannst.</div>").dialog(
		{
			dialogClass: "no-close",
			modal: true,
			width: 'auto',
			title: 'Registrierung erfolgreich',
			close: function(event, ui) {
				logoutUser(null);
				window.location = "index.html";
			},
			buttons: [
				{
					text: 'OK',
					click: function(){
						$(this).dialog('close');
					}
				}
			]
		});
	}
}

function logUserIn(user){
	if(user){
		var d = new Date();
		var oneYear = 31536000000;
		d.setTime(d.getTime() + oneYear);
		document.cookie = "username=" + user.username + "; expires=" + d.toGMTString();
		document.cookie = "userid=" + user.id + "; expires=" + d.toGMTString();
		document.cookie = "admin=" + user.status + "; expires=" + d.toGMTString();

		$("<div>Sie haben sich erfolgreich angemeldet!</div>").dialog({
			dialogClass: "no-close",
			modal: true,
			width: 'auto',
			close: function(event, ui) {
				window.location = "index.html";
			},
			title: 'Registrierung abgeschlossen',
			buttons: {
				'OK': function(){
					$(this).dialog('close');
				}
			}
		});
	}
}