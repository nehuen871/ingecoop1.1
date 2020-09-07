const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../db/database.js');

// GET all list_docs
router.get('/', (req, res) => {
  mysqlConnection.query('SELECT * FROM list_docs', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

// GET An list_docs
router.get('/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('SELECT * FROM list_docs WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

// DELETE An list_docs
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM list_docs WHERE id = ?', [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'list_docs Deleted'});
    } else {
      console.log(err);
    }
  });
});

// INSERT An list_docs
router.post('/', (req, res) => {
  let {nombre,cantidad_de_doc, total_hh, especialidad, tipodocumento, titulo_documento} = req.body;
  if(nombre===''){nombre=null};
  if(cantidad_de_doc===''){cantidad_de_doc=null};
  if(total_hh===''){total_hh=null};
  if(especialidad===''){especialidad=null};
  if(tipodocumento===''){tipodocumento=null};
  if(titulo_documento===''){titulo_documento=null};
  const query = `
    SET @id = 0;
    SET @nombre = ?;
    SET @cantidad_de_doc = ?;
    SET @total_hh = ?;
    SET @especialidad = ?;
    SET @tipodocumento = ?;
    SET @titulo_documento = ?;
    CALL list_docsAddOrEdit(@id, @nombre,@cantidad_de_doc,@total_hh,@especialidad,@tipodocumento,@titulo_documento);
  `;
  mysqlConnection.query(query, [nombre,cantidad_de_doc, total_hh, especialidad, tipodocumento, titulo_documento], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'list_docs Saved'});
    } else {
      console.log(err);
    }
  });
});

router.put('/:id', (req, res) => {
  let { nombre,cantidad_de_doc, total_hh, especialidad, tipodocumento, titulo_documento } = req.body;
  if(nombre===''){nombre=null};
  if(cantidad_de_doc===''){cantidad_de_doc=null};
  if(total_hh===''){total_hh=null};
  if(especialidad===''){especialidad=null};
  if(tipodocumento===''){tipodocumento=null};
  if(titulo_documento===''){titulo_documento=null};
  const { id } = req.params;
  const query = `
    SET @id = ?;
    SET @nombre = ?;
    SET @cantidad_de_doc = ?;
    SET @total_hh = ?;
    SET @especialidad = ?;
    SET @tipodocumento = ?;
    SET @titulo_documento = ?;
    CALL list_docsAddOrEdit(@id, @nombre,@cantidad_de_doc,@total_hh,@especialidad,@tipodocumento,@titulo_documento);
  `;
  mysqlConnection.query(query, [id, nombre,cantidad_de_doc, total_hh, especialidad, tipodocumento, titulo_documento], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'list_docs Updated'});
    } else {
      console.log(err);
    }
  });

});

module.exports = router;