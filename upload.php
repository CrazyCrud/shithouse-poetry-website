<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8"/>
		<meta name="viewport" content="width=device-width, initial-scale=1"/>
		<link rel="stylesheet" type="text/css" href="css/plugins/foundation.css"/>
		<link rel="stylesheet" type="text/css" href="css/plugins/fontello/fontello.css"/>
		<link rel="stylesheet" type="text/css" href="css/plugins/custom-jqui-theme/jquery-ui-1.10.4.custom.css"/>
		<link rel="stylesheet" type="text/css" href="css/global.css"/>
		<link rel="stylesheet" type="text/css" href="css/pages/upload.css"/>
		<script type="text/javascript" src="js/plugins/modernizr.js"></script>
		<title>Upload</title>
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
									<a id="link-upload" href="details.html">
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
			<section id="maincontent">
				<div class="row">
					<div class="small-12 columns full-width">
						<div class="upload-forms-container">
							<form data-abide="ajax">
								<div class="add-image-container">
									<div>
										<div class="add-image-bg">

										</div>
										<div class="add-image-text">
											Bild</br>
											wählen
										</div>
									</div>
								</div>
								<input type="file" accept="image/*" class="file-input" 
										style="display:none">
								</input>
								<div class="small-12 columns image-error-container">
									<small class="error image-error">Bitte wähle noch ein Bild aus</small>
								</div>
								
								<div class="small-12 columns image-container">
									
								</div>
								<div class="small-12 columns add-title-container">
									<label>Titel<small>erforderlich</small>
							        	<input id="title" type="text" required>
							        	</input>
							    	</label>
								</div>
								<div class="small-12 columns add-transcription-container">
									<label>Transkription<small>optional</small>
							        	<input id="transcription" type="text">
							        	</input>
							    	</label>
								</div>
								<div class="small-12 columns add-type-container">
									<label for="type">Type<small>erforderlich</small>
								        <select id="type" class="medium" required>
								        	<option value>Bitte den Type des Bildes wählen...</option>
								        </select>
							      	</label>
								</div>
							    <div class="small-12 columns add-sex-container">
							    	<label>Geschlecht<small>erforderlich</small></label>
	      							<input type="radio" name="sex" value="M" id="men" required>
	      							<label for="men">Männer</label>
							      	<input type="radio" name="sex" value="W" id="women" required>
							      	<label for="women">Frauen</label>
							      	<input type="radio" name="sex" value="U" id="unisex" required>
							      	<label for="unisex">Unisex</label>
							    </div>
							    <div class="small-12 columns add-location-container">
									<label for="location">Ort<small>optional</small>
								        <select id="location" class="medium">
								        	<option value>Bitte wähle zuerst ein Bild aus...</option>
								        </select>
							      	</label>
								</div>
							    <div class="small-12 columns add-artist-container">
									<label>Künstler<small>optional</small>
							        	<input id="artist" type="text">
							        	</input>
							    	</label>
								</div>
								<div class="small-12 columns fieldset-container">
							    	<fieldset>
								    	<legend>Tags<small>optional</small></legend>
								    	<div class="tags-container">
								    		<ul id="tag-list">

								    		</ul>
								    	</div>
								    	<div class="custom-tags-container">
								    		<label>Eigene Tags wählen<small></small>
      											<input id="custom-tag" type="text" placeholder="">
    										</label>
								    	</div>
								  	</fieldset>
								  	<small class="error tag-error">
							    		Bitte wähle noch ein oder mehrer Tags
							    		für das Bild aus
							   		</small>
							    </div>
							    <div class="small-12 columns">
							    	<button id="upload-submit"
							    		class="button medium right">
							    		Hochladen
							    	</button>
							    </div>
							</form>
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
		<script src="js/plugins/underscore.js"></script>
		<script src="js/plugins/foundation/foundation.js"></script>
  		<script src="js/plugins/foundation/foundation.topbar.js"></script>
		<script src="js/plugins/jquery-ui-custom/jquery-ui-1.10.4.custom.min.js"></script>
  		<script src="js/plugins/foundation/foundation.abide.js"></script>
  		<script src="js/plugins/exif/load-image.min.js"></script>
		<script src="js/plugins/exif/load-image-ios.js"></script>
		<script src="js/plugins/exif/load-image-orientation.js"></script>
		<script src="js/plugins/exif/load-image-meta.js"></script>
		<script src="js/plugins/exif/load-image-exif.js"></script>
		<script src="js/plugins/exif/load-image-exif-map.js"></script>
		<script src="js/ImgurManager.js"></script>
  		<script src="js/StateManager.js"></script>
		<script src="js/global.js"></script>
		<script src="js/pages/upload.js"></script>
	</body>
</html>