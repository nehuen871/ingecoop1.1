const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../db/database.js');

// GET all certificacion
router.get('/', (req, res) => {
  mysqlConnection.query('SELECT certificacion.*,cotizacion.titulo_cotiazacion as tituloCotiazacion,control.codigo_unificador as codigoControl FROM certificacion join cotizacion on cotizacion.id = certificacion.control_cotizacion_id join control on control.id = certificacion.control_id', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      res.json(err);
    }
  });
});

// GET An certificacion
router.get('/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('SELECT * FROM certificacion WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      res.json(err);
    }
  });
});

// DELETE An certificacion
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM certificacion WHERE id = ?', [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'certificacion Deleted'});
    } else {
      res.json(err);
    }
  });
});

router.post('/dataById', (req, res) => {
  let {id} = req.body;
  const query = `
  SELECT certificacion.id,certificacion.numeroDePedido as nombre,certificacion.control_id FROM certificacion where certificacion.id = ?;`;
  mysqlConnection.query(query,[id], (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      res.json(err);
    }
  });
});

router.post('/dataByIdControl', (req, res) => {
  let {id} = req.body;
  const query = `
  SELECT certificacion.id,certificacion.numeroDePedido as nombre,certificacion.control_id FROM certificacion where certificacion.control_id = ?;`;
  mysqlConnection.query(query,[id], (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      res.json(err);
    }
  });
});
// INSERT An certificacion
router.post('/', (req, res) => {
  let {control_id, control_cotizacion_id, numeroDePedido, proyecto, especialidad, fechaDeEmision, moneda, codigo_unificador} = req.body;
  if(numeroDePedido === ''){numeroDePedido=null};
  if(proyecto === ''){proyecto=null};
  if(especialidad === ''){especialidad=null};
  if(fechaDeEmision === '' || fechaDeEmision === 'Invalid date'){fechaDeEmision=null};
  if(moneda === ''){moneda=null};
  const query = `
    SET @id = 0;
    SET @control_id = ?;
    SET @control_cotizacion_id = ?;
    SET @numeroDePedido = ?;
    SET @proyecto = ?;
    SET @especialidad = ?;
    SET @fechaDeEmision = ?;
    SET @moneda = ?;
    SET @codigo_unificador = ?;
    CALL certificacionAddOrEdit(@id, @control_id,@control_cotizacion_id,@numeroDePedido,@proyecto,@especialidad,@fechaDeEmision,@moneda,@codigo_unificador);
  `;
  mysqlConnection.query(query, [control_id, control_cotizacion_id, numeroDePedido, proyecto, especialidad, fechaDeEmision, moneda, codigo_unificador], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'certificacion Saved'});
    } else {
      res.json(err);
    }
  });

});

router.put('/:id', (req, res) => {
  let { control_id, control_cotizacion_id, numeroDePedido, proyecto, especialidad, fechaDeEmision, moneda, codigo_unificador} = req.body;
  if(numeroDePedido === ''){numeroDePedido=null};
  if(proyecto === ''){proyecto=null};
  if(especialidad === ''){especialidad=null};
  if(fechaDeEmision === '' || fechaDeEmision === 'Invalid date'){fechaDeEmision=null};
  if(moneda === ''){moneda=null};
  const { id } = req.params;
  const query = `
    SET @id = ?;
    SET @control_id = ?;
    SET @control_cotizacion_id = ?;
    SET @numeroDePedido = ?;
    SET @proyecto = ?;
    SET @especialidad = ?;
    SET @fechaDeEmision = ?;
    SET @moneda = ?;
    SET @codigo_unificador = ?;
    CALL certificacionAddOrEdit(@id,@control_id,@control_cotizacion_id,@numeroDePedido,@proyecto,@especialidad,@fechaDeEmision,@moneda,@codigo_unificador);
  `;
  mysqlConnection.query(query, [id, control_id, control_cotizacion_id, numeroDePedido, proyecto, especialidad, fechaDeEmision, moneda, codigo_unificador], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'certificacion Updated'});
    } else {
      res.json(err);
    }
  });
});


router.get('/codigoUnificador/:code', (req, res) => {
  const { code } = req.params;
  mysqlConnection.query('SELECT certificacion.*,cotizacion.titulo_cotiazacion as tituloCotiazacion,control.codigo_unificador as codigoControl FROM certificacion join cotizacion on cotizacion.id = certificacion.control_cotizacion_id join control on control.id = certificacion.control_id WHERE certificacion.codigo_unificador = ?;',[code], (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      res.json(err);
    }
  });
});



module.exports = router;