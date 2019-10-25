const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../db/database.js');

// GET all cotizacion
router.get('/', (req, res) => {
  mysqlConnection.query('SELECT * FROM cotizacion', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

// GET An cotizacion
router.get('/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('SELECT * FROM cotizacion WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

// DELETE An cotizacion
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM cotizacion WHERE id = ?', [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'cotizacion Deleted'});
    } else {
      console.log(err);
    }
  });
});

// INSERT An cotizacion
router.post('/', (req, res) => {
  const {cantidadCotiazaciones,cliente_id, fecha, proyecto_id, fin_cotizacion} = req.body;
  const query = `
    SET @id = 0;
    SET @cantidadCotiazaciones = ?;
    SET @cliente_id = ?;
    SET @fecha = ?;
    SET @proyecto_id = ?;
    SET @fin_cotizacion = ?;

    CALL ComercioAddOrEdit(@id, @cantidadCotiazaciones,@cliente_id,@fecha,@proyecto_id,@fin_cotizacion);
  `;
  mysqlConnection.query(query, [cantidadCotiazaciones,cliente_id, fecha, proyecto_id, fin_cotizacion], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'cotizacion Saved'});
    } else {
      console.log(err);
    }
  });

});

router.put('/:id', (req, res) => {
  const { cantidadCotiazaciones,cliente_id, fecha, proyecto_id, fin_cotizacion } = req.body;
  const { id } = req.params;
  const query = `
    SET @id = ?;
    SET @cantidadCotiazaciones = ?;
    SET @cliente_id = ?;
    SET @fecha = ?;
    SET @proyecto_id = ?;
    SET @fin_cotizacion = ?;

    CALL cotizacionAddOrEdit(@id, @cantidadCotiazaciones,@cliente_id,@fecha,@proyecto_id,@fin_cotizacion);
  `;
  mysqlConnection.query(query, [id, cantidadCotiazaciones,cliente_id, fecha, proyecto_id, fin_cotizacion], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'cotizacion Updated'});
    } else {
      console.log(err);
    }
  });

});

module.exports = router;