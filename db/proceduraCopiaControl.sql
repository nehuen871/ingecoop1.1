USE ingecoop;

DELIMITER $$
USE `ingecoop`$$

CREATE PROCEDURE `copiaControl` (
  IN _id INT(10)
)

BEGIN
    DECLARE _count INT DEFAULT 0;
    DECLARE _codigo_unificador INT DEFAULT 0;
    DECLARE _countTotal INT DEFAULT 0;
    DECLARE _idControl INT DEFAULT 0;
    DECLARE _idCoti INT DEFAULT 0;
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
    DECLARE _porcentajeAvance INT;
    DECLARE _numero_documento VARCHAR(255);
    DECLARE _porcentajeAvanceAcumuladoSUM INT;
    DECLARE _cantDoc,_hhUni,_totalMulti,_porcentajeAvanceAnterior,_porcentajeAvanceAcumulado,_porcentajeAvancePrecente INT DEFAULT 0;

    SELECT codigo_unificador,cotizacion_id INTO _codigo_unificador,_idCoti FROM control WHERE id = _id;
    SELECT COUNT(*) as total INTO _countTotal FROM datosControl WHERE datosControl.control_id = _id;

    INSERT INTO control (cotizacion_id, fecha_emision_proyectada, revision, fecha_calificaion,codigo_unificador)
    VALUES (_idCoti,NOW(),NULL,NOW(),_codigo_unificador);
    SET _idControl = LAST_INSERT_ID();

    simple_loop: LOOP
    SET _a=_a+1;
    SELECT list_docs_id INTO _list_docs_id FROM datosControl WHERE control_id = _id LIMIT _count,1;
    SELECT descripcion_doc,revicion,cantidad_doc,HHUnidades,total,observacion,HH_asociado,proveedor,viatico,numero_documento,porcentajeAvance,porcentajeAvanceAnterior,porcentajeAvanceAcumulado,porcentajeAvancePrecente INTO _descripcion_doc,_revicion,_cantidad_doc,_HHUnidades,_total,_observacion,_HH_asociado,_proveerdor,_viatico,_numero_documento,_porcentajeAvance,_porcentajeAvanceAnterior,_porcentajeAvanceAcumulado,_porcentajeAvancePrecente FROM  datosControl WHERE control_id = _id LIMIT _count,1;
    SELECT porcentajeAvanceAcumulado INTO _porcentajeAvanceAcumuladoSUM FROM  datosControl WHERE control_id = _id LIMIT _count,1;
    SET _count = _count + 1;
    INSERT INTO datosControl (descripcion_doc, revicion, cantidad_doc, HHUnidades, total, observacion, HH_asociado, proveedor, viatico, control_id, control_cotizacion_id, numero_remito,fecha_envio_remito,list_docs_id,numero_documento,porcentajeAvance,porcentajeAvanceAnterior,porcentajeAvanceAcumulado,porcentajeAvancePrecente)
    VALUES (_descripcion_doc,_revicion,_cantidad_doc,_HHUnidades,_total,_observacion,_HH_asociado,_proveerdor,_viatico,_idControl,_idCoti,NULL,NOW(),_list_docs_id,_numero_documento,0,_porcentajeAvanceAcumuladoSUM,_porcentajeAvanceAcumuladoSUM,0);
    IF _a = _countTotal THEN
        LEAVE simple_loop;
    END IF;
    END LOOP;

  SELECT _id AS 'id';
END