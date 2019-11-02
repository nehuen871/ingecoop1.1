const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../db/database.js');

// GET all cliente
router.get('/', (req, res) => {
  mysqlConnection.query('SELECT * FROM cliente', (err, rows, fields) => {
    if(!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
});

// GET An cliente
router.get('/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('SELECT * FROM cliente WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

// DELETE An cliente
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM cliente WHERE id = ?', [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'cliente Deleted'});
    } else {
      console.log(err);
    }
  });
});

// INSERT An cliente
router.post('/', (req, res) => {
  const {nombre,codigoCliente,cotizacion_id} = req.body;
  const query = `
    SET @id=0;
    SET @nombre=?;
    SET @codigoCliente=?;
    SET @cotizacion_id=?;
    CALL clienteAddOrEdit(@id,@nombre,@codigoCliente,@cotizacion_id);
  `;
  mysqlConnection.query(query, [nombre,codigoCliente,cotizacion_id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'cliente Saved'});
    } else {
      console.log(err);
    }
  });
});

router.put('/:id', (req, res) => {
  const { nombre,codigoCliente } = req.body;
  const { id } = req.params;
  const query = `
    SET @id = ?;
    SET @nombre = ?;
    SET @codigoCliente = ?;
    SET @cotizacion_id = ?;
    CALL clienteAddOrEdit(@id,@nombre,@codigoCliente,@cotizacion_id);
  `;
  mysqlConnection.query(query, [id, nombre,codigoCliente,cotizacion_id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'cliente Updated'});
    } else {
      console.log(err);
    }
  });

});

module.exports = router;