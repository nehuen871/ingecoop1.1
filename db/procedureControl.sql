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
  IF _fecha_emision_proyectada = "" THEN SET _fecha_emision_proyectada = 1; END IF;
  IF _revision = "" THEN SET _revision = 1; END IF;
  IF _fecha_envio_1 = "" THEN SET _fecha_envio_1 = 1; END IF;
  IF _remito_1 = "" THEN SET _remito_1 = 1; END IF;
  IF _calificaion_1 = "" THEN SET _calificaion_1 = 1; END IF;
  IF _fecha_calificaion = "" THEN SET _fecha_calificaion = 1; END IF;
  IF _numero_documento = "" THEN SET _numero_documento = 1; END IF;
  IF _numero_control = "" THEN SET _numero_control = 1; END IF;
  IF _numero_doc = "" THEN SET _numero_doc = 1; END IF;
  IF _remito_2 = "" THEN SET _remito_2 = 1; END IF;
  IF _remito_3 = "" THEN SET _remito_3 = 1; END IF;
  IF _remito_4 = "" THEN SET _remito_4 = 1; END IF;
  IF _remito_5 = "" THEN SET _remito_5 = 1; END IF;
  IF _remito_6 = "" THEN SET _remito_6 = 1; END IF;
  IF _remito_7 = "" THEN SET _remito_7 = 1; END IF;
  IF _remito_8 = "" THEN SET _remito_8 = 1; END IF;
  IF _remito_9 = "" THEN SET _remito_9 = 1; END IF;
  IF _remito_10 = "" THEN SET _remito_10 = 1; END IF;
  IF _fecha_envio_2 = "" THEN SET _fecha_envio_2 = 1; END IF;
  IF _fecha_envio_3 = "" THEN SET _fecha_envio_3 = 1; END IF;
  IF _fecha_envio_4 = "" THEN SET _fecha_envio_4 = 1; END IF;
  IF _fecha_envio_5 = "" THEN SET _fecha_envio_5 = 1; END IF;
  IF _fecha_envio_6 = "" THEN SET _fecha_envio_6 = 1; END IF;
  IF _fecha_envio_7 = "" THEN SET _fecha_envio_7 = 1; END IF;
  IF _fecha_envio_8 = "" THEN SET _fecha_envio_8 = 1; END IF;
  IF _fecha_envio_9 = "" THEN SET _fecha_envio_9 = 1; END IF;
  IF _fecha_envio_10 = "" THEN SET _fecha_envio_10 = 1; END IF;
  IF _calificaion_2 = "" THEN SET _calificaion_2 = 1; END IF;
  IF _calificaion_3 = "" THEN SET _calificaion_3 = 1; END IF;
  IF _calificaion_4 = "" THEN SET _calificaion_4 = 1; END IF;
  IF _calificaion_5 = "" THEN SET _calificaion_5 = 1; END IF;
  IF _calificaion_6 = "" THEN SET _calificaion_6 = 1; END IF;
  IF _calificaion_7 = "" THEN SET _calificaion_7 = 1; END IF;
  IF _calificaion_8 = "" THEN SET _calificaion_8 = 1; END IF;
  IF _calificaion_9 = "" THEN SET _calificaion_9 = 1; END IF;
  IF _calificaion_10 = "" THEN SET _calificaion_10 = 1; END IF;
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