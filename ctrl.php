<?php

session_start();

require_once('config/config.php');

$response = [];

function load($request){
	global $response;
	$response = [
		'success' => false,
		'message' => 'Unknown error',
		'warn' => false,
		'data' => []
	];

	global $config;

	global $name;
	
	if (!array_key_exists('controller',$request) || !array_key_exists('action',$request)) {
		$response['message'] = 'Data missing controller or action!';
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