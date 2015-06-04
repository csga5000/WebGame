<?php
namespace com\csga5000\WebGameLib;

require_once(dirname(__FILE__).'/Model.php');

class User extends Model {
	private $err = '';

	protected $table = 'users';

	public function findByUsername($username) {
		return MySql::findOne("SELECT * FROM {$this->table} WHERE username='$username' LIMIT 1");
	}

	public function authenticate($username, $password) {
		$this->hashPass($password);

		$user = $this->findByUsername($username);

		if ($user) {
			if ($password != $user['password']) {
				$this->err = "Incorrect password.";
				return false;
			}

			$_SESSION['user_id'] = $user['id'];
			return $user;
		}
		else {
			$this->err = "User with username $username does not exist!";
			return false;
		}
	}

	public function register($username, $password) {
		$this->hashPass($password);

		$user = $this->findByUsername($user);

		if ($user) {
			$this->err = "User with username $username already exists.";
			return;
		}
		else

		$this->create(['username' => $username, 'password' => $password]);

		return $this->findByusername($username);
	}

	public function hashPass(&$pass) {
		$pass = md5(Config::$salt . $pass);
	}

	public function getError() {
		return $this->err;
	}
}