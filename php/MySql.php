<?php
namespace com\csga5000\WebGameLib;
require_once(dirname(__FILE__).'/config/database.php');

class MySql{
	public static $dbInfo;

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
			exit();
		}
		return $con;
	}

	public static function run($query) {
		$con = self::connect();
		$result = $con->query($query);
		if (!$result) {
			error_log($con->error);
			return false;
		}
		$con->close();

		return true;
	}

	public static function find($query) {
		$con = self::connect();
		$result = $con->query($query);
		$resArr = [];

		if (!$result) {
			error_log($con->error);
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
		$result = $con->query($query);
		$ret = [];

		if (!$result) {
			error_log($con->error);
			return false;
		}

		if ($row = $result->fetch_assoc()) {
			$ret = $row;
		}
		$con->close();
		return $ret;
	}
}

?>