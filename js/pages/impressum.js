var TITLE_SENT = "Nachricht gesendet.";
var EMAIL_SENT = "Die Nachricht wurde erfolgreich versendet!";

var WRONG = "Es gab leider einen Fehler."
var WRONG_CAPTCHA= "Leider war die CAPTCHA falsch, bitte versuchen Sie es erneut!";


var $notice = $("#notice");

$(function(){
	checkSuccess();
});

function checkSuccess(){
	if(!sent) return;
	var message = "";
	var title = "";
	if(success){
		message = EMAIL_SENT;
		title = TITLE_SENT;
	}else{
		message = WRONG_CAPTCHA;
		title = WRONG;
	}

	$dialog = $('<div>'+message+'</div>');
		$dialog.dialog({
			modal: true,
			width: "auto",
			title: title
		});
}
