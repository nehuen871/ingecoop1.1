USE ingecoop;

DELIMITER $$
USE `ingecoop`$$

CREATE PROCEDURE `certificacionAddOrEdit` (
  IN _id INT(10),
  IN _control_id INT(10),
  IN _control_cotizacion_id INT(10),
  IN _control_cotizacion_proyecto_id INT(10),
  IN _proveedor VARCHAR(255),
  IN _cuit VARCHAR(255),
  IN _numeroInternoProveedor INT(11),
  IN _numeroDePedido INT(11),
  IN _nombre VARCHAR(255),
  IN _especialidad VARCHAR(255),
  IN _fechaDeEmision DATE,
  IN _moneda VARCHAR(45),
  IN _costoHoraDoc FLOAT,
  IN _cantdeHs FLOAT,
  IN _cantdeDocs INT(11),
  IN _porcentajeAvance INT(11),
  IN _horasCertificadas FLOAT,
  IN _cetifiacacionInterna_id INT(10),
  IN _total_certificacion INT(11)
)
BEGIN
  IF _id = 0 THEN
    INSERT INTO certificacion (control_id, control_cotizacion_id, control_cotizacion_proyecto_id, proveedor, cuit, numeroInternoProveedor, numeroDePedido, nombre, especialidad, fechaDeEmision, moneda, costoHoraDoc, cantdeHs, cantdeDocs, porcentajeAvance, horasCertificadas, cetifiacacionInterna_id, total_certificacion)
    VALUES (_control_id,_control_cotizacion_id,_control_cotizacion_proyecto_id,_proveedor,_cuit,_numeroInternoProveedor,_numeroDePedido,_nombre,_especialidad,_fechaDeEmision,_moneda,_costoHoraDoc,_cantdeHs,_cantdeDocs,_porcentajeAvance,_horasCertificadas,_cetifiacacionInterna_id,_total_certificacion);

    SET _id = LAST_INSERT_ID();
  ELSE
    UPDATE Cerficacion
    SET
    control_id = _control_id,
    control_cotizacion_id = _control_cotizacion_id,
    control_cotizacion_proyecto_id = _control_cotizacion_proyecto_id,
    proveedor = _proveedor,
    cuit = _cuit,
    numeroInternoProveedor = _numeroInternoProveedor,
    numeroDePedido = _numeroDePedido,
    nombre = _nombre,
    especialidad = _especialidad,
    fechaDeEmision = _fechaDeEmision,
    moneda = _moneda,
    costoHoraDoc = _costoHoraDoc,
    cantdeHs = _cantdeHs,
    cantdeDocs = _cantdeDocs,
    porcentajeAvance = _porcentajeAvance,
    horasCertificadas = _horasCertificadas,
    cetifiacacionInterna_id = _cetifiacacionInterna_id,
    total_certificacio = _total_certificacion
    WHERE id = _id;
  END IF;

  SELECT _id AS 'id';
END