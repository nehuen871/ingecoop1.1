USE ingecoop;

DELIMITER $$
USE `ingecoop`$$

CREATE PROCEDURE `datosCertificacionAddOrEdit` (
  IN _id INT(10),
  IN _certificacion_id INT(10),
  IN _certificacion_control_id INT(10),
  IN _certificacion_control_cotizacion_id INT(10),
  IN _costoHoraDoc FLOAT,
  IN _cantidadDeHoras FLOAT,
  IN _cantidadDeDocs INT(11),
  IN _porcentajeAvance INT(11),
  IN _horasCertificadas FLOAT,
  IN _total_certificacion INT(11),
  IN _list_docs_id INT(11)
)
BEGIN
  IF _id = 0 THEN
    INSERT INTO datosCertificacion (certificacion_id,certificacion_control_id, certificacion_control_cotizacion_id, costoHoraDoc, cantidadDeHoras, cantidadDeDocs, porcentajeAvance, horasCertificadas, total_certificacion,list_docs_id)
    VALUES (_certificacion_id,_certificacion_control_id,_certificacion_control_cotizacion_id,_costoHoraDoc,_cantidadDeHoras,_cantidadDeDocs,_porcentajeAvance,_horasCertificadas,_total_certificacion,_list_docs_id);

    SET _id = LAST_INSERT_ID();
  ELSE
    UPDATE datosCertificacion
    SET
    certificacion_id = _certificacion_id,
    certificacion_control_id = _certificacion_control_id,
    certificacion_control_cotizacion_id = _certificacion_control_cotizacion_id,
    costoHoraDoc = _costoHoraDoc,
    cantidadDeHoras = _cantidadDeHoras,
    cantidadDeDocs = _cantidadDeDocs,
    porcentajeAvance = _porcentajeAvance,
    horasCertificadas = _horasCertificadas,
    total_certificacion = _total_certificacion,
    list_docs_id = _list_docs_id
    WHERE id = _id;
  END IF;

  SELECT _id AS 'id';
END