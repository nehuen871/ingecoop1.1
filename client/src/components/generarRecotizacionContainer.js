import React, { Component } from 'react';
import GenerarRecotizacion from "./GenerarRecotizacion";

export default class formContainer extends Component {
  render() {
    return (
      <div className="col-md-12">
        <h3>Generar Recotizacion</h3>
        <GenerarRecotizacion />
      </div>
    );
  }
}