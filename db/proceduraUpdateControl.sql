USE ingecoop;

DELIMITER $$
USE `ingecoop`$$

CREATE PROCEDURE `updateControl` (
  IN _id INT(10)
)
BEGIN
    SELECT * FROM cotizacion WHERE id = _id;
    SELECT * FROM datosCotizacion WHERE cotizacion_id = _id;
    INSERT INTO control (cotizacion_id, fecha_emision_proyectada, revision, fecha_calificaion, numero_documento, numero_control, numero_doc, codigo_doc_cliente,codigo_unificador)
    VALUES (_id,NULL,NULL,NULL,NULL,NULL,NULL,NULL,_codigo_unificador);
    
    SET _idControl = LAST_INSERT_ID();
    loop_label:  LOOP
    
    IF a=51 THEN
        LEAVE simple_loop;
    END IF;
    END LOOP;

    

    INSERT INTO datosControl (descripcion_doc, revicion, cantidad_doc, HHUnidades, total, observacion, HH_asociado, proveedor, viatico, control_id, control_cotizacion_id, list_docs_id)
    VALUES (NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,_idControl,_id,_list_docs_id);

    INSERT INTO certificacion (control_id, control_cotizacion_id,numeroDePedido, proyecto, especialidad, fechaDeEmision, moneda,codigo_unificador)
    VALUES (_idControl,_id,NULL,NULL,NULL,NULL,NULL,_codigo_unificador);
    SET _idCerti = LAST_INSERT_ID();

    INSERT INTO datosCertificacion (certificacion_id,certificacion_control_id, certificacion_control_cotizacion_id, costoHoraDoc, cantidadDeHoras, cantidadDeDocs, porcentajeAvanceAnterior,porcentajeAvancePrecente,porcentajeAvanceAcumulado, horasCertificadas, total_certificacion,list_docs_id)
    VALUES (_idCerti,_idControl,_id,0,0,0,0,0,0,0,0,_list_docs_id);

  SELECT _id AS 'id';
END