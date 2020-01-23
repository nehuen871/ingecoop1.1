import React, { Component } from 'react';
import FormContainer from "./form/FormGenerarDatosControl";

export default class formContainer extends Component {
  render() {
    return (
      <div className="col-md-12">
        <h3>Generar Datos Control</h3>
        <FormContainer />
      </div>
    );
  }
}