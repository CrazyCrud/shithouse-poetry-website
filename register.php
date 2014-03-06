<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8"/>
		<meta name="viewport" content="width=device-width, initial-scale=1"/>
		<link rel="stylesheet" type="text/css" href="css/plugins/foundation.css"/>
		<link rel="stylesheet" type="text/css" href="css/plugins/fontello/fontello.css"/>
		<link rel="stylesheet" type="text/css" href="css/plugins/gallery/jquery.justifiedgallery.min.css"/>
		<link rel="stylesheet" type="text/css" href="css/global.css"/>
		<link rel="stylesheet" type="text/css" href="css/pages/register.css"/>
		<link href="css/plugins/custom-jqui-theme/jquery-ui-1.10.4.custom.css" rel="stylesheet">
		<script type="text/javascript" src="js/plugins/modernizr.js"></script>
		


		<title>Latrinalia</title>
	</head>
	<body>
		<div id="index">
			<header id="mainheader">
				<div class="fixed mainnav-container">
					<nav id="mainnav" class="top-bar" data-topbar>
						<ul class="title-area">
							<li class="name">
							</li>
							<li class="toggle-topbar menu-icon"><a href="">Menu</a></li>
						</ul>
						<section class="top-bar-section">
							<ul class="left">
								<li class="li-upload-container"></li>
							</ul>
							<ul class="right">
								<li class="li-search-container">
									<a id="link-search" href="#" onClick="">
										<span>Search</span><i class="icon-search"></i>
									</a>
								</li>
								<li class="li-login-container">
									<a id="link-login" href="#" onClick="">
										<span>Login</span><i class="icon-user"></i>
									</a>
								</li>
							</ul>
						</section>
					</nav>
				</div>				
			</header>

			<section id="register-maincontent">
					<div class="row">
						<div class="small-12 columns">
							<h1>Registrieren</h1>															
						</div>	
						</div>
						<div class="row">
								<div class="small-12 medium-2 large-2 columns">
									<label class="inline" id="register-label">Nutzername</label>
								</div>
								<div class="small-12 medium-10 large-10 columns">
									<form name="registerForm">
										<input class="register_input" type="text" id="username_register" size="30" autofocus>
									</form>
								</div>
							</div>
							<div class="row">
								<div class="small-12 medium-2 large-2 columns">
									<label class="inline" id="register-label">E-Mail Adresse</label>
								</div>
								<div class="small-12 medium-10 large-10 columns">
									<form name="registerForm">
										<input class="register_input" type="email" id="email_register" size="30" autofocus>
									</form>
								</div>
							</div>
							<div class="row">
								<div class="small-12 medium-2 large-2 columns">
									<label id="register-label" class="inline">Passwort</label>
								</div>
								<div class="small-12 medium-10 large-10 columns">
									<form name="registerForm">
										<input class="register_input" type="password" id="password_register" size="30" autofocus>
									</form>
								</div>
							</div>
							<div class="row">
								<div class="small-12 medium-2 large-2 columns">
									<label id="register-label" class="inline">Passwort wiederholen</label>
								</div>
								<div class="small-12 medium-10 large-10 columns">
									<form name="registerForm">
										<input class="register_input" type="password" id="password2_register" size="30" autofocus>
									</form>
								</div>	
							</div>
					
					<div class="row">
						<a href="javascript:void(0)" id="registerform_button" class="normalButton right">registrieren</a>
					</div>
			</section>


			

			<section id="searchcontent" class="overlaycontent">
				<div class="row">
					<a href="#" class="overlayBackButton" id="searchOverlayBackButton"> <img src="img/global/back_arrow.png"></a>
						<div class="small-12 columns full-width">
							<form class="searchForm">
								<input type="text" placeholder="Suche" name="searchInput" id="searchField" autofocus>
							</form>
						</div>					
				</div>
				<div class="row">
					<div class="small-12 columns full-width right">
						<a href="#" class="overlayButton right" id="searchButton">suchen</a>
					</div>
				</div>
			</section>
			<section id="logincontent" class="overlaycontent">
				<div class="row">
					<a href="#" class="overlayBackButton" id="loginOverlayBackButton"> <img src="img/global/back_arrow.png"></a>
					<div class="small-12 columns full-width">
							<form class="loginForm" name="loginForm" method="post">
								<input type="email" placeholder="E-Mail" name="emailInput" id="emailInput" class="loginField" autofocus>
								<input type="password" placeholder="Passwort" name="passwordInput" id="passwordInput" class="loginField">
							</form>
						</div>	
					<div class="row">
						<div class="small-12 columns full-width right">
							<a href="#" class="overlayButton right" id="loginButton">Login</a>
							<a href="#" class="overlayButton right" id="registerButton">registrieren </a>
						</div>
					</div>			
				</div>
			</section>
			<div id="registerDialogTitle" title="Sie haben sich erfolgreich registriert!">
				<p id="registerDialogContent">Sobald Sie auf "OK" klicken, werden Sie auf die Startseite weitergeleitet.</p>

		<script type="text/javascript">
			email="";
			password="";

			<?php
			if(isset($_POST["emailInput"])){
				echo "email='".$_POST["emailInput"]."';";
			}
			if(isset($_POST["passwordInput"])){
				echo "password='".$_POST["passwordInput"]."';";
			}

			?>

		</script>

		
		
		<script src="js/plugins/jquery.min.js"></script>
		<script src="js/plugins/md5/jquery.md5.js"></script>
		<script src="js/plugins/foundation/foundation.js"></script>
  		<script src="js/plugins/foundation/foundation.topbar.js"></script>
  		<script src="js/plugins/waypoint/waypoints.min.js"></script>
  		<script src="js/plugins/transit/transit.min.js"></script>
  		<script src="js/plugins/gallery/jquery.justifiedgallery.min.js"></script>
		<script src="js/pages/searchOverlay.js"></script>		
		<script src="js/pages/loginOverlay.js"></script>
		<script src="js/pages/register.js"></script>
		<script src="js/plugins/jquery-ui-custom/jquery-ui-1.10.4.custom.js"></script>

	</body>
</html>