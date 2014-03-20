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
				</div>
				<div class="row" id="notifications-header">
					<a href="#" id="overview"><i class="icon-help-circled" title="&Uuml;bersicht"></i></a>
					<a href="#" id="users"><i class="icon-user"></i><span id="usercount"></span></a>
					<a href="#" id="reports"><i class="icon-attention">&nbsp;</i><span id="reportcount"></span></a>
					<a href="#" id="locations"><i class="icon-map" title="Orte verwalten"></i></a>
					<a href="#" id="tags"><i class="icon-chat-empty" title="Tags verwalten"></i></a>
					<a href="#" id="types"><i class="icon-comment" title="Types verwalten"></i></a>
				</div>
				<section class="section" id="overview">
					<div class="row" id="overview-header">
						<h3>&Uuml;bersicht</h3>
					</div>
					<div class="row" id="overview-content">
						<div id="chart-div" class="graph columns small-12 medium-6 large-6">
							<span>Graph wird geladen</span>
							<div id="chart-chart-div"></div>
							<div id="chart-control-div"></div>
						</div>
						<div id="pie-div" class="graph columns small-12 medium-6 large-6">Chart wird geladen</div>
					</div>
				</section>
				<section class="section" id="users">
					<div class="row" id="users-header">
						<h3>Nutzer</h3>
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
						<h3>Meldungen</h3>
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
						<h3>Orte</h3>
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
						<h3>Tags</h3>
						<p class="tiny">
							Dies sind die System-Tags, die dem Nutzer beim Erstellen eines Eintrags vorgeschlagen werden:
						</p>
					</div>
					<div class="row" id="tags-content">
						<div id="tagscontainer" class="columns small-12 middle-8 large-8">
							Tags werden geladen ...
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
						<h3>Types</h3>
					</div>
					<div class="row" id="types-content">
						Types werden geladen ...
					</div>
					<div class="row" id="types-add-content">
						<a href="#" class="tiny" id="newtypebutton">Neuen Type hinzuf&uuml;gen</a>
						<div id="add-type-container">
							<div class="tiny">Neuen Type hinzuf&uuml;gen (Vorsicht!! Das ist permanent und kann nicht r&uuml;ckg&auml;ngig gemacht werden!)</div>
							<div class="columns small-2 medium-2 large-2 inputcontainer">
								<input type="text" id="newtype-name" placeholder="Name"></input>
							</div>
							<div class="columns small-9 medium-9 large-9 inputcontainer">
								<input type="text" id="newtype-description" placeholder="Beschreibung"></input>
							</div>
							<div class="columns small-1 medium-1 large-1">
								<button class="tiny" id="addtypebutton"><i class="icon-plus"></i></button>
							</div>
						</div>
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