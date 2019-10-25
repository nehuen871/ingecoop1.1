const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../db/database.js');

// GET all datosCotiazacion
router.get('/', (req, res) => {
  mysqlConnection.query('SELECT * FROM datosCotiazacion', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

// GET An datosCotiazacion
router.get('/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('SELECT * FROM datosCotiazacion WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

// DELETE An datosCotiazacion
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM datosCotiazacion WHERE id = ?', [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'datosCotiazacion Deleted'});
    } else {
      console.log(err);
    }
  });
});

// INSERT An datosCotiazacion
router.post('/', (req, res) => {
  const {numeroRecotizacion, cotizacion_id, descripcion_doc, revicion_inicial, cantidad_doc, HHUnidades, total, revision_unica, observacion, modificar_lista, proveerdor, viatico, list_docs_id} = req.body;
  const query = `
    SET @id = 0;
    SET @numeroRecotizacion = ?;
    SET @cotizacion_id = ?;
    SET @descripcion_doc = ?;
    SET @revicion_inicial = ?;
    SET @cantidad_doc = ?;
    SET @HHUnidades = ?;
    SET @total = ?;
    SET @revision_unica = ?;
    SET @observacion = ?;
    SET @modificar_lista = ?;
    SET @proveerdor = ?;
    SET @viatico = ?;
    SET @list_docs_i = ?;
    CALL ComercioAddOrEdit(@id, @numeroRecotizacion,@cotizacion_id,@descripcion_doc,@revicion_inicial,@cantidad_doc,@HHUnidades,@total,@revision_unica,@observacion,@modificar_lista,@proveerdor,@viatico,@list_docs_id);
  `;
  mysqlConnection.query(query, [numeroRecotizacion, cotizacion_id, descripcion_doc, revicion_inicial, cantidad_doc, HHUnidades, total, revision_unica, observacion, modificar_lista, proveerdor, viatico, list_docs_id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'datosCotiazacion Saved'});
    } else {
      console.log(err);
    }
  });

});

router.put('/:id', (req, res) => {
  const { numeroRecotizacion, cotizacion_id, descripcion_doc, revicion_inicial, cantidad_doc, HHUnidades, total, revision_unica, observacion, modificar_lista, proveerdor, viatico, list_docs_id } = req.body;
  const { id } = req.params;
  const query = `
    SET @id = ?;
    SET @numeroRecotizacion = ?;
    SET @cotizacion_id = ?;
    SET @descripcion_doc = ?;
    SET @revicion_inicial = ?;
    SET @cantidad_doc = ?;
    SET @HHUnidades = ?;
    SET @total = ?;
    SET @revision_unica = ?;
    SET @observacion = ?;
    SET @modificar_lista = ?;
    SET @proveerdor = ?;
    SET @viatico = ?;
    SET @list_docs_i = ?;
    CALL datosCotiazacionAddOrEdit(@id, @numeroRecotizacion,@cotizacion_id,@descripcion_doc,@revicion_inicial,@cantidad_doc,@HHUnidades,@total,@revision_unica,@observacion,@modificar_lista,@proveerdor,@viatico,@list_docs_id);
  `;
  mysqlConnection.query(query, [id, numeroRecotizacion, cotizacion_id, descripcion_doc, revicion_inicial, cantidad_doc, HHUnidades, total, revision_unica, observacion, modificar_lista, proveerdor, viatico, list_docs_id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'datosCotiazacion Updated'});
    } else {
      console.log(err);
    }
  });

});

module.exports = router;