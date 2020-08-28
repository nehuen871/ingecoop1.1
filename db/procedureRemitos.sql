USE ingecoop;

DELIMITER $$
USE `ingecoop`$$

CREATE PROCEDURE `remitosAddOrEdit` (
  IN _id INT(11),
  IN _remito VARCHAR(255),
  IN _fecha_envio DATE,
  IN _control_id INT(10),
  IN _control_cotizacion_id INT(10),
  IN _codigo_unificador VARCHAR(255)
)
BEGIN
  IF _id = 0 THEN
    INSERT INTO remitos (remito, fecha_envio, control_id, control_cotizacion_id,codigo_unificador)
    VALUES (_remito,_fecha_envio,_control_id,_control_cotizacion_id,_codigo_unificador);

    SET _id = LAST_INSERT_ID();
  ELSE
    UPDATE remitos
    SET
    remito = _remito,
    fecha_envio = _fecha_envio,
    control_id = _control_id,
    control_cotizacion_id = _control_cotizacion_id,
    codigo_unificador = _codigo_unificador
    WHERE id = _id;
  END IF;
  SELECT _id AS 'id';
END