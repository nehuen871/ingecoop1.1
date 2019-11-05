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
  let {cotizacion_id, fecha_emision_proyectada, revision, fecha_envio_1, remito_1, calificaion_1, fecha_calificaion, numero_documento, numero_control, numero_doc, remito_2, remito_3, remito_4, remito_5, remito_6, remito_7, remito_8, remito_9, remito_10, fecha_envio_2, fecha_envio_3, fecha_envio_4, fecha_envio_5, fecha_envio_6, fecha_envio_7, fecha_envio_8, fecha_envio_9, fecha_envio_10, calificaion_2, calificaion_3, calificaion_4, calificaion_5, calificaion_6, calificaion_7, calificaion_8, calificaion_9, calificaion_10} = req.body;
  if(fecha_emision_proyectada == ''){fecha_emision_proyectada = null};
  if(revision == ''){revision = null};
  if(fecha_envio_1 == ''){fecha_envio_1 = null};
  if(remito_1 == ''){remito_1 = null};
  if(calificaion_1 == ''){calificaion_1 = null};
  if(fecha_calificaion == ''){fecha_calificaion = null};
  if(numero_documento == ''){numero_documento = null};
  if(numero_control == ''){numero_control = null};
  if(numero_doc == ''){numero_doc = null};
  if(remito_2 == ''){remito_2 = null};
  if(remito_3 == ''){remito_3 = null};
  if(remito_4 == ''){remito_4 = null};
  if(remito_5 == ''){remito_5 = null};
  if(remito_6 == ''){remito_6 = null};
  if(remito_7 == ''){remito_7 = null};
  if(remito_8 == ''){remito_8 = null};
  if(remito_9 == ''){remito_9 = null};
  if(remito_10 == ''){remito_10 = null};
  if(fecha_envio_2 == ''){fecha_envio_2 = null};
  if(fecha_envio_3 == ''){fecha_envio_3 = null};
  if(fecha_envio_4 == ''){fecha_envio_4 = null};
  if(fecha_envio_5 == ''){fecha_envio_5 = null};
  if(fecha_envio_6 == ''){fecha_envio_6 = null};
  if(fecha_envio_7 == ''){fecha_envio_7 = null};
  if(fecha_envio_8 == ''){fecha_envio_8 = null};
  if(fecha_envio_9 == ''){fecha_envio_9 = null};
  if(fecha_envio_10 == ''){fecha_envio_10 = null};
  if(calificaion_2 == ''){calificaion_2 = null};
  if(calificaion_3 == ''){calificaion_3 = null};
  if(calificaion_4 == ''){calificaion_4 = null};
  if(calificaion_5 == ''){calificaion_5 = null};
  if(calificaion_6 == ''){calificaion_6 = null};
  if(calificaion_7 == ''){calificaion_7 = null};
  if(calificaion_8 == ''){calificaion_8 = null};
  if(calificaion_9 == ''){calificaion_9 = null};
  if(calificaion_10 == ''){calificaion_10 = null};
  const query = `
    SET @id = 0;
    SET @cotizacion_id = ?;
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
    CALL controlAddOrEdit(@id, @cotizacion_id,@fecha_emision_proyectada,@revision,@fecha_envio_1,@remito_1,@calificaion_1,@fecha_calificaion,@numero_documento,@numero_control,@numero_doc,@remito_2,@remito_3,@remito_4,@remito_5,@remito_6,@remito_7,@remito_8,@remito_9,@remito_10,@fecha_envio_2,@fecha_envio_3,@fecha_envio_4,@fecha_envio_5,@fecha_envio_6,@fecha_envio_7,@fecha_envio_8,@fecha_envio_9,@fecha_envio_10,@calificaion_2,@calificaion_3,@calificaion_4,@calificaion_5,@calificaion_6,@calificaion_7,@calificaion_8,@calificaion_9,@calificaion_10);
  `;
  mysqlConnection.query(query, [cotizacion_id, fecha_emision_proyectada, revision, fecha_envio_1, remito_1, calificaion_1, fecha_calificaion, numero_documento, numero_control, numero_doc, remito_2, remito_3, remito_4, remito_5, remito_6, remito_7, remito_8, remito_9, remito_10, fecha_envio_2, fecha_envio_3, fecha_envio_4, fecha_envio_5, fecha_envio_6, fecha_envio_7, fecha_envio_8, fecha_envio_9, fecha_envio_10, calificaion_2, calificaion_3, calificaion_4, calificaion_5, calificaion_6, calificaion_7, calificaion_8, calificaion_9, calificaion_10], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'control Saved'});
    } else {
      console.log(err);
    }
  });

});

