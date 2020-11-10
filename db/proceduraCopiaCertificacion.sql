USE ingecoop;

DELIMITER $$
USE `ingecoop`$$

CREATE PROCEDURE `copiaCertificacion` (
  IN _id INT(10)
)

BEGIN
    DECLARE _count INT DEFAULT 0;
    DECLARE _a INT DEFAULT 0;
    DECLARE _idCerti INT(11);
    DECLARE _countTotal INT(11);
    DECLARE _codigo_unificador INT DEFAULT 0;
    DECLARE _codigo_unificador_certi INT DEFAULT 0;
    DECLARE _certificacion_id INT(10);
    DECLARE _certificacion_control_id INT(10);
    DECLARE _certificacion_control_cotizacion_id INT(10);
    DECLARE _costoHoraDoc FLOAT;
    DECLARE _cantidadDeHoras FLOAT;
    DECLARE _cantidadDeDocs INT(11);
    DECLARE _porcentajeAvanceAnterior INT(11);
    DECLARE _porcentajeAvance INT(11);
    DECLARE _porcentajeAvancePrecente INT(11);
    DECLARE _porcentajeAvanceAcumulado INT(11);
    DECLARE _porcentajeAvanceAcumuladoSUM INT(11);
    DECLARE _horasCertificadas FLOAT;
    DECLARE _valorHora FLOAT;
    DECLARE _totalValorHora FLOAT;
    DECLARE _total_certificacion FLOAT;
    DECLARE _numero_documento VARCHAR(255);
    DECLARE _list_docs_id INT(11);
    DECLARE _idCertificacion INT(11);
    DECLARE _control_id INT(10);
    DECLARE _control_cotizacion_id INT(10);
    DECLARE _numeroDePedido VARCHAR(255);
    DECLARE _proyecto VARCHAR(255);
    DECLARE _especialidad VARCHAR(255);
    DECLARE _fechaDeEmision DATE;
    DECLARE _moneda VARCHAR(45);
    DECLARE _totalPlataCerificada FLOAT;
    DECLARE _cantDoc,_hhUni,_totalMulti INT DEFAULT 0;

    SELECT codigo_unificador,control_id,control_cotizacion_id,numeroDePedido,proyecto,especialidad,fechaDeEmision,moneda INTO _codigo_unificador_certi,_control_id,_control_cotizacion_id,_numeroDePedido,_proyecto,_especialidad,_fechaDeEmision,_moneda FROM certificacion WHERE id = _id;
    SELECT COUNT(*) as total INTO _countTotal FROM datosCertificacion WHERE datosCertificacion.certificacion_id = _id;

    INSERT INTO certificacion (control_id, control_cotizacion_id,numeroDePedido, proyecto, especialidad, fechaDeEmision, moneda,codigo_unificador)
    VALUES (_control_id,_control_cotizacion_id,_numeroDePedido,_proyecto,_especialidad,NOW(),_moneda,_codigo_unificador_certi);
    SET _idCertificacion = LAST_INSERT_ID();

    simple_loop: LOOP
    SET _a=_a+1;
    SELECT list_docs_id INTO _list_docs_id FROM datosCertificacion WHERE certificacion_id = _id LIMIT _count,1;
    SELECT certificacion_id,certificacion_control_id, certificacion_control_cotizacion_id, costoHoraDoc, cantidadDeHoras, cantidadDeDocs,porcentajeAvance,porcentajeAvanceAnterior,porcentajeAvancePrecente,porcentajeAvanceAcumulado, horasCertificadas, total_certificacion,numero_documento,list_docs_id,totalPlataCerificada INTO _certificacion_id,_certificacion_control_id,_certificacion_control_cotizacion_id,_costoHoraDoc,_cantidadDeHoras,_cantidadDeDocs,_porcentajeAvance,_porcentajeAvanceAnterior,_porcentajeAvancePrecente,_porcentajeAvanceAcumulado,_horasCertificadas,_total_certificacion,_numero_documento,_list_docs_id,_totalPlataCerificada FROM  datosCertificacion WHERE certificacion_id = _id LIMIT _count,1;
    SELECT porcentajeAvanceAcumulado INTO _porcentajeAvanceAcumuladoSUM FROM datosCertificacion WHERE certificacion_id = _id LIMIT _count,1;
    SET _count = _count + 1;
    INSERT INTO datosCertificacion (certificacion_id,certificacion_control_id, certificacion_control_cotizacion_id, costoHoraDoc, cantidadDeHoras, cantidadDeDocs,porcentajeAvance,porcentajeAvanceAnterior,porcentajeAvancePrecente,porcentajeAvanceAcumulado, horasCertificadas, total_certificacion,numero_documento,list_docs_id,totalPlataCerificada)
    VALUES (_idCertificacion,_certificacion_control_id,_certificacion_control_cotizacion_id,_costoHoraDoc,_cantidadDeHoras,_cantidadDeDocs,0,_porcentajeAvanceAcumuladoSUM,0,0,_horasCertificadas,_total_certificacion,_numero_documento,_list_docs_id,_totalPlataCerificada);
    IF _a = _countTotal THEN
        LEAVE simple_loop;
    END IF;
    END LOOP;

  SELECT _id AS 'id';
END

/*USE ingecoop;

DELIMITER $$
USE `ingecoop`$$

CREATE PROCEDURE `copiaCertificacion` (
  IN _id INT(10)
)

BEGIN
    DECLARE _count INT DEFAULT 0;
    DECLARE _a INT DEFAULT 0;
    DECLARE _idCerti INT(11);
    DECLARE _countTotal INT(11);
    DECLARE _codigo_unificador INT DEFAULT 0;
    DECLARE _codigo_unificador_certi INT DEFAULT 0;
    DECLARE _certificacion_id INT(10);
    DECLARE _certificacion_control_id INT(10);
    DECLARE _certificacion_control_cotizacion_id INT(10);
    DECLARE _costoHoraDoc FLOAT;
    DECLARE _cantidadDeHoras FLOAT;
    DECLARE _cantidadDeDocs INT(11);
    DECLARE _porcentajeAvanceAnterior INT(11);
    DECLARE _porcentajeAvance INT(11);
    DECLARE _porcentajeAvancePrecente INT(11);
    DECLARE _porcentajeAvanceAcumulado INT(11);
    DECLARE _porcentajeAvanceAcumuladoSUM INT(11);
    DECLARE _horasCertificadas FLOAT;
    DECLARE _valorHora FLOAT;
    DECLARE _totalValorHora FLOAT;
    DECLARE _total_certificacion INT(11);
    DECLARE _numero_documento VARCHAR(255);
    DECLARE _list_docs_id INT(11);
    DECLARE _idCertificacion INT(11);
    DECLARE _control_id INT(10);
    DECLARE _control_cotizacion_id INT(10);
    DECLARE _numeroDePedido VARCHAR(255);
    DECLARE _proyecto VARCHAR(255);
    DECLARE _especialidad VARCHAR(255);
    DECLARE _fechaDeEmision DATE;
    DECLARE _moneda VARCHAR(45);
    DECLARE _totalPlataCerificada FLOAT;
    DECLARE _cantDoc,_hhUni,_totalMulti,_totalCerti INT DEFAULT 0;

    SELECT codigo_unificador,control_id,control_cotizacion_id,numeroDePedido,proyecto,especialidad,fechaDeEmision,moneda INTO _codigo_unificador_certi,_control_id,_control_cotizacion_id,_numeroDePedido,_proyecto,_especialidad,_fechaDeEmision,_moneda FROM certificacion WHERE id = _id;
    SELECT COUNT(*) as total INTO _countTotal FROM datosCertificacion WHERE datosCertificacion.certificacion_id = _id;

    INSERT INTO certificacion (control_id, control_cotizacion_id,numeroDePedido, proyecto, especialidad, fechaDeEmision, moneda,codigo_unificador)
    VALUES (_control_id,_control_cotizacion_id,_numeroDePedido,_proyecto,_especialidad,_fechaDeEmision,_moneda,_codigo_unificador_certi);
    SET _idCertificacion = LAST_INSERT_ID();

    simple_loop: LOOP
    SET _a=_a+1;
    SELECT list_docs_id INTO _list_docs_id FROM datosCertificacion WHERE certificacion_id = _id LIMIT _count,1;
    SELECT certificacion_id,certificacion_control_id, certificacion_control_cotizacion_id, costoHoraDoc, cantidadDeHoras, cantidadDeDocs,porcentajeAvance,porcentajeAvanceAnterior,porcentajeAvancePrecente,porcentajeAvanceAcumulado, horasCertificadas, total_certificacion,numero_documento,list_docs_id,totalPlataCerificada INTO _certificacion_id,_certificacion_control_id,_certificacion_control_cotizacion_id,_costoHoraDoc,_cantidadDeHoras,_cantidadDeDocs,_porcentajeAvance,_porcentajeAvanceAnterior,_porcentajeAvancePrecente,_porcentajeAvanceAcumulado,_horasCertificadas,_total_certificacion,_numero_documento,_list_docs_id,_totalPlataCerificada FROM  datosCertificacion WHERE certificacion_id = _id LIMIT _count,1;
    SELECT SUM(porcentajeAvanceAnterior + porcentajeAvancePrecente + porcentajeAvanceAcumulado) INTO _porcentajeAvanceAcumuladoSUM FROM datosCertificacion WHERE certificacion_id = _id LIMIT _count,1;
    SELECT  porcentajeAvancePrecente / cantidadDeHoras INTO _totalCerti FROM datosCertificacion WHERE certificacion_id = _id LIMIT _count,1;
    SET _count = _count + 1;
    INSERT INTO datosCertificacion (certificacion_id,certificacion_control_id, certificacion_control_cotizacion_id, costoHoraDoc, cantidadDeHoras, cantidadDeDocs,porcentajeAvance,porcentajeAvanceAnterior,porcentajeAvancePrecente,porcentajeAvanceAcumulado, horasCertificadas, total_certificacion,numero_documento,list_docs_id,totalPlataCerificada)
    VALUES (_idCertificacion,_certificacion_control_id,_certificacion_control_cotizacion_id,_costoHoraDoc,_cantidadDeHoras,_cantidadDeDocs,0,_porcentajeAvancePrecente,0,_porcentajeAvanceAcumuladoSUM,_horasCertificadas,_totalCerti,_numero_documento,_list_docs_id,_totalPlataCerificada);
    IF _a = _countTotal THEN
        LEAVE simple_loop;
    END IF;
    END LOOP;

  SELECT _id AS 'id';
END*/