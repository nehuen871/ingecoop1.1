const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../db/database.js');

// GET all control
router.get('/', (req, res) => {
  mysqlConnection.query('SELECT control.*, cotizacion.titulo_cotiazacion as tituloCotiazacion FROM control join cotizacion on cotizacion.id = control.cotizacion_id', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      res.json(err);
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
      res.json(err);
      console.log(err);
    }
  });
});

//Get all datosControl childs
router.post('/getCertificadosFormControl', (req, res) => {
  let {id} = req.body;
  const query = `
  SELECT control.id as control_id ,certificacion.id as certificacion_id,certificacion.numeroDePedido as certificacion_name FROM control 
join certificacion on certificacion.control_id = control.id
where control.id = ?;`;
  mysqlConnection.query(query,[id], (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      res.json(err);
      console.log(err);
    }
  });
});

//Get all datosControl childs
router.post('/getListDocsFormControl', (req, res) => {
  let {id} = req.body;
  const query = `
  select list_docs.id as id , list_docs.nombre as nombre,control.id as controlId, from control
  join datosControl on datosControl.control_id= control.id
  join list_docs on list_docs.id = datosControl.list_docs_id
  where control.id = ?`;
  mysqlConnection.query(query,[id], (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      res.json(err);
      console.log(err);
    }
  });
});

//Get all datosControl childs from id cotizacion
router.post('/getListDocsFormCotizacion', (req, res) => {
  let {id} = req.body;
  const query = `
  select list_docs.id as id , list_docs.nombre as nombre,control.id as controlId from control
  join datosControl on datosControl.control_id= control.id
  join list_docs on list_docs.id = datosControl.list_docs_id
  where control.cotizacion_id = ?`;
  mysqlConnection.query(query,[id], (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      res.json(err);
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
      res.json(err);
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
      res.json(err);
      console.log(err);
    }
  });
});

// INSERT An control
router.post('/', (req, res) => {
  let {cotizacion_id, fecha_emision_proyectada, revision, fecha_calificaion,codigo_unificador} = req.body;
  if(fecha_emision_proyectada == '' || fecha_emision_proyectada === 'Invalid date'){fecha_emision_proyectada = null};
  if(revision == ''){revision = null};
  if(fecha_calificaion == '' || fecha_calificaion === 'Invalid date'){fecha_calificaion = null};
  const query = `
    SET @id = 0;
    SET @cotizacion_id = ?;
    SET @fecha_emision_proyectada = ?;
    SET @revision = ?;
    SET @fecha_calificaion = ?;
    SET @codigo_unificador = ?;
    CALL controlAddOrEdit(@id, @cotizacion_id,@fecha_emision_proyectada,@revision,@fecha_calificaion,@codigo_unificador);
  `;
  mysqlConnection.query(query, [cotizacion_id, fecha_emision_proyectada, revision, fecha_calificaion,codigo_unificador], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'control Saved'});
    } else {
      console.log(err);
      res.json(err);
    }
  });

});

router.put('/:id', (req, res) => {
  let { cotizacion_id, fecha_emision_proyectada, revision, fecha_calificaion,codigo_unificador} = req.body;
  if(fecha_emision_proyectada == '' || fecha_emision_proyectada === 'Invalid date'){fecha_emision_proyectada = null};
  if(revision == ''){revision = null};
  if(fecha_calificaion == '' || fecha_calificaion === 'Invalid date'){fecha_calificaion = null};
  const { id } = req.params;
  const query = `
    SET @id = ?;
    SET @cotizacion_id = ?;
    SET @fecha_emision_proyectada = ?;
    SET @revision = ?;
    SET @fecha_calificaion = ?;
    SET @codigo_unificador = ?;
    CALL controlAddOrEdit(@id, @cotizacion_id,@fecha_emision_proyectada,@revision,@fecha_calificaion,@codigo_unificador);
  `;
  mysqlConnection.query(query, [id, cotizacion_id, fecha_emision_proyectada, revision, fecha_calificaion,codigo_unificador], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'control Updated'});
    } else {
      console.log(err);
      res.json(err); 
    }
  });
});

router.get('/codigoUnificador/:code', (req, res) => {
  const { code } = req.params;
  mysqlConnection.query('SELECT * FROM control WHERE codigo_unificador = ?;',[code], (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      res.json(err);
      console.log(err);
    }
  });
});

module.exports = router;