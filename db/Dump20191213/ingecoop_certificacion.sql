-- MySQL dump 10.13  Distrib 5.7.28, for Linux (x86_64)
--
-- Host: localhost    Database: ingecoop
-- ------------------------------------------------------
-- Server version	5.7.28-0ubuntu0.18.04.4

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

--
-- Table structure for table `certificacion`
--

DROP TABLE IF EXISTS `certificacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `certificacion` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `control_id` int(10) unsigned NOT NULL,
  `control_cotizacion_id` int(10) unsigned NOT NULL,
  `numeroDePedido` int(11) DEFAULT NULL,
  `proyecto` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `especialidad` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `fechaDeEmision` date DEFAULT NULL,
  `moneda` varchar(45) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`id`,`control_id`,`control_cotizacion_id`),
  KEY `fk_certificacion_control1_idx` (`control_id`,`control_cotizacion_id`),
  CONSTRAINT `fk_certificacion_control1` FOREIGN KEY (`control_id`, `control_cotizacion_id`) REFERENCES `control` (`id`, `cotizacion_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `certificacion`
--

LOCK TABLES `certificacion` WRITE;
/*!40000 ALTER TABLE `certificacion` DISABLE KEYS */;
INSERT INTO `certificacion` VALUES (4,10,8,1,'1','1',NULL,'1');
/*!40000 ALTER TABLE `certificacion` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-13 11:31:18
