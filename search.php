<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8"/>
		<meta name="viewport" content="width=device-width, initial-scale=1"/>
		<link rel="stylesheet" type="text/css" href="css/plugins/foundation.css"/>
		<link rel="stylesheet" type="text/css" href="css/plugins/fontello/fontello.css"/>
		<link rel="stylesheet" type="text/css" href="css/plugins/gallery/jquery.justifiedgallery.min.css"/>
		<link href="css/plugins/custom-jqui-theme/jquery-ui-1.10.4.custom.css" rel="stylesheet">
		<link rel="stylesheet" type="text/css" href="css/global.css"/>
		<link rel="stylesheet" type="text/css" href="css/overlay.css"/>
		<link rel="stylesheet" type="text/css" href="css/pages/galleryview.css"/>
		<link rel="stylesheet" type="text/css" href="css/pages/search.css"/>
		<link rel="icon" type="image/x-icon" href="img/global/favicon.jpg"/>
		<script type="text/javascript" src="js/plugins/modernizr.js"></script>
		<title>Suchergebnisse</title>
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
									<a id="link-home" href="index.html">
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
					<div class="small-12 medium-11 medium-centered large-10 large-centered columns results-container">
						<div class="small-12 columns headline-container">
							<h3>Ergebnisse für <i class="search-term"></i></h3>
						</div>
						<div class="small-12 columns">
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
			console.log(values);
		</script>
		<script type="text/template" class="overlay-template">
			<div id="overlay-background"></div>
		</script>
		<script type="text/template" class="overlay-user">
			<section id="user-overlay">
				<div class="user-overlay-container">
					<ul>
						<li><a id="link-timeline" href="timeline.php">Meine Timeline</a></li>
						<li><a id="link-myimages" href="javascript:void()">Mein Profil</a></li>
						<li><a id="link-user" href="javascript:void()">Account</a></li>
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
						<div class="small-6 columns filter-container">
							<div class="switch-label">
								<span>Filter</span>
							</div>
							<div class="onoffswitch">
							    <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch">
							    <label class="onoffswitch-label" for="myonoffswitch">
							        <div class="onoffswitch-inner">
							            <div class="onoffswitch-active"><div class="onoffswitch-switch">AN</div></div>
							            <div class="onoffswitch-inactive"><div class="onoffswitch-switch">AUS</div></div>
							        </div>
							    </label>
							</div>
						</div>	
						<div class="small-6 columns submit-container">
							<a href="#" class="button-overlay" id="search-button">Suchen</a>
						</div>
						<div class="small-12 columns">
							<div class="filter-type-container left">
								<label class="filter-label">Filtern nach...</label>
									<input type="radio" name="filtertype" value="tag" id="tagFilter" checked>
							    	<label for="tagFilter">Tags</label>
									<input type="radio" name="filtertype" value="type" id="typeFilter" >
      								<label for="typeFilter">Type</label>
      								<input type="radio" name="filtertype" value="sex" id="sexFilter">
      								<label for="sexFilter">Geschlecht</label>
							</div>
						</div> 
						<div class="small-12 columns searchtags-container left">
					    	<div class="tags-search-container">
					    		<ul id="tag-search-list">

					    		</ul>
					    	</div>
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
  		<script src="js/plugins/md5/jquery.md5.js"></script>
		<script src="js/plugins/underscore.js"></script>
		<script src="js/plugins/foundation/foundation.js"></script>
  		<script src="js/plugins/foundation/foundation.topbar.js"></script>
  		<script src="js/plugins/transit/transit.min.js"></script>
  		<script src="js/plugins/gallery/jquery.justifiedgallery.js"></script>
  		<script src="js/plugins/jquery-ui-custom/jquery-ui-1.10.4.custom.min.js"></script>
  		<script src="js/plugins/waypoint/waypoints.min.js"></script>
  		<script src="js/StateManager.js"></script>
  		<script src="js/ImgurManager.js"></script>
		<script src="js/global.js"></script>
		<script src="js/pages/search.js"></script>		
		<script src="js/pages/login.js"></script>
		<script src="js/GalleryView.js"></script>
		<script src="js/pages/searchresults.js"></script>
	</body>
</html>