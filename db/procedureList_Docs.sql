USE ingecoop;

DELIMITER $$
USE `multeo`$$

CREATE PROCEDURE `list_docsAddOrEdit` (
  IN _id INT,
  in _nombre VARCHAR(255),
  IN _cantidad_de_doc INT(11),
  IN _total_hh FLOAT,
  IN _especialidad VARCHAR(255),
  IN _lista_de_cable VARCHAR(255)
)
BEGIN 
  IF _id = 0 THEN
    INSERT INTO list_docs (nombre,cantidad_de_doc, total_hh, especialidad, lista_de_cable)
    VALUES (_nombre,_cantidad_de_doc, _total_hh, _especialidad, _lista_de_cable);

    SET _id = LAST_INSERT_ID();
  ELSE
    UPDATE list_docs
    SET
    nombre = _nombre,
    cantidad_de_doc = _cantidad_de_doc,
    total_hh = _total_hh,
    especialidad = _especialidad,
    lista_de_cable = _lista_de_cable
    WHERE id = _id;
  END IF;

  SELECT _id AS 'id';
END