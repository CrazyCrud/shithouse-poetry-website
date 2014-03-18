<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8"/>
		<meta name="viewport" content="width=device-width, initial-scale=1"/>
		<link rel="stylesheet" type="text/css" href="css/plugins/foundation.css"/>
		<link rel="stylesheet" type="text/css" href="css/plugins/fontello/fontello.css"/>
		<link rel="stylesheet" type="text/css" href="css/plugins/custom-jqui-theme/jquery-ui-1.10.4.custom.css"/>
		<link rel="stylesheet" type="text/css" href="css/global.css"/>
		<link rel="stylesheet" type="text/css" href="css/overlay.css"/>
		<link rel="stylesheet" type="text/css" href="css/pages/admin.css"/>
		<link rel="icon" type="image/x-icon" href="img/global/favicon.jpg"/>
		<script type="text/javascript" src="js/plugins/modernizr.js"></script>
		<title>Latrinalia - AdminPanel</title>
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
				<div class="row" id="headline">
					<h2>Latrinalia - AdminPanel</h2>
					<i class="icon-search"></i>
					<i class="icon-female"></i>
					<i class="icon-camera"></i>
					<i class="icon-ok"></i>
					<i class="icon-cancel"></i>
					<i class="icon-upload"></i>
					<i class="icon-upload-cloud"></i>
					<i class="icon-pencil"></i>
					<i class="icon-comment"></i>
					<i class="icon-chat-empty"></i>
					<i class="icon-attention"></i>
					<i class="icon-left-big"></i>
					<i class="icon-user-1"></i>
					<i class="icon-user"></i>
					<i class="icon-help-circled"></i>
					<i class="icon-home"></i>
					<i class="icon-feather"></i>
					<i class="icon-up-circled"></i>
					<i class="icon-thumbs-up"></i>
					<i class="icon-thumbs-down"></i>
					<i class="icon-block"></i>
					<i class="icon-cog"></i>
					<i class="icon-thumbs-up-1"></i>
					<i class="icon-thumbs-down-1"></i>
					<i class="icon-male"></i>
					<i class="icon-help"></i>
				</div>
				<div class="row" id="notifications-header">
					<i class="icon-user" id="users"></i>
					<i class="icon-block" id="reports"></i>
					<i class="icon-ok" id="locations"></i>
				</div>
				<section class="section" id="users">
					<div class="row" id="users-header">
						<h3>Benutzer:</h2>
					</div>
					<table id="users-table" class="tablesorter row">
						<thead> 
							<tr> 
							    <th>id</th> 
							    <th>Mail</th>
							    <th>Name</th>
							    <th>Beitritt</th>
							    <th>Online</th>
							    <th>Status</th>
							</tr> 
						</thead> 
						<tbody id="users-table-content"> 
							<tr> 
							    <td>id</td> 
							    <td>Mail</td>
							    <td>Name</td>
							    <td>Beitritt</td>
							    <td>Online</td>
							    <td>Status</td>
							</tr> 
						</tbody>
					</table>
				</section>
				<section class="section" id="reports">
					<div class="row" id="reports-header">
						<h3>Meldungen:</h2>
					</div>
					<table id="reports-table" class="tablesorter row">
						<thead> 
							<tr> 
							    <th>Eintrag</th> 
							    <th>Nutzer</th> 
							    <th>Meldung</th> 
							    <th>Datum</th>
							    <th>Status</th>
							</tr> 
						</thead> 
						<tbody id="reports-table-content"> 
							<tr> 
							    <td>Eintrag</td> 
							    <td>Nutzer</td> 
							    <td>Meldung</td> 
							    <td>Datum</td>
							    <td>Status</td>
							</tr> 
						</tbody>
					</table>
				</section>
				<section class="section" id="locations">
					<div class="row" id="locations-header">
						<h3>Orte:</h2>
					</div>
					<div class="row" id="locations-content">
						<div class="map columns small-12 medium-7 large-7" id="locations-map" name="map"></div>
						<div id="locations-table-container" class="columns small-12 medium-5 large-5">
							<table id="locations-table" class="tablesorter">
								<thead> 
									<tr> 
										<th>Auf Karte</th>
									    <th>Orte</th> 
									    <th>L&ouml;schen</th>
									</tr> 
								</thead> 
								<tbody id="locations-table-content"> 
									<tr> 
										<td>Auf Karte</td>
									    <td>Orte</td> 
									    <td>L&ouml;schen</td>
									</tr> 
								</tbody>
							</table>
						</div>
					</div>
				</section>
			</section>
		</div>
		<?php
			include("templates.html");
		?>
		<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
		<script src="js/plugins/jquery.min.js"></script>
  		<script src="js/plugins/md5/jquery.md5.js"></script>
  		<script src="js/plugins/table/jquery.tablesorter.min.js"></script>
		<script src="js/plugins/underscore.js"></script>
		<script src="js/plugins/foundation/foundation.js"></script>
  		<script src="js/plugins/foundation/foundation.topbar.js"></script>
		<script src="js/plugins/jquery-ui-custom/jquery-ui.min.js"></script>
		<script src="js/ImgurManager.js"></script>
  		<script src="js/StateManager.js"></script>
		<script src="js/global.js"></script>
		<script src="js/pages/search.js"></script>		
		<script src="js/pages/login.js"></script>	
		<script src="js/pages/admin.js"></script>
	</body>
</html>