const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../db/database.js');

// GET all datosRemitos
router.get('/', (req, res) => {
  mysqlConnection.query('SELECT * FROM datosRemitos', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

// GET An datosRemitos
router.get('/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('SELECT * FROM datosRemitos WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

// DELETE An remitos
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM datosRemitos WHERE id = ?', [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'datosRemitos Deleted'});
    } else {
      console.log(err);
    }
  });
});

// INSERT An datosRemitos
router.post('/', (req, res) => {
  let {remitos,remitos_control_id,remitos_control_id,remitos_control_cotizacion_id,calificacion,list_docs_id} = req.body;
  if(remitos == '' || remitos === 'Invalid date'){remitos = null};
  if(fecha_envio == '' || fecha_envio === 'Invalid date'){fecha_envio = null};
  if(calificacion == '' || calificacion === 'Invalid date'){calificacion = null};
  const query = `
    SET @id = 0;
    SET @remitos = ?;
    SET @remitos_control_id = ?;
    SET @remitos_control_cotizacion_id = ?;
    SET @calificacion = ?;
    SET @list_docs_id = ?;
    CALL datosRemitosAddOrEdit(@id, @remitos,@remitos_control_id,@remitos_control_cotizacion_id,@calificacion,@list_docs_id);
  `;
  mysqlConnection.query(query, [remitos,remitos_control_id,remitos_control_id,remitos_control_cotizacion_id,calificacion,list_docs_id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'datosRemitos Saved'});
    } else {
      console.log(err);
    }
  });

});

router.put('/:id', (req, res) => {
  let {remitos,remitos_control_id,remitos_control_id,remitos_control_cotizacion_id,calificacion,list_docs_id} = req.body;
  if(remito == '' || remito === 'Invalid date'){remito = null};
  if(fecha_envio == '' || fecha_envio === 'Invalid date'){fecha_envio = null};
  if(calificacion == '' || calificacion === 'Invalid date'){calificacion = null};
  const { id } = req.params;
  const query = `
    SET @id = ?;
    SET @remitos = ?;
    SET @remitos_control_id = ?;
    SET @remitos_control_cotizacion_id = ?;
    SET @calificacion = ?;
    SET @list_docs_id = ?;
    CALL datosRemitosAddOrEdit(@id, @remitos,@remitos_control_id,@remitos_control_cotizacion_id,@calificacion,@list_docs_id);
  `;
  mysqlConnection.query(query, [id, remitos,remitos_control_id,remitos_control_id,remitos_control_cotizacion_id,calificacion,list_docs_id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'datosRemitos Updated'});
    } else {
      console.log(err);
    }
  });

});

module.exports = router;