router.put('/:id', (req, res) => {
  let { cotizacion_id, fecha_emision_proyectada, revision, fecha_envio_1, remito_1, calificaion_1, fecha_calificaion, numero_documento, numero_control, numero_doc, remito_2, remito_3, remito_4, remito_5, remito_6, remito_7, remito_8, remito_9, remito_10, fecha_envio_2, fecha_envio_3, fecha_envio_4, fecha_envio_5, fecha_envio_6, fecha_envio_7, fecha_envio_8, fecha_envio_9, fecha_envio_10, calificaion_2, calificaion_3, calificaion_4, calificaion_5, calificaion_6, calificaion_7, calificaion_8, calificaion_9, calificaion_10 } = req.body;
  if(fecha_emision_proyectada == ''){fecha_emision_proyectada = null};
  if(revision == ''){revision = null};
  if(fecha_envio_1 == ''){fecha_envio_1 = null};
  if(remito_1 == ''){remito_1 = null};
  if(calificaion_1 == ''){calificaion_1 = null};
  if(fecha_calificaion == ''){fecha_calificaion = null};
  if(numero_documento == ''){numero_documento = null};
  if(numero_control == ''){numero_control = null};
  if(numero_doc == ''){numero_doc = null};
  if(remito_2 == ''){remito_2 = null};
  if(remito_3 == ''){remito_3 = null};
  if(remito_4 == ''){remito_4 = null};
  if(remito_5 == ''){remito_5 = null};
  if(remito_6 == ''){remito_6 = null};
  if(remito_7 == ''){remito_7 = null};
  if(remito_8 == ''){remito_8 = null};
  if(remito_9 == ''){remito_9 = null};
  if(remito_10 == ''){remito_10 = null};
  if(fecha_envio_2 == ''){fecha_envio_2 = null};
  if(fecha_envio_3 == ''){fecha_envio_3 = null};
  if(fecha_envio_4 == ''){fecha_envio_4 = null};
  if(fecha_envio_5 == ''){fecha_envio_5 = null};
  if(fecha_envio_6 == ''){fecha_envio_6 = null};
  if(fecha_envio_7 == ''){fecha_envio_7 = null};
  if(fecha_envio_8 == ''){fecha_envio_8 = null};
  if(fecha_envio_9 == ''){fecha_envio_9 = null};
  if(fecha_envio_10 == ''){fecha_envio_10 = null};
  if(calificaion_2 == ''){calificaion_2 = null};
  if(calificaion_3 == ''){calificaion_3 = null};
  if(calificaion_4 == ''){calificaion_4 = null};
  if(calificaion_5 == ''){calificaion_5 = null};
  if(calificaion_6 == ''){calificaion_6 = null};
  if(calificaion_7 == ''){calificaion_7 = null};
  if(calificaion_8 == ''){calificaion_8 = null};
  if(calificaion_9 == ''){calificaion_9 = null};
  if(calificaion_10 == ''){calificaion_10 = null};
  const { id } = req.params;
  const query = `
    SET @id = ?;
    SET @cotizacion_id = ?;
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
    CALL controlAddOrEdit(@id, @cotizacion_id,@fecha_emision_proyectada,@revision,@fecha_envio_1,@remito_1,@calificaion_1,@fecha_calificaion,@numero_documento,@numero_control,@numero_doc,@remito_2,@remito_3,@remito_4,@remito_5,@remito_6,@remito_7,@remito_8,@remito_9,@remito_10,@fecha_envio_2,@fecha_envio_3,@fecha_envio_4,@fecha_envio_5,@fecha_envio_6,@fecha_envio_7,@fecha_envio_8,@fecha_envio_9,@fecha_envio_10,@calificaion_2,@calificaion_3,@calificaion_4,@calificaion_5,@calificaion_6,@calificaion_7,@calificaion_8,@calificaion_9,@calificaion_10);
  `;
  mysqlConnection.query(query, [id, cotizacion_id, fecha_emision_proyectada, revision, fecha_envio_1, remito_1, calificaion_1, fecha_calificaion, numero_documento, numero_control, numero_doc, remito_2, remito_3, remito_4, remito_5, remito_6, remito_7, remito_8, remito_9, remito_10, fecha_envio_2, fecha_envio_3, fecha_envio_4, fecha_envio_5, fecha_envio_6, fecha_envio_7, fecha_envio_8, fecha_envio_9, fecha_envio_10, calificaion_2, calificaion_3, calificaion_4, calificaion_5, calificaion_6, calificaion_7, calificaion_8, calificaion_9, calificaion_10], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'control Updated'});
    } else {
      console.log(err);
    }
  });

});




module.exports = router;