USE ingecoop;

DELIMITER $$
USE `ingecoop`$$

CREATE PROCEDURE `controlAddOrEdit` (
  IN _id INT(10),
  IN _cotizacion_id INT(10),
  IN _fecha_emision_proyectada DATE,
  IN _revision VARCHAR(45),
  IN _fecha_calificaion DATE,
  IN _numero_documento INT(11),
  IN _numero_control INT(11),
  IN _numero_doc INT(11),
  IN _codigo_doc_cliente VARCHAR(255),
  IN _codigo_unificador VARCHAR(255)
)
BEGIN
  IF _id = 0 THEN
    INSERT INTO control (cotizacion_id, fecha_emision_proyectada, revision, fecha_calificaion, numero_documento, numero_control, numero_doc, codigo_doc_cliente,codigo_unificador)
    VALUES (_cotizacion_id,_fecha_emision_proyectada,_revision,_fecha_calificaion,_numero_documento,_numero_control,_numero_doc, _codigo_doc_cliente_codigo_unificador);

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
      codigo_doc_cliente = _codigo_doc_cliente,
      codigo_unificador = _codigo_unificador
    WHERE id = _id;
  END IF;

  SELECT _id AS 'id';
END