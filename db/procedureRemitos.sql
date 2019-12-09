USE ingecoop;

DELIMITER $$
USE `ingecoop`$$

CREATE PROCEDURE `remitosAddOrEdit` (
  IN _id INT(10),
  IN _remito VARCHAR(255),
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
END