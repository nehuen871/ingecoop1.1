const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../db/database.js');

// GET all certificacion
router.get('/', (req, res) => {
  mysqlConnection.query('SELECT * FROM certificacion', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
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
      console.log(err);
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
      console.log(err);
    }
  });
});
//Get all remitos from cotizacion
router.post('/controlChild', (req, res) => {
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
router.post('/dataById', (req, res) => {
  let {id} = req.body;
  const query = `
  SELECT certificacion.id,certificacion.numeroDePedido as nombre,certificacion.control_id FROM certificacion where certificacion.id = ?;`;
  mysqlConnection.query(query,[id], (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});
// INSERT An certificacion
router.post('/', (req, res) => {
  let {control_id, control_cotizacion_id, numeroDePedido, proyecto, especialidad, fechaDeEmision, moneda, costoHoraDoc, cantdeHs, cantdeDocs, porcentajeAvance, horasCertificadas, total_certificacion} = req.body;
  if(numeroDePedido === ''){numeroDePedido=null};
  if(proyecto === ''){proyecto=null};
  if(especialidad === ''){especialidad=null};
  if(fechaDeEmision === '' || fechaDeEmision === 'Invalid date'){fechaDeEmision=null};
  if(moneda === ''){moneda=null};
  if(costoHoraDoc === ''){costoHoraDoc=null};
  if(cantdeHs === ''){cantdeHs=null};
  if(cantdeDocs === ''){cantdeDocs=null};
  if(porcentajeAvance === ''){porcentajeAvance=null};
  if(horasCertificadas === ''){horasCertificadas=null};
  if(total_certificacion === ''){total_certificacion=null};
  const query = `
    SET @id = 0;
    SET @control_id = ?;
    SET @control_cotizacion_id = ?;
    SET @numeroDePedido = ?;
    SET @proyecto = ?;
    SET @especialidad = ?;
    SET @fechaDeEmision = ?;
    SET @moneda = ?;
    SET @costoHoraDoc = ?;
    SET @cantdeHs = ?;
    SET @cantdeDocs = ?;
    SET @porcentajeAvance = ?;
    SET @horasCertificadas = ?;
    SET @total_certificacion = ?;
    CALL certificacionAddOrEdit(@id, @control_id,@control_cotizacion_id,@numeroDePedido,@proyecto,@especialidad,@fechaDeEmision,@moneda,@costoHoraDoc,@cantdeHs,@cantdeDocs,@porcentajeAvance,@horasCertificadas,@total_certificacion);
  `;
  mysqlConnection.query(query, [control_id, control_cotizacion_id, numeroDePedido, proyecto, especialidad, fechaDeEmision, moneda, costoHoraDoc, cantdeHs, cantdeDocs, porcentajeAvance, horasCertificadas, total_certificacion], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'certificacion Saved'});
    } else {
      console.log(err);
    }
  });

});

router.put('/:id', (req, res) => {
  let { control_id, control_cotizacion_id, numeroDePedido, proyecto, especialidad, fechaDeEmision, moneda, costoHoraDoc, cantdeHs, cantdeDocs, porcentajeAvance, horasCertificadas, total_certificacion } = req.body;
  if(numeroDePedido === ''){numeroDePedido=null};
  if(proyecto === ''){proyecto=null};
  if(especialidad === ''){especialidad=null};
  if(fechaDeEmision === '' || fechaDeEmision === 'Invalid date'){fechaDeEmision=null};
  if(moneda === ''){moneda=null};
  if(costoHoraDoc === ''){costoHoraDoc=null};
  if(cantdeHs === ''){cantdeHs=null};
  if(cantdeDocs === ''){cantdeDocs=null};
  if(porcentajeAvance === ''){porcentajeAvance=null};
  if(horasCertificadas === ''){horasCertificadas=null};
  if(total_certificacion === ''){total_certificacion=null};
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
    SET @costoHoraDoc = ?;
    SET @cantdeHs = ?;
    SET @cantdeDocs = ?;
    SET @porcentajeAvance = ?;
    SET @horasCertificadas = ?;
    SET @total_certificacion = ?;
    CALL certificacionAddOrEdit(@id,@control_id,@control_cotizacion_id,@numeroDePedido,@proyecto,@especialidad,@fechaDeEmision,@moneda,@costoHoraDoc,@cantdeHs,@cantdeDocs,@porcentajeAvance,@horasCertificadas,@total_certificacion);
  `;
  mysqlConnection.query(query, [id, control_id, control_cotizacion_id, numeroDePedido, proyecto, especialidad, fechaDeEmision, moneda, costoHoraDoc, cantdeHs, cantdeDocs, porcentajeAvance, horasCertificadas, total_certificacion], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'certificacion Updated'});
    } else {
      console.log(err);
    }
  });

});




module.exports = router;