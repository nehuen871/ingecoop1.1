import React, { Component } from 'react';
import TablaDatosControl from "./tablas/DatosControl";

export default class containerDatosControl extends Component {
  render() {
    return (
      <div className="col-md-12">
        <h3>Datos de controles</h3>
        <TablaDatosControl />
      </div>
    );
  }
}