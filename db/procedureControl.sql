USE ingecoop;

DELIMITER $$
USE `ingecoop`$$

CREATE PROCEDURE `controlAddOrEdit` (
  IN _id INT(10),
  IN _cotizacion_id INT(10),
  IN _cotizacion_proyecto_id INT(10),
  IN _fecha_emision_proyectada DATE,
  IN _revision VARCHAR(45),
  IN _fecha_envio_1 DATE,
  IN _remito_1 VARCHAR(255),
  IN _calificaion_1 VARCHAR(45),
  IN _fecha_calificaion DATE,
  IN _numero_documento INT(11),
  IN _numero_control INT(11),
  IN _numero_doc INT(11),
  IN _remito_2 VARCHAR(255),
  IN _remito_3 VARCHAR(255),
  IN _remito_4 VARCHAR(255),
  IN _remito_5 VARCHAR(255),
  IN _remito_6 VARCHAR(255),
  IN _remito_7 VARCHAR(255),
  IN _remito_8 VARCHAR(255),
  IN _remito_9 VARCHAR(255),
  IN _remito_10 VARCHAR(255),
  IN _fecha_envio_2 DATE,
  IN _fecha_envio_3 DATE,
  IN _fecha_envio_4 DATE,
  IN _fecha_envio_5 DATE,
  IN _fecha_envio_6 DATE,
  IN _fecha_envio_7 DATE,
  IN _fecha_envio_8 DATE,
  IN _fecha_envio_9 DATE,
  IN _fecha_envio_10 DATE,
  IN _calificaion_2 VARCHAR(45),
  IN _calificaion_3 VARCHAR(45),
  IN _calificaion_4 VARCHAR(45),
  IN _calificaion_5 VARCHAR(45),
  IN _calificaion_6 VARCHAR(45),
  IN _calificaion_7 VARCHAR(45),
  IN _calificaion_8 VARCHAR(45),
  IN _calificaion_9 VARCHAR(45),
  IN _calificaion_10 VARCHAR(45)
)
BEGIN
  IF _id = 0 THEN
    INSERT INTO control (cotizacion_id, cotizacion_proyecto_id, fecha_emision_proyectada, revision, fecha_envio_1, remito_1, calificaion_1, fecha_calificaion, numero_documento, numero_control, numero_doc, remito_2, remito_3, remito_4, remito_5, remito_6, remito_7, remito_8, remito_9, remito_10, fecha_envio_2, fecha_envio_3, fecha_envio_4, fecha_envio_5, fecha_envio_6, fecha_envio_7, fecha_envio_8, fecha_envio_9, fecha_envio_10, calificaion_2, calificaion_3, calificaion_4, calificaion_5, calificaion_6, calificaion_7, calificaion_8, calificaion_9, calificaion_10)
    VALUES (_cotizacion_id,_cotizacion_proyecto_id,_fecha_emision_proyectada,_revision,_fecha_envio_1,_remito_1,_calificaion_1,_fecha_calificaion,_numero_documento,_numero_control,_numero_doc,_remito_2, _remito_3,_remito_4,_remito_5,_remito_6,_remito_7,_remito_8,_remito_9,_remito_10,_fecha_envio_2,_fecha_envio_3,_fecha_envio_4,_fecha_envio_5,_fecha_envio_6,_fecha_envio_7,_fecha_envio_8,_fecha_envio_9,_fecha_envio_10,_calificaion_2,_calificaion_3,_calificaion_4,_calificaion_5,_calificaion_6,_calificaion_7,_calificaion_8,_calificaion_9,_calificaion_10);

    SET _id = LAST_INSERT_ID();
  ELSE
    UPDATE Cerficacion
    SET
      cotizacion_id = _cotizacion_id,
      cotizacion_proyecto_id = _cotizacion_proyecto_id,
      fecha_emision_proyectada = _fecha_emision_proyectada,
      revision = _revision,
      fecha_envio_1 = _fecha_envio_1,
      remito_1 = _remito_1,
      calificaion_1 = _calificaion_1,
      fecha_calificaion = _fecha_calificaion,
      numero_documento = _numero_documento,
      numero_control = _numero_control,
      numero_doc = _numero_doc,
      remito_2 = _remito_2,
      remito_3 = _remito_3,
      remito_4 = _remito_4,
      remito_5 = _remito_5,
      remito_6 = _remito_6,
      remito_7 = _remito_7,
      remito_8 = _remito_8,
      remito_9 = _remito_9,
      remito_10 = _remito_10,
      fecha_envio_2 = _fecha_envio_2,
      fecha_envio_3 = _fecha_envio_3,
      fecha_envio_4 = _fecha_envio_4,
      fecha_envio_5 = _fecha_envio_5,
      fecha_envio_6 = _fecha_envio_6,
      fecha_envio_7 = _fecha_envio_7,
      fecha_envio_8 = _fecha_envio_8,
      fecha_envio_9 = _fecha_envio_9,
      fecha_envio_10 = _fecha_envio_10,
      calificaion_2 = _calificaion_2,
      calificaion_3 = _calificaion_3,
      calificaion_4 = _calificaion_4,
      calificaion_5 = _calificaion_5,
      calificaion_6 = _calificaion_6,
      calificaion_7 = _calificaion_7,
      calificaion_8 = _calificaion_8,
      calificaion_9 = _calificaion_9,
      calificaion_1 = _calificaion_10
    WHERE id = _id;
  END IF;

  SELECT _id AS 'id';
END