<?php
namespace com\csga5000\WebGameLib;

MySql::$updates = [];

////Versions////

//V1: Add users table
MySql::$updates[] =
<<< SQL
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(128) NOT NULL,
  `password` varchar(256) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
SQL;

MySql::$updates[] = 
<<< SQL
CREATE TABLE `worlds` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`user_id` INT(11) NOT NULL,
	`name` VARCHAR(50) NOT NULL DEFAULT 'Hello',
	`value` TEXT NOT NULL,
	PRIMARY KEY (`id`)
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
;

SQL;
