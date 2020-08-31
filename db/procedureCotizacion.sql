USE ingecoop;

DELIMITER $$
USE `ingecoop`$$

CREATE PROCEDURE `cotizacionAddOrEdit` (
  IN _id INT,
  IN _fecha DATE,
  IN _titulo_cotiazacion VARCHAR(255),
  IN _numero_doc VARCHAR(255),
  IN _cliente_id INT(10),
  IN _codigo_unificador VARCHAR(255)
)
BEGIN 
  DECLARE _idCotizacion INT DEFAULT 0;
  IF _id = 0 THEN
    
    INSERT INTO cotizacion (fecha,titulo_cotiazacion,numero_doc,cliente_id,codigo_unificador)
    VALUES (_fecha,_titulo_cotiazacion,_numero_doc,_cliente_id,_codigo_unificador);
    SET _idCotizacion = LAST_INSERT_ID();

    /*INSERT INTO control (cotizacion_id, fecha_emision_proyectada, revision, fecha_calificaion, numero_documento, numero_control, numero_doc, codigo_doc_cliente,codigo_unificador)
    VALUES (_idCotizacion,NULL,NULL,NULL,NULL,NULL,NULL,NULL,_codigo_unificador);*/

    SET _id = LAST_INSERT_ID();
  ELSE
    UPDATE cotizacion
    SET
    fecha = _fecha,
    titulo_cotiazacion = _titulo_cotiazacion,
    numero_doc = _numero_doc,
    cliente_id = _cliente_id,
    codigo_unificador = _codigo_unificador
    WHERE id = _id;
  END IF;

  SELECT _id AS 'id';
END