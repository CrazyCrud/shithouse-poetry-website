<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8"/>
		<meta name="viewport" content="width=device-width, initial-scale=1"/>
		<link rel="stylesheet" type="text/css" href="css/plugins/build/production.plugins.min.css"/>
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
									<a id="link-home" href="index.php">
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
						<div class="small-12 medium-10 medium-offset-2
								large-10 large-offset-2 columns headline-container">
							<h3 id="header">Registrieren</h3>															
						</div>	
						<form data-abide="ajax" class="form-register" novalidate="novalidate">
							<div class="row">
					        	<div class="small-12 medium-2 large-2 columns">
					        		<label class="inline"for="username">Benutzername</label>
					        	</div>
					        	<div class="small-11 medium-9 large-9 columns left">
					        		<input type="text" pattern="username" id="username" 
					        			placeholder="Hier Benutzername eingeben..." required>
					        		<small class="error error-username">Der Name muss mindestens 4 Zeichen lang sein ohne Sonderzeichen</small>
					        	</div>
					      	</div>
					      	<div class="row">
					        	<div class="small-12 medium-2 large-2 columns">
					        		<label class="inline" for="mail">E-Mail</label>
					        	</div>
					        	<div class="small-11 medium-9 large-9 columns left">
					          		<input pattern="email" type="email" id="mail" 
					          			placeholder="Hier E-Mail eingeben..." 

					          			<?php 
					          				if(isset($_GET["mail"])){
					          					echo 'value="'.$_GET["mail"].'" ';
					          				}

					          			?>
					          		required>
					       		</div>
					      	</div>
					      	<div class="row" id="old-pwd">
					        	<div class="small-12 medium-2 large-2 columns">
					        		<label class="inline" for="old-password">Aktuelles Passwort</label>
					        	</div>
					        	<div class="small-11 medium-9 large-9 columns left">
					        		<input type="password" pattern="password_easy" id="old-password" placeholder="Hier aktuelles Passwort eingeben..." required>
					        	</div>
					        </div>
					      	<div class="row">
					        	<div class="small-12 medium-2 large-2 columns">
					        		<label class="inline" for="password" id="new-pwd">Passwort</label>
					        	</div>
					        	<div class="small-11 medium-9 large-9 columns left">
					        		<input type="password" pattern="password_easy" id="password" placeholder="Hier Passwort eingeben..." required>
					        		<small class="error error-password">Das Passwort muss mindestens 6 Zeichen lang sein</small>
					        	</div>
					        </div>
					        <div class="row">
					        	<div class="small-12 medium-2 large-2 columns">
					        		<label class="inline" for="confirm-password">Passwort bestätigen</label>
					        	</div>
					        	<div class="small-11 medium-9 large-9 columns left">
					        		<input type="password" pattern="password_easy" id="confirm-password" 
					        			placeholder="Hier Passwort bestätigen..." data-equalto="password">
					        	</div>
					      	</div>
					      	<div class="row">
					        	<div class="small-12 medium-2 large-2 columns">
					        		<br/>
					        	</div>
					        	<div class="row">
						        	<div class="small-11 medium-9 large-9 columns left tou-container">
						        		<div class="small-1 columns tou-container left">
							        		<input type="checkbox" id="confirm-tou" required>
							        		</input>
							        	</div>
						        		<div class="small-11 columns tou-container">
							        		<label for="confirm-tou">
							        			Ich habe die <a target="_blank" href="tou.php">Nutzungsbedingungen</a>
												für Latrinalia gelesen und
												akzeptiert und erkläre hiermit
												meine Einwilligung in die Erhebung,
												Speicherung und Verarbeitung
												meiner personenbezogenen Daten zum
												Zwecke der Teilnahme an Latrinalia.
							        		</label>
						        		</div>
						        	</div>
					        	</div>
					        </div>
					      	<div class="row">
					        	<div class="small-11 columns">
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
		<?php
			include("templates.html");
		?>
    	<script>
    		var edit = false;
    		<?php
    			if(isset($_GET["edit"])){
    				echo "edit = true;";
    			}
    		?>
    	</script>
    	<!--
		<script src="js/plugins/jquery.min.js"></script>
		<script src="js/plugins/underscore.js"></script>
		<script src="js/plugins/md5/jquery.md5.js"></script>
		<script src="js/plugins/foundation/foundation.js"></script>
  		<script src="js/plugins/foundation/foundation.topbar.js"></script>
  		<script src="js/plugins/jquery-ui-custom/jquery-ui.min.js"></script>
  		<script src="js/plugins/foundation/foundation.abide.js"></script>
  		-->
  		<script src="js/plugins/build/production.plugins.min.js"></script>
  		<script src="js/global.js"></script>	
  		<script src="js/ImgurManager.js"></script>
		<script src="js/pages/search.js"></script>		
		<script src="js/pages/login.js"></script>
		<script src="js/pages/register.js"></script>
	</body>
</html>