USE ingecoop;

DELIMITER $$
USE `ingecoop`$$

CREATE PROCEDURE `proyectoAddOrEdit` (
  IN _id INT,
  IN _nombre VARCHAR(255),
  IN _numero_proyecto INT(11),
  IN _cliente_id INT(10),
  IN _fehca_inicio DATE,
  IN _fecha_fin DATE,
  IN _cotizacion_id INT(10),
  IN _codigo_unificador VARCHAR(255)
)
BEGIN
  DECLARE _idCotizacion,_idControl,_idCerti INT DEFAULT 0;
  IF _id = 0 THEN
    /*INSERT INTO cotizacion (revision, fecha,titulo_cotiazacion,numero_doc,cliente_id,codigo_unificador)
    VALUES (0,NULL,'Nuevo proyecto',0,_cliente_id,_codigo_unificador);
    SET _idCotizacion = LAST_INSERT_ID();

    INSERT INTO proyecto (nombre,numero_proyecto,cliente_id,fehca_inicio,fecha_fin,cotizacion_id,codigo_unificador)
    VALUES (_nombre, _numero_proyecto, _cliente_id, _fehca_inicio, _fecha_fin,_idCotizacion,_codigo_unificador);
    SET _id = LAST_INSERT_ID();
    
    INSERT INTO control (cotizacion_id, fecha_emision_proyectada, revision, fecha_calificaion, numero_documento, numero_control, numero_doc, codigo_doc_cliente,codigo_unificador)
    VALUES (_idCotizacion,NULL,NULL,NULL,NULL,NULL,NULL,NULL,_codigo_unificador);
    SET _idControl = LAST_INSERT_ID();

    INSERT INTO certificacion (control_id, control_cotizacion_id,numeroDePedido, proyecto, especialidad, fechaDeEmision, moneda,codigo_unificador)
    VALUES (_idControl,_idCotizacion,NULL,NULL,NULL,NULL,NULL,_codigo_unificador);
    SET _idCerti = LAST_INSERT_ID();*/

    INSERT INTO proyecto (nombre,numero_proyecto,cliente_id,fehca_inicio,fecha_fin,cotizacion_id,codigo_unificador)
    VALUES (_nombre, _numero_proyecto, _cliente_id, _fehca_inicio, _fecha_fin,_cotizacion_id,_codigo_unificador);
    SET _id = LAST_INSERT_ID();
    
  ELSE
    UPDATE proyecto
    SET
    nombre = _nombre,
    numero_proyecto = _numero_proyecto,
    cliente_id = _cliente_id,
    fehca_inicio = _fehca_inicio,
    fecha_fin = _fecha_fin,
    cotizacion_id = _cotizacion_id
    WHERE id = _id;
  END IF;

  SELECT _id AS 'id';
END