import React, { Component } from 'react';
import FormContainer from "./certificacionAutomaticaTable";

export default class formContainer extends Component {
  render() {
    return (
      <div className="col-md-12">
        <h3>Certificacion Automatica</h3>
        <FormContainer />
      </div>
    );
  }
}