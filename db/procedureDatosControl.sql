USE ingecoop;

DELIMITER $$
USE `ingecoop`$$

CREATE PROCEDURE `datoControlAddOrEdit` (
  IN _id INT(11),
  IN _descripcion_doc VARCHAR(255),
  IN _revicion INT(11),
  IN _cantidad_doc INT(11),
  IN _HHUnidades INT(11),
  IN _total INT(11),
  IN _observacion VARCHAR(255),
  IN _HH_asociado TINYINT(1),
  IN _proveedor TINYINT(1),
  IN _viatico TINYINT(1),
  IN _control_id INT(10),
  IN _control_cotizacion_id INT(10),
  IN _numero_documento INT(11),
  IN _numero_remito INT(11),
  IN _fecha_envio_remito DATE,
  IN _list_docs_id INT(11)
)
BEGIN 
  DECLARE _idCotizacion,_idControl,_idCerti,_cantDoc,_hhUni,_totalMulti INT DEFAULT 0;
  IF _id = 0 THEN
    SELECT total_hh , cantidad_de_doc, total_hh * cantidad_de_doc INTO _hhUni,_cantDoc,_totalMulti FROM list_docs WHERE id = _list_docs_id;

    INSERT INTO datosControl (descripcion_doc, revicion, cantidad_doc, HHUnidades, total, observacion, HH_asociado, proveedor, viatico, control_id, control_cotizacion_id,numero_documento,numero_remito,fecha_envio_remito,list_docs_id)
    VALUES (_descripcion_doc,_revicion,_cantDoc,_hhUni,_totalMulti,_observacion,_HH_asociado,_proveedor,_viatico,_control_id,_control_cotizacion_id,_numero_documento,_numero_remito,_fecha_envio_remito,_list_docs_id);

    /*SELECT id INTO _idCerti FROM certificacion WHERE control_cotizacion_id = _control_cotizacion_id;

    INSERT INTO datosCertificacion (certificacion_id,certificacion_control_id, certificacion_control_cotizacion_id, costoHoraDoc, cantidadDeHoras, cantidadDeDocs, porcentajeAvanceAnterior,porcentajeAvancePrecente,porcentajeAvanceAcumulado, horasCertificadas, total_certificacion,numero_documento,list_docs_id)
    VALUES (_idCerti,_control_id,_control_cotizacion_id,0,0,0,0,0,0,0,0,0,_list_docs_id);*/
    
    SET _id = LAST_INSERT_ID();
  ELSE
    UPDATE datosControl
    SET
    descripcion_doc = _descripcion_doc,
    revicion = _revicion,
    cantidad_doc = _cantidad_doc,
    HHUnidades = _HHUnidades,
    total = _total,
    observacion = _observacion,
    HH_asociado = _HH_asociado,
    proveedor = _proveedor,
    viatico = _viatico,
    control_id = _control_id,
    control_cotizacion_id = _control_cotizacion_id,
    numero_documento = _numero_documento,
    numero_remito = _numero_remito,
    fecha_envio_remito = _fecha_envio_remito,
    list_docs_id = _list_docs_id
  WHERE id = _id;
  END IF;

  SELECT _id AS 'id';
END