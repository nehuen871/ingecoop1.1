import React, { Component } from 'react';
import TablaRemitos from "./tablas/DatosRemitos";

export default class containerDatosRemitos extends Component {
  render() {
    return (
      <div className="col-md-12">
        <h3>Datos de remitos</h3>
        <TablaRemitos />
      </div>
    );
  }
}