CREATE DATABASE  IF NOT EXISTS `finance` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `finance`;
-- MySQL dump 10.13  Distrib 5.6.17, for Win32 (x86)
--
-- Host: 192.168.5.22    Database: finance
-- ------------------------------------------------------
-- Server version	5.6.21-enterprise-commercial-advanced-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP TABLE IF EXISTS `abstracts`;
CREATE TABLE `abstracts` (
  `aId` int(11) NOT NULL AUTO_INCREMENT,
  `ownerId` int(11) DEFAULT NULL,
  `abstracts` varchar(256) NOT NULL,
  PRIMARY KEY (`aId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='摘要';

DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `aId` int(11) NOT NULL AUTO_INCREMENT,
  `vId` int(11) NOT NULL,
  `asId` int(11) DEFAULT NULL,
  `word` varchar(4) NOT NULL,
  `createTime` timestamp NULL DEFAULT NULL,
  `period` varchar(6) NOT NULL,
  `saId` int(11) NOT NULL,
  `abstracts` varchar(256) NOT NULL,
  `oneCode` varchar(6) NOT NULL,
  `twoCode` varchar(4) NOT NULL,
  `thrCode` varchar(4) NOT NULL,
  `subjectName` varchar(64) NOT NULL,
  `debit` decimal(13,3) DEFAULT '0.000' COMMENT '借',
  `credit` decimal(13,3) DEFAULT '0.000' COMMENT '贷',
  `businessTime` timestamp NULL DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `sbstatus` tinyint(4) NOT NULL DEFAULT '0' COMMENT '产生更新科目余额信息表示',
  `direction` tinyint(4) DEFAULT '1',
  PRIMARY KEY (`aId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='账目';

DROP TABLE IF EXISTS `accounttmp`;
CREATE TABLE `accounttmp` (
  `atId` int(11) NOT NULL AUTO_INCREMENT,
  `vId` int(11) DEFAULT NULL,
  `astId` int(11) DEFAULT NULL,
  `word` varchar(4) DEFAULT NULL,
  `createTime` timestamp NULL DEFAULT NULL,
  `period` varchar(6) DEFAULT NULL,
  `saId` int(11) NOT NULL,
  `abstracts` varchar(256) NOT NULL,
  `oneCode` varchar(6) NOT NULL,
  `twoCode` varchar(4) NOT NULL,
  `thrCode` varchar(4) NOT NULL,
  `subjectName` varchar(64) NOT NULL,
  `debit` decimal(13,3) DEFAULT '0.000' COMMENT '借',
  `credit` decimal(13,3) DEFAULT '0.000' COMMENT '贷',
  `businessTime` timestamp NULL DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `aId` int(11) DEFAULT NULL,
  `direction` tinyint(4) DEFAULT '1',
  PRIMARY KEY (`atId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='账目临时';

DROP TABLE IF EXISTS `assistant`;
CREATE TABLE `assistant` (
  `aId` int(11) NOT NULL AUTO_INCREMENT,
  `orderId` varchar(15) DEFAULT NULL,
  `msoNo` varchar(15) DEFAULT NULL,
  `designRegionId` int(11) DEFAULT NULL,
  `designDepartmentId` int(11) DEFAULT NULL,
  `designerId` int(11) DEFAULT NULL,
  `businessRegionId` int(11) DEFAULT NULL,
  `businessDepartmentId` int(11) DEFAULT NULL,
  `salesmanId` int(11) DEFAULT NULL,
  `supervisDepartmentId` int(11) DEFAULT NULL,
  `supervisorId` int(11) DEFAULT NULL,
  `workDepartmentId` int(11) DEFAULT NULL,
  `workerId` int(11) DEFAULT NULL,
  `officeDepartmentId` int(11) DEFAULT NULL,
  `officerId` int(11) DEFAULT NULL,
  `materialDepartmentId` int(11) DEFAULT NULL,
  `materialerId` int(11) DEFAULT NULL,
  `orderAddr` varchar(128) DEFAULT NULL,
  `brandName` varchar(45) DEFAULT NULL,
  `departmentId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `company` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`aId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='辅助';

DROP TABLE IF EXISTS `assistanttmp`;
CREATE TABLE `assistanttmp` (
  `atId` int(11) NOT NULL AUTO_INCREMENT,
  `orderId` varchar(15) DEFAULT NULL,
  `msoNo` varchar(15) DEFAULT NULL,
  `designRegionId` int(11) DEFAULT NULL,
  `designDepartmentId` int(11) DEFAULT NULL,
  `designerId` int(11) DEFAULT NULL,
  `businessRegionId` int(11) DEFAULT NULL,
  `businessDepartmentId` int(11) DEFAULT NULL,
  `salesmanId` int(11) DEFAULT NULL,
  `supervisDepartmentId` int(11) DEFAULT NULL,
  `supervisorId` int(11) DEFAULT NULL,
  `workDepartmentId` int(11) DEFAULT NULL,
  `workerId` int(11) DEFAULT NULL,
  `officeDepartmentId` int(11) DEFAULT NULL,
  `officerId` int(11) DEFAULT NULL,
  `materialDepartmentId` int(11) DEFAULT NULL,
  `materialerId` int(11) DEFAULT NULL,
  `orderAddr` varchar(128) DEFAULT NULL,
  `brandName` varchar(45) DEFAULT NULL,
  `departmentId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `company` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`atId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='辅助临时';

DROP TABLE IF EXISTS `module`;
CREATE TABLE `module` (
  `mId` int(11) NOT NULL AUTO_INCREMENT,
  `fatherModuleId` int(11) DEFAULT NULL,
  `moduleName` varchar(32) NOT NULL DEFAULT '',
  `moduleIcon` varchar(15) DEFAULT NULL,
  `moduleUrl` varchar(256) DEFAULT NULL,
  `level` tinyint(4) NOT NULL,
  PRIMARY KEY (`mId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='模块';

DROP TABLE IF EXISTS `operation`;
CREATE TABLE `operation` (
  `oId` int(11) NOT NULL AUTO_INCREMENT,
  `moduleId` int(11) DEFAULT NULL,
  `operationName` varchar(32) NOT NULL DEFAULT '',
  `operation` varchar(128) NOT NULL DEFAULT '',
  PRIMARY KEY (`oId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='操作';

DROP TABLE IF EXISTS `period`;
CREATE TABLE `period` (
  `pId` int(11) NOT NULL AUTO_INCREMENT,
  `period` varchar(6) NOT NULL,
  `status` tinyint(4) NOT NULL,
  PRIMARY KEY (`pId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='系统期间';

DROP TABLE IF EXISTS `subject`;
CREATE TABLE `subject` (
  `sId` int(11) NOT NULL AUTO_INCREMENT,
  `level` tinyint(4) NOT NULL,
  `oneCode` varchar(6) NOT NULL,
  `twoCode` varchar(4) NOT NULL,
  `thrCode` varchar(4) NOT NULL,
  `name` varchar(64) NOT NULL,
  `status` tinyint(4) NOT NULL,
  `code` varchar(15) DEFAULT NULL,
  `direction` tinyint(4) NOT NULL COMMENT '余额方向,借 1, 贷 -1',
  `assistant` varchar(256) NOT NULL DEFAULT '' COMMENT '辅助核算项代码',
  `limits` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`sId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='科目';

DROP TABLE IF EXISTS `subjectbalance`;
CREATE TABLE `subjectbalance` (
  `sbId` int(11) NOT NULL AUTO_INCREMENT,
  `sId` int(11) NOT NULL,
  `period` varchar(6) NOT NULL,
  `total` decimal(13,3) DEFAULT '0.000' COMMENT '总数',
  `initial` decimal(13,3) DEFAULT '0.000' COMMENT '期初值',
  `balance` decimal(13,3) DEFAULT '0.000' COMMENT '期间余额',
  `debit` decimal(13,3) DEFAULT '0.000' COMMENT '借余额',
  `credit` decimal(13,3) DEFAULT '0.000' COMMENT '贷余额',
  `annual` decimal(13,3) DEFAULT '0.000' COMMENT '年余额',
  `adebit` decimal(13,3) DEFAULT '0.000' COMMENT '年借余额',
  `acredit` decimal(13,3) DEFAULT '0.000' COMMENT '年贷余额',
  `status` tinyint(4) NOT NULL,
  `direction` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`sbId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='科目余额';

DROP TABLE IF EXISTS `subjectbalanceupinfo`;
CREATE TABLE `subjectbalanceupinfo` (
  `sbuId` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(15) NOT NULL,
  `period` varchar(6) NOT NULL,
  `debit` decimal(13,3) DEFAULT '0.000' COMMENT '借余额',
  `credit` decimal(13,3) DEFAULT '0.000' COMMENT '贷余额',
  `status` tinyint(4) NOT NULL,
  `direction` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`sbuId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='科目余额更新信息';

DROP TABLE IF EXISTS `usermodule`;
CREATE TABLE `usermodule` (
  `umId` int(11) NOT NULL AUTO_INCREMENT,
  `uId` int(11) NOT NULL,
  `mId` int(11) NOT NULL,
  PRIMARY KEY (`umId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户模块';

DROP TABLE IF EXISTS `useroperation`;
CREATE TABLE `useroperation` (
  `uoId` int(11) NOT NULL AUTO_INCREMENT,
  `uId` int(11) NOT NULL,
  `oId` int(11) NOT NULL,
  PRIMARY KEY (`uoId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户操作';

DROP TABLE IF EXISTS `voucher`;
CREATE TABLE `voucher` (
  `vId` int(11) NOT NULL AUTO_INCREMENT,
  `voucherId` varchar(10) NOT NULL,
  `word` varchar(4) NOT NULL,
  `createTime` timestamp NULL DEFAULT NULL,
  `period` varchar(6) NOT NULL,
  `originatorId` int(11) DEFAULT NULL,
  `auditorId` int(11) DEFAULT NULL,
  `auditTime` timestamp NULL DEFAULT NULL,
  `postorId` int(11) DEFAULT NULL,
  `postTime` timestamp NULL DEFAULT NULL,
  `authorizerId` int(11) DEFAULT NULL,
  `cashierId` int(11) DEFAULT NULL,
  `reference` varchar(128) NOT NULL DEFAULT '',
  `attachmentNum` int(11) NOT NULL DEFAULT '0',
  `comment` varchar(128) NOT NULL DEFAULT '',
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `lockvalue` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`vId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='凭证';

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-05-23 16:11:18
