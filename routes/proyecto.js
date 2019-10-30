const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../db/database.js');

// GET all proyecto
router.get('/', (req, res) => {
  mysqlConnection.query('SELECT * FROM proyecto', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

// GET An proyecto
router.get('/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('SELECT * FROM proyecto WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

// DELETE An proyecto
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM proyecto WHERE id = ?', [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'proyecto Deleted'});
    } else {
      console.log(err);
    }
  });
});

// INSERT An proyecto
router.post('/', (req, res) => {
  const {nombre,numero_proyecto,cliente,fehca_inicio,fecha_fin} = req.body;
  const query = `
    SET @id = 0;
    SET @nombre = ?;
    SET @numero_proyecto = ?;
    SET @cliente = ?;
    SET @fehca_inicio = ?;
    SET @fecha_fin = ?;
    CALL proyectoAddOrEdit(@id, @nombre,@numero_proyecto,@cliente,@fehca_inicio,@fecha_fin);
  `;
  mysqlConnection.query(query, [nombre,numero_proyecto,cliente,fehca_inicio,fecha_fin], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'proyecto Saved'});
    } else {
      console.log(err);
    }
  });

});

router.put('/:id', (req, res) => {
  const { nombre,numero_proyecto,cliente,fehca_inicio,fecha_fin } = req.body;
  const { id } = req.params;
  const query = `
    SET @id = ?;
    SET @nombre = ?;
    SET @numero_proyecto = ?;
    SET @cliente = ?;
    SET @fehca_inicio = ?;
    SET @fecha_fin = ?;
    CALL proyectoAddOrEdit(@id, @nombre,@numero_proyecto,@cliente,@fehca_inicio,@fecha_fin);
  `;
  mysqlConnection.query(query, [id, nombre,numero_proyecto,cliente,fehca_inicio,fecha_fin], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'proyecto Updated'});
    } else {
      console.log(err);
    }
  });

});

module.exports = router;
