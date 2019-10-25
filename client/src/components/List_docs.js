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
    const response = await fetch('/list_docs');
    var data = await response.json();
    if (response.status !== 200) throw Error(data.message);
    for (let i = 0; i < data.length; i++) {
      jobs.push({
        id: data[i].id,
        nombre: data[i].nombre,
        cantidad_de_doc: data[i].cantidad_de_doc,
        total_hh: data[i].total_hh,
        especialidad: data[i].especialidad,
        lista_de_cable: data[i].lista_de_cable
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
        <TableHeaderColumn dataField='id' isKey={ true }>Job ID</TableHeaderColumn>
        <TableHeaderColumn dataField='nombre' editable={ { type: 'input', attrs: attrs } }>nombre</TableHeaderColumn>
        <TableHeaderColumn dataField='cantidad_de_doc' editable={ { type: 'input', attrs: attrs } }>cantidad_de_doc</TableHeaderColumn>
        <TableHeaderColumn dataField='total_hh' editable={ { type: 'input', attrs: attrs } }>total_hh</TableHeaderColumn>
        <TableHeaderColumn dataField='especialidad' editable={ { type: 'input', attrs: attrs } }>especialidad</TableHeaderColumn>
        <TableHeaderColumn dataField='lista_de_cable' editable={ { type: 'input', attrs: attrs } }>lista_de_cable</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}
