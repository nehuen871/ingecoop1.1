const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../db/database.js');

// GET all certificacion
router.get('/', (req, res) => {
  mysqlConnection.query('SELECT datosCertificacion.*,cotizacion.titulo_cotiazacion as tituloCotiazacion,control.codigo_unificador as codigoControl,certificacion.numeroDePedido as certificaCionPedido,CONCAT_WS("",list_docs.nombre," ",list_docs.titulo_documento) as nombreDocumento FROM datosCertificacion join cotizacion on cotizacion.id = datosCertificacion.certificacion_control_cotizacion_id join control on control.id = datosCertificacion.certificacion_control_id join certificacion on certificacion.id =  datosCertificacion.certificacion_id join list_docs on list_docs.id = datosCertificacion.list_docs_id', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      res.json(err);
    }
  });
});

// GET An certificacion
router.get('/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('SELECT * FROM datosCertificacion WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      res.json(err);
    }
  });
});

// DELETE An certificacion
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM datosCertificacion WHERE id = ?', [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'certificacion Deleted'});
    } else {
      res.json(err);
    }
  });
});

router.post('/dataById', (req, res) => {
    let {id} = req.body;
    const query = `
    select datosCertificacion.*,list_docs.nombre from datosCertificacion
    join list_docs on list_docs.id = datosCertificacion.list_docs_id
    where certificacion_id = ?`;
    mysqlConnection.query(query,[id], (err, rows, fields) => {
      if(!err) {
        res.json(rows);
      } else {
        res.json(err);
      }
    });
  });

  router.post('/updateAvance', (req, res) => {
    let {id,inputSend} = req.body;
    const query = `
    SET @id = ?;
    SET @inputSend = ?;
    CALL certificacionAutomatica(@id,@inputSend);
    `;

    mysqlConnection.query(query,[id,inputSend], (err, rows, fields) => {
      if(!err) {
        res.json(rows);
      } else {
        res.json(err);
      }
    });
  });

// INSERT An certificacion
router.post('/', (req, res) => {
  let {certificacion_id,certificacion_control_id, certificacion_control_cotizacion_id, costoHoraDoc, cantidadDeHoras, cantidadDeDocs, porcentajeAvanceAnterior,porcentajeAvancePrecente,porcentajeAvanceAcumulado, horasCertificadas, total_certificacion,numero_documento,list_docs_id} = req.body;
  if(costoHoraDoc === ''){costoHoraDoc=null};
  if(cantidadDeHoras === ''){cantidadDeHoras=null};
  if(cantidadDeDocs === ''){cantidadDeDocs=null};
  if(porcentajeAvanceAnterior === ''){porcentajeAvanceAnterior=null};
  if(porcentajeAvancePrecente === ''){porcentajeAvancePrecente=null};
  if(porcentajeAvanceAcumulado === ''){porcentajeAvanceAcumulado=null};
  if(horasCertificadas === ''){horasCertificadas=null};
  if(total_certificacion === ''){total_certificacion=null};
  const query = `
    SET @id = 0;
    SET @certificacion_id = ?;
    SET @certificacion_control_id = ?;
    SET @certificacion_control_cotizacion_id = ?;
    SET @costoHoraDoc = ?;
    SET @cantidadDeHoras = ?;
    SET @cantidadDeDocs = ?;
    SET @porcentajeAvanceAnterior = ?;
    SET @porcentajeAvancePrecente = ?;
    SET @porcentajeAvanceAcumulado = ?;
    SET @horasCertificadas = ?;
    SET @total_certificacion = ?;
    SET @numero_documento = ?;
    SET @list_docs_id = ?;
    CALL datosCertificacionAddOrEdit(@id,@certificacion_id, @certificacion_control_id,@certificacion_control_cotizacion_id,@costoHoraDoc,@cantidadDeHoras,@cantidadDeDocs,@porcentajeAvanceAnterior,@porcentajeAvancePrecente,@porcentajeAvanceAcumulado,@horasCertificadas,@total_certificacion,@numero_documento,@list_docs_id);
  `;
  mysqlConnection.query(query, [certificacion_id, certificacion_control_id, certificacion_control_cotizacion_id, costoHoraDoc, cantidadDeHoras, cantidadDeDocs, porcentajeAvanceAnterior,porcentajeAvancePrecente,porcentajeAvanceAcumulado, horasCertificadas, total_certificacion,numero_documento,list_docs_id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'datosCertificacion Saved'});
    } else {
      res.json(err);
    }
  });

});

router.put('/:id', (req, res) => {
  let {certificacion_id,certificacion_control_id, certificacion_control_cotizacion_id, costoHoraDoc, cantidadDeHoras, cantidadDeDocs, porcentajeAvanceAnterior,porcentajeAvancePrecente,porcentajeAvanceAcumulado, horasCertificadas, total_certificacion,numero_documento,list_docs_id } = req.body;
  if(costoHoraDoc === ''){costoHoraDoc=null};
  if(cantidadDeHoras === ''){cantidadDeHoras=null};
  if(cantidadDeDocs === ''){cantidadDeDocs=null};
  if(porcentajeAvanceAnterior === ''){porcentajeAvanceAnterior=null};
  if(porcentajeAvancePrecente === ''){porcentajeAvancePrecente=null};
  if(porcentajeAvanceAcumulado === ''){porcentajeAvanceAcumulado=null};
  if(horasCertificadas === ''){horasCertificadas=null};
  if(total_certificacion === ''){total_certificacion=null};
  const { id } = req.params;
  const query = `
    SET @id = ?;
    SET @certificacion_id = ?;
    SET @certificacion_control_id = ?;
    SET @certificacion_control_cotizacion_id = ?;
    SET @costoHoraDoc = ?;
    SET @cantidadDeHoras = ?;
    SET @cantidadDeDocs = ?;
    SET @porcentajeAvanceAnterior = ?;
    SET @porcentajeAvancePrecente = ?;
    SET @porcentajeAvanceAcumulado = ?;
    SET @horasCertificadas = ?;
    SET @total_certificacion = ?;
    SET @numero_documento = ?;
    SET @list_docs_id = ?;
    CALL datosCertificacionAddOrEdit(@id,@certificacion_id,@certificacion_control_id,@certificacion_control_cotizacion_id,@costoHoraDoc,@cantidadDeHoras,@cantidadDeDocs,@porcentajeAvanceAnterior,@porcentajeAvancePrecente,@porcentajeAvanceAcumulado,@horasCertificadas,@total_certificacion,@numero_documento,@list_docs_id);
  `;
  mysqlConnection.query(query, [id,certificacion_id, certificacion_control_id, certificacion_control_cotizacion_id, costoHoraDoc, cantidadDeHoras, cantidadDeDocs, porcentajeAvanceAnterior,porcentajeAvancePrecente,porcentajeAvanceAcumulado, horasCertificadas, total_certificacion,numero_documento,list_docs_id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'datosCertificacion Updated'});
    } else {
      res.json(err);
    }
  });
});


router.get('/codigoUnificador/:code', (req, res) => {
  const { code } = req.params;
  mysqlConnection.query('SELECT datosCertificacion.*,cotizacion.titulo_cotiazacion as tituloCotiazacion,control.codigo_unificador as codigoControl,certificacion.numeroDePedido as certificaCionPedido,CONCAT_WS("",list_docs.nombre," ",list_docs.titulo_documento) as nombreDocumento FROM datosCertificacion join cotizacion on cotizacion.id = datosCertificacion.certificacion_control_cotizacion_id join control on control.id = datosCertificacion.certificacion_control_id join certificacion on certificacion.id =  datosCertificacion.certificacion_id join list_docs on list_docs.id = datosCertificacion.list_docs_id where certificacion.codigo_unificador = ?;',[code], (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      res.json(err);
    }
  });
});
module.exports = router;