USE ingecoop;

DELIMITER $$
USE `ingecoop`$$

CREATE PROCEDURE `clienteAddOrEdit` (
  IN _id INT,
  IN _nombre VARCHAR(45),
  IN _cotizacion_id int(11),
  IN _codigoCliente VARCHAR(45)
)
BEGIN
  IF _id = 0 THEN
    INSERT INTO cliente (nombre,cotizacion_id,codigoCliente)
    VALUES (_nombre,_cotizacion_id,_codigoCliente);

    SET _id = LAST_INSERT_ID();
  ELSE
    UPDATE cliente
    SET
    nombre = _nombre,
    cotizacion_id = _cotizacion_id,
    codigoCliente = _codigoCliente
    WHERE id = _id;
  END IF;

  SELECT _id AS 'id';
END