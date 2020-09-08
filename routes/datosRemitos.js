const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../db/database.js');


// INSERT An datosRemitos
router.post('/', (req, res) => {
  let {remitos_id,remitos_control_id,remitos_control_cotizacion_id,calificacion,list_docs_id} = req.body;
  const query = `
    SET @id = 0;
    SET @remitos_id = ?;
    SET @remitos_control_id = ?;
    SET @remitos_control_cotizacion_id = ?;
    SET @calificacion = ?;
    SET @list_docs_id = ?;
    CALL datosRemitosAddOrEdit(@id, @remitos_id,@remitos_control_id,@remitos_control_cotizacion_id,@calificacion,@list_docs_id);
  `;
  mysqlConnection.query(query, [remitos_id,remitos_control_id,remitos_control_cotizacion_id,calificacion,list_docs_id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'datosRemitos Saved'});
    } else {
      res.json(err);
    }
  });
});

router.put('/:id', (req, res) => {
  let {remitos_id,remitos_control_id,remitos_control_cotizacion_id,calificacion,list_docs_id} = req.body;
  const { id } = req.params;
  const query = `
    SET @id = ?;
    SET @remitos_id = ?;
    SET @remitos_control_id = ?;
    SET @remitos_control_cotizacion_id = ?;
    SET @calificacion = ?;
    SET @list_docs_id = ?;
    CALL datosRemitosAddOrEdit(@id, @remitos_id,@remitos_control_id,@remitos_control_cotizacion_id,@calificacion,@list_docs_id);
  `;
  mysqlConnection.query(query, [id, remitos_id,remitos_control_id,remitos_control_cotizacion_id,calificacion,list_docs_id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'datosRemitos Updated'});
    } else {
      res.json(err);
    }
  });
});


// GET all datosRemitos
router.get('/', (req, res) => {
  mysqlConnection.query('SELECT * FROM datosRemitos', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      res.json(err);
    }
  });
});
router.get('/codigoUnificador/:code', (req, res) => {
  const { code } = req.params;
  mysqlConnection.query('SELECT datosRemitos.*,remitos.codigo_unificador FROM datosRemitos join remitos on remitos.id = datosRemitos.remitos_id where remitos.codigo_unificador = ?;',[code], (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      res.json(err);
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
      res.json(err);
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
      res.json(err);
    }
  });
});

module.exports = router;