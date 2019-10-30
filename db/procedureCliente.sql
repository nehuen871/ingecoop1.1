USE ingecoop;

DELIMITER $$
USE `ingecoop`$$

CREATE PROCEDURE `clienteAddOrEdit` (
  IN _id INT,
  IN _nombre VARCHAR(45),
  IN _codigoCliente VARCHAR(45)
)
BEGIN
  IF _id = 0 THEN
    INSERT INTO cliente (nombre,codigoCliente)
    VALUES (_nombre,_codigoCliente);

    SET _id = LAST_INSERT_ID();
  ELSE
    UPDATE cliente
    SET
    nombre = _nombre,
    codigoCliente = _codigoCliente
    WHERE id = _id;
  END IF;

  SELECT _id AS 'id';
END