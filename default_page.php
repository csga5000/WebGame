<?php

	namespace com\csga5000\WebGameLib;
	require_once('php/TemplateLoader.php');

	session_start();

	if (!isset($_SESSION['user_id']))
		header('Location: login.php');

	echo TemplateLoader::getTemplate('head',[
		'js' => [
			
		],
		'css' => []
	]);

?>

<?php
	echo TemplateLoader::getTemplate('logout');
?>

<?php
	echo TemplateLoader::getTemplate('footer');
?>