<?php
namespace com\csga5000\WebGameLib;

require_once(dirname(dirname(__FILE__)).'/MySql.php');

class Model {
	protected $table;

	function __construct() {

	}

	public function find($id) {
		return MySql::findOne("SELECT * FROM {$this->table} WHERE id=$id LIMIT 1");
	}

	public function create($objArr) {
		$cols = [];
		$vals = [];
		foreach ($objArr as $col => $val) {
			$cols[] = $col;
			$vals[] = $val;
		}

		$cols = '('.implode(',', $cols).')';

		return MySql::run("INSERT INTO {$this->table} ($cols) VALUES ($vals)");
	}
}