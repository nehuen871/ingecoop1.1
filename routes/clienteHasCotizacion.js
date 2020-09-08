const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../db/database.js');

// GET all cliente_has_cotizacion
router.get('/', (req, res) => {
  mysqlConnection.query('SELECT * FROM cliente_has_cotizacion INNER JOIN cliente USING (id) INNER JOIN cotizacion USING (id);', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      res.json(err);
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
      res.json(err);
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
      res.json(err);
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
      res.json(err);
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
      res.json(err);
    }
  });

});

module.exports = router;
