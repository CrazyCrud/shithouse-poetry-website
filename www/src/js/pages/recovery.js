$(function(){
	if(sent&&!success)captchaFail();
	else if(sent&&!passwordchanged)backendFail();
	else if(sent)successMessage();
});

function captchaFail(){
	message("Oops!", "Das Captcha war leider falsch.");
}

function backendFail(){
	message("Oops!", "Leider konnten wir keinen Nutzer mit den entsprechenden Daten finden.");
}

function successMessage(){
	message("Erfolg", "Wir haben dein Passwort ge&auml;ndert und dir eine Email geschickt.");
}

function message(title, message){
	$(".error-dialog").dialog("close");
	$(".error-dialog").remove();
	var $dialog = $('<div class="error-dialog">'+message+"</div>");
	$dialog.dialog({
		modal: true,
		width: "80%",
		title: title
	});
}