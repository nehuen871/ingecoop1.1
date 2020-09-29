USE ingecoop;

DELIMITER $$
USE `ingecoop`$$

CREATE PROCEDURE `list_docsAddOrEdit` (
  IN _id INT,
  in _nombre VARCHAR(255),
  IN _cantidad_de_doc INT(11),
  IN _unidad_hh FLOAT,
  IN _especialidad VARCHAR(255),
  IN _tipodocumento VARCHAR(255),
  IN _titulo_documento VARCHAR(255)
)
BEGIN 
  IF _id = 0 THEN
    INSERT INTO list_docs (nombre,cantidad_de_doc, unidad_hh, especialidad, tipodocumento, titulo_documento)
    VALUES (_nombre,_cantidad_de_doc, _unidad_hh, _especialidad, _tipodocumento, _titulo_documento);

    SET _id = LAST_INSERT_ID();
  ELSE
    UPDATE list_docs
    SET
    nombre = _nombre,
    cantidad_de_doc = _cantidad_de_doc,
    unidad_hh = _unidad_hh,
    especialidad = _especialidad,
    tipodocumento = _tipodocumento,
    titulo_documento = _titulo_documento
    WHERE id = _id;
  END IF;

  SELECT _id AS 'id';
END