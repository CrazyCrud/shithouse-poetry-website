<!doctype html>
<?php
	error_reporting(0);
	include_once("php/helpers/util.php");
?>
<html lang="de">
	<head>
		<meta charset="utf-8"/>
		<meta name="viewport" content="width=device-width, initial-scale=1"/>
		<meta name="description" content="Website zur Erfassung, Kategorisierung und Transkription von Toiletten-Schmierereien und -Graffitis."/>
		<link rel="image_src" href="img/global/favicon.jpg"/>
		<link rel="stylesheet" type="text/css" href="css/plugins/build/production.plugins.min.css"/>
		<link href="css/plugins/custom-jqui-theme/jquery-ui-1.10.4.custom.css" rel="stylesheet">
		<link rel="stylesheet" type="text/css" href="css/global.css"/>
		<link rel="stylesheet" type="text/css" href="css/overlay.css"/>
		<link rel="stylesheet" type="text/css" href="css/pages/galleryview.css"/>
		<link rel="stylesheet" type="text/css" href="css/pages/search.css"/>
		<link rel="icon" type="image/x-icon" href="img/global/favicon.jpg"/>
		<script type="text/javascript" src="js/plugins/modernizr.js"></script>
		<title>Latrinalia - Suchergebnisse</title>
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
				<div class="row">
					<div class="small-12 full-width columns results-container">
						<div class="small-12 columns headline-container">
							<h3>Ergebnisse für <i class="search-term"></i></h3>
						</div>
						<div class="infinite-container">
							<div class="justifiedGallery" id="images">

							</div>
							<div class="small-12 columns message-container">
								<img id="loading-spinner" src="img/global/loading.gif"/>
								<span class="message"></span>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
		<script type="text/javascript">
			var query = null;
			var type = null;
			var values = null;

			<?php
			if(isset($_GET["query"])){
				echo "query='".mysql_escape_string($_GET["query"])."';";
			}
			if(isset($_GET["type"])){
				echo "type='".mysql_escape_string($_GET["type"])."';\n";
				echo "values=".json_encode($_GET["values"]).";";
			}

			?>
		</script>
		<?php
			include("templates.html");
		?>
  		<script src="js/plugins/build/production.plugins.min.js"></script>
  		<script src="js/StateManager.js"></script>
  		<script src="js/ImgurManager.js"></script>
		<script src="js/global.js"></script>
		<script src="js/pages/search.js"></script>		
		<script src="js/pages/login.js"></script>
		<script src="js/GalleryView.js"></script>
		<script src="js/pages/searchresults.js"></script>
	</body>
</html>