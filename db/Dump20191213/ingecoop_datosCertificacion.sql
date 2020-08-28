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
-- Table structure for table `datosCertificacion`
--

DROP TABLE IF EXISTS `datosCertificacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `datosCertificacion` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `costoHoraDoc` float DEFAULT NULL,
  `cantidadDeHoras` float DEFAULT NULL,
  `cantidadDeDocs` int(11) DEFAULT NULL,
  `porcentajeAvance` int(11) DEFAULT NULL,
  `horasCertificadas` float DEFAULT NULL,
  `total_certificacion` int(11) DEFAULT NULL,
  `certificacion_id` int(10) unsigned NOT NULL,
  `certificacion_control_id` int(10) unsigned NOT NULL,
  `certificacion_control_cotizacion_id` int(10) unsigned NOT NULL,
  `list_docs_id` int(11) NOT NULL,
  PRIMARY KEY (`id`,`certificacion_id`,`certificacion_control_id`,`certificacion_control_cotizacion_id`,`list_docs_id`),
  KEY `fk_datosCertificacion_certificacion1_idx` (`certificacion_id`,`certificacion_control_id`,`certificacion_control_cotizacion_id`),
  KEY `fk_datosCertificacion_list_docs1_idx` (`list_docs_id`),
  CONSTRAINT `fk_datosCertificacion_certificacion1` FOREIGN KEY (`certificacion_id`, `certificacion_control_id`, `certificacion_control_cotizacion_id`) REFERENCES `certificacion` (`id`, `control_id`, `control_cotizacion_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_datosCertificacion_list_docs1` FOREIGN KEY (`list_docs_id`) REFERENCES `list_docs` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `datosCertificacion`
--

LOCK TABLES `datosCertificacion` WRITE;
/*!40000 ALTER TABLE `datosCertificacion` DISABLE KEYS */;
INSERT INTO `datosCertificacion` VALUES (6,1,1,1,1,NULL,1,4,10,8,169),(7,4,4,4,4,NULL,4,4,10,8,169);
/*!40000 ALTER TABLE `datosCertificacion` ENABLE KEYS */;
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
