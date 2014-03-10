<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8"/>
		<meta name="viewport" content="width=device-width, initial-scale=1"/>
		<link rel="stylesheet" type="text/css" href="css/plugins/foundation.css"/>
		<link rel="stylesheet" type="text/css" href="css/plugins/fontello/fontello.css"/>
		<link rel="stylesheet" type="text/css" href="css/plugins/gallery/jquery.justifiedgallery.min.css"/>
		<link rel="stylesheet" type="text/css" href="css/global.css"/>
		<link rel="stylesheet" type="text/css" href="css/pages/details.css"/>
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
								<li class="li-upload-container">
									<a id="link-upload" href="upload.html">
										<span></span><i class="icon-upload-cloud"></i>
									</a>
								</li>
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

			<ul id="hoverLoginMenu" class="right">
				<li><a href="#" class="hovermenu-link" id="myImages-link">Meine Bilder</a></li>
				<li><a href="#" class="hovermenu-link" id="settings-link">Einstellungen</a></li>
				<li><a href="#" class="hovermenu-link" id="logout-link">Logout</a></li>
			</ul>

			<section id="maincontent">
				<div class="details-entry">
					<div class="row">
						<div class="details small-12 medium-7 large-7 columns left" id="image-container">
							<img id="image" src="img/dummy/d05.png">
						</div>
						<div class="details small-12 medium-5 large-5 columns right" id="image-description">
							<div id="title">Bild nicht gefunden</div>
							<div id="artist"></div>
							<i id="sex"></i>
							<div id="location">
								Ort: <span id="locationdescription"></span>
							</div>
							<div id="upload-info">Hochgeladen <span id="date"></span> von <a id="author"></a></div>
							<div id="tags"></div>
							<div id="transcription">
								<p>Transkription:</p>
								<p id="content"></p>
							</div>
							<div id="rating">
								<div id="thumbsup" class="inline thumbs">
									<img src="img/details/thumbsup.png" id="thumbs-up" width=20>
								</div>
								<div id="outer-rating" class="inline">
									<div id="inner-rating"></div>
								</div>
								<div id="ratingcountwrapper" class="inline">
									(<span id="ratingcount"></span>)
								</div>
								<div id="thumbsdown" class="inline thumbs">
									<img src="img/details/thumbsdown.png" id="thumbs-down" width=20>
								</div>
							</div>
						</div>
					</div>	
					<div class="row details">
						<div id="comments-header">Kommentare:</div>
						<div id="comments-add">
							<input type="text" placeholder="Kommentar schreiben"></input>
						</div>
						<div id="comments-content"></div>
					</div>
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
		</div>

		<script type="text/javascript">
			id=-1;

			<?php
			if(isset($_GET["id"])){
				echo "id=".$_GET["id"].";";
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
  		<script src="js/StateManager.js"></script>
  		<script src="js/ImgurManager.js"></script>
		<script src="js/global.js"></script>
		<script src="js/pages/home.js"></script>
		<script src="js/pages/searchOverlay.js"></script>		
		<script src="js/pages/loginOverlay.js"></script>
		<script src="js/pages/details.js"></script>
	</body>
</html>