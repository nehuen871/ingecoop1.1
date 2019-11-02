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

// INSERT An certificacion
router.post('/', (req, res) => {
  const {control_id, control_cotizacion_id, numeroDePedido, proyecto, especialidad, fechaDeEmision, moneda, costoHoraDoc, cantdeHs, cantdeDocs, porcentajeAvance, horasCertificadas, cetifiacacionInterna_id, total_certificacion} = req.body;
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
    SET @cetifiacacionInterna_id = ?;
    SET @total_certificacion = ?;
    CALL certificacionAddOrEdit(@id, @control_id,@control_cotizacion_id,@numeroDePedido,@proyecto,@especialidad,@fechaDeEmision,@moneda,@costoHoraDoc,@cantdeHs,@cantdeDocs,@porcentajeAvance,@horasCertificadas,@cetifiacacionInterna_id,@total_certificacion);
  `;
  mysqlConnection.query(query, [control_id, control_cotizacion_id, numeroDePedido, proyecto, especialidad, fechaDeEmision, moneda, costoHoraDoc, cantdeHs, cantdeDocs, porcentajeAvance, horasCertificadas, cetifiacacionInterna_id, total_certificacion], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'certificacion Saved'});
    } else {
      console.log(err);
    }
  });

});

router.put('/:id', (req, res) => {
  const { control_id, control_cotizacion_id, numeroDePedido, proyecto, especialidad, fechaDeEmision, moneda, costoHoraDoc, cantdeHs, cantdeDocs, porcentajeAvance, horasCertificadas, cetifiacacionInterna_id, total_certificacion } = req.body;
  const { id } = req.params;
  const query = `
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
    SET @cetifiacacionInterna_id = ?;
    SET @total_certificacion = ?;
    CALL certificacionAddOrEdit(@control_id,@control_cotizacion_id,@numeroDePedido,@proyecto,@especialidad,@fechaDeEmision,@moneda,@costoHoraDoc,@cantdeHs,@cantdeDocs,@porcentajeAvance,@horasCertificadas,@cetifiacacionInterna_id,@total_certificacion);
  `;
  mysqlConnection.query(query, [id, control_id, control_cotizacion_id, numeroDePedido, proyecto, especialidad, fechaDeEmision, moneda, costoHoraDoc, cantdeHs, cantdeDocs, porcentajeAvance, horasCertificadas, cetifiacacionInterna_id, total_certificacion], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'certificacion Updated'});
    } else {
      console.log(err);
    }
  });

});




module.exports = router;