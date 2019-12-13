const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../db/database.js');

// GET all certificacion
router.get('/', (req, res) => {
  mysqlConnection.query('SELECT * FROM datosCertificacion', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

// GET An certificacion
router.get('/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('SELECT * FROM datosCertificacion WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

// DELETE An certificacion
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM datosCertificacion WHERE id = ?', [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'certificacion Deleted'});
    } else {
      console.log(err);
    }
  });
});

// INSERT An certificacion
router.post('/', (req, res) => {
  let {certificacion_id,certificacion_control_id, certificacion_control_cotizacion_id, costoHoraDoc, cantidadDeHoras, cantidadDeDocs, porcentajeAvance, horasCertificadas, total_certificacion,list_docs_id} = req.body;
  if(costoHoraDoc === ''){costoHoraDoc=null};
  if(cantidadDeHoras === ''){cantidadDeHoras=null};
  if(cantidadDeDocs === ''){cantidadDeDocs=null};
  if(porcentajeAvance === ''){porcentajeAvance=null};
  if(horasCertificadas === ''){horasCertificadas=null};
  if(total_certificacion === ''){total_certificacion=null};
  const query = `
    SET @id = 0;
    SET @certificacion_id = ?;
    SET @certificacion_control_id = ?;
    SET @certificacion_control_cotizacion_id = ?;
    SET @costoHoraDoc = ?;
    SET @cantidadDeHoras = ?;
    SET @cantidadDeDocs = ?;
    SET @porcentajeAvance = ?;
    SET @horasCertificadas = ?;
    SET @total_certificacion = ?;
    SET @list_docs_id = ?;
    CALL datosCertificacionAddOrEdit(@id,@certificacion_id, @certificacion_control_id,@certificacion_control_cotizacion_id,@costoHoraDoc,@cantidadDeHoras,@cantidadDeDocs,@porcentajeAvance,@horasCertificadas,@total_certificacion,@list_docs_id);
  `;
  mysqlConnection.query(query, [certificacion_id, certificacion_control_id, certificacion_control_cotizacion_id, costoHoraDoc, cantidadDeHoras, cantidadDeDocs, porcentajeAvance, horasCertificadas, total_certificacion,list_docs_id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'datosCertificacion Saved'});
    } else {
      console.log(err);
    }
  });

});

router.put('/:id', (req, res) => {
  let {certificacion_id,certificacion_control_id, certificacion_control_cotizacion_id, costoHoraDoc, cantidadDeHoras, cantidadDeDocs, porcentajeAvance, horasCertificadas, total_certificacion,list_docs_id } = req.body;
  if(costoHoraDoc === ''){costoHoraDoc=null};
  if(cantidadDeHoras === ''){cantidadDeHoras=null};
  if(cantidadDeDocs === ''){cantidadDeDocs=null};
  if(porcentajeAvance === ''){porcentajeAvance=null};
  if(horasCertificadas === ''){horasCertificadas=null};
  if(total_certificacion === ''){total_certificacion=null};
  const { id } = req.params;
  const query = `
    SET @id = ?;
    SET @certificacion_id = ?;
    SET @certificacion_control_id = ?;
    SET @certificacion_control_cotizacion_id = ?;
    SET @costoHoraDoc = ?;
    SET @cantidadDeHoras = ?;
    SET @cantidadDeDocs = ?;
    SET @porcentajeAvance = ?;
    SET @horasCertificadas = ?;
    SET @total_certificacion = ?;
    SET @list_docs_id = ?;
    CALL datosCertificacionAddOrEdit(@id,@certificacion_id,@certificacion_control_id,@certificacion_control_cotizacion_id,@costoHoraDoc,@cantidadDeHoras,@cantidadDeDocs,@porcentajeAvance,@horasCertificadas,@total_certificacion,@list_docs_id);
  `;
  mysqlConnection.query(query, [id,certificacion_id, certificacion_control_id, certificacion_control_cotizacion_id, costoHoraDoc, cantidadDeHoras, cantidadDeDocs, porcentajeAvance, horasCertificadas, total_certificacion,list_docs_id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'datosCertificacion Updated'});
    } else {
      console.log(err);
    }
  });

});

module.exports = router;