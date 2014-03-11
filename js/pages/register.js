var $form = $(".form-register");
var $submitButton = $("#register-submit");
var $mailInput = $("input#mail");
var $userNameInput = $("input#username");
var $passwordInput = $("input#password");

$(document).ready(function() {
	$form
  		.on('invalid', function () {
    		
  		})
  		.on('valid', function () {
  			console.log("Form valid");
    		registerUser();
  		});

  	$form.on('submit', function(event) {
  		event.preventDefault();
  		console.log("Form submit");
  	});

  	$submitButton.click(function(event) {
  		
  	});
});

function registerUser(){
	var mail = $mailInput.val();
	var username = $userNameInput.val();
	var md5_pwd = $.md5($passwordInput.val());
	ImgurManager.createUser(onLoginSuccess, username, md5_pwd, mail);
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
		var d = new Date();
		var oneYear = 31536000000;
		d.setTime(d.getTime() + oneYear);

		document.cookie = "authkey=" + authkey + "; expires=" + d.toGMTString();

		ImgurManager.getUserAuth(logUserIn, authkey);
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