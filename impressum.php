<!doctype html>

<?php
	error_reporting(0);
	require_once('./php/plugins/recaptcha-php-1.11/recaptchalib.php');
	require_once('./php/helpers/mailhelper.php');

	$sent = False;

	if(isset($_POST["submit"])){	
		$email = $_POST["email"];
		$subject = $_POST["subject"];
		$desc = $_POST["description"];
		$sent = True;

		$privatekey = "6LcSSvASAAAAAMwZywSkI6lKmp7t2yd-jOG2D52C ";
	  	$resp = recaptcha_check_answer ($privatekey,
	                                $_SERVER["REMOTE_ADDR"],
	                                $_POST["recaptcha_challenge_field"],
	                                $_POST["recaptcha_response_field"]);
	  	if ($resp->is_valid) {
	  		global $email, $subject, $desc;
	    	sendUserMail($email, $subject, $desc);
	    	sendMailToAdmins($email, $subject, $desc);
	  	}
	}
?>

<html lang="en">
<head>
	<meta charset="utf-8"/>
	<meta name="viewport" content="width=device-width, initial-scale=1"/>
	<link rel="stylesheet" type="text/css" href="css/plugins/build/production.plugins.min.css"/>
	<link rel="stylesheet" type="text/css" href="css/global.css"/>
	<link rel="stylesheet" type="text/css" href="css/overlay.css"/>
	<link rel="stylesheet" type="text/css" href="css/pages/impressum.css"/>
	<link rel="icon" type="image/x-icon" href="img/global/favicon.jpg"/>
	<script type="text/javascript" src="js/plugins/modernizr.js"></script>
	<title>Impressum</title>
</head>
<body>
	<div id="index">
		<header id="mainheader">
			<div class="fixed mainnav-container">
				<nav id="mainnav" class="top-bar" data-topbar>
					<ul class="title-area">
						<li class="name">
						</li>
						<li class="toggle-topbar menu-icon"><a href="">Men&uuml;</a></li>
					</ul>
					<section class="top-bar-section">
						<ul class="left">
							<li class="li-home-container">
								<a id="link-home" href="index.php">
									<span></span><i class="icon-home"></i>
								</a>
							</li>
							<li class="li-upload-container">
								<a id="link-upload" href="upload.php">
									<span></span><i class="icon-upload-cloud"></i>
								</a>
							</li>
						</ul>
						<ul class="right">
							<li class="li-search-container">
								<a id="link-search" href="javascript:void()" onClick="">
									<span>Suche</span><i class="icon-search"></i>
								</a>
							</li>
							<li class="li-login-container">
								<a id="link-login" href="javascript:void()" onClick="">
									<span>Login</span><i class="icon-user"></i>
								</a>
							</li>
						</ul>
					</section>
				</nav>
			</div>
		</header>
		<section id="maincontent">
			 <script type="text/javascript">
				 var RecaptchaOptions = {
				    theme : 'clean'
				 };
			 </script>
			 <?php
			 	echo '<script type="text/javascript">';
			 	if(isset($resp) && $resp->is_valid){
			 			echo 'var success = true;';
			 	}else{
			 		echo 'var success = false;';
			 	}

			 	if($sent){
			 			echo 'var sent = true;';
			 	}else{
			 		echo 'var sent = false;';
			 	}

			 	echo '</script>';
			?>
			<div class="small-12 medium-11 large-11 medium-centered large-centered columns">
				<div id="content" >
					<div class="row">
						<h1 id="impressum" name="impressum">Impressum</h1><p>Angaben gemäß § 5 TMG:<br/><br/></p>
						<p>GbR Latrinalia<br />
							Eichhornstraße 39<br />
							91126 Schwabach</p>
							<h2>Vertreten durch:</h2>
							<p>Bastian Hinterleitner<br />
								Franziska Hertlein<br />
								Constantin Lehenmeier<br />
								Thomas Spröd</p>

								<h2 id="contact" name="contact">Kontakt:</h2>
								<br/>
								<div>E-Mail: <strong>support[at]latrinalia.de</strong></div>
								<br/>
							</div>
							<div class="row">
								<div class="small-12 medium-6 large-6 columns">
								<h2> Kontaktformular: </h2>						
								<form action="" id="contactForm" name="contactForm" method="post" data-abide>
									<input pattern="email" type="email" id="email" name="email" placeholder="Ihre E-Mail Addresse" <?php if(isset($email) && $email != "") echo 'value="'.$email.'"'; ?> required>
									<input id="subject" name="subject" type="text" placeholder="Betreff" <?php if(isset($subject) && $subject != "") echo 'value="'.$subject.'"'; ?> required>
									<textarea id="description" name="description" placeholder="Was möchten Sie uns mitteilen?" maxlength="400" cols="20" rows="8" required><?php if(isset($desc) && $desc != "") echo $desc; ?></textarea>
									        <?php
									          $publickey = "6LcSSvASAAAAAHECPqkbcRLzzmliSEI0OqJej6MX";
									          echo recaptcha_get_html($publickey);
									        ?>

									<button class="tiny right" name="submit" id="submit" type="submit">Absenden</button>
								</form>
							</div>
						</div>
					</br>
				</br>
				<div class="row">
					<h1 id="disclaimer" name="disclaimer">Haftungsausschluss (Disclaimer)</h1>

					<p><h3 id="disclaimerContents" name="disclaimerContents">Haftung für Inhalte</h3></p> 

					<p>Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.</p> 

					<p><h3 id="disclaimerLinks" name="disclaimerLinks">Haftung für Links</h3></p> 

					<p>Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.</p> 

					<p><h3 id="disclaimerCopyright" name="disclaimerCopyright">Urheberrecht</h3></p> 

					<p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.</p>

					<p>Die Datenschutzerklärung finden Sie hier: <a rel="nofollow" href="privacy.php" target="_blank">Datenschutzerklärung</a></p>

					<p>Unsere Nutzungsbedingungen finden Sie hier: <a rel="nofollow" href="tou.php" target="_blank">Nutzungsbedingungen</a></p>

					<p>Stand: 18.03.2014</p>

					<p>Copyright © 2014 ausschließliches Impressum von Latrinalia</p>
				</div>
			</div>
		</div>
	</section>
	<?php
		include("templates.html");
	?>
		<!--
		<script src="js/plugins/jquery.min.js"></script>
  		<script src="js/plugins/md5/jquery.md5.js"></script>
		<script src="js/plugins/underscore.js"></script>
		<script src="js/plugins/foundation/foundation.js"></script>
  		<script src="js/plugins/foundation/foundation.topbar.js"></script>
		<script src="js/plugins/jquery-ui-custom/jquery-ui.min.js"></script>
	-->
	
	<script src="js/plugins/build/production.plugins.min.js"></script>
	<script src="js/ImgurManager.js"></script>
	<script src="js/StateManager.js"></script>
	<script src="js/global.js"></script>
	<script src="js/pages/search.js"></script>		
	<script src="js/pages/login.js"></script>
	<script src="js/pages/impressum.js"></script>
</body>
</html>