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
    const response = await fetch('/cotizacion');
    var data = await response.json();
    if (response.status !== 200) throw Error(data.message);
    for (let i = 0; i < data.length; i++) {
      jobs.push({
        id: data[i].id,
        cantidadCotiazaciones: data[i].cantidadCotiazaciones,
        cliente_id: data[i].cliente_id,
        fecha: data[i].fecha,
        proyecto_id: data[i].proyecto_id,
        fin_cotizacion: data[i].fin_cotizacion
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
        <TableHeaderColumn dataField='cantidadCotiazaciones' editable={ { type: 'input', attrs: attrs } }>cantidadCotiazaciones</TableHeaderColumn>
      <TableHeaderColumn dataField='cliente_id' editable={ { type: 'input', attrs: attrs } }>cliente_id</TableHeaderColumn>
      <TableHeaderColumn dataField='fecha' editable={ { type: 'input', attrs: attrs } }>fecha</TableHeaderColumn>
      <TableHeaderColumn dataField='proyecto_id' editable={ { type: 'input', attrs: attrs } }>proyecto_id</TableHeaderColumn>
      <TableHeaderColumn dataField='fin_cotizacion' editable={ { type: 'input', attrs: attrs } }>fin_cotizacion</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}