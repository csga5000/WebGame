-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.6.24 - Source distribution
-- Server OS:                    Linux
-- HeidiSQL Version:             9.2.0.4947
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping database structure for webgame
CREATE DATABASE IF NOT EXISTS `webgame` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `webgame`;


-- Dumping structure for table webgame.config
CREATE TABLE IF NOT EXISTS `config` (
  `db_version` smallint(6) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Set database version to 0
insert into config (db_version) values (0)