import React, { Component } from 'react';
import FormContainer from "./form/FormCodigoUnificador";


export default class formContainer extends Component {
  render() {
    return (
      <div className="col-md-12">
        <h3>Busqueda por Codigo Unificador</h3>
        <FormContainer />
      </div>
    );
  }
}