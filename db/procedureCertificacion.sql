USE ingecoop;

DELIMITER $$
USE `ingecoop`$$

CREATE PROCEDURE `certificacionAddOrEdit` (
  IN _id INT(10),
  IN _control_id INT(10),
  IN _control_cotizacion_id INT(10),
  IN _numeroDePedido VARCHAR(255),
  IN _proyecto VARCHAR(255),
  IN _especialidad VARCHAR(255),
  IN _fechaDeEmision DATE,
  IN _moneda VARCHAR(45),
  IN _codigo_unificador VARCHAR(255)
)
BEGIN
  IF _id = 0 THEN
    INSERT INTO certificacion (control_id, control_cotizacion_id,numeroDePedido, proyecto, especialidad, fechaDeEmision, moneda,codigo_unificador)
    VALUES (_control_id,_control_cotizacion_id,_numeroDePedido,_proyecto,_especialidad,_fechaDeEmision,_moneda,_codigo_unificador);

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
    codigo_unificador = _codigo_unificador
    WHERE id = _id;
  END IF;

  SELECT _id AS 'id';
END