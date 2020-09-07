import React, { Component } from 'react';
import TablaProyecto from "./tablas/Proyecto";

export default class containerProyecto extends Component {
  render() {
    return (
      <div className="col-md-12">
        <h3>Proyectos</h3>
        <TablaProyecto />
      </div>
    );
  }
}