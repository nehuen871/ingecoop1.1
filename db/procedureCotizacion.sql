USE ingecoop;

DELIMITER $$
USE `ingecoop`$$

CREATE PROCEDURE `cotizacionAddOrEdit` (
  IN _id INT,
  IN _cantidadCotiazaciones INT(11),
  IN _fecha DATE,
  IN _fin_cotizacion DATE
)
BEGIN 
  IF _id = 0 THEN
    INSERT INTO cotizacion (cantidadCotiazaciones, fecha, fin_cotizacion)
    VALUES (_cantidadCotiazaciones,_fecha, fin_cotizacion);

    SET _id = LAST_INSERT_ID();
  ELSE
    UPDATE cotizacion
    SET
    cantidadCotiazaciones = _cantidadCotiazaciones,
    fecha = _fecha,
    fin_cotizacion = _fin_cotizacion
    WHERE id = _id;
  END IF;

  SELECT _id AS 'id';
END