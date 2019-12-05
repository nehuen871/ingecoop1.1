import React, { Component } from 'react';
import FormContainer from "./form/SearchCotizacion";

export default class formContainer extends Component {
  render() {
    return (
      <div className="col-md-6">
        <h3>Busqueda por Cotizacion</h3>
        <FormContainer />
      </div>
    );
  }
}