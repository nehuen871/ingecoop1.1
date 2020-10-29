import React, { Component } from 'react';
import GenerarDatosCopiaControl from "./GenerarDatosCopiaCertificacion";

export default class formContainer extends Component {
  render() {
    return (
      <div className="col-md-12">
        <h3>Generar copia de Certificacion</h3>
        <GenerarDatosCopiaControl />
      </div>
    );
  }
}