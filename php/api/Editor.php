<?php
namespace com\csga5000\WebGameLib;

require_once(dirname(__FILE__).'/Controller.php');

class Editor extends Controller {

	function init() {
		parent::init();

		$this->loadModel('World');
	}

	function index() {
		$this->set('worlds', $this->world->worldsForUser($_SESSION['user_id']));
		$this->success('Successfully got worlds');
	}

	public function setWorld() {
		$data = $this->smartRequireFields(
			['world_id'],
			'You must specify the ',
			'!'
		);

		$_SESSION['world_id'] = $data['world_id'];

		$this->success('Successfully set world!');
	}

	public function newWorld() {
		$data = $this->smartRequireFields(
			['name'],
			'You must specify the world ',
			'!'
		);

		$_SESSION['world_id'] = $this->world->createNew($_SESSION['user_id'], $data['name']);

		$this->success('Successfully created and set world!');
	}
}