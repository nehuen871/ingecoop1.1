USE ingecoop;

DELIMITER $$
USE `ingecoop`$$

CREATE PROCEDURE `proyectoAddOrEdit` (
  IN _id INT,
  IN _nombre VARCHAR(255),
  IN _numero_proyecto INT(11),
  IN _cliente VARCHAR(255),
  IN _fehca_inicio DATE,
  IN _fecha_fin DATE,
  IN _cotizacion_id INT(10)
)
BEGIN
  IF _id = 0 THEN
    INSERT INTO proyecto (nombre,numero_proyecto,cliente,fehca_inicio,fecha_fin,cotizacion_id)
    VALUES (_nombre, _numero_proyecto, _cliente, _fehca_inicio, _fecha_fin,_cotizacion_id);

    SET _id = LAST_INSERT_ID();
  ELSE
    UPDATE proyecto
    SET
    nombre = _nombre,
    numero_proyecto = _numero_proyecto,
    cliente = _cliente,
    fehca_inicio = _fehca_inicio,
    fecha_fin = _fecha_fin,
    cotizacion_id = _cotizacion_id
    WHERE id = _id;
  END IF;

  SELECT _id AS 'id';
END