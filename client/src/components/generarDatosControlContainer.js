import React, { Component } from 'react';
import GenerarDatosControl from "./GenerarDatosControl";

export default class formContainer extends Component {
  render() {
    return (
      <div className="col-md-12">
        <h3>Generar Datos Control</h3>
        <GenerarDatosControl />
      </div>
    );
  }
}