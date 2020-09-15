const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../db/database.js');

// GET all datosControl
router.get('/', (req, res) => {
  mysqlConnection.query('SELECT datosControl.*,cotizacion.titulo_cotiazacion as tituloCotiazacion,control.codigo_unificador, CONCAT_WS("",list_docs.nombre," ",list_docs.titulo_documento) as nombreDocumento FROM datosControl join cotizacion on cotizacion.id = datosControl.control_cotizacion_id join control on control.id = datosControl.control_id join list_docs on list_docs.id = datosControl.list_docs_id', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      res.json(err);
    }
  });
});

// GET An datosControl
router.get('/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('SELECT * FROM datosControl WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      res.json(err);
    }
  });
});

// DELETE An datosControl
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM datosControl WHERE id = ?', [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'datosControl Deleted'});
    } else {
      res.json(err);
    }
  });
});

// INSERT An datosControl
router.post('/', (req, res) => {
  let {descripcion_doc, revicion, cantidad_doc, HHUnidades, total, observacion,HH_asociado, proveedor, viatico, control_id, control_cotizacion_id,numero_documento,numero_remito,fecha_envio_remito,list_docs_id} = req.body;
  if(descripcion_doc===''){descripcion_doc=null};
  if(revicion===''){revicion=null};
  if(cantidad_doc===''){cantidad_doc=null};
  if(HHUnidades===''){HHUnidades=null};
  if(fecha_envio_remito === '' || fecha_envio_remito === 'Invalid date'){fecha_envio_remito = null};
  if(total===''){total=null};
  if(observacion===''){observacion=null};
  if(proveedor===''){proveedor=null};
  if(viatico===''){viatico=null};
  const query = `
    SET @id = 0;
    SET @descripcion_doc = ?;
    SET @revicion = ?;
    SET @cantidad_doc = ?;
    SET @HHUnidades = ?;
    SET @total = ?;
    SET @observacion = ?;
    SET @HH_asociado = ?;
    SET @proveedor = ?;
    SET @viatico = ?;
    SET @control_id = ?;
    SET @control_cotizacion_id = ?;
    SET @numero_documento = ?;
    SET @numero_remito = ?;
    SET @fecha_envio_remito = ?;
    SET @list_docs_id = ?;
    CALL datoControlAddOrEdit(@id, @descripcion_doc,@revicion,@cantidad_doc,@HHUnidades,@total,@observacion,@HH_asociado,@proveedor,@viatico,@control_id,@control_cotizacion_id,@numero_documento,@numero_remito,@fecha_envio_remito,@list_docs_id);
  `;
  mysqlConnection.query(query, [descripcion_doc, revicion, cantidad_doc, HHUnidades, total,observacion,HH_asociado, proveedor, viatico, control_id, control_cotizacion_id,numero_documento,numero_remito,fecha_envio_remito,list_docs_id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'datosControl Saved'});
    } else {
      res.json(err);
    }
  });

});

router.put('/:id', (req, res) => {
  const { descripcion_doc, revicion, cantidad_doc, HHUnidades, total, observacion,HH_asociado, proveedor, viatico, control_id, control_cotizacion_id,numero_documento,numero_remito,fecha_envio_remito,list_docs_id } = req.body;
  if(descripcion_doc===''){descripcion_doc=null};
  if(revicion===''){revicion=null};
  if(cantidad_doc===''){cantidad_doc=null};
  if(HHUnidades===''){HHUnidades=null};
  if(fecha_envio_remito === '' || fecha_envio_remito === 'Invalid date'){fecha_envio_remito = null};
  if(total===''){total=null};
  if(observacion===''){observacion=null};
  if(proveedor===''){proveedor=null};
  if(viatico===''){viatico=null};
  const { id } = req.params;
  const query = `
    SET @id = ?;
    SET @descripcion_doc = ?;
    SET @revicion = ?;
    SET @cantidad_doc = ?;
    SET @HHUnidades = ?;
    SET @total = ?;
    SET @observacion = ?;
    SET @HH_asociado = ?;
    SET @proveedor = ?;
    SET @viatico = ?;
    SET @control_id = ?;
    SET @control_cotizacion_id = ?;
    SET @numero_documento = ?;
    SET @numero_remito = ?;
    SET @fecha_envio_remito = ?;
    SET @list_docs_id = ?;
    CALL datoControlAddOrEdit(@id, @descripcion_doc,@revicion,@cantidad_doc,@HHUnidades,@total,@observacion,@HH_asociado,@proveedor,@viatico,@control_id,@control_cotizacion_id,@numero_documento,@numero_remito,@fecha_envio_remito,@list_docs_id);
  `;
  mysqlConnection.query(query, [id, descripcion_doc, revicion, cantidad_doc, HHUnidades, total, observacion,HH_asociado, proveedor, viatico, control_id, control_cotizacion_id,numero_documento,numero_remito,fecha_envio_remito,list_docs_id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'datosControl Updated'});
    } else {
      res.json(err);
    }
  });
});

router.get('/codigoUnificador/:code', (req, res) => {
  const { code } = req.params;
  mysqlConnection.query('SELECT datosControl.*,control.codigo_unificador FROM datosControl join control on control.id = datosControl.control_id where control.codigo_unificador = ?;',[code], (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      res.json(err);
    }
  });
});


module.exports = router;