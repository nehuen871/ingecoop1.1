import React, { Component } from 'react';
import FormContainer from "./form/SearchProyecto";


export default class formContainer extends Component {
  render() {
    return (
      <div className="col-md-6">
        <h3>Busqueda por Proyectos</h3>
        <FormContainer />
      </div>
    );
  }
}