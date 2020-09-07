import React, { Component } from 'react';
import TablaCotizacion from "./tablas/Cotizacion";

export default class containerCotizacion extends Component {
  render() {
    return (
      <div className="col-md-12">
        <h3>Cotizaciones</h3>
        <TablaCotizacion />
      </div>
    );
  }
}