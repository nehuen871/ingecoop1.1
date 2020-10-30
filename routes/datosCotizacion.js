const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../db/database.js');

// GET all datosCotizacion
router.get('/', (req, res) => {
  mysqlConnection.query('SELECT datosCotizacion.*,cotizacion.titulo_cotiazacion as tituloCotiazacion,CONCAT_WS("",list_docs.nombre," ",list_docs.titulo_documento) as nombreDocumento FROM datosCotizacion join cotizacion on cotizacion.id = datosCotizacion.cotizacion_id join list_docs on list_docs.id = datosCotizacion.list_docs_id', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      res.json(err);
    }
  });
});

// GET An datosCotizacion
router.get('/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('SELECT * FROM datosCotizacion WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      res.json(err);
    }
  });
});

// DELETE An datosCotizacion
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM datosCotizacion WHERE id = ?', [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'datosCotizacion Deleted'});
    } else {
      res.json(err);
    }
  });
});
router.post('/datosCotizacionInsert', (req, res) => {
  let {id,idCoti} = req.body;
  const query =`
  SET @id = ?;
  SET @idCoti = ?;
  CALL datosCotizacionInsert(@id,@idCoti);
  `;
  mysqlConnection.query(query,[id,idCoti], (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      res.json(err);
    }
  });
});
// INSERT An datosCotizacion
router.post('/', (req, res) => {
  let {numeroRecotizacion, cotizacion_id, descripcion_doc, revicion, cantidad_doc, HHUnidades, total, observacion, HH_asociado, proveerdor, viatico,numero_documento,list_docs_id,valorHora,totalValorHora} = req.body;
  if(numeroRecotizacion===''){numeroRecotizacion=null};
  if(descripcion_doc===''){descripcion_doc=null};
  if(revicion===''){revicion=null};
  if(cantidad_doc===''){cantidad_doc=null};
  if(HHUnidades===''){HHUnidades=null};
  if(total===''){total=null};
  if(observacion===''){observacion=null};
  if(HH_asociado===''){HH_asociado=null};
  if(proveerdor===''){proveerdor=null};
  if(viatico===''){viatico=null};
  const query = `
    SET @id = 0;
    SET @numeroRecotizacion = ?;
    SET @cotizacion_id = ?;
    SET @descripcion_doc = ?;
    SET @revicion = ?;
    SET @cantidad_doc = ?;
    SET @HHUnidades = ?;
    SET @total = ?;
    SET @observacion = ?;
    SET @HH_asociado = ?;
    SET @proveerdor = ?;
    SET @viatico = ?;
    SET @numero_documento = ?;
    SET @list_docs_id = ?;
    SET @valorHora = ?;
    SET @totalValorHora = ?;
    CALL datosCotizacionAddOrEdit(@id, @numeroRecotizacion,@cotizacion_id,@descripcion_doc,@revicion,@cantidad_doc,@HHUnidades,@total,@observacion,@HH_asociado,@proveerdor,@viatico,@numero_documento,@list_docs_id,@valorHora,@totalValorHora);
  `;
  mysqlConnection.query(query, [numeroRecotizacion, cotizacion_id, descripcion_doc, revicion, cantidad_doc, HHUnidades, total, observacion, HH_asociado, proveerdor, viatico,numero_documento,list_docs_id,valorHora,totalValorHora], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'datosCotizacion Saved'});
    } else {
      res.json(err);
    }
  });

});

router.put('/:id', (req, res) => {
  let { numeroRecotizacion, cotizacion_id, descripcion_doc, revicion, cantidad_doc, HHUnidades, total, observacion, HH_asociado, proveerdor, viatico,numero_documento,list_docs_id,valorHora,totalValorHora} = req.body;
  if(numeroRecotizacion===''){numeroRecotizacion=null};
  if(descripcion_doc===''){descripcion_doc=null};
  if(revicion===''){revicion=null};
  if(cantidad_doc===''){cantidad_doc=null};
  if(HHUnidades===''){HHUnidades=null};
  if(total===''){total=null};
  if(observacion===''){observacion=null};
  if(HH_asociado===''){HH_asociado=null};
  if(proveerdor===''){proveerdor=null};
  if(viatico===''){viatico=null};
  const { id } = req.params;
  const query = `
    SET @id = ?;
    SET @numeroRecotizacion = ?;
    SET @cotizacion_id = ?;
    SET @descripcion_doc = ?;
    SET @revicion = ?;
    SET @cantidad_doc = ?;
    SET @HHUnidades = ?;
    SET @total = ?;
    SET @observacion = ?;
    SET @HH_asociado = ?;
    SET @proveerdor = ?;
    SET @viatico = ?;
    SET @numero_documento = ?;
    SET @list_docs_id = ?;
    SET @valorHora = ?;
    SET @totalValorHora = ?;
    CALL datosCotizacionAddOrEdit(@id, @numeroRecotizacion,@cotizacion_id,@descripcion_doc,@revicion,@cantidad_doc,@HHUnidades,@total,@observacion,@HH_asociado,@proveerdor,@viatico,@numero_documento,@list_docs_id,@valorHora,@totalValorHora);
  `;
  mysqlConnection.query(query, [id, numeroRecotizacion, cotizacion_id, descripcion_doc, revicion, cantidad_doc, HHUnidades, total, observacion, HH_asociado, proveerdor, viatico,numero_documento,list_docs_id,valorHora,totalValorHora], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'datosCotizacion Updated'});
    } else {
      res.json(err);
    }
  });
});


router.get('/codigoUnificador/:code/:code2', (req, res) => {
  const { code,code2 } = req.params;
  console.log(code2);
  if(code2===''){code2=1};
  if(code2===0){code2=1};
  const query =`
    SELECT 
    datosCotizacion.*,cotizacion.titulo_cotiazacion as tituloCotiazacion,CONCAT_WS("",list_docs.nombre," ",list_docs.titulo_documento) as nombreDocumento
    FROM datosCotizacion 
    join cotizacion on cotizacion.id = datosCotizacion.cotizacion_id join list_docs on list_docs.id = datosCotizacion.list_docs_id
    where 
    cotizacion.codigo_unificador = ?
    and datosCotizacion.numeroRecotizacion = ?;
  `;
  mysqlConnection.query(query,[code,code2], (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      res.json(err);
    }
  });
});

module.exports = router;