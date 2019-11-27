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
-- Dumping routines for database 'ingecoop'
--
/*!50003 DROP PROCEDURE IF EXISTS `certificacionAddOrEdit` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `certificacionAddOrEdit`(
  IN _id INT(10),
  IN _control_id INT(10),
  IN _control_cotizacion_id INT(10),
  IN _numeroDePedido INT(11),
  IN _proyecto VARCHAR(255),
  IN _especialidad VARCHAR(255),
  IN _fechaDeEmision DATE,
  IN _moneda VARCHAR(45),
  IN _costoHoraDoc FLOAT,
  IN _cantdeHs FLOAT,
  IN _cantdeDocs INT(11),
  IN _porcentajeAvance INT(11),
  IN _horasCertificadas FLOAT,
  IN _total_certificacion INT(11)
)
BEGIN
  IF _id = 0 THEN
    INSERT INTO certificacion (control_id, control_cotizacion_id,numeroDePedido, proyecto, especialidad, fechaDeEmision, moneda, costoHoraDoc, cantdeHs, cantdeDocs, porcentajeAvance, horasCertificadas, total_certificacion)
    VALUES (_control_id,_control_cotizacion_id,_numeroDePedido,_proyecto,_especialidad,_fechaDeEmision,_moneda,_costoHoraDoc,_cantdeHs,_cantdeDocs,_porcentajeAvance,_horasCertificadas,_total_certificacion);

    SET _id = LAST_INSERT_ID();
  ELSE
    UPDATE certificacion
    SET
    control_id = _control_id,
    control_cotizacion_id = _control_cotizacion_id,
    numeroDePedido = _numeroDePedido,
    proyecto = _proyecto,
    especialidad = _especialidad,
    fechaDeEmision = _fechaDeEmision,
    moneda = _moneda,
    costoHoraDoc = _costoHoraDoc,
    cantdeHs = _cantdeHs,
    cantdeDocs = _cantdeDocs,
    porcentajeAvance = _porcentajeAvance,
    horasCertificadas = _horasCertificadas,
    total_certificacio = _total_certificacion
    WHERE id = _id;
  END IF;

  SELECT _id AS 'id';
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `clienteAddOrEdit` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `clienteAddOrEdit`(
  IN _id INT,
  IN _nombre VARCHAR(45),
  IN _cotizacion_id int(11),
  IN _codigoCliente VARCHAR(45)
)
BEGIN
  IF _id = 0 THEN
    INSERT INTO cliente (nombre,cotizacion_id,codigoCliente)
    VALUES (_nombre,_cotizacion_id,_codigoCliente);

    SET _id = LAST_INSERT_ID();
  ELSE
    UPDATE cliente
    SET
    nombre = _nombre,
    cotizacion_id = _cotizacion_id,
    codigoCliente = _codigoCliente
    WHERE id = _id;
  END IF;

  SELECT _id AS 'id';
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `controlAddOrEdit` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `controlAddOrEdit`(
  IN _id INT(10),
  IN _cotizacion_id INT(10),
  IN _fecha_emision_proyectada DATE,
  IN _revision VARCHAR(45),
  IN _fecha_calificaion DATE,
  IN _numero_documento INT(11),
  IN _numero_control INT(11),
  IN _numero_doc INT(11),
  IN _codigo_doc_cliente VARCHAR(255)
)
BEGIN
  IF _id = 0 THEN
    INSERT INTO control (cotizacion_id, fecha_emision_proyectada, revision, fecha_calificaion, numero_documento, numero_control, numero_doc, codigo_doc_cliente)
    VALUES (_cotizacion_id,_fecha_emision_proyectada,_revision,_fecha_calificaion,_numero_documento,_numero_control,_numero_doc, _codigo_doc_cliente);

    SET _id = LAST_INSERT_ID();
  ELSE
    UPDATE control
    SET
      cotizacion_id = _cotizacion_id,
      fecha_emision_proyectada = _fecha_emision_proyectada,
      revision = _revision,
      fecha_calificaion = _fecha_calificaion,
      numero_documento = _numero_documento,
      numero_control = _numero_control,
      numero_doc = _numero_doc,
      codigo_doc_cliente = _codigo_doc_cliente
    WHERE id = _id;
  END IF;

  SELECT _id AS 'id';
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `cotizacionAddOrEdit` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `cotizacionAddOrEdit`(
  IN _id INT,
  IN _revision INT(11),
  IN _fecha DATE,
  IN _titulo_cotiazacion VARCHAR(255)
)
BEGIN 
  IF _id = 0 THEN
    INSERT INTO cotizacion (revision, fecha,titulo_cotiazacion)
    VALUES (_revision,_fecha,_titulo_cotiazacion);

    SET _id = LAST_INSERT_ID();
  ELSE
    UPDATE cotizacion
    SET
    revision = _revision,
    fecha = _fecha,
    titulo_cotiazacion = _titulo_cotiazacion
    WHERE id = _id;
  END IF;

  SELECT _id AS 'id';
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `datoControlAddOrEdit` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `datoControlAddOrEdit`(
  IN _id INT,
  IN _descripcion_doc VARCHAR(255),
  IN _revicion_inicial INT(11),
  IN _cantidad_doc INT(11),
  IN _HHUnidades INT(11),
  IN _total INT(11),
  IN _revision_unica INT(11),
  IN _observacion VARCHAR(255),
  IN _modificar_lista TINYINT(1),
  IN _proveedor TINYINT(1),
  IN _viatico TINYINT(1),
  IN _control_id INT(10),
  IN _control_cotizacion_id INT(10),
  IN _list_docs_id INT(11)
)
BEGIN 
  IF _id = 0 THEN
    INSERT INTO datosControl (descripcion_doc, revicion_inicial, cantidad_doc, HHUnidades, total, revision_unica, observacion, modificar_lista, proveedor, viatico, control_id, control_cotizacion_id, list_docs_id)
    VALUES (_descripcion_doc,_revicion_inicial,_cantidad_doc,_HHUnidades,_total,_revision_unica,_observacion,_modificar_lista,_proveedor,_viatico,_control_id,_control_cotizacion_id,_list_docs_id);

    SET _id = LAST_INSERT_ID();
  ELSE
    UPDATE datosControl
    SET
    descripcion_doc = _descripcion_doc,
    revicion_inicial = _revicion_inicial,
    cantidad_doc = _cantidad_doc,
    HHUnidades = _HHUnidades,
    total = _total,
    revision_unica = _revision_unica,
    observacion = _observacion,
    modificar_lista = _modificar_lista,
    proveedor = _proveedor,
    viatico = _viatico,
    control_id = _control_id,
    control_cotizacion_id = _control_cotizacion_id,
    list_docs_id = _list_docs_id
  WHERE id = _id;
  END IF;

  SELECT _id AS 'id';
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `datosCotizacionAddOrEdit` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `datosCotizacionAddOrEdit`(
  IN _id INT,
  IN _numeroRecotizacion INT(11),
  IN _cotizacion_id INT(10),
  IN _descripcion_doc VARCHAR(255),
  IN _revicion_inicial INT(11),
  IN _cantidad_doc INT(11),
  IN _HHUnidades INT(11),
  IN _total INT(11),
  IN _revision_unica VARCHAR(255),
  IN _observacion VARCHAR(255),
  IN _modificar_lista TINYINT(1),
  IN _proveerdor TINYINT(1),
  IN _viatico TINYINT(1),
  IN _list_docs_id INT(11)
)
BEGIN 
  IF _id = 0 THEN
    INSERT INTO datosCotizacion (numeroRecotizacion, cotizacion_id, descripcion_doc, revicion_inicial, cantidad_doc, HHUnidades, total, revision_unica, observacion, modificar_lista, proveerdor, viatico, list_docs_id)
    VALUES (_numeroRecotizacion, _cotizacion_id, _descripcion_doc, _revicion_inicial, _cantidad_doc,_HHUnidades,_total,_revision_unica,_observacion,_modificar_lista,_proveerdor,_viatico,_list_docs_id);

    SET _id = LAST_INSERT_ID();
  ELSE
    UPDATE datosCotizacion
    SET
    numeroRecotizacion = _numeroRecotizacion,
    cotizacion_id = _cotizacion_id,
    descripcion_doc = _descripcion_doc,
    revicion_inicial = _revicion_inicial,
    cantidad_doc = _cantidad_doc,
    HHUnidades = _HHUnidades,
    total = _total,
    revision_unica = _revision_unica,
    observacion = _observacion,
    modificar_lista = _modificar_lista,
    proveerdor = _proveerdor,
    viatico = _viatico,
    list_docs_id = _list_docs_id
    WHERE id = _id;
  END IF;

  SELECT _id AS 'id';
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `list_docsAddOrEdit` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `list_docsAddOrEdit`(
  IN _id INT,
  in _nombre VARCHAR(255),
  IN _cantidad_de_doc INT(11),
  IN _total_hh FLOAT,
  IN _especialidad VARCHAR(255),
  IN _lista_de_cable VARCHAR(255)
)
BEGIN 
  IF _id = 0 THEN
    INSERT INTO list_docs (nombre,cantidad_de_doc, total_hh, especialidad, lista_de_cable)
    VALUES (_nombre,_cantidad_de_doc, _total_hh, _especialidad, _lista_de_cable);

    SET _id = LAST_INSERT_ID();
  ELSE
    UPDATE list_docs
    SET
    nombre = _nombre,
    cantidad_de_doc = _cantidad_de_doc,
    total_hh = _total_hh,
    especialidad = _especialidad,
    lista_de_cable = _lista_de_cable
    WHERE id = _id;
  END IF;

  SELECT _id AS 'id';
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `proyectoAddOrEdit` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `proyectoAddOrEdit`(
  IN _id INT,
  IN _nombre VARCHAR(255),
  IN _numero_proyecto INT(11),
  IN _cliente VARCHAR(255),
  IN _fehca_inicio DATE,
  IN _fecha_fin DATE,
  IN _cotizacion_id INT(10)
)
BEGIN
  DECLARE _idCotizacion,_idControl,_idCerti INT DEFAULT 0;
  IF _id = 0 THEN
    INSERT INTO cotizacion (revision, fecha,titulo_cotiazacion)
    VALUES (0,NULL,'Nuevo proyecto');
    SET _idCotizacion = LAST_INSERT_ID();

    INSERT INTO proyecto (nombre,numero_proyecto,cliente,fehca_inicio,fecha_fin,cotizacion_id)
    VALUES (_nombre, _numero_proyecto, _cliente, _fehca_inicio, _fecha_fin,_idCotizacion);
    SET _id = LAST_INSERT_ID();
    
    INSERT INTO control (cotizacion_id, fecha_emision_proyectada, revision, fecha_calificaion, numero_documento, numero_control, numero_doc, codigo_doc_cliente)
    VALUES (_idCotizacion,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
    SET _idControl = LAST_INSERT_ID();

    INSERT INTO certificacion (control_id, control_cotizacion_id,numeroDePedido, proyecto, especialidad, fechaDeEmision, moneda, costoHoraDoc, cantdeHs, cantdeDocs, porcentajeAvance, horasCertificadas, total_certificacion)
    VALUES (_idControl,_idCotizacion,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
    SET _idCerti = LAST_INSERT_ID();
    
  ELSE
    UPDATE proyecto
    SET
    nombre = _nombre,
    numero_proyecto = _numero_proyecto,
    cliente = _cliente,
    fehca_inicio = _fehca_inicio,
    fecha_fin = _fecha_fin,
    cotizacion_id = _cotizacion_id
    WHERE id = _id;
  END IF;

  SELECT _id AS 'id';
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `remitosAddOrEdit` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `remitosAddOrEdit`(
  IN _id INT(10),
  IN _remito INT(10),
  IN _fecha_envio DATE,
  IN _calificacion VARCHAR(45),
  IN _control_id INT(10),
  IN _control_cotizacion_id INT(10)
)
BEGIN
  IF _id = 0 THEN
    INSERT INTO remitos (remito, fecha_envio,calificacion, control_id, control_cotizacion_id)
    VALUES (_remito,_fecha_envio,_calificacion,_control_id,_control_cotizacion_id);

    SET _id = LAST_INSERT_ID();
  ELSE
    UPDATE remitos
    SET
    remito = _remito,
    fecha_envio = _fecha_envio,
    calificacion = _calificacion,
    control_id = _control_id,
    control_cotizacion_id = _control_cotizacion_id
    WHERE id = _id;
  END IF;

  SELECT _id AS 'id';
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-27 10:23:05
