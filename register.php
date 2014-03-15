<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8"/>
		<meta name="viewport" content="width=device-width, initial-scale=1"/>
		<link rel="stylesheet" type="text/css" href="css/plugins/foundation.css"/>
		<link rel="stylesheet" type="text/css" href="css/plugins/fontello/fontello.css"/>
		<link rel="stylesheet" type="text/css" href="css/global.css"/>
		<link rel="stylesheet" type="text/css" href="css/overlay.css"/>
		<link rel="stylesheet" type="text/css" href="css/pages/register.css"/>
		<link href="css/plugins/custom-jqui-theme/jquery-ui-1.10.4.custom.css" rel="stylesheet">
		<link rel="icon" type="image/x-icon" href="img/global/favicon.jpg"/>
		<script type="text/javascript" src="js/plugins/modernizr.js"></script>
		<title>Registrierung</title>
	</head>
	<body>
		<div id="index">
			<header id="mainheader">
				<div class="fixed mainnav-container">
					<nav id="mainnav" class="top-bar" data-topbar>
						<ul class="title-area">
							<li class="name">
							</li>
							<li class="toggle-topbar menu-icon"><a href="">Men&uml;</a></li>
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
					<div class="small-12 columns register-forms-container">
						<div class="small-12 medium-9 medium-offset-3
								large-9 large-offset-3 columns headline-container">
							<h3 id="header">Registrieren</h3>															
						</div>	
						<form data-abide="ajax" class="form-register" novalidate="novalidate">
							<div class="row">
					        	<div class="small-12 medium-3 large-3 columns">
					        		<label for="username">Benutzername</label>
					        	</div>
					        	<div class="small-12 medium-9 large-9 columns">
					        		<input type="text" id="username" 
					        			placeholder="Hier Benutzername eingeben..." required>
					        	</div>
					      	</div>
					      	<div class="row">
					        	<div class="small-12 medium-3 large-3 columns">
					        		<label for="mail">E-Mail</label>
					        	</div>
					        	<div class="small-12 medium-9 large-9 columns">
					          		<input pattern="email" type="email" id="mail" 
					          			placeholder="Hier E-Mail eingeben..." required>
					       		</div>
					      	</div>
					      	<div class="row" id="old-pwd">
					        	<div class="small-12 medium-3 large-3 columns">
					        		<label for="old-password">Aktuelles Passwort</label>
					        	</div>
					        	<div class="small-12 medium-9 large-9 columns">
					        		<input type="password" id="old-password" placeholder="Hier aktuelles Passwort eingeben..." required>
					        	</div>
					        </div>
					      	<div class="row">
					        	<div class="small-12 medium-3 large-3 columns">
					        		<label for="password" id="new-pwd">Passwort</label>
					        	</div>
					        	<div class="small-12 medium-9 large-9 columns">
					        		<input type="password" pattern="password_easy" id="password" placeholder="Hier Passwort eingeben..." required>
					        		<small class="error error-password">Das Passwort muss mindestens 6 Zeichen lang sein</small>
					        	</div>
					        </div>
					        <div class="row">
					        	<div class="small-12 medium-3 large-3 columns">
					        		<label for="confirm-password">Passwort bestätigen</label>
					        	</div>
					        	<div class="small-12 medium-9 large-9 columns">
					        		<input type="password" pattern="password_easy" id="confirm-password" 
					        			placeholder="Hier Passwort bestätigen..." data-equalto="password">
					        	</div>
					      	</div>
					      	<div class="row">
					        	<div class="small-12 medium-3 large-3 columns">
					        		<label for="confirm-tou">
					        			Nutzungsbedingungen
					        		</label>
					        	</div>
					        	<div class="small-12 medium-9 large-9 columns tou-container">
					        		<input type="checkbox" id="confirm-tou" required>
					        		</input>
					        		<label for="confirm-tou">
					        			Ich habe die <a target="_blank" href="tou.html">Nutzungsbedingungen</a>
										für Latrinalia gelesen und
										akzeptiert und erkläre hiermit
										meine Einwilligung in die Erhebung,
										Speicherung und Verarbeitung
										meiner personenbezogenen Daten zum
										Zwecke der Teilnahme an Latrinalia.
					        		</label>
					        	</div>
					      	</div>
					      	<div class="row">
					        	<div class="small-12 columns">
					        		<button id="register-submit"
							    		class="button medium right">
							    		Registrieren
							    	</button>
					        	</div>
					      	</div>
						</form>
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
						<li><a id="link-timeline" href="timeline.php">Meine Timeline</a></li>
						<li><a id="link-myimages" href="javascript:void()">Meine Profil</a></li>
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
					    	<div class="tags-container">
					    		<ul id="tag-list">

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
    	<script>
    		var edit = false;
    		<?php
    			if(isset($_GET["edit"])){
    				echo "edit = true;";
    			}
    		?>
    	</script>
		<script src="js/plugins/jquery.min.js"></script>
		<script src="js/plugins/underscore.js"></script>
		<script src="js/plugins/md5/jquery.md5.js"></script>
		<script src="js/plugins/foundation/foundation.js"></script>
  		<script src="js/plugins/foundation/foundation.topbar.js"></script>
  		<script src="js/plugins/jquery-ui-custom/jquery-ui-1.10.4.custom.js"></script>
  		<script src="js/plugins/foundation/foundation.abide.js"></script>
  		<script src="js/global.js"></script>	
  		<script src="js/ImgurManager.js"></script>
		<script src="js/pages/search.js"></script>		
		<script src="js/pages/login.js"></script>
		<script src="js/pages/register.js"></script>
	</body>
</html>