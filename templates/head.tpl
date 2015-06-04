<?php
namespace com\csga5000\WebGameLib;
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
	<head>

		<meta http-equiv="Content-type" content="text/html;charset=UTF-8" />
		<title>WebGame</title>

		<?php
			//Instantiate undefined variables
			if (!isset($css))
				$css = [];
			if (!isset($js))
				$js = [];
			
			//Allow string values to be passed in for JS and CSS which expect arrays
			if (!is_array($css))
				$css = [$css];
			if (!is_array($js))
				$js = [$js];

			echo ContentManager::css(
				array_merge(
					['libs/bootstrap.min', 'custom-ui', 'style'],
					$css
				)
			);


			echo ContentManager::js(
				array_merge(
					[
					'libs/jquery-2.1.1.min',
					'libs/bootstrap.min',
					'script',
					],
					$js
				)
			);
		?>
	</head>
	<body>