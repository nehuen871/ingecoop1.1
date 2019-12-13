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
//Get all datosControl childs
router.post('/getControlById', (req, res) => {
  let {id} = req.body;
  const query = `
  select * from control where id = ?`;
  mysqlConnection.query(query,[id], (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

//Get all datosControl childs
router.post('/getCertificadosFormControl', (req, res) => {
  let {id} = req.body;
  const query = `
  SELECT control.id as control_id ,control.numero_control as nombre,certificacion.id as certificacion_id,certificacion.numeroDePedido as certificacion_name FROM control 
join certificacion on certificacion.control_id = control.id
where control.id = ?;`;
  mysqlConnection.query(query,[id], (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

//Get all datosControl childs
router.post('/getListDocsFormControl', (req, res) => {
  let {id} = req.body;
  const query = `
  select list_docs.id as id , list_docs.nombre as nombre,control.id as controlId,control.numero_control from control
  join datosControl on datosControl.control_id= control.id
  join list_docs on list_docs.id = datosControl.list_docs_id
  where control.id = ?`;
  mysqlConnection.query(query,[id], (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

//Get all datosControl childs from id cotizacion
router.post('/getListDocsFormCotizacion', (req, res) => {
  let {id} = req.body;
  const query = `
  select list_docs.id as id , list_docs.nombre as nombre,control.id as controlId,control.numero_control from control
  join datosControl on datosControl.control_id= control.id
  join list_docs on list_docs.id = datosControl.list_docs_id
  where control.cotizacion_id = ?`;
  mysqlConnection.query(query,[id], (err, rows, fields) => {
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
  let {cotizacion_id, fecha_emision_proyectada, revision, fecha_calificaion, numero_documento, numero_control, numero_doc,codigo_doc_cliente} = req.body;
  if(fecha_emision_proyectada == '' || fecha_emision_proyectada === 'Invalid date'){fecha_emision_proyectada = null};
  if(revision == ''){revision = null};
  if(fecha_calificaion == '' || fecha_calificaion === 'Invalid date'){fecha_calificaion = null};
  if(numero_documento == ''){numero_documento = null};
  if(numero_control == ''){numero_control = null};
  if(numero_doc == ''){numero_doc = null};
  if(codigo_doc_cliente == ''){codigo_doc_cliente = null};
  const query = `
    SET @id = 0;
    SET @cotizacion_id = ?;
    SET @fecha_emision_proyectada = ?;
    SET @revision = ?;
    SET @fecha_calificaion = ?;
    SET @numero_documento = ?;
    SET @numero_control = ?;
    SET @numero_doc = ?;
    SET @codigo_doc_cliente = ?;
    CALL controlAddOrEdit(@id, @cotizacion_id,@fecha_emision_proyectada,@revision,@fecha_calificaion,@numero_documento,@numero_control,@numero_doc,@codigo_doc_cliente);
  `;
  mysqlConnection.query(query, [cotizacion_id, fecha_emision_proyectada, revision, fecha_calificaion, numero_documento, numero_control, numero_doc, codigo_doc_cliente], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'control Saved'});
    } else {
      console.log(err);
    }
  });

});

router.put('/:id', (req, res) => {
  let { cotizacion_id, fecha_emision_proyectada, revision, fecha_calificaion, numero_documento, numero_control, numero_doc, codigo_doc_cliente} = req.body;
  if(fecha_emision_proyectada == '' || fecha_emision_proyectada === 'Invalid date'){fecha_emision_proyectada = null};
  if(revision == ''){revision = null};
  if(fecha_calificaion == '' || fecha_calificaion === 'Invalid date'){fecha_calificaion = null};
  if(numero_documento == ''){numero_documento = null};
  if(numero_control == ''){numero_control = null};
  if(numero_doc == ''){numero_doc = null};
  if(codigo_doc_cliente == ''){codigo_doc_cliente = null};
  const { id } = req.params;
  const query = `
    SET @id = ?;
    SET @cotizacion_id = ?;
    SET @fecha_emision_proyectada = ?;
    SET @revision = ?;
    SET @fecha_calificaion = ?;
    SET @numero_documento = ?;
    SET @numero_control = ?;
    SET @numero_doc = ?;
    SET @codigo_doc_cliente = ?;
    CALL controlAddOrEdit(@id, @cotizacion_id,@fecha_emision_proyectada,@revision,@fecha_calificaion,@numero_documento,@numero_control,@numero_doc, @codigo_doc_cliente);
  `;
  mysqlConnection.query(query, [id, cotizacion_id, fecha_emision_proyectada, revision, fecha_calificaion, numero_documento, numero_control, numero_doc, codigo_doc_cliente], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'control Updated'});
    } else {
      console.log(err);
    }
  });

});




module.exports = router;