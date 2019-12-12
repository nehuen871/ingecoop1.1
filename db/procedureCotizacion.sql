USE ingecoop;

DELIMITER $$
USE `ingecoop`$$

CREATE PROCEDURE `cotizacionAddOrEdit` (
  IN _id INT,
  IN _revision INT(11),
  IN _fecha DATE,
  IN _titulo_cotiazacion VARCHAR(255)
)
BEGIN 
  DECLARE _idCotizacion INT DEFAULT 0;
  IF _id = 0 THEN
    
    INSERT INTO cotizacion (revision, fecha,titulo_cotiazacion)
    VALUES (_revision,_fecha,_titulo_cotiazacion);
    SET _idCotizacion = LAST_INSERT_ID();

    INSERT INTO control (cotizacion_id, fecha_emision_proyectada, revision, fecha_calificaion, numero_documento, numero_control, numero_doc, codigo_doc_cliente)
    VALUES (_idCotizacion,NULL,NULL,NULL,NULL,NULL,NULL,NULL);

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