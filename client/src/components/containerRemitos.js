import React, { Component } from 'react';
import TablaRemitos from "./tablas/Remitos";

export default class containerRemitos extends Component {
  render() {
    return (
      <div className="col-md-12">
        <h3>Remitos</h3>
        <TablaRemitos />
      </div>
    );
  }
}