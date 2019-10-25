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
    const response = await fetch('/cliente');
    var data = await response.json();
    if (response.status !== 200) throw Error(data.message);
    for (let i = 0; i < data.length; i++) {
      jobs.push({
        id: data[i].id,
        nombre: data[i].nombre,
        codigoCliente: data[i].codigoCliente
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
        <TableHeaderColumn dataField='nombre' editable={ { type: 'input', attrs: attrs } }>Nombre</TableHeaderColumn>
        <TableHeaderColumn dataField='codigoCliente' editable={ { type: 'input', attrs: attrs } }>codigoCliente</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}
