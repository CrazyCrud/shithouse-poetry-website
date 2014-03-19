<!doctype html>

<?php
	error_reporting(0);
	require_once('./php/plugins/recaptcha-php-1.11/recaptchalib.php');
	require_once('./php/helpers/mailhelper.php');
	include_once("./php/helpers/dbhelper.php");

	$sent = False;
	$passwordchanged = false;

	if(isset($_POST["submit"])){
		$email = $_POST["email"];
		$username = $_POST["username"];
		$sent = True;

		$privatekey = "6LcSSvASAAAAAMwZywSkI6lKmp7t2yd-jOG2D52C ";
	  	$resp = recaptcha_check_answer ($privatekey,
	                                $_SERVER["REMOTE_ADDR"],
	                                $_POST["recaptcha_challenge_field"],
	                                $_POST["recaptcha_response_field"]);
	  	if ($resp->is_valid) {
	    	$db = new DBHelper();
	    	$passwordchanged = $db->recoverPassword($email, $username);
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
	<title>Latrinalia - Passwortwiederherstellung</title>
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

			 	if($passwordchanged){
			 			echo 'var passwordchanged = true;';
			 	}else{
			 		echo 'var passwordchanged = false;';
			 	}

			 	echo '</script>';
			?>
	<div class="small-12 medium-11 large-11 medium-centered large-centered columns">
		<div id="content" >
			<div class="row">
					<div class="row">
						<div class="small-12 medium-6 large-6 columns">
							<h2>Passwort vergessen?</h2>						
							Gib hier deine Email-Addresse und deinen Benutzernamen ein und wir werden dir ein neues
							Passwort zuschicken:
							<br/>
							<br/>
							<form action="" id="contactForm" name="contactForm" method="post">
								<input type="email" id="email" name="email" placeholder="E-Mail Addresse" <?php if(isset($email) && $email != "" && !$passwordchanged) echo 'value="'.$email.'"'; ?> required>
								<input id="username" name="username" type="text" placeholder="Nutzername" <?php if(isset($username) && $username != "" && !$passwordchanged) echo 'value="'.$username.'"'; ?> required>
						        <?php
						          $publickey = "6LcSSvASAAAAAHECPqkbcRLzzmliSEI0OqJej6MX";
						          echo recaptcha_get_html($publickey);
						        ?>
								<button class="tiny right" name="submit" id="submit" type="submit">Absenden</button>
							</form>
						</div>
					</div>
				</div>
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
	<script src="js/pages/recovery.js"></script>
</body>
</html>