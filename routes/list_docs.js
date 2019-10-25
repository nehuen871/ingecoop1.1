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
  const {nombre,cantidad_de_doc, total_hh, especialidad, lista_de_cable} = req.body;
  const query = `
    SET @id = ?;
    SET @nombre = ?;
    SET @cantidad_de_doc = ?;
    SET @total_hh = ?;
    SET @especialidad = ?;
    SET @ista_de_cable = ?;
    CALL ComercioAddOrEdit(@id, @nombre,@cantidad_de_doc,@total_hh,@especialidad,@lista_de_cable);
  `;
  mysqlConnection.query(query, [nombre,cantidad_de_doc, total_hh, especialidad, lista_de_cable], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'list_docs Saved'});
    } else {
      console.log(err);
    }
  });

});

router.put('/:id', (req, res) => {
  const { nombre,cantidad_de_doc, total_hh, especialidad, lista_de_cable } = req.body;
  const { id } = req.params;
  const query = `
    SET @id = ?;
    SET @nombre = ?;
    SET @cantidad_de_doc = ?;
    SET @total_hh = ?;
    SET @especialidad = ?;
    SET @ista_de_cable = ?;
    CALL list_docsAddOrEdit(@id, @nombre,@cantidad_de_doc,@total_hh,@especialidad,@lista_de_cable);
  `;
  mysqlConnection.query(query, [id, nombre,cantidad_de_doc, total_hh, especialidad, lista_de_cable], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'list_docs Updated'});
    } else {
      console.log(err);
    }
  });

});

module.exports = router;