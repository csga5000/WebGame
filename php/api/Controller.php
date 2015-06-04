<?php
namespace com\csga5000\WebGameLib;

class Controller {
	protected $name;
	protected $action;
	protected $request;

	private $response;

	function __construct($name, $action, $request) {
		$this->name = $name;
		$this->action = $action;
		$this->request = $request;

		global $response;

		$this->response = &$response;

		$this->init();

		$this->$action();
	}

	function init() {

	}

	function smartRequireFields($fields, $errPrefix, $errSuffix, $optional = [], $warnPrefix = 'Value "', $suffix = '" was not specified') {
		$data = $this->requireFields($fields, $optional);

		foreach ($data['missing'] as $missing) {
			$this->warn($warnPrefix . $missing . $suffix);
		}

		if (count($fails = $data['fails']) > 0) {
			//Get text for 
			if ($mult = (count($data['fails']) > 1))
				$message = implode(', ', $fails);
			else 
				$message = $fails[0];

			$this->respondAndDie($errPrefix . $message . $errSuffix);
		}

		return $data['vals'];
	}

	function requireFields($fields, $optional = []) {
		$data = [
			'vals' => [],
			'fails' => [],
			'missing' => []
		];

		if (!is_array($fields))
			$fields = [$fields];

		foreach ($fields as $f) {
			if (isset($this->request[$f]))
				$data['vals'][$f] = $this->request[$f];
			else
				$data['fails'][] = $f;
		}
		foreach ($optional as $f) {
			if (isset($this->request[$f]))
				$data['vals'][$f] = $this->request[$f];
			else
				$data['missing'][] = $f;
		}

		return $data;
	}

	//// Class Loading Functions ////

	function requireFile($file) {
		if (!include_once(dirname(dirname(__FILE__)).$file)) {
			$this->respondAndDie('Could not find required file:'.$file);
		}
	}

	function loadModel($name) {
		$name = ucfirst($var = strtolower($name));

		$this->requireFile("/models/$name.php");
		
		$name = 'com\\csga5000\\WebGameLib\\'.$name;
		$this->$var = new $name();
	}

	//// Response Methods ////

	function set($key, $value) {
		$this->response[$key] = $value;
	}

	function message($message) {
		$this->set('message',$message);
	}

	function warn($warn) {
		if($this->response['warn'] !== false)
			$this->set('warn',[$warn]);
		else
			$this->response['warn'][] = $warn;
	}

	function success($message) {
		$this->message($message);
		$this->set('success',true);
	}

	function respondAndDie($message){
		$this->message($message);
		die(json_encode($this->response));
	}
}