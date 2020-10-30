USE ingecoop;

DELIMITER $$
USE `ingecoop`$$

CREATE PROCEDURE `datosCotizacionInsert` (
  IN _id INT,
  IN _idCoti INT(11)
)
BEGIN 
  DECLARE _cantidad_de_doc,_unidad_hh INT DEFAULT 0;
  DECLARE _nombreDocumento VARCHAR(255);
  SELECT CONCAT(codigo_unificador,"-",titulo_cotiazacion,"-1") as nombre INTO _nombreDocumento from cotizacion where id = _idCoti;
  SELECT cantidad_de_doc,unidad_hh INTO _cantidad_de_doc,_unidad_hh FROM list_docs WHERE id = _id;
  INSERT INTO datosCotizacion (numeroRecotizacion,numero_documento, cotizacion_id, revicion, cantidad_doc, HHUnidades,list_docs_id)
    VALUES (1,_nombreDocumento,_idCoti,"A",_cantidad_de_doc,_unidad_hh,_id);
  SELECT _id AS 'id';
END