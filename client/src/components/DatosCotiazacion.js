/* eslint max-len: 0 */
/* eslint no-console: 0 */
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../styles/react-bootstrap-table.css';

const jobs = [];

const cellEditProp = {
  mode: 'click',
  blurToSave: true
};

export default class EditTypeTable extends React.Component {
  constructor(props) {
    super(props);
    this.formatType = this.formatType.bind(this);
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res }))
      .catch(err => console.log(err));
  }

  formatType(cell) {
    return `TYPE_${cell}`;
  }

  callApi = async () => {
    const response = await fetch('/datosCotizacion');
    var data = await response.json();
    if (response.status !== 200) throw Error(data.message);
    for (let i = 0; i < data.length; i++) {
      jobs.push({
        id: data[i].id,
        numeroRecotizacion: data[i].numeroRecotizacion,
        cotizacion_id: data[i].cotizacion_id,
        descripcion_doc: data[i].descripcion_doc,
        revicion_inicial: data[i].revicion_inicial,
        cantidad_doc: data[i].cantidad_doc,
        HHUnidades: data[i].HHUnidades,
        total: data[i].total,
        revision_unica: data[i].revision_unica,
        observacion: data[i].observacion,
        modificar_lista: data[i].modificar_lista,
        proveerdor: data[i].proveerdor,
        viatico: data[i].viatico,
        list_docs_i: data[i].list_docs_i
      });
    }
  }

  render() {
    // custom attributes on editor
    const attrs = {
      rows: 10,
      onKeyDown: function() {
        console.log('keydown event trigger');
      }
    };
    return (
      <BootstrapTable data={ jobs } cellEdit={ cellEditProp }>
        <TableHeaderColumn dataField='id' isKey={ true }>ID</TableHeaderColumn>
        <TableHeaderColumn dataField='numeroRecotizacion'  editable={ { type: 'input', attrs: attrs } }>numeroRecotizacion</TableHeaderColumn>
        <TableHeaderColumn dataField='cotizacion_id'  editable={ { type: 'input', attrs: attrs } }>cotizacion_id</TableHeaderColumn>
        <TableHeaderColumn dataField='descripcion_doc'  editable={ { type: 'input', attrs: attrs } }>descripcion_doc</TableHeaderColumn>
        <TableHeaderColumn dataField='revicion_inicial'  editable={ { type: 'input', attrs: attrs } }>revicion_inicial</TableHeaderColumn>
        <TableHeaderColumn dataField='cantidad_doc'  editable={ { type: 'input', attrs: attrs } }>cantidad_doc</TableHeaderColumn>
        <TableHeaderColumn dataField='HHUnidades'  editable={ { type: 'input', attrs: attrs } }>HHUnidades</TableHeaderColumn>
        <TableHeaderColumn dataField='total'  editable={ { type: 'input', attrs: attrs } }>total</TableHeaderColumn>
        <TableHeaderColumn dataField='revision_unica'  editable={ { type: 'input', attrs: attrs } }>revision_unica</TableHeaderColumn>
        <TableHeaderColumn dataField='observacion'  editable={ { type: 'input', attrs: attrs } }>observacion</TableHeaderColumn>
        <TableHeaderColumn dataField='modificar_lista'  editable={ { type: 'input', attrs: attrs } }>modificar_lista</TableHeaderColumn>
        <TableHeaderColumn dataField='proveerdor'  editable={ { type: 'input', attrs: attrs } }>proveerdor</TableHeaderColumn>
        <TableHeaderColumn dataField='viatico'  editable={ { type: 'input', attrs: attrs } }>viatico</TableHeaderColumn>
        <TableHeaderColumn dataField='list_docs_i'  editable={ { type: 'input', attrs: attrs } }>list_docs_i</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}