USE ingecoop;

DELIMITER $$
USE `ingecoop`$$

CREATE PROCEDURE `cotizacionAddOrEdit` (
  IN _id INT,
  IN _cantidadCotiazaciones INT(11),
  IN _cliente_id INT(10),
  IN _fecha DATE,
  IN _proyecto_id INT(10),
  IN _fin_cotizacion DATE
)
BEGIN 
  IF _id = 0 THEN
    INSERT INTO cotizacion (cantidadCotiazaciones, cliente_id, fecha, proyecto_id, fin_cotizacion)
    VALUES (_cantidadCotiazaciones,_cliente_id,_fecha,_proyecto_id,_fin_cotizacion);

    SET _id = LAST_INSERT_ID();
  ELSE
    UPDATE cotizacion
    SET
    cantidadCotiazaciones = _cantidadCotiazaciones,
    cliente_id = _cliente_id,
    fecha = _fecha,
    proyecto_id = _proyecto_id,
    fin_cotizacion = _fin_cotizacion
    WHERE id = _id;
  END IF;

  SELECT _id AS 'id';
END