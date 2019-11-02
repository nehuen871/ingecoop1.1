const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../db/database.js');

// GET all datosControl
router.get('/', (req, res) => {
  mysqlConnection.query('SELECT * FROM datosControl', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

// GET An datosControl
router.get('/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('SELECT * FROM datosControl WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

// DELETE An datosControl
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM datosControl WHERE id = ?', [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'datosControl Deleted'});
    } else {
      console.log(err);
    }
  });
});

// INSERT An datosControl
router.post('/', (req, res) => {
  const {descripcion_doc, revicion_inicial, cantidad_doc, HHUnidades, total, revision_unica, observacion, modificar_lista, proveedor, viatico, control_id, control_cotizacion_id, list_docs_id} = req.body;
  const query = `
    SET @id = 0;
    SET @descripcion_doc = ?;
    SET @revicion_inicial = ?;
    SET @cantidad_doc = ?;
    SET @HHUnidades = ?;
    SET @total = ?;
    SET @revision_unica = ?;
    SET @observacion = ?;
    SET @modificar_lista = ?;
    SET @proveedor = ?;
    SET @viatico = ?;
    SET @control_id = ?;
    SET @control_cotizacion_id = ?;
    SET @list_docs_id = ?;
    CALL datosControlAddOrEdit(@id, @descripcion_doc,@revicion_inicial,@cantidad_doc,@HHUnidades,@total,@revision_unica,@observacion,@modificar_lista,@proveedor,@viatico,@control_id,@control_cotizacion_id,@list_docs_id);
  `;
  mysqlConnection.query(query, [descripcion_doc, revicion_inicial, cantidad_doc, HHUnidades, total, revision_unica, observacion, modificar_lista, proveedor, viatico, control_id, control_cotizacion_id, list_docs_id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'datosControl Saved'});
    } else {
      console.log(err);
    }
  });

});

router.put('/:id', (req, res) => {
  const { descripcion_doc, revicion_inicial, cantidad_doc, HHUnidades, total, revision_unica, observacion, modificar_lista, proveedor, viatico, control_id, control_cotizacion_id, list_docs_id } = req.body;
  const { id } = req.params;
  const query = `
    SET @id = ?;
    SET @descripcion_doc = ?;
    SET @revicion_inicial = ?;
    SET @cantidad_doc = ?;
    SET @HHUnidades = ?;
    SET @total = ?;
    SET @revision_unica = ?;
    SET @observacion = ?;
    SET @modificar_lista = ?;
    SET @proveedor = ?;
    SET @viatico = ?;
    SET @control_id = ?;
    SET @control_cotizacion_id = ?;
    SET @list_docs_id = ?;
    CALL datosControlAddOrEdit(@id, @descripcion_doc,@revicion_inicial,@cantidad_doc,@HHUnidades,@total,@revision_unica,@observacion,@modificar_lista,@proveedor,@viatico,@control_id,@control_cotizacion_id,@list_docs_id);
  `;
  mysqlConnection.query(query, [id, descripcion_doc, revicion_inicial, cantidad_doc, HHUnidades, total, revision_unica, observacion, modificar_lista, proveedor, viatico, control_id, control_cotizacion_id, list_docs_id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'datosControl Updated'});
    } else {
      console.log(err);
    }
  });

});


module.exports = router;