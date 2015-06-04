<?php

namespace com\csga5000\WebGameLib;

class TemplateLoader {

	public static function fileForTemplate($name) {
		return dirname(dirname(__FILE__)) . "/templates/$name.tpl";
	}

	protected static function load($template, $vars = []) {
		ob_start();

		extract($vars);

	    include $template;
	    $view = ob_get_contents();
		ob_end_clean();

		return $view;
	}

	public static function getTemplate($name, $vars = []) {
		return TemplateLoader::load(self::fileForTemplate($name), $vars);
	}
}

class ContentManager {
	public static function css($links){
		$css = '';

		if (!is_array($links))
			$links = [$links];

		foreach($links as $link){
			$css .= '<link href="css/'.$link.'.css" rel="stylesheet" type="text/css">' . "\n";
		}
		return $css;
	}

	public static function js($links){
		$jss = '';

		if (!is_array($links))
			$links = [$links];

		foreach($links as $link){
			$jss .= '<script class="js" src="js/'.$link.'.js"></script>' . "\n";
		}
		return $jss;
	}
}

?>