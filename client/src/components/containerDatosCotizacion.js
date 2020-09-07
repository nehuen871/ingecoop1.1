import React, { Component } from 'react';
import TablaDatosCotizacion from "./tablas/DatosCotizacion";

export default class containerDatosCotizacion extends Component {
  render() {
    return (
      <div className="col-md-12">
        <h3>Datos de cotizaciones</h3>
        <TablaDatosCotizacion />
      </div>
    );
  }
}