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
		<link rel="stylesheet" type="text/css" href="css/pages/details.css"/>
		<link rel="icon" type="image/x-icon" href="img/global/favicon.jpg"/>
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
									<a id="link-search" href="#" onClick="">
										<span>Suche</span><i class="icon-search"></i>
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
			<section id="maincontent">
				<div class="details-entry">
					<div class="row" id="controlpanel">
						<a id="editentry" class="tiny button">Eintrag bearbeiten</a>
						<a id="deleteentry" class="button tiny">Eintrag l&ouml;schen</a>
					</div>
					<div class="row">
						<div class="details small-12 medium-7 large-7 columns left" id="image-container">
							<img id="image" src="img/global/loading.gif">
						</div>
						<div class="details small-12 medium-5 large-5 columns right" id="image-description">
							<div id="title">Bild wird geladen ...</div>
							<div id="artist"></div>
							<i title="Geschlecht" id="sex"></i>
							<div id="type">
								Typ: <span id="typedescription"></span>
							</div>
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
									<i class="icon-thumbs-up-1" id="thumbs-up"></i>
								</div>
								<div id="outer-rating" class="inline">
									<div id="inner-rating"></div>
								</div>
								<div id="ratingcountwrapper" class="inline">
									(<span id="ratingcount"></span>)
								</div>
								<div id="thumbsdown" class="inline thumbs">
									<i class="icon-thumbs-down-1" id="thumbs-down"></i>
								</div>
							</div>
							<div id="report">
								<i title="Melden" id="report-icon" class="icon-attention"></i>
							</div>
						</div>
					</div>	
					<div class="row details">
						<div id="comments-header">Kommentare:</div>
						<div id="comments-add">
							<input type="text" id="comment-input" placeholder="Kommentar schreiben"></input>
						</div>
						<div id="comments-content"></div>
						<button id="morecomments">
							Weitere Kommentare laden
						</button>
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
		<script src="js/plugins/jquery-ui-custom/jquery-ui.min.js"></script>
		<script src="js/plugins/underscore.js"></script>		
		<script src="js/plugins/foundation/foundation.js"></script>
  		<script src="js/plugins/foundation/foundation.topbar.js"></script>
  		-->
  		<script src="js/plugins/build/production.plugins.min.js"></script>
  		<script src="js/ImgurManager.js"></script>
		<script src="js/global.js"></script>
		<script src="js/pages/search.js"></script>		
		<script src="js/pages/login.js"></script>
		<script src="js/pages/details.js"></script>
	</body>
</html>