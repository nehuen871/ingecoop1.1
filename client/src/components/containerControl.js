import React, { Component } from 'react';
import TablaControl from "./tablas/Control";

export default class containerControl extends Component {
  render() {
    return (
      <div className="col-md-12">
        <h3>Controles</h3>
        <TablaControl />
      </div>
    );
  }
}