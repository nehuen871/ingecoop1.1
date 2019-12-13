USE ingecoop;

DELIMITER $$
USE `ingecoop`$$

CREATE PROCEDURE `certificacionAddOrEdit` (
  IN _id INT(10),
  IN _control_id INT(10),
  IN _control_cotizacion_id INT(10),
  IN _numeroDePedido INT(11),
  IN _proyecto VARCHAR(255),
  IN _especialidad VARCHAR(255),
  IN _fechaDeEmision DATE,
  IN _moneda VARCHAR(45)
)
BEGIN
  IF _id = 0 THEN
    INSERT INTO certificacion (control_id, control_cotizacion_id,numeroDePedido, proyecto, especialidad, fechaDeEmision, moneda)
    VALUES (_control_id,_control_cotizacion_id,_numeroDePedido,_proyecto,_especialidad,_fechaDeEmision,_moneda);

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
    moneda = _moneda
    WHERE id = _id;
  END IF;

  SELECT _id AS 'id';
END