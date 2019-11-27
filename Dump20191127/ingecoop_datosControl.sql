-- MySQL dump 10.13  Distrib 5.7.27, for Linux (x86_64)
--
-- Host: localhost    Database: ingecoop
-- ------------------------------------------------------
-- Server version	5.7.27-0ubuntu0.18.04.1

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
-- Table structure for table `datosControl`
--

DROP TABLE IF EXISTS `datosControl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `datosControl` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion_doc` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `revicion_inicial` int(11) DEFAULT NULL,
  `cantidad_doc` int(11) DEFAULT NULL,
  `HHUnidades` int(11) DEFAULT NULL,
  `total` int(11) DEFAULT NULL,
  `revision_unica` int(11) DEFAULT NULL,
  `observacion` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `modificar_lista` tinyint(1) DEFAULT NULL,
  `proveedor` tinyint(1) DEFAULT NULL,
  `viatico` tinyint(1) DEFAULT NULL,
  `control_id` int(10) unsigned NOT NULL,
  `control_cotizacion_id` int(10) unsigned NOT NULL,
  `list_docs_id` int(11) NOT NULL,
  PRIMARY KEY (`id`,`control_id`,`control_cotizacion_id`,`list_docs_id`),
  KEY `fk_datosControl_control1_idx` (`control_id`,`control_cotizacion_id`),
  KEY `fk_datosControl_list_docs1_idx` (`list_docs_id`),
  CONSTRAINT `fk_datosControl_control1` FOREIGN KEY (`control_id`, `control_cotizacion_id`) REFERENCES `control` (`id`, `cotizacion_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_datosControl_list_docs1` FOREIGN KEY (`list_docs_id`) REFERENCES `list_docs` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `datosControl`
--

LOCK TABLES `datosControl` WRITE;
/*!40000 ALTER TABLE `datosControl` DISABLE KEYS */;
INSERT INTO `datosControl` VALUES (1,'nada',1,1,1,1,1,'1',1,1,1,1,1,180),(2,'nada',1,1,1,1,1,'1',1,1,1,1,1,181),(3,'otro',2,2,2,2,2,'2',2,2,2,2,2,182),(4,'otro',2,2,2,2,2,'2',2,2,2,2,2,183),(5,'nada',1,1,1,1,1,'1',1,1,1,1,1,184),(6,'otro',2,2,2,2,2,'2',2,2,2,2,2,185),(7,'nada',1,1,1,1,1,'1',1,1,1,1,1,185),(8,'nada',1,1,1,1,1,'1',1,1,1,1,1,186);
/*!40000 ALTER TABLE `datosControl` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-27 10:23:05
