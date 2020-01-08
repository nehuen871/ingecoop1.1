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

router.post('/dataById', (req, res) => {
    let {id} = req.body;
    const query = `
    select datosCertificacion.*,list_docs.nombre from datosCertificacion
    join list_docs on list_docs.id = datosCertificacion.list_docs_id
    where certificacion_id = ?`;
    mysqlConnection.query(query,[id], (err, rows, fields) => {
      if(!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });
  });

  router.post('/updateAvance', (req, res) => {
    let {id,porcentajeAvance} = req.body;
    const query = `
    UPDATE datosCertificacion SET datosCertificacion.porcentajeAvance = ? WHERE datosCertificacion.id = ?`;
    console.log(query);
    mysqlConnection.query(query,[id,porcentajeAvance], (err, rows, fields) => {
      if(!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });
  });

// INSERT An certificacion
router.post('/', (req, res) => {
  let {certificacion_id,certificacion_control_id, certificacion_control_cotizacion_id, costoHoraDoc, cantidadDeHoras, cantidadDeDocs, porcentajeAvanceAnterior,porcentajeAvancePrecente,porcentajeAvanceAcumulado, horasCertificadas, total_certificacion,list_docs_id} = req.body;
  if(costoHoraDoc === ''){costoHoraDoc=null};
  if(cantidadDeHoras === ''){cantidadDeHoras=null};
  if(cantidadDeDocs === ''){cantidadDeDocs=null};
  if(porcentajeAvanceAnterior === ''){porcentajeAvanceAnterior=null};
  if(porcentajeAvancePrecente === ''){porcentajeAvancePrecente=null};
  if(porcentajeAvanceAcumulado === ''){porcentajeAvanceAcumulado=null};
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
    SET @porcentajeAvanceAnterior = ?;
    SET @porcentajeAvancePrecente = ?;
    SET @porcentajeAvanceAcumulado = ?;
    SET @horasCertificadas = ?;
    SET @total_certificacion = ?;
    SET @list_docs_id = ?;
    CALL datosCertificacionAddOrEdit(@id,@certificacion_id, @certificacion_control_id,@certificacion_control_cotizacion_id,@costoHoraDoc,@cantidadDeHoras,@cantidadDeDocs,@porcentajeAvanceAnterior,@porcentajeAvancePrecente,@porcentajeAvanceAcumulado,@horasCertificadas,@total_certificacion,@list_docs_id);
  `;
  mysqlConnection.query(query, [certificacion_id, certificacion_control_id, certificacion_control_cotizacion_id, costoHoraDoc, cantidadDeHoras, cantidadDeDocs, porcentajeAvanceAnterior,porcentajeAvancePrecente,porcentajeAvanceAcumulado, horasCertificadas, total_certificacion,list_docs_id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'datosCertificacion Saved'});
    } else {
      console.log(err);
    }
  });

});

router.put('/:id', (req, res) => {
  let {certificacion_id,certificacion_control_id, certificacion_control_cotizacion_id, costoHoraDoc, cantidadDeHoras, cantidadDeDocs, porcentajeAvanceAnterior,porcentajeAvancePrecente,porcentajeAvanceAcumulado, horasCertificadas, total_certificacion,list_docs_id } = req.body;
  if(costoHoraDoc === ''){costoHoraDoc=null};
  if(cantidadDeHoras === ''){cantidadDeHoras=null};
  if(cantidadDeDocs === ''){cantidadDeDocs=null};
  if(porcentajeAvanceAnterior === ''){porcentajeAvanceAnterior=null};
  if(porcentajeAvancePrecente === ''){porcentajeAvancePrecente=null};
  if(porcentajeAvanceAcumulado === ''){porcentajeAvanceAcumulado=null};
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
    SET @porcentajeAvanceAnterior = ?;
    SET @porcentajeAvancePrecente = ?;
    SET @porcentajeAvanceAcumulado = ?;
    SET @horasCertificadas = ?;
    SET @total_certificacion = ?;
    SET @list_docs_id = ?;
    CALL datosCertificacionAddOrEdit(@id,@certificacion_id,@certificacion_control_id,@certificacion_control_cotizacion_id,@costoHoraDoc,@cantidadDeHoras,@cantidadDeDocs,@porcentajeAvanceAnterior,@porcentajeAvancePrecente,@porcentajeAvanceAcumulado,@horasCertificadas,@total_certificacion,@list_docs_id);
  `;
  mysqlConnection.query(query, [id,certificacion_id, certificacion_control_id, certificacion_control_cotizacion_id, costoHoraDoc, cantidadDeHoras, cantidadDeDocs, porcentajeAvanceAnterior,porcentajeAvancePrecente,porcentajeAvanceAcumulado, horasCertificadas, total_certificacion,list_docs_id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'datosCertificacion Updated'});
    } else {
      console.log(err);
    }
  });

});

module.exports = router;