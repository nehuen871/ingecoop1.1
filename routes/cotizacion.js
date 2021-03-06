const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../db/database.js');

// GET all cotizacion
router.get('/', (req, res) => {
  mysqlConnection.query('SELECT cotizacion.*,cliente.nombre as nombreCliente FROM cotizacion join cliente on cliente.id = cotizacion.cliente_id', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      res.json(err);
    }
  });
});

// GET all cotizacion
router.get('/generarDatosControlData', (req, res) => {
  mysqlConnection.query('SELECT cotizacion.*,control.cotizacion_id,cliente.nombre as nombreCliente FROM cotizacion left join control on control.cotizacion_id = cotizacion.id join cliente on cliente.id = cotizacion.cliente_id where control.cotizacion_id is null;', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      res.json(err);
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
      res.json(err);
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
      res.json(err);
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
      res.json(err);
    }
  });
});

// INSERT An cotizacion
router.post('/', (req, res) => {
  let {fecha, titulo_cotiazacion,numero_doc,cliente_id,codigo_unificador} = req.body;
  if(fecha === '' || fecha === 'Invalid date'){fecha = null};
  if(titulo_cotiazacion === ''){titulo_cotiazacion = null};
  numero_doc = codigo_unificador + "-" + titulo_cotiazacion + "-" +"1";
  const query = `
    SET @id = 0;
    SET @fecha = ?;
    SET @titulo_cotiazacion = ?;
    SET @numero_doc = ?;
    SET @cliente_id = ?;
    SET @codigo_unificador = ?;
    CALL cotizacionAddOrEdit(@id,@fecha,@titulo_cotiazacion,@numero_doc,@cliente_id,@codigo_unificador);
  `;
  mysqlConnection.query(query, [fecha,titulo_cotiazacion,numero_doc,cliente_id,codigo_unificador], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'cotizacion Saved'});
    } else {
      res.json(err);
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
      res.json({status: 'Datos Generados'});
    } else {
      res.json(err);
    }
  });
});

router.post('/recotizacion', (req, res) => {
  let {id} = req.body;
  const query = `
  SET @id = ?;
  CALL recotizacion(@id);`;
  mysqlConnection.query(query,[id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Datos Generados'});
    } else {
      res.json(err);
    }
  });
});


router.put('/:id', (req, res) => {
  let { fecha, titulo_cotiazacion,numero_doc,cliente_id,codigo_unificador} = req.body;
  if(fecha === '' || fecha === 'Invalid date'){fecha = null};
  if(titulo_cotiazacion === ''){titulo_cotiazacion = null};
  const { id } = req.params;
  const query = `
    SET @id = ?;
    SET @fecha = ?;
    SET @titulo_cotiazacion = ?;
    SET @numero_doc = ?;
    SET @cliente_id = ?;
    SET @codigo_unificador = ?;
    CALL cotizacionAddOrEdit(@id,@fecha,@titulo_cotiazacion,@numero_doc,@cliente_id,@codigo_unificador);
  `;
  mysqlConnection.query(query, [id, fecha,titulo_cotiazacion,numero_doc,cliente_id,codigo_unificador], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'cotizacion Updated'});
    } else {
      res.json(err);
    }
  });
});

router.get('/codigoUnificador/:code', (req, res) => {
  const { code } = req.params;
  mysqlConnection.query('SELECT cotizacion.*,cliente.nombre as nombreCliente FROM cotizacion join cliente on cliente.id = cotizacion.cliente_id WHERE codigo_unificador = ? order by fecha desc limit 1;',[code], (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      res.json(err);
    }
  });
});

module.exports = router;