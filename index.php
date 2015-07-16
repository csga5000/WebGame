<?php

	namespace com\csga5000\WebGameLib;
	require_once('php/TemplateLoader.php');
	require_once('ctrl.php');

	if (!isset($_SESSION['user_id']))
		header('Location: login.php');

	echo TemplateLoader::getTemplate('head',[
		'js' => ['worlds'],
		'css' => ['worlds']
	]);

?>

<?php
	echo TemplateLoader::getTemplate('logout');

	$worlds = load([
		'controller' => 'editor',
		'action' => 'index'
	])['worlds'];
?>

<div style="margin-bottom: 3vh" layout>
	<h1>Select a world!</h1>
</div>

<div id="world-list" layout="row" flex-wrap>
	<?php foreach ($worlds as $world) :?>
		<div class="world-item" layout world-id="<?php echo($world['id']); ?>">
			<?php echo $world['name']; ?>
		</div>
	<?php endforeach; ?>
	<div class="world-item new-world" layout world-id="new">
		New!
	</div>
</div>

<?php
	echo TemplateLoader::getTemplate('footer');
?>