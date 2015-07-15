<?php
	namespace com\csga5000\WebGameLib;
	require_once('php/TemplateLoader.php');

	session_start();

	if (isset($_SESSION['user_id']))
		header('Location: index.php');



	echo TemplateLoader::getTemplate('head',['js'=>'login']);
	echo TemplateLoader::getTemplate('logout');
?>

<div class="container">
	<div class="col-md-4 col-md-offset-2">
		<div class="panel panel-default">
			<div class="panel-heading">
				<h3>New User?  Register!</h3>
			</div>
			<div class="panel-body">
				<form id="register">
					<div class="input-group">
						<label for="username">Username:</label><br>
						<input name="username" type="text"/>
					</div>

					<br>

					<div class="input-group">
						<label for="username">Password:</label><br>
						<input name="password" type="password"/>
					</div>

					<br>

					<div class="input-group">
						<label for="username">Password2:</label><br>
						<input name="password2" type="password"/>
					</div>

					<br>

					<p id="error" style="color:red;"></p>

					<button class="btn-success margin-top" type="button">Register</button>
				</form>
			</div>
		</div>
	</div>
	<div class="col-md-4">
		<div class="panel panel-default">
			<div class="panel-heading">
				<h3>Login</h3>
			</div>
			<div class="panel-body">
				<form id="login">
					<div class="input-group">
						<label for="username">Username:</label><br>
						<input name="username" type="text"/>
					</div>

					<br>

					<div class="input-group">
						<label for="username">Password:</label><br>
						<input name="password" type="password"/>
					</div>
					
					<br>

					<p id="error" style="color:red;"></p>

					<button class="btn-success margin-top" type="button">Login</button>
				</form>
			</div>
		</div>
	</div>
</div>

<?php
	echo TemplateLoader::getTemplate('footer');
?>