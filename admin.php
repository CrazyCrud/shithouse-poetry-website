<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8"/>
		<meta name="viewport" content="width=device-width, initial-scale=1"/>
		<link rel="stylesheet" type="text/css" href="css/plugins/build/production.plugins.min.css"/>
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
					<i class="icon-spin5"></i>
					<i class="icon-plus"></i>
					<i class="icon-map"></i>
					<i class="icon-cancel-1"></i>
					<i class="icon-cancel-2"></i>
				</div>
				<div class="row" id="notifications-header">
					<a href="#" id="overview"><i class="icon-help-circled" title="&Uuml;bersicht"></i></a>
					<a href="#" id="users"><i class="icon-user"></i><span id="usercount"></span></a>
					<a href="#" id="reports"><i class="icon-block"></i><span id="reportcount"></span></a>
					<a href="#" id="locations"><i class="icon-map" title="Orte verwalten"></i></a>
					<a href="#" id="tags"><i class="icon-chat-empty" title="Tags verwalten"></i></a>
					<a href="#" id="types"><i class="icon-comment" title="Types verwalten"></i></a>
				</div>
				<section class="section" id="overview">
					<div class="row" id="overview-header">
						<h3>&Uuml;bersicht</h2>
					</div>
					<div class="row" id="overview-content">
						<div id="chart-div" class="graph columns small-12 medium-6 large-6"></div>
						<div id="pie-div" class="graph columns small-12 medium-6 large-6"></div>
					</div>
				</section>
				<section class="section" id="users">
					<div class="row" id="users-header">
						<h3>Nutzer</h2>
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
						<h3>Meldungen</h2>
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
						<h3>Orte</h2>
					</div>
					<div class="row" id="locations-content">
						<div class="map columns small-12 medium-7 large-7" id="locations-map" name="map"></div>
						<div id="locations-table-container" class="columns small-12 medium-5 large-5">
							<div id="locations-add-header">
								<span>neuen Eintrag hinzuf&uuml;gen</span>
								<button class="tiny" id="add-location"><i class="icon-plus"></i></button>
							</div>
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
				<section class="section" id="tags">
					<div class="row" id="tags-header">
						<h3>Tags</h2>
						<p class="tiny">
							Dies sind die System-Tags, die dem Nutzer beim Erstellen eines Eintrags vorgeschlagen werden:
						</p>
					</div>
					<div class="row" id="tags-content">
						<div id="tagscontainer" class="columns small-12 middle-8 large-8">
						</div>
						<div id="addtagscontainter" class="columns small-12 middle-4 large-4">
							<div id="inputcontainer" class="columns small-8 middle-8 large-8">
								<input type="text" id="taginput"></input>
							</div>
							<div class="columns small-4 middle-4 larger-4">
								<button id="addtagbutton" class="tiny">Hinzuf&uuml;gen</button>
							</div>
						</div>
					</div>
				</section>
				<section class="section" id="types">
					<div class="row" id="types-header">
						<h3>Types</h2>
					</div>
					<div class="row" id="types-content">
						
						

					</div>
				</section>
			</section>
		</div>
		<?php
			include("templates.html");
		?>
		<script type="text/javascript" src="https://www.google.com/jsapi"></script>
		<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
		<script src="js/plugins/build/production.plugins.min.js"></script>
		<script src="js/ImgurManager.js"></script>
  		<script src="js/StateManager.js"></script>
		<script src="js/global.js"></script>
		<script src="js/pages/search.js"></script>		
		<script src="js/pages/login.js"></script>	
		<script src="js/pages/admin.js"></script>
	</body>
</html>