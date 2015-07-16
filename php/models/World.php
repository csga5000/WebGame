<?php
namespace com\csga5000\WebGameLib;

require_once(dirname(__FILE__).'/Model.php');

class World extends Model {
	private $err = '';

	protected $table = 'worlds';

	public function worldsForUser($id) {
		return $this->findAll([
			'user_id' => $id
		]);
	}

	public function createNew($user_id, $name) {
		$this->create([
			'user_id' => $user_id,
			'name' => $name
		]);

		return MySql::$lastId;
	}

	public function getError() {
		return $this->err;
	}
}