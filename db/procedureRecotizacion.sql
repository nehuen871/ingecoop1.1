USE ingecoop;

DELIMITER $$
USE `ingecoop`$$

CREATE PROCEDURE `recotizacion` (
  IN _id INT(10)
)

BEGIN
    DECLARE _count INT DEFAULT 0;
    DECLARE _codigo_unificador INT DEFAULT 0;
    DECLARE _countTotal INT DEFAULT 0;
    DECLARE _idCotizacion INT DEFAULT 0;
    DECLARE _titulo_cotiazacionNew VARCHAR(255);
    DECLARE _a INT DEFAULT 0;
    DECLARE _numero_doc VARCHAR(255);
    DECLARE _cliente_id INT DEFAULT 0;
    DECLARE _numeroRecotizacion INT DEFAULT 0;
    DECLARE _descripcion_docNew VARCHAR(255);
    DECLARE _revicion INT DEFAULT 0;
    DECLARE _cantidad_doc INT DEFAULT 0;
    DECLARE _HHUnidades INT DEFAULT 0;
    DECLARE _total INT DEFAULT 0;
    DECLARE _observacion VARCHAR(255);
    DECLARE _HH_asociado BOOLEAN DEFAULT 0;
    DECLARE _proveerdor BOOLEAN DEFAULT 0;
    DECLARE _viatico BOOLEAN DEFAULT 0;
    DECLARE _numero_documento INT DEFAULT 0;
    DECLARE _list_docs_id INT DEFAULT 0;
    DECLARE _fecha DATE DEFAULT NULL;
    
    SELECT fecha,titulo_cotiazacion,numero_doc,cliente_id,codigo_unificador INTO _fecha,_titulo_cotiazacionNew,_numero_doc,_cliente_id,_codigo_unificador FROM cotizacion WHERE id = _id;
    SELECT COUNT(*) as total INTO _countTotal FROM datosCotizacion WHERE datosCotizacion.cotizacion_id = _id;

    INSERT INTO cotizacion (fecha,titulo_cotiazacion,numero_doc,cliente_id,codigo_unificador)
    VALUES (_fecha,_titulo_cotiazacionNew,_numero_doc,_cliente_id,_codigo_unificador);
    SET _idCotizacion = LAST_INSERT_ID();

    simple_loop: LOOP
    SET _a=_a+1;
    SELECT (numeroRecotizacion + 1) as newSum INTO _numeroRecotizacion FROM datosCotizacion WHERE cotizacion_id = _id LIMIT _count,1;
    SELECT descripcion_doc,revicion,cantidad_doc,HHUnidades,total,observacion,HH_asociado,proveerdor,viatico,numero_documento,list_docs_id INTO _descripcion_docNew,_revicion,_cantidad_doc,_HHUnidades,_total,_observacion,_HH_asociado,_proveerdor,_viatico,_numero_documento,_list_docs_id FROM datosCotizacion WHERE cotizacion_id = _id LIMIT _count,1;
    SET _count = _count + 1;
    INSERT INTO datosCotizacion (numeroRecotizacion, cotizacion_id, descripcion_doc, revicion, cantidad_doc, HHUnidades, total,observacion, HH_asociado, proveerdor, viatico, numero_documento,list_docs_id)
    VALUES (_numeroRecotizacion,_idCotizacion,_descripcion_docNew,_revicion,_cantidad_doc,_HHUnidades,_total,_observacion,_HH_asociado,_proveerdor,_viatico,_numero_documento,_list_docs_id);
    IF _a = _countTotal THEN
        LEAVE simple_loop;
    END IF;
    END LOOP;

  SELECT _id AS 'id';
END