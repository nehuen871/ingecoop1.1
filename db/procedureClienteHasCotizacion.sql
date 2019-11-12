USE ingecoop;

DELIMITER $$
USE `ingecoop`$$

CREATE PROCEDURE `clienteHasCotizacionAddOrEdit` (
  IN _cliente_id INT(10),
  IN _cotizacion_id INT(10),
)
BEGIN
  IF _id = 0 THEN
    INSERT INTO cliente_has_cotizacion (cliente_id, cotizacion_id)
    VALUES (_cliente_id,_cotizacion_id);

    SET _id = LAST_INSERT_ID();
  ELSE
    UPDATE cliente_has_cotizacion
    SET
    cliente_id = _cliente_id,
    cotizacion_id = _cotizacion_id
    WHERE id = _id;
  END IF;

  SELECT _id AS 'id';
END