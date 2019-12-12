import React, { Component } from 'react';
import FormContainer from "./form/SearchCertificacion";

export default class formContainer extends Component {
  render() {
    return (
      <div className="col-md-6">
        <h3>Busqueda por Certificacion</h3>
        <FormContainer />
      </div>
    );
  }
}