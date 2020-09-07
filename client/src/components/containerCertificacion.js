import React, { Component } from 'react';
import TablaCertificacion from "./tablas/Certificacion";

export default class containerCertificacion extends Component {
  render() {
    return (
      <div className="col-md-12">
        <h3>Certificaciones</h3>
        <TablaCertificacion />
      </div>
    );
  }
}