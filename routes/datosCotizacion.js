const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../db/database.js');

// GET all datosCotizacion
router.get('/', (req, res) => {
  mysqlConnection.query('SELECT * FROM datosCotizacion', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
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
      console.log(err);
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
      console.log(err);
    }
  });
});

// INSERT An datosCotizacion
router.post('/', (req, res) => {
  let {numeroRecotizacion, cotizacion_id, descripcion_doc, revicion, cantidad_doc, HHUnidades, total, observacion, HH_asociado, proveerdor, viatico, list_docs_id} = req.body;
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
    SET @list_docs_id = ?;
    CALL datosCotizacionAddOrEdit(@id, @numeroRecotizacion,@cotizacion_id,@descripcion_doc,@revicion,@cantidad_doc,@HHUnidades,@total,@observacion,@HH_asociado,@proveerdor,@viatico,@list_docs_id);
  `;
  mysqlConnection.query(query, [numeroRecotizacion, cotizacion_id, descripcion_doc, revicion, cantidad_doc, HHUnidades, total, observacion, HH_asociado, proveerdor, viatico, list_docs_id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'datosCotizacion Saved'});
    } else {
      console.log(err);
    }
  });

});

router.put('/:id', (req, res) => {
  let { numeroRecotizacion, cotizacion_id, descripcion_doc, revicion, cantidad_doc, HHUnidades, total, observacion, HH_asociado, proveerdor, viatico, list_docs_id } = req.body;
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
    SET @list_docs_id = ?;
    CALL datosCotizacionAddOrEdit(@id, @numeroRecotizacion,@cotizacion_id,@descripcion_doc,@revicion,@cantidad_doc,@HHUnidades,@total,@observacion,@HH_asociado,@proveerdor,@viatico,@list_docs_id);
  `;
  mysqlConnection.query(query, [id, numeroRecotizacion, cotizacion_id, descripcion_doc, revicion, cantidad_doc, HHUnidades, total, observacion, HH_asociado, proveerdor, viatico, list_docs_id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'datosCotizacion Updated'});
    } else {
      console.log(err);
    }
  });
});


router.get('/codigoUnificador/:code', (req, res) => {
  const { code } = req.params;
  mysqlConnection.query('SELECT * FROM datosCotizacion WHERE codigo_unificador = ?;',[code], (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});
module.exports = router;