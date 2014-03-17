<html>
	<head>
		<title>Latrinalia - gitPull</title>
		<style>
			body{
				padding: 1rem;
			}
			.commit{
				box-shadow: 0 0 .5rem #c3c3c3;
				margin-bottom: 1rem;
				padding: .5rem;
				border-radius: .1rem;
			}
		</style>
	</head>
	<body>

		<?php

		echo "<h1>Cloning repository to webserver ...</h1>";
		echo nl2br(shell_exec('git pull'))."<br/>";
		echo str_replace("commit ", "</div><div class='commit'>commit ",nl2br(shell_exec('git log')));

		?>

	</body>
</html>