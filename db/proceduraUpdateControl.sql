USE ingecoop;

DELIMITER $$
USE `ingecoop`$$

CREATE PROCEDURE `updateControl` (
  IN _id INT(10)
)

BEGIN
    DECLARE _count INT DEFAULT 0;
    DECLARE _codigo_unificador INT DEFAULT 0;
    DECLARE _countTotal INT DEFAULT 0;
    DECLARE _idControl INT DEFAULT 0;
    DECLARE _idCerti INT DEFAULT 0;
    DECLARE _list_docs_id INT DEFAULT 0;
    DECLARE _a INT DEFAULT 0;
    DECLARE _descripcion_doc VARCHAR(255);
    DECLARE _revicion VARCHAR(255);
    DECLARE _cantidad_doc INT;
    DECLARE _HHUnidades INT;
    DECLARE _total INT;
    DECLARE _observacion VARCHAR(255);
    DECLARE _HH_asociado INT;
    DECLARE _proveerdor INT;
    DECLARE _viatico INT;
    DECLARE _numero_documento VARCHAR(255);
    DECLARE _cantDoc,_hhUni,_totalMulti INT DEFAULT 0;

    SELECT codigo_unificador INTO _codigo_unificador FROM cotizacion WHERE id = _id;
    SELECT COUNT(*) as total INTO _countTotal FROM datosCotizacion WHERE datosCotizacion.cotizacion_id = _id;

    INSERT INTO control (cotizacion_id, fecha_emision_proyectada, revision, fecha_calificaion,codigo_unificador)
    VALUES (_id,NOW(),NULL,NOW(),_codigo_unificador);
    SET _idControl = LAST_INSERT_ID();

    INSERT INTO certificacion (control_id, control_cotizacion_id,numeroDePedido, proyecto, especialidad, fechaDeEmision, moneda,codigo_unificador)
    VALUES (_idControl,_id,NULL,NULL,NULL,NOW(),NULL,_codigo_unificador);
    SET _idCerti = LAST_INSERT_ID();

    simple_loop: LOOP
    SET _a=_a+1;
    SELECT list_docs_id INTO _list_docs_id FROM datosCotizacion WHERE cotizacion_id = _id LIMIT _count,1;
    SELECT descripcion_doc,revicion,cantidad_doc,HHUnidades,total,observacion,HH_asociado,proveerdor,viatico,numero_documento INTO _descripcion_doc,_revicion,_cantidad_doc,_HHUnidades,_total,_observacion,_HH_asociado,_proveerdor,_viatico,_numero_documento FROM  datosCotizacion WHERE cotizacion_id = _id LIMIT _count,1;
    SET _count = _count + 1;
    SELECT unidad_hh , cantidad_de_doc, unidad_hh * cantidad_de_doc INTO _hhUni,_cantDoc,_totalMulti FROM list_docs WHERE id = _list_docs_id;
    INSERT INTO datosControl (descripcion_doc, revicion, cantidad_doc, HHUnidades, total, observacion, HH_asociado, proveedor, viatico, control_id, control_cotizacion_id, numero_remito,fecha_envio_remito,list_docs_id,numero_documento)
    VALUES (_descripcion_doc,_revicion,_cantDoc,_hhUni,_totalMulti,_observacion,_HH_asociado,_proveerdor,_viatico,_idControl,_id,NULL,NOW(),_list_docs_id,_numero_documento);
    INSERT INTO datosCertificacion (certificacion_id,certificacion_control_id, certificacion_control_cotizacion_id, costoHoraDoc, cantidadDeHoras, cantidadDeDocs, porcentajeAvanceAnterior,porcentajeAvancePrecente,porcentajeAvanceAcumulado, horasCertificadas, total_certificacion,numero_documento,list_docs_id)
    VALUES (_idCerti,_idControl,_id,_hhUni,_cantDoc,_totalMulti,0,0,0,0,0,_numero_documento,_list_docs_id);
    IF _a = _countTotal THEN
        LEAVE simple_loop;
    END IF;
    END LOOP;

  SELECT _id AS 'id';
END