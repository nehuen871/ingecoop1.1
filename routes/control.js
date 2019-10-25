const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../db/database.js');

// GET all control
router.get('/', (req, res) => {
  mysqlConnection.query('SELECT * FROM control', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

// GET An control
router.get('/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('SELECT * FROM control WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

// DELETE An control
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM control WHERE id = ?', [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'control Deleted'});
    } else {
      console.log(err);
    }
  });
});

// INSERT An control
router.post('/', (req, res) => {
  const {cotizacion_id, cotizacion_proyecto_id, fecha_emision_proyectada, revision, fecha_envio_1, remito_1, calificaion_1, fecha_calificaion, numero_documento, numero_control, numero_doc, remito_2, remito_3, remito_4, remito_5, remito_6, remito_7, remito_8, remito_9, remito_10, fecha_envio_2, fecha_envio_3, fecha_envio_4, fecha_envio_5, fecha_envio_6, fecha_envio_7, fecha_envio_8, fecha_envio_9, fecha_envio_10, calificaion_2, calificaion_3, calificaion_4, calificaion_5, calificaion_6, calificaion_7, calificaion_8, calificaion_9, calificaion_10} = req.body;
  const query = `
    SET @id = 0;
    SET @cotizacion_id = ?;
    SET @cotizacion_proyecto_id = ?;
    SET @fecha_emision_proyectada = ?;
    SET @revision = ?;
    SET @fecha_envio_1 = ?;
    SET @remito_1 = ?;
    SET @calificaion_1 = ?;
    SET @fecha_calificaion = ?;
    SET @numero_documento = ?;
    SET @numero_control = ?;
    SET @numero_doc = ?;
    SET @remito_2 = ?;
    SET @remito_3 = ?;
    SET @remito_4 = ?;
    SET @remito_5 = ?;
    SET @remito_6 = ?;
    SET @remito_7 = ?;
    SET @remito_8 = ?;
    SET @remito_9 = ?;
    SET @remito_10 = ?;
    SET @fecha_envio_2 = ?;
    SET @fecha_envio_3 = ?;
    SET @fecha_envio_4 = ?;
    SET @fecha_envio_5 = ?;
    SET @fecha_envio_6 = ?;
    SET @fecha_envio_7 = ?;
    SET @fecha_envio_8 = ?;
    SET @fecha_envio_9 = ?;
    SET @fecha_envio_10 = ?;
    SET @calificaion_2 = ?;
    SET @calificaion_3 = ?;
    SET @calificaion_4 = ?;
    SET @calificaion_5 = ?;
    SET @calificaion_6 = ?;
    SET @calificaion_7 = ?;
    SET @calificaion_8 = ?;
    SET @calificaion_9 = ?;
    SET @calificaion_10 = ?;
    CALL ComercioAddOrEdit(@id, @cotizacion_id,@cotizacion_proyecto_id,@fecha_emision_proyectada,@revision,@fecha_envio_1,@remito_1,@calificaion_1,@fecha_calificaion,@numero_documento,@numero_control,@numero_doc,@remito_2,@remito_3,@remito_4,@remito_5,@remito_6,@remito_7,@remito_8,@remito_9,@remito_10,@fecha_envio_2,@fecha_envio_3,@fecha_envio_4,@fecha_envio_5,@fecha_envio_6,@fecha_envio_7,@fecha_envio_8,@fecha_envio_9,@fecha_envio_10,@calificaion_2,@calificaion_3,@calificaion_4,@calificaion_5,@calificaion_6,@calificaion_7,@calificaion_8,@calificaion_9,@calificaion_10);
  `;
  mysqlConnection.query(query, [cotizacion_id, cotizacion_proyecto_id, fecha_emision_proyectada, revision, fecha_envio_1, remito_1, calificaion_1, fecha_calificaion, numero_documento, numero_control, numero_doc, remito_2, remito_3, remito_4, remito_5, remito_6, remito_7, remito_8, remito_9, remito_10, fecha_envio_2, fecha_envio_3, fecha_envio_4, fecha_envio_5, fecha_envio_6, fecha_envio_7, fecha_envio_8, fecha_envio_9, fecha_envio_10, calificaion_2, calificaion_3, calificaion_4, calificaion_5, calificaion_6, calificaion_7, calificaion_8, calificaion_9, calificaion_10], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'control Saved'});
    } else {
      console.log(err);
    }
  });

});

router.put('/:id', (req, res) => {
  const { cotizacion_id, cotizacion_proyecto_id, fecha_emision_proyectada, revision, fecha_envio_1, remito_1, calificaion_1, fecha_calificaion, numero_documento, numero_control, numero_doc, remito_2, remito_3, remito_4, remito_5, remito_6, remito_7, remito_8, remito_9, remito_10, fecha_envio_2, fecha_envio_3, fecha_envio_4, fecha_envio_5, fecha_envio_6, fecha_envio_7, fecha_envio_8, fecha_envio_9, fecha_envio_10, calificaion_2, calificaion_3, calificaion_4, calificaion_5, calificaion_6, calificaion_7, calificaion_8, calificaion_9, calificaion_10 } = req.body;
  const { id } = req.params;
  const query = `
    SET @id = ?;
    SET @cotizacion_id = ?;
    SET @cotizacion_proyecto_id = ?;
    SET @fecha_emision_proyectada = ?;
    SET @revision = ?;
    SET @fecha_envio_1 = ?;
    SET @remito_1 = ?;
    SET @calificaion_1 = ?;
    SET @fecha_calificaion = ?;
    SET @numero_documento = ?;
    SET @numero_control = ?;
    SET @numero_doc = ?;
    SET @remito_2 = ?;
    SET @remito_3 = ?;
    SET @remito_4 = ?;
    SET @remito_5 = ?;
    SET @remito_6 = ?;
    SET @remito_7 = ?;
    SET @remito_8 = ?;
    SET @remito_9 = ?;
    SET @remito_10 = ?;
    SET @fecha_envio_2 = ?;
    SET @fecha_envio_3 = ?;
    SET @fecha_envio_4 = ?;
    SET @fecha_envio_5 = ?;
    SET @fecha_envio_6 = ?;
    SET @fecha_envio_7 = ?;
    SET @fecha_envio_8 = ?;
    SET @fecha_envio_9 = ?;
    SET @fecha_envio_10 = ?;
    SET @calificaion_2 = ?;
    SET @calificaion_3 = ?;
    SET @calificaion_4 = ?;
    SET @calificaion_5 = ?;
    SET @calificaion_6 = ?;
    SET @calificaion_7 = ?;
    SET @calificaion_8 = ?;
    SET @calificaion_9 = ?;
    SET @calificaion_10 = ?;
    CALL controlAddOrEdit(@id, @cotizacion_id,@cotizacion_proyecto_id,@fecha_emision_proyectada,@revision,@fecha_envio_1,@remito_1,@calificaion_1,@fecha_calificaion,@numero_documento,@numero_control,@numero_doc,@remito_2,@remito_3,@remito_4,@remito_5,@remito_6,@remito_7,@remito_8,@remito_9,@remito_10,@fecha_envio_2,@fecha_envio_3,@fecha_envio_4,@fecha_envio_5,@fecha_envio_6,@fecha_envio_7,@fecha_envio_8,@fecha_envio_9,@fecha_envio_10,@calificaion_2,@calificaion_3,@calificaion_4,@calificaion_5,@calificaion_6,@calificaion_7,@calificaion_8,@calificaion_9,@calificaion_10);
  `;
  mysqlConnection.query(query, [id, cotizacion_id, cotizacion_proyecto_id, fecha_emision_proyectada, revision, fecha_envio_1, remito_1, calificaion_1, fecha_calificaion, numero_documento, numero_control, numero_doc, remito_2, remito_3, remito_4, remito_5, remito_6, remito_7, remito_8, remito_9, remito_10, fecha_envio_2, fecha_envio_3, fecha_envio_4, fecha_envio_5, fecha_envio_6, fecha_envio_7, fecha_envio_8, fecha_envio_9, fecha_envio_10, calificaion_2, calificaion_3, calificaion_4, calificaion_5, calificaion_6, calificaion_7, calificaion_8, calificaion_9, calificaion_10], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'control Updated'});
    } else {
      console.log(err);
    }
  });

});




module.exports = router;