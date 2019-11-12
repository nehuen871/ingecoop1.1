const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../db/database.js');


if(fehca_inicio == ''  || fehca_inicio === 'Invalid date'){fehca_inicio = null};
cliente_id
cotizacion_id

// GET all cliente_has_cotizacion
router.get('/', (req, res) => {
  mysqlConnection.query('SELECT * FROM cliente_has_cotizacion', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

// GET An cliente_has_cotizacion
router.get('/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('SELECT * FROM cliente_has_cotizacion WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

// DELETE An cliente_has_cotizacion
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM cliente_has_cotizacion WHERE id = ?', [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'cliente_has_cotizacion Deleted'});
    } else {
      console.log(err);
    }
  });
});

// INSERT An cliente_has_cotizacion
router.post('/', (req, res) => {
  let {cliente_id,cotizacion_id} = req.body;
  const query = `
  SET @id = 0;
  SET @cliente_id = ?;
  SET @cotizacion_id = ?;
    CALL clienteHasCotizacionAddOrEdit(@id,@cliente_id,@cotizacion_id);
  `;
  mysqlConnection.query(query, [cliente_id,cotizacion_id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'cliente_has_cotizacion Saved'});
    } else {
      console.log(err);
    }
  });

});

router.put('/:id', (req, res) => {
  let {cliente_id,cotizacion_id} = req.body;
  const { id } = req.params;
  const query = `
  SET @id = ?;
  SET @cliente_id = ?;
  SET @cotizacion_id = ?;
    CALL clienteHasCotizacionAddOrEdit(@id,@cliente_id,@cotizacion_id);
  `;
  mysqlConnection.query(query, [id,cliente_id,cotizacion_id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'cliente_has_cotizacion Updated'});
    } else {
      console.log(err);
    }
  });

});

module.exports = router;
