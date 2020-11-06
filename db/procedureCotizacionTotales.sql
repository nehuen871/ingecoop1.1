USE ingecoop;

DELIMITER $$
USE `ingecoop`$$

CREATE PROCEDURE `cotizacionTotales` (
  IN _id INT
)
BEGIN
    DECLARE _totalHH,_totalDinero INT DEFAULT 0;
    SELECT sum(total) as totalHH,sum(totalValorHora) totalDinero INTO _totalHH,_totalDinero FROM datosCotizacion where cotizacion_id = 21;
    
    UPDATE cotizacion
    SET
    totalPlata = _totalDinero,
    totalHoras = _totalHH
    WHERE id = _id;
END