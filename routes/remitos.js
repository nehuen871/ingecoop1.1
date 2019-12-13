const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../db/database.js');

// GET all remitos
router.get('/', (req, res) => {
  mysqlConnection.query('SELECT * FROM remitos', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
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
      console.log(err);
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
      console.log(err);
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
      console.log(err);
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
      console.log(err);
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
      console.log(err);
    }
  });
});

// INSERT An proyecto
router.post('/', (req, res) => {
  let {remito,fecha_envio,calificacion,control_id,control_cotizacion_id} = req.body;
  if(remito == '' || remito === 'Invalid date'){remito = null};
  if(fecha_envio == '' || fecha_envio === 'Invalid date'){fecha_envio = null};
  if(calificacion == '' || calificacion === 'Invalid date'){calificacion = null};
  const query = `
    SET @id = 0;
    SET @remito = ?;
    SET @fecha_envio = ?;
    SET @calificacion = ?;
    SET @control_id = ?;
    SET @control_cotizacion_id = ?;
    CALL remitosAddOrEdit(@id, @remito,@fecha_envio,@calificacion,@control_id,@control_cotizacion_id);
  `;
  mysqlConnection.query(query, [remito,fecha_envio,calificacion,control_id,control_cotizacion_id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'remitos Saved'});
    } else {
      console.log(err);
    }
  });

});

router.put('/:id', (req, res) => {
  let { remito,fecha_envio,calificacion,control_id,control_cotizacion_id} = req.body;
  if(remito == '' || remito === 'Invalid date'){remito = null};
  if(fecha_envio == '' || fecha_envio === 'Invalid date'){fecha_envio = null};
  if(calificacion == '' || calificacion === 'Invalid date'){calificacion = null};
  const { id } = req.params;
  const query = `
    SET @id = ?;
    SET @remito = ?;
    SET @fecha_envio = ?;
    SET @calificacion = ?;
    SET @control_id = ?;
    SET @control_cotizacion_id = ?;
    CALL remitosAddOrEdit(@id, @remito,@fecha_envio,@calificacion,@control_id,@control_cotizacion_id);
  `;
  mysqlConnection.query(query, [id, remito,fecha_envio,calificacion,control_id,control_cotizacion_id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'remitos Updated'});
    } else {
      console.log(err);
    }
  });

});

module.exports = router;
