import React, { Component } from 'react';
import InsertCotizacion from "./formsInsert/insertCotizacion";

export default class containerInsert extends Component {
  render() {
    return (
      <div className="col-md-12">
        <h3>Insertar datos en cotizacion</h3>
        <InsertCotizacion />
      </div>
    );
  }
}