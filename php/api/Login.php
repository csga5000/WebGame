<?php
namespace com\csga5000\WebGameLib;

require_once(dirname(__FILE__).'/Controller.php');

class Login extends Controller {

	function init() {
		parent::init();

		$this->loadModel('User');
	}

	//Note: Untested... could fail ha...
	public function login() {
		$data = $this->smartRequireFields(
			['username','password'],
			'You must enter your ',
			'!'
		);

		if ($this->user->authenticate($data['username'], $data['password']))
			$this->success('Successfully logged in');
		else
			$this->message($this->user->getError());
	}

	public function register() {
		$data = $this->smartRequireFields(
			['username','password'],
			'You must enter your ',
			'!'
		);

		if ($user = $this->user->register($data['username'], $data['password'])) {
			$_SESSION['user_id'] = $user['id'];

			$this->set('user_id', $user[]);
			$this->success('Successfully logged in');
		}
		else
			$this->message($this->user->getError());
	}

	public function logout() {
		session_unset();
		$this->success('Successfully logged out!');
	}
}