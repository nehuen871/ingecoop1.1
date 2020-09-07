import React, { Component } from 'react';
import TablaList_docs from "./tablas/List_docs";

export default class containerTablaList_docs extends Component {
  render() {
    return (
      <div className="col-md-12">
        <h3>Lista de documentos</h3>
        <TablaList_docs />
      </div>
    );
  }
}