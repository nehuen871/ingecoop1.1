USE ingecoop;

DELIMITER $$
USE `ingecoop`$$

CREATE PROCEDURE `datosCertificacionAddOrEdit` (
  IN _id INT(10),
  IN _certificacion_id INT(10),
  IN _certificacion_control_id INT(10),
  IN _certificacion_control_cotizacion_id INT(10),
  IN _costoHoraDoc FLOAT,
  IN _cantdeHs FLOAT,
  IN _cantdeDocs INT(11),
  IN _porcentajeAvance INT(11),
  IN _horasCertificadas FLOAT,
  IN _total_certificacion INT(11),
  IN _list_docs_id INT(11)
)
BEGIN
  IF _id = 0 THEN
    INSERT INTO datosCertificacion (certificacion_id,certificacion_control_id, certificacion_control_cotizacion_id, costoHoraDoc, cantdeHs, cantdeDocs, porcentajeAvance, horasCertificadas, total_certificacion,list_docs_id)
    VALUES (_certificacion_id,_certificacion_control_id,_certificacion_control_cotizacion_id,_costoHoraDoc,_cantdeHs,_cantdeDocs,_porcentajeAvance,_horasCertificadas,_total_certificacion,_list_docs_id);

    SET _id = LAST_INSERT_ID();
  ELSE
    UPDATE datosCertificacion
    SET
    certificacion_id = _certificacion_id,
    control_id = _certificacion_control_id,
    control_cotizacion_id = _certificacion_control_cotizacion_id,
    costoHoraDoc = _costoHoraDoc,
    cantdeHs = _cantdeHs,
    cantdeDocs = _cantdeDocs,
    porcentajeAvance = _porcentajeAvance,
    horasCertificadas = _horasCertificadas,
    total_certificacion = _total_certificacion,
    list_docs_id = _list_docs_id
    WHERE id = _id;
  END IF;

  SELECT _id AS 'id';
END