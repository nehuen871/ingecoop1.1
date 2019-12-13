USE ingecoop;

DELIMITER $$
USE `ingecoop`$$

CREATE PROCEDURE `datosCotizacionAddOrEdit` (
  IN _id INT,
  IN _numeroRecotizacion INT(11),
  IN _cotizacion_id INT(10),
  IN _descripcion_doc VARCHAR(255),
  IN _revicion_inicial INT(11),
  IN _cantidad_doc INT(11),
  IN _HHUnidades INT(11),
  IN _total INT(11),
  IN _revision_unica VARCHAR(255),
  IN _observacion VARCHAR(255),
  IN _modificar_lista TINYINT(1),
  IN _proveerdor TINYINT(1),
  IN _viatico TINYINT(1),
  IN _list_docs_id INT(11)
)
BEGIN 
  DECLARE _idCotizacion,_idControl,_idCerti INT DEFAULT 0;
  IF _id = 0 THEN
    INSERT INTO datosCotizacion (numeroRecotizacion, cotizacion_id, descripcion_doc, revicion_inicial, cantidad_doc, HHUnidades, total, revision_unica, observacion, modificar_lista, proveerdor, viatico, list_docs_id)
    VALUES (_numeroRecotizacion, _cotizacion_id, _descripcion_doc, _revicion_inicial, _cantidad_doc,_HHUnidades,_total,_revision_unica,_observacion,_modificar_lista,_proveerdor,_viatico,_list_docs_id);

    SELECT id INTO _idControl FROM control WHERE cotizacion_id = _cotizacion_id;

    INSERT INTO datosControl (descripcion_doc, revicion_inicial, cantidad_doc, HHUnidades, total, revision_unica, observacion, modificar_lista, proveedor, viatico, control_id, control_cotizacion_id, list_docs_id)
    VALUES (_descripcion_doc,_revicion_inicial,_cantidad_doc,_HHUnidades,_total,_revision_unica,_observacion,_modificar_lista,_proveerdor,_viatico,_idControl,_cotizacion_id,_list_docs_id);

    SELECT id INTO _idCerti FROM certificacion WHERE control_cotizacion_id = _cotizacion_id;

    INSERT INTO datosCertificacion (certificacion_id,certificacion_control_id, certificacion_control_cotizacion_id, costoHoraDoc, cantdeHs, cantdeDocs, porcentajeAvance, horasCertificadas, total_certificacion,list_docs_id)
    VALUES (_idCerti,_idControl,_idCotizacion,0,0,0,0,0,0,_list_docs_id);


    SET _id = LAST_INSERT_ID();
  ELSE
    UPDATE datosCotizacion
    SET
    numeroRecotizacion = _numeroRecotizacion,
    cotizacion_id = _cotizacion_id,
    descripcion_doc = _descripcion_doc,
    revicion_inicial = _revicion_inicial,
    cantidad_doc = _cantidad_doc,
    HHUnidades = _HHUnidades,
    total = _total,
    revision_unica = _revision_unica,
    observacion = _observacion,
    modificar_lista = _modificar_lista,
    proveerdor = _proveerdor,
    viatico = _viatico,
    list_docs_id = _list_docs_id
    WHERE id = _id;
  END IF;

  SELECT _id AS 'id';
END