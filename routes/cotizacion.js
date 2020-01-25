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

// GET all cotizacion
router.get('/generarDatosControlData', (req, res) => {
  mysqlConnection.query('SELECT cotizacion.*,control.cotizacion_id FROM cotizacion left join control on control.cotizacion_id = cotizacion.id where control.cotizacion_id is null;', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

//Get all datosCotizaicon childs
router.post('/getListDocsFormCotizacion', (req, res) => {
  let {id} = req.body;
  const query = `
  select list_docs.id as id , list_docs.nombre as nombre,cotizacion.id as cotizacionId,cotizacion.titulo_cotiazacion from cotizacion
  join datosCotizacion on datosCotizacion.cotizacion_id = cotizacion.id
  join list_docs on list_docs.id = datosCotizacion.list_docs_id
  where datosCotizacion.cotizacion_id = ?;`;
  mysqlConnection.query(query,[id], (err, rows, fields) => {
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
  let {revision, fecha, titulo_cotiazacion,numero_doc,cliente_id,codigo_unificador} = req.body;
  if(fecha === '' || fecha === 'Invalid date'){fecha = null};
  if(revision === ''){revision = null};
  if(titulo_cotiazacion === ''){titulo_cotiazacion = null};
  const query = `
    SET @id = 0;
    SET @revision = ?;
    SET @fecha = ?;
    SET @titulo_cotiazacion = ?;
    SET @numero_doc = ?;
    SET @cliente_id = ?;
    SET @codigo_unificador = ?;
    CALL cotizacionAddOrEdit(@id, @revision,@fecha,@titulo_cotiazacion,@numero_doc,@cliente_id,@codigo_unificador);
  `;
  mysqlConnection.query(query, [revision, fecha,titulo_cotiazacion,numero_doc,cliente_id,codigo_unificador], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'cotizacion Saved'});
    } else {
      console.log(err);
    }
  });
});

//Get all datosCotizaicon childs
router.post('/updateControl', (req, res) => {
  let {id} = req.body;
  const query = `
  SET @id = ?;
  CALL updateControl(@id);`;
  mysqlConnection.query(query,[id], (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});


router.put('/:id', (req, res) => {
  let { revision, fecha, titulo_cotiazacion,numero_doc,cliente_id,codigo_unificador} = req.body;
  if(fecha === '' || fecha === 'Invalid date'){fecha = null};
  if(revision === ''){revision = null};
  if(titulo_cotiazacion === ''){titulo_cotiazacion = null};
  const { id } = req.params;
  const query = `
    SET @id = ?;
    SET @revision = ?;
    SET @fecha = ?;
    SET @titulo_cotiazacion = ?;
    SET @numero_doc = ?;
    SET @cliente_id = ?;
    SET @codigo_unificador = ?;
    CALL cotizacionAddOrEdit(@id, @revision,@fecha,@titulo_cotiazacion,@numero_doc,@cliente_id,@codigo_unificador);
  `;
  mysqlConnection.query(query, [id, revision, fecha,titulo_cotiazacion,numero_doc,cliente_id,codigo_unificador], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'cotizacion Updated'});
    } else {
      console.log(err);
    }
  });
});

router.get('/codigoUnificador/:code', (req, res) => {
  const { code } = req.params;
  mysqlConnection.query('SELECT * FROM cotizacion WHERE codigo_unificador = ?;',[code], (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

module.exports = router;