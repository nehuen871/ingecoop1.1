USE ingecoop;

DELIMITER $$
USE `ingecoop`$$

CREATE PROCEDURE `proyectoAddOrEdit` (
  IN _id INT,
  IN _nombre VARCHAR(255),
  IN _numero_proyecto INT(11),
  IN _cotizacion_id INT(11),
  IN _cliente VARCHAR(255),
  IN _fehca_inicio DATE,
  IN _fecha_fin DATE
)
BEGIN 
  IF _id = 0 THEN
    INSERT INTO proyecto (nombre,numero_proyecto,cotizacion_id,cliente,fehca_inicio,fecha_fin)
    VALUES (_nombre, _numero_proyecto,_cotizacion_id, _cliente, _fehca_inicio, _fecha_fin);

    SET _id = LAST_INSERT_ID();
  ELSE
    UPDATE proyecto
    SET
    nombre = _nombre,
    numero_proyecto = _numero_proyecto,
    cotizacion_id = _cotizacion_id,
    cliente = _cliente,
    fehca_inicio = _fehca_inicio,
    fecha_fin = _fecha_fin
    WHERE id = _id;
  END IF;

  SELECT _id AS 'id';
END