USE ingecoop;

DELIMITER $$
USE `ingecoop`$$

CREATE PROCEDURE `datosRemitosAddOrEdit` (
  IN _id INT(11),
  IN remitos_id INT(11),
  IN remitos_control_id INT(10),
  IN remitos_control_cotizacion_id INT(10),
  IN calificacion VARCHAR(255),
  IN list_docs_id INT(11)
)
BEGIN
  IF _id = 0 THEN
    INSERT INTO datosRemitos (remitos_id,remitos_control_id, remitos_control_cotizacion_id, calificacion, list_docs_id)
    VALUES (_remitos_id,_remitos_control_id, _remitos_control_cotizacion_id, _calificacion, _list_docs_id);

    SET _id = LAST_INSERT_ID();
  ELSE
    UPDATE datosRemitos
    SET
    remitos_id = _remitos_id,
    remitos_control_id = _remitos_control_id,
    remitos_control_cotizacion_id = _remitos_control_cotizacion_id,
    calificacion = _calificacion,
    list_docs_id = _list_docs_id
    WHERE id = _id;
  END IF;
  SELECT _id AS 'id';
END