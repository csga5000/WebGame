<?php

session_start();

require_once('config/config.php');

$response = [
	'success' => false,
	'message' => 'Unknown error',
	'warn' => false
];

function load(){
	global $config;

	global $response;
	global $name;

	$request = $GLOBALS['_' . $_SERVER['REQUEST_METHOD']];
	
	if (!array_key_exists('controller',$request) || !array_key_exists('action',$request)) {
		$response['message'] = 'Post data missing controller or action!';
		return $response;
	}

	$name = strtolower($request['controller']);
	$controller = ucfirst($name);
	$action = strtolower($request['action']) ?: 'index';
	require_once('php/api/' . $controller . '.php');

	$controller = 'com\\csga5000\\WebGameLib\\' . $controller;
	$controller = new $controller($name,$action,$request);
	return $response;
}

echo json_encode(load());