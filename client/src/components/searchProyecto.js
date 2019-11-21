import React, { Component } from 'react';
import FormContainer from "./form/Search";
const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

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