USE ingecoop;

DELIMITER $$
USE `ingecoop`$$

CREATE PROCEDURE `datoControlAddOrEdit` (
  IN _id INT,
  IN _descripcion_doc VARCHAR(255),
  IN _revicion_inicial INT(11),
  IN _cantidad_doc INT(11),
  IN _HHUnidades INT(11),
  IN _total INT(11),
  IN _revision_unica INT(11),
  IN _observacion VARCHAR(255),
  IN _modificar_lista TINYINT(1),
  IN _proveedor TINYINT(1),
  IN _viatico TINYINT(1),
  IN _control_id INT(10),
  IN _control_cotizacion_id INT(10),
  IN _control_cotizacion_proyecto_id INT(10),
  IN _list_docs_id INT(11)
)
BEGIN 
  IF _id = 0 THEN
    INSERT INTO datoControl (descripcion_doc, revicion_inicial, cantidad_doc, HHUnidades, total, revision_unica, observacion, modificar_lista, proveedor, viatico, control_id, control_cotizacion_id, control_cotizacion_proyecto_id, list_docs_id)
    VALUES (_descripcion_doc,_revicion_inicial_cantidad_doc,_HHUnidades_total,_revision_unica,_observacion,_modificar_lista,_proveedor,_viatico,_control_id,_control_cotizacion_id,_control_cotizacion_proyecto_id,_list_docs_id);

    SET _id = LAST_INSERT_ID();
  ELSE
    UPDATE Cerficacion
    SET
    descripcion_doc = _descripcion_doc,
    revicion_inicial = _revicion_inicial,
    cantidad_doc = _cantidad_doc,
    HHUnidades = _HHUnidades,
    total = _total,
    revision_unica = _revision_unica,
    observacion = _observacion,
    modificar_lista = _modificar_lista,
    proveedor = _proveedor,
    viatico = _viatico,
    control_id = _control_id,
    control_cotizacion_id = _control_cotizacion_id,
    control_cotizacion_proyecto_id = _control_cotizacion_proyecto_id,
    list_docs_id = _list_docs_id
  WHERE id = _id;
  END IF;

  SELECT _id AS 'id';
END