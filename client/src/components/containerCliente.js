import React, { Component } from 'react';
import TablaCliente from "./tablas/Cliente";

export default class containerCliente extends Component {
  render() {
    return (
      <div className="col-md-12">
        <h3>Clienes</h3>
        <TablaCliente />
      </div>
    );
  }
}