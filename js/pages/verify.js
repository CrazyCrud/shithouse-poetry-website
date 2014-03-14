$(function(){
	if(!verification)missing();
	else
		verify(verification);
});

function missing(){
	$("#message").html("Es ist leider kein Verifizierungscode angegeben.<br/><br/>Bitte &uuml;berpr&uuml;fe deine Email, ob du den richtigen Link benutzt.");
}

function verify(key){
	var url = "php/backend/verify.php?key="+key;
	$.get(url, function(data){
		if(data.success==1){
			success(data.data);
		}else{
			fail();
		}
	});
}

function fail(){
	$("#message").html("Wir k&ouml;nnen den Verifizierungscode keinem Nutzer zuordnen.<br/><br/>Bitte &uuml;berpr&uuml;fe deine Email, ob du den richtigen Link benutzt.");
}

function success(user){
	$("#message").html("Hallo <a href='user.php?id="+user.id+"'>"+user.username+"</a><br/><br/>Die Verifizierung deiner Email war erfolgreich, du kannst dich jetzt mit deinen Nutzerdaten einloggen.");
}