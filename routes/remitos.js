const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../db/database.js');

// GET all remitos
router.get('/', (req, res) => {
  mysqlConnection.query('SELECT remitos.*,cotizacion.titulo_cotiazacion as tituloCotiazacion,control.codigo_unificador as identificadorControl FROM remitos join cotizacion on cotizacion.id = remitos.control_cotizacion_id join control on control.id = remitos.control_id', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      res.json(err);
    }
  });
});

//Get all remitos from cotizacion
router.post('/getRemitosFromCotizacion', (req, res) => {
  let {id} = req.body;
  const query = `
  SELECT remitos.id as id, remitos.remito as nombre, remitos.control_cotizacion_id as cotizacionId FROM remitos where control_cotizacion_id = ?;`;
  mysqlConnection.query(query,[id], (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      res.json(err);
    }
  });
});

//Get all remitos from cotizacion
router.post('/fromControl', (req, res) => {
  let {id} = req.body;
  const query = `
  SELECT remitos.id as id, remitos.remito as nombre, remitos.control_id as controlId FROM remitos where remitos.control_id = ?;`;
  mysqlConnection.query(query,[id], (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      res.json(err);
    }
  });
});
//Get cotizacion and control data from remitos
router.post('/dataFromRemitos', (req, res) => {
  let {id} = req.body;
  const query = `SELECT * FROM remitos WHERE remitos.id = ?;`;
  mysqlConnection.query(query,[id], (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      res.json(err);
    }
  });
});

// GET An remitos
router.get('/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('SELECT * FROM remitos WHERE id = ?', [id], (err, rows, fields) => {
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
  mysqlConnection.query('DELETE FROM remitos WHERE id = ?', [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'remitos Deleted'});
    } else {
      res.json(err);
    }
  });
});

// INSERT An proyecto
router.post('/', (req, res) => {
  let {remito,fecha_envio,control_id,control_cotizacion_id,codigo_unificador} = req.body;
  if(remito == '' || remito === 'Invalid date'){remito = null};
  if(fecha_envio == '' || fecha_envio === 'Invalid date'){fecha_envio = null};
  const query = `
    SET @id = 0;
    SET @remito = ?;
    SET @fecha_envio = ?;
    SET @control_id = ?;
    SET @control_cotizacion_id = ?;
    SET @codigo_unificador = ?;
    CALL remitosAddOrEdit(@id, @remito,@fecha_envio,@control_id,@control_cotizacion_id,@codigo_unificador);
  `;
  mysqlConnection.query(query, [remito,fecha_envio,control_id,control_cotizacion_id,codigo_unificador], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'remitos Saved'});
    } else {
      res.json(err);
    }
  });

});

router.put('/:id', (req, res) => {
  let { remito,fecha_envio,control_id,control_cotizacion_id,codigo_unificador} = req.body;
  if(remito == '' || remito === 'Invalid date'){remito = null};
  if(fecha_envio == '' || fecha_envio === 'Invalid date'){fecha_envio = null};
  const { id } = req.params;
  const query = `
    SET @id = ?;
    SET @remito = ?;
    SET @fecha_envio = ?;
    SET @control_id = ?;
    SET @control_cotizacion_id = ?;
    SET @codigo_unificador = ?;
    CALL remitosAddOrEdit(@id, @remito,@fecha_envio,@control_id,@control_cotizacion_id,@codigo_unificador);
  `;
  mysqlConnection.query(query, [id, remito,fecha_envio,control_id,control_cotizacion_id,codigo_unificador], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'remitos Updated'});
    } else {
      res.json(err);
    }
  });

});

module.exports = router;
