USE ingecoop;

DELIMITER $$
USE `ingecoop`$$

CREATE PROCEDURE `cotizacionAddOrEdit` (
  IN _id INT,
  IN _revision INT(11),
  IN _fecha DATE,
  IN _titulo_cotiazacion VARCHAR(255),
)
BEGIN 
  IF _id = 0 THEN
    INSERT INTO cotizacion (revision, fecha,titulo_cotiazacion)
    VALUES (_revision,_fecha,_titulo_cotiazacion);

    SET _id = LAST_INSERT_ID();
  ELSE
    UPDATE cotizacion
    SET
    revision = _revision,
    fecha = _fecha,
    titulo_cotiazacion = _titulo_cotiazacion
    WHERE id = _id;
  END IF;

  SELECT _id AS 'id';
END