const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../db/database.js');

// GET all proyecto
router.get('/', (req, res) => {
  mysqlConnection.query('SELECT proyecto.*,cliente.nombre as nombreCliente,cotizacion.titulo_cotiazacion as nombreCotizacion FROM ingecoop.proyecto join cliente on cliente.id = proyecto.cliente_id join cotizacion on cotizacion.id = proyecto.cotizacion_id', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      res.json(err);
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
      res.json(err);
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
      res.json(err);
    }
  });
});

// INSERT An proyecto
router.post('/', (req, res) => {
  let {nombre,revision,numero_proyecto,cliente_id,fehca_inicio,fecha_fin,cotizacion_id,activo,codigo_unificador} = req.body;
  if(fehca_inicio == ''  || fehca_inicio === 'Invalid date'){fehca_inicio = null};
  if(fecha_fin == ''  || fecha_fin === 'Invalid date'){fecha_fin = null};
  if(nombre == ''){nombre = null};
  if(numero_proyecto == ''){numero_proyecto = null};
  if(fecha_fin == ''  || fecha_fin === 'Invalid date'){fecha_fin = null};
  const query = `
    SET @id = 0;
    SET @nombre = ?;
    SET @revision = ?;
    SET @numero_proyecto = ?;
    SET @cliente_id = ?;
    SET @fehca_inicio = ?;
    SET @fecha_fin = ?;
    SET @cotizacion_id = ?;
    SET @codigo_unificador = ?;
    SET @activo = ?;
    CALL proyectoAddOrEdit(@id, @nombre,@revision,@numero_proyecto,@cliente_id,@fehca_inicio,@fecha_fin,@cotizacion_id,@activo,@codigo_unificador);
  `;
  mysqlConnection.query(query, [nombre,revision,numero_proyecto,cliente_id,fehca_inicio,fecha_fin,cotizacion_id,activo,codigo_unificador], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'proyecto Saved'});
    } else {
      res.json(err);
    }
  });
});

// INSERT An proyecto childs
router.get('/codigoUnificador/:code', (req, res) => {
  const { code } = req.params;
  mysqlConnection.query('select * from proyecto where codigo_unificador = ?;',[code], (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      res.json(err);
    }
  });
});


router.put('/:id', (req, res) => {
  let { nombre,revision,numero_proyecto,cliente_id,fehca_inicio,fecha_fin,cotizacion_id,activo,codigo_unificador} = req.body;
  if(fehca_inicio == ''  || fehca_inicio === 'Invalid date'){fehca_inicio = null};
  if(fecha_fin == ''  || fecha_fin === 'Invalid date'){fecha_fin = null};
  if(nombre == ''){nombre = null};
  if(numero_proyecto == ''){numero_proyecto = null};
  if(fecha_fin == ''  || fecha_fin === 'Invalid date'){fecha_fin = null};
  const { id } = req.params;
  const query = `
    SET @id = ?;
    SET @nombre = ?;
    SET @revision = ?;
    SET @numero_proyecto = ?;
    SET @cliente_id = ?;
    SET @fehca_inicio = ?;
    SET @fecha_fin = ?;
    SET @cotizacion_id = ?;
    SET @activo = ?;
    SET @codigo_unificador = ?;
    CALL proyectoAddOrEdit(@id, @nombre,@revision,@numero_proyecto,@cliente_id,@fehca_inicio,@fecha_fin,@cotizacion_id,@activo,@codigo_unificador);
  `;
  mysqlConnection.query(query, [id, nombre,revision,numero_proyecto,cliente_id,fehca_inicio,fecha_fin,cotizacion_id,activo,codigo_unificador], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'proyecto Updated'});
    } else {
      res.json(err);
    }
  });

});

module.exports = router;
