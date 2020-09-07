import React, { Component } from 'react';
import TablaDatosCertificacion from "./tablas/DatosCertificacion";

export default class containerDatosCertificacion extends Component {
  render() {
    return (
      <div className="col-md-12">
        <h3>Datos de certificaciones</h3>
        <TablaDatosCertificacion />
      </div>
    );
  }
}