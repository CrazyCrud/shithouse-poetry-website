<?php

$emailBodyContent =
'<html>
<head></head>
<body style="font-family:Helvetica">
<img src="http://latrinalia.de/img/global/top-img-bw.jpg" style="width:100%"></img>
<h2>Willkommen bei Latrinalia</h2>
<p>Wir freuen uns, dass du zu uns gekommen bist um mit uns die Welt der Toiletten-Schmierereien zu erkunden und zu analysieren.</p>
<p>Ziel hinter Latrinalia ist es mit Hilfe des Internets eine wissenschaftlich relevante Datenbasis zu Toiletten-Grafitti zu erstellen. Dabei bist du eine gro&szlig;e Hilfe, dann wir brauchen m&ouml;glichst viele aktive Nutzer, um all unsere Eintr&auml;ge korrekt bewerten und transkribieren zu lassen.</p>
<br/>
<br/>
<p>Diese Email wurde dir geschickt, weil du dich bei <a href="http://www.latrinalia.de">http://www.latrinalia.de<a> registriert hast und nun deinen Email-Account verifizieren musst.<br/>
Hast du dich dort nicht registriert und wei&szlig;t nicht, warum du diese Email bekommen hast ignoriere sie einfach.</p>
Um deine Registrierung abzuschlie&szlig;en klicke bitte <a href="http://www.latrinalia.de/verify.php?key=%1">auf diesen Link</a>.
Sollte der Link aus irgendwelchen Gr&uuml;nden nicht funktionieren, kopiere einfach folgenden Text in deine Browser-Addressleiste:<br/>
<br/>http://www.latrinalia.de/verify.php?key=%1</p>
<br/>
<br/>
Vielen Dank und liebe Gr&uuml;&szlig;e,<br/>
Dein Team von Latrinalia
</body>
</html>';

function sendVerificationMail($email, $username, $key){
	global $emailBodyContent;
	$url = "http://www.latrinalia.de/verify.php?verification=".$key;

	$from = "noreply@latrinalia.de";
	$subject = "Willkommen bei Latrinalia";
	$message = str_replace("%1", $key, $emailBodyContent);

	$header  = "MIME-Version: 1.0\r\n";
	$header .= "Content-type: text/html; charset=iso-8859-1\r\n";
	 
	$header .= "From: $from\r\n";
	// $header .= "Cc: $cc\r\n";  // falls an CC gesendet werden soll
	$header .= "X-Mailer: PHP ". phpversion();

	echo $message;

	mail($email,$subject,$message,$header);
}

?>