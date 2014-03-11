<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8"/>
		<meta name="viewport" content="width=device-width, initial-scale=1"/>
		<link rel="stylesheet" type="text/css" href="css/plugins/foundation.css"/>
		<link rel="stylesheet" type="text/css" href="css/plugins/fontello/fontello.css"/>
		<link rel="stylesheet" type="text/css" href="css/plugins/gallery/jquery.justifiedgallery.min.css"/>
		<link rel="stylesheet" type="text/css" href="css/global.css"/>
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
								<li class="li-home-container">
									<a id="link-home" href="index.html">
										<span></span><i class="icon-home"></i>
									</a>
								</li>
								<li class="li-upload-container"></li>
							</ul>
							<ul class="right">
								<li class="li-search-container">
									<a id="link-search" href="javascript:void()" onClick="">
										<span>Search</span><i class="icon-search"></i>
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
				<div class="row">
					<div class="small-12 columns full-width">
						<div class="infinite-container">
							<div id="images">

							</div>
							<div class="vote-container small-12 columns">
								<div class="vote-icon-container">
									<i id="down-vote" class="icon-thumbs-down-1"></i>
									<i id="up-vote" class="icon-thumbs-up-1"></i>
								</div>
							</div>
							<div class="small-12 columns message-container">
								<span class="message"></span>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
		<script type="text/template" class="overlay-template">
			<div id="overlay-background"></div>
		</script>
		<script type="text/template" class="overlay-user">
			<section id="user-overlay">
				<div class="user-overlay-container">
					<ul>
						<li><a id="link-timeline" href="timeline.php">Timeline</a></li>
						<li><a id="link-myimages" href="javascript:void()">Meine Bilder</a></li>
						<li><a id="link-logout" href="javascript:void()">Logout</a></li>
					</ul>
				</div>
			</section>
		</script>
		<script type="text/template" class="search-template">
 			<section id="searchcontent" class="overlaycontent">
				<div class="row">
					<div class="close-button-container">
						<a href="#" class="left" id="back-button"> 
							<i class="icon-cancel"></i>
						</a>
					</div>
					<div class="small-11 small-centered medium-10 medium-centered large-8 large-centered columns form-container">
						<div class="small-12 columns full-width input-container">
							<input type="text" placeholder="Suche nach..." id="search-input" autofocus>
						</div>	
						<div class="small-12 columns full-width submit-container">
							<a href="#" class="button-overlay" id="search-button">Suchen</a>
						</div>
					</div>				
				</div>
			</section>
    	</script>
    	<script type="text/template" class="login-template">
 			<section id="logincontent" class="overlaycontent">
				<div class="row">
					<div class="close-button-container">
						<a href="#" class="left" id="back-button"> 
							<i class="icon-cancel"></i>
						</a>
					</div>
					<div class="small-11 small-centered medium-10 medium-centered large-8 large-centered columns form-container">
						<div class="small-12 columns full-width input-container">
							<form id="login-form">
								<input type="email" placeholder="E-Mail" name="mail-input" class="login-field" id="mail-input" autofocus />
								<input type="password" placeholder="Passwort" name="password-input" class="login-field" id="password-input" />
							</form>
						</div>	
						<div class="small-12 columns full-width submit-container">
							<a href="register.php" class="button-overlay left" 
									id="register-button">
								Registrieren 
							</a>
							<a href="#" class="button-overlay right" 
									id="login-button">
								Login
							</a>
						</div>
					</div>		
				</div>
			</section>
    	</script>
		<script src="js/plugins/jquery.min.js"></script>
		<script src="js/plugins/underscore.js"></script>
		<script src="js/plugins/foundation/foundation.js"></script>
  		<script src="js/plugins/foundation/foundation.topbar.js"></script>
  		<script src="js/plugins/waypoint/waypoints.min.js"></script>
  		<script src="js/plugins/transit/transit.min.js"></script>
  		<script src="js/plugins/gallery/jquery.justifiedgallery.js"></script>
  		<script src="js/StateManager.js"></script>
  		<script src="js/ImgurManager.js"></script>
		<script src="js/global.js"></script>
		<script src="js/topbar.js"></script>
		<script src="js/pages/home.js"></script>
		<script src="js/pages/search.js"></script>		
		<script src="js/pages/login.js"></script>
	</body>
</html>