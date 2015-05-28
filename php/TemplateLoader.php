<?php

namespace com\csga5000\WebGameLib;

class TemplateLoader {
	public static $controller;
	public static $action;

	public static function fileForAction() {
		return dirname(dirname(__FILE__)) . '/views/'.self::$controller.'/'.self::$action.'.tpl';
	}
	public static function fileForLayout($layout) {
		return dirname(dirname(__FILE__)) . "/views/layouts/$layout.tpl";
	}

	protected static function load($template, $vars = []) {
		ob_start();

		global $HtmlHelper;
		$HtmlHelper->vars = &$vars;
		extract($vars);
		$ContentManager = new ContentManager();

	    include $template;
	    $view = ob_get_contents();
		ob_end_clean();
		$contents = $ContentManager->contents;
		$contents['body'] = $view;
		return $contents;
	}

	public static function content($vars = []) {
		return TemplateLoader::load(self::fileForAction(), $vars);
	}

	public static function layout($name, $vars = []) {
		return TemplateLoader::load(self::fileForLayout($name), $vars)['body'];
	}
}

class ContentManager{
	protected $type = '';
	public $contents = [];

	public function begin($type) {
		$this->contents['body'] = ob_get_contents();
		$this->type = $type;
		ob_end_clean();
		ob_start();
	}

	public function end(){
		$this->contents[$this->type] = ob_get_contents();
		ob_end_clean();
		$this->type = '';
		ob_start();
	}

	public function css($links){
		$css = '';
		foreach($links as $link){
			$css .= '<link class="css" href="'.$link.'.css" rel="stylesheet">' . "\n";
		}
		$this->contents['css'] = $css;
	}

	public function js($links){
		$jss = '';
		foreach($links as $link){
			$jss .= '<script class="js" src="'.$link.'.js"></script>' . "\n";
		}
		$this->contents['js'] = $jss;
	}
}

?>