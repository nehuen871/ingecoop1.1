USE ingecoop;

DELIMITER $$
USE `ingecoop`$$

CREATE PROCEDURE `certificacionAutomatica` (
  IN _id INT(10),
  IN _porcentajeAvance INT(10)
)
BEGIN
  DECLARE _porcentajeAvanceAnterior INT DEFAULT 0;
  DECLARE _porcentajeAvancePrecente INT DEFAULT 0;
  DECLARE _porcentajeAvanceAcumulado INT DEFAULT 0;
  
  SELECT 
    porcentajeAvanceAnterior INTO _porcentajeAvanceAnterior
  FROM datosCertificacion WHERE id = _id;
  
  SELECT 
    porcentajeAvancePrecente INTO _porcentajeAvancePrecente
  FROM datosCertificacion WHERE id = _id;
  
  SELECT 
    porcentajeAvanceAcumulado INTO _porcentajeAvanceAcumulado
  FROM datosCertificacion WHERE id = _id;

  UPDATE datosCertificacion
    SET
    porcentajeAvanceAnterior = _porcentajeAvancePrecente,
    porcentajeAvancePrecente = _porcentajeAvance,
    porcentajeAvanceAcumulado = _porcentajeAvanceAnterior + _porcentajeAvanceAcumulado + _porcentajeAvance
    WHERE id = _id;
  SELECT _id AS 'id';
END