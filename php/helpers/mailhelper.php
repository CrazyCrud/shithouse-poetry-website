<?php

$emailBodyContent =
'<html>
<head></head>
<body style="font-family:Helvetica">
<img src="http://latrinalia.de/img/global/top-img-bw.jpg" style="width:100%"></img>
<h2>Willkommen bei Latrinalia, %2</h2>
<p>Danke, dass du dich bei uns registriert hast und mit uns die Welt der Toiletten-Schmierereien erkunden und anlaysieren m&ouml;chtest.</p>
<p>Das Ziel von Latrinalia ist mit Hilfe von Crowdsourcing eine wissenschaftlich relevante Datenbasis zum Thema Toiletten-Graffiti zu erstellen. Du bist uns dabei eine gro&szlig;e Hilfe, denn  je mehr Leute Eintr&auml;ge erstellen, bewerten und transkribieren, desto besser k&ouml;nnen wir arbeiten.</p>
<br/>
Diese E-Mail wurde dir geschickt, weil du dich bei http://www.latrinalia.de registriert hast und nun deinen Email-Account verifizieren musst. 
Falls du dich dort nicht registiert hast und nicht wei&szlig;t, warum du diese E-Mail bekommen hast, ignoriere sie einfach.
<p>Um deine Registrierung abzuschlie&szlig;en, klicke bitte <a href="http://www.latrinalia.de/verify.php?verification=%1">auf diesen Link</a>.</p>
<p>Sollte der Link aus irgendwelchen Gr&uuml;nden nicht funktionieren, kopiere einfach folgenden Text in deine Browser-Adressleiste:<br/>
http://www.latrinalia.de/verify.php?verification=%1</p>
<br/>
Vielen Dank und liebe Gr&uuml;&szlig;e,<br/>
Dein Team von Latrinalia
</body>
</html>';
function sendVerificationMail($email, $username, $key){
	global $emailBodyContent;
	$url = "http://www.latrinalia.de/verify.php?verification=".$key;

	$from = "Latrinalia <noreply@latrinalia.de>";
	$subject = "Willkommen bei Latrinalia";
	$message = str_replace("%1", $key, $emailBodyContent);
	$message = str_replace("%2", $username, $message);

	$header  = "MIME-Version: 1.0\r\n";
	$header .= "Content-type: text/html; charset=iso-8859-1\r\n";
	 
	$header .= "From: $from\r\n";
	$header .= "X-Mailer: PHP ". phpversion();

	mail($email,$subject,$message,$header);
}

?>