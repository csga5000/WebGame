<?php
namespace com\csga5000\WebGameLib;
require_once(dirname(dirname(__FILE__)).'/config/database.php');
require_once(dirname(__FILE__).'/sql/sql_updates.php');

class MySql {
	public static $dbInfo;
	public static $updates;
	private static $err = false;
	public static $lastId = -1;

	public static function connect() {
		if (!function_exists('mysqli_init') && !extension_loaded('mysqli')) {
			error_log('mysqli not found!');
		}

		if(self::$dbInfo['port'])
			$con = new \mysqli(self::$dbInfo['host'], self::$dbInfo['user'], self::$dbInfo['pass'], self::$dbInfo['database'], self::$dbInfo['port']);
		else
			$con = new \mysqli(self::$dbInfo['host'], self::$dbInfo['user'], self::$dbInfo['pass'], self::$dbInfo['database']);

		if ($con->connect_errno) {
			error_log('Connection failed: %s\n', $con->connect_error);
			self::err('Could not connect to database!');
			return false;
		}
		return $con;
	}

	public static function run($query) {
		$con = self::connect();
		if (!$con)
			return false;

		$result = $con->query($query);
		if (!$result) {
			error_log($con->error);
			self::err('Database query failed. (Check log)');
			return false;
		}
		self::$lastId = $con->insert_id;
		$con->close();

		return true;
	}

	public static function find($query) {
		$con = self::connect();
		if (!$con)
			return false;

		$result = $con->query($query);
		$resArr = [];

		if (!$result) {
			error_log($con->error);
			self::err('Database find failed. (Check log)');
			return false;
		}

		while ($row = $result->fetch_assoc()) {
			$resArr[] = $row;
		}
		$con->close();
		return $resArr;
	}

	public static function findOne($query) {
		$con = self::connect();
		if (!$con)
			return false;

		$result = $con->query($query);
		$ret = [];

		if (!$result) {
			error_log($con->error);
			self::err('Database find one failed. (Check log)');
			return false;
		}

		if ($row = $result->fetch_assoc()) {
			$ret = $row;
		}
		$con->close();
		return $ret;
	}

	public static function err($err) {
		self::$err = $err;
	}

	public static function getError() {
		return self::$err;
	}

	public static function update() {
		$version = MySql::find('SELECT db_version FROM config');

		$version = $version[0]['db_version'];

		for($i = $version; $i < sizeof(self::$updates); $i++)
		{
			MySql::run(self::$updates[$i]);
		}

		MySql::run('UPDATE config SET db_version=' . sizeof(self::$updates));
		unset($GLOBALS['updates']);
	}
}

MySql::update();