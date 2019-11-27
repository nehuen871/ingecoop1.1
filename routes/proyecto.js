const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../db/database.js');

// GET all proyecto
router.get('/', (req, res) => {
  mysqlConnection.query('SELECT * FROM proyecto', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

// GET An proyecto
router.get('/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('SELECT * FROM proyecto WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

// DELETE An proyecto
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM proyecto WHERE id = ?', [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'proyecto Deleted'});
    } else {
      console.log(err);
    }
  });
});

// INSERT An proyecto
router.post('/', (req, res) => {
  let {nombre,numero_proyecto,cliente,fehca_inicio,fecha_fin,cotizacion_id} = req.body;
  if(fehca_inicio == ''  || fehca_inicio === 'Invalid date'){fehca_inicio = null};
  if(fecha_fin == ''  || fecha_fin === 'Invalid date'){fecha_fin = null};
  if(nombre == ''){nombre = null};
  if(numero_proyecto == ''){numero_proyecto = null};
  if(cliente == ''){cliente = null};
  if(fecha_fin == ''  || fecha_fin === 'Invalid date'){fecha_fin = null};
  const query = `
    SET @id = 0;
    SET @nombre = ?;
    SET @numero_proyecto = ?;
    SET @cliente = ?;
    SET @fehca_inicio = ?;
    SET @fecha_fin = ?;
    SET @cotizacion_id = ?;
    CALL proyectoAddOrEdit(@id, @nombre,@numero_proyecto,@cliente,@fehca_inicio,@fecha_fin,@cotizacion_id);
  `;
  mysqlConnection.query(query, [nombre,numero_proyecto,cliente,fehca_inicio,fecha_fin,cotizacion_id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'proyecto Saved'});
    } else {
      console.log(err);
    }
  });
});

// INSERT An proyecto
router.post('/all', (req, res) => {
  let {id} = req.body;
  const query = `
  select proyecto.id as proyecto_id,proyecto.nombre,cotizacion.id as cotizacion_id,cotizacion.titulo_cotiazacion,datosCotizacion.id as datosCotizacion_id,datosCotizacion.list_docs_id as datosCotizacion_list_docs_id,list_docs.nombre as cotizacion_list_doc_nombre,control.id as contro_id,control.numero_control,datosControl.list_docs_id as datosControl_list_docs_id,list_docs.nombre as control_list_doc_nombre from cotizacion
  join datosCotizacion on datosCotizacion.cotizacion_id = cotizacion.id
  join proyecto on proyecto.cotizacion_id = cotizacion.id
  join control on control.cotizacion_id = cotizacion.id
  join datosControl on datosControl.control_cotizacion_id = cotizacion.id
  join list_docs on list_docs.id = datosControl.list_docs_id 
  where proyecto.numero_proyecto = ? order by cotizacion_id asc, datosCotizacion_id asc;
    `;
  mysqlConnection.query(query,[id], (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});


router.put('/:id', (req, res) => {
  let { nombre,numero_proyecto,cliente,fehca_inicio,fecha_fin,cotizacion_id} = req.body;
  if(fehca_inicio == ''  || fehca_inicio === 'Invalid date'){fehca_inicio = null};
  if(fecha_fin == ''  || fecha_fin === 'Invalid date'){fecha_fin = null};
  if(nombre == ''){nombre = null};
  if(numero_proyecto == ''){numero_proyecto = null};
  if(cliente == ''){cliente = null};
  if(fecha_fin == ''  || fecha_fin === 'Invalid date'){fecha_fin = null};
  const { id } = req.params;
  const query = `
    SET @id = ?;
    SET @nombre = ?;
    SET @numero_proyecto = ?;
    SET @cliente = ?;
    SET @fehca_inicio = ?;
    SET @fecha_fin = ?;
    SET @cotizacion_id = ?;
    CALL proyectoAddOrEdit(@id, @nombre,@numero_proyecto,@cliente,@fehca_inicio,@fecha_fin,@cotizacion_id);
  `;
  mysqlConnection.query(query, [id, nombre,numero_proyecto,cliente,fehca_inicio,fecha_fin,cotizacion_id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'proyecto Updated'});
    } else {
      console.log(err);
    }
  });

});

module.exports = router;
