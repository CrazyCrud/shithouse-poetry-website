<!doctype html>
<?php
	error_reporting(0);
?>
<html lang="de">
	<head>
		<meta charset="utf-8"/>
		<meta name="viewport" content="width=device-width, initial-scale=1"/>
		<link rel="stylesheet" type="text/css" href="css/plugins/build/production.plugins.min.css"/>
		<link rel="stylesheet" type="text/css" href="css/global.css"/>
		<link rel="stylesheet" type="text/css" href="css/overlay.css"/>
		<link rel="stylesheet" type="text/css" href="css/pages/galleryview.css"/>
		<link rel="stylesheet" type="text/css" href="css/pages/user.css"/>
		<link rel="icon" type="image/x-icon" href="img/global/favicon.jpg"/>
		<script type="text/javascript" src="js/plugins/modernizr.js"></script>
		<title>Latrinalia - Nutzeransicht</title>
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
				<div class="details-user">
					<div class="row">
						<div class="details small-12 medium-7 large-7 columns left" id="image-description">
							<div id="title">
								<span id="username">Nutzer wird geladen ...</span>
								<span id="level"></span>
							</div>
							<div id="joined">Beigetreten <span id="membersince"></span></div>
							<div id="online">Zuletzt online <span id="lastseen"></span></div>
							<div id="stats">
								<div id="entries">Bilder hochgeladen: <span class="amount"></span></div>
								<div id="comments">Kommentare gepostet: <span class="amount"></span></div>
								<div id="ratings">Bilder bewertet: <span class="amount"></span></div>
								<div id="transcriptions">Bilder transkribiert: <span class="amount"></span></div>
							</div>
						</div>
						<div class="details small-12 medium-5 large-5 columns right" id="image-container">
							<div id="achievements">
								Erfolge:
								<div id="entries"></div>
								<div id="comments"></div>
								<div id="ratings"></div>
								<div id="transcriptions"></div>
							</div>
						</div>
					</div>	
					<div class="row pictures">
						<div class="images-container small-12 columns">
							<div id="pictures-header">Bilder:</div>
							<div class="infinite-container">
								<div class="justifiedGallery" id="images">

								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>

		<script type="text/javascript">
			id=-1;

			<?php
			if(isset($_GET["id"])){
				echo "id=".mysql_escape_string(htmlspecialchars($_GET["id"])).";";
			}

			?>
		</script>
				<?php
			include("templates.html");
		?>
		<!--
		<script src="js/plugins/jquery.min.js"></script>
  		<script src="js/plugins/md5/jquery.md5.js"></script>
		<script src="js/plugins/underscore.js"></script>		
		<script src="js/plugins/foundation/foundation.js"></script>
  		<script src="js/plugins/foundation/foundation.topbar.js"></script>
  		<script src="js/plugins/transit/transit.min.js"></script>
  		<script src="js/plugins/gallery/jquery.justifiedgallery.js"></script>
  		<script src="js/plugins/waypoint/waypoints.min.js"></script>
  		<script src="js/plugins/jquery-ui-custom/jquery-ui.min.js"></script>
  		-->
  		<script src="js/plugins/build/production.plugins.min.js"></script>
  		<script src="js/ImgurManager.js"></script>
  		<script src="js/StateManager.js"></script>
  		<script src="js/GalleryView.js"></script>
		<script src="js/global.js"></script>
		<script src="js/pages/search.js"></script>		
		<script src="js/pages/login.js"></script>
		<script src="js/pages/user.js"></script>
	</body>
</html>