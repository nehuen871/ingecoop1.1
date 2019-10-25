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
    const response = await fetch('/control');
    var data = await response.json();
    if (response.status !== 200) throw Error(data.message);
    for (let i = 0; i < data.length; i++) {
      jobs.push({
        id: data[i].id,
        cotizacion_id: data[i].cotizacion_id,
        cotizacion_proyecto_id: data[i].cotizacion_proyecto_id,
        fecha_emision_proyectada: data[i].fecha_emision_proyectada,
        revision: data[i].revision,
        fecha_envio_1: data[i].fecha_envio_1,
        remito_1: data[i].remito_1,
        calificaion_1: data[i].calificaion_1,
        fecha_calificaion: data[i].fecha_calificaion,
        numero_documento: data[i].numero_documento,
        numero_control: data[i].numero_control,
        numero_doc: data[i].numero_doc,
        remito_2: data[i].remito_2,
        remito_3: data[i].remito_3,
        remito_4: data[i].remito_4,
        remito_5: data[i].remito_5,
        remito_6: data[i].remito_6,
        remito_7: data[i].remito_7,
        remito_8: data[i].remito_8,
        remito_9: data[i].remito_9,
        remito_10: data[i].remito_10,
        fecha_envio_2: data[i].fecha_envio_2,
        fecha_envio_3: data[i].fecha_envio_3,
        fecha_envio_4: data[i].fecha_envio_4,
        fecha_envio_5: data[i].fecha_envio_5,
        fecha_envio_6: data[i].fecha_envio_6,
        fecha_envio_7: data[i].fecha_envio_7,
        fecha_envio_8: data[i].fecha_envio_8,
        fecha_envio_9: data[i].fecha_envio_9,
        fecha_envio_10: data[i].fecha_envio_10,
        calificaion_2: data[i].calificaion_2,
        calificaion_3: data[i].calificaion_3,
        calificaion_4: data[i].calificaion_4,
        calificaion_5: data[i].calificaion_5,
        calificaion_6: data[i].calificaion_6,
        calificaion_7: data[i].calificaion_7,
        calificaion_8: data[i].calificaion_8,
        calificaion_9: data[i].calificaion_9,
        calificaion_10: data[i].calificaion_10
      });
    }
  }

  render() {
    // custom attributes on editor
    const attrs = {
      rows: 39,
      onKeyDown: function() {
        console.log('keydown event trigger');
      }
    };
    return (
      <BootstrapTable data={ jobs } cellEdit={ cellEditProp }>
        <TableHeaderColumn dataField='id' isKey={ true }>ID</TableHeaderColumn>
        <TableHeaderColumn dataField='cotizacion_id' editable={ { type: 'input', attrs: attrs } }>cotizacion_id</TableHeaderColumn>
        <TableHeaderColumn dataField='cotizacion_proyecto_id' editable={ { type: 'input', attrs: attrs } }>cotizacion_proyecto_id</TableHeaderColumn>
        <TableHeaderColumn dataField='fecha_emision_proyectada' editable={ { type: 'input', attrs: attrs } }>fecha_emision_proyectada</TableHeaderColumn>
        <TableHeaderColumn dataField='revision' editable={ { type: 'input', attrs: attrs } }>revision</TableHeaderColumn>
        <TableHeaderColumn dataField='fecha_envio_1' editable={ { type: 'input', attrs: attrs } }>fecha_envio_1</TableHeaderColumn>
        <TableHeaderColumn dataField='remito_1' editable={ { type: 'input', attrs: attrs } }>remito_1</TableHeaderColumn>
        <TableHeaderColumn dataField='calificaion_1' editable={ { type: 'input', attrs: attrs } }>calificaion_1</TableHeaderColumn>
        <TableHeaderColumn dataField='fecha_calificaion' editable={ { type: 'input', attrs: attrs } }>fecha_calificaion</TableHeaderColumn>
        <TableHeaderColumn dataField='numero_documento' editable={ { type: 'input', attrs: attrs } }>numero_documento</TableHeaderColumn>
        <TableHeaderColumn dataField='numero_control' editable={ { type: 'input', attrs: attrs } }>numero_control</TableHeaderColumn>
        <TableHeaderColumn dataField='numero_doc' editable={ { type: 'input', attrs: attrs } }>numero_doc</TableHeaderColumn>
        <TableHeaderColumn dataField='remito_2' editable={ { type: 'input', attrs: attrs } }>remito_2</TableHeaderColumn>
        <TableHeaderColumn dataField='remito_3' editable={ { type: 'input', attrs: attrs } }>remito_3</TableHeaderColumn>
        <TableHeaderColumn dataField='remito_4' editable={ { type: 'input', attrs: attrs } }>remito_4</TableHeaderColumn>
        <TableHeaderColumn dataField='remito_5' editable={ { type: 'input', attrs: attrs } }>remito_5</TableHeaderColumn>
        <TableHeaderColumn dataField='remito_6' editable={ { type: 'input', attrs: attrs } }>remito_6</TableHeaderColumn>
        <TableHeaderColumn dataField='remito_7' editable={ { type: 'input', attrs: attrs } }>remito_7</TableHeaderColumn>
        <TableHeaderColumn dataField='remito_8' editable={ { type: 'input', attrs: attrs } }>remito_8</TableHeaderColumn>
        <TableHeaderColumn dataField='remito_9' editable={ { type: 'input', attrs: attrs } }>remito_9</TableHeaderColumn>
        <TableHeaderColumn dataField='remito_10' editable={ { type: 'input', attrs: attrs } }>remito_10</TableHeaderColumn>
        <TableHeaderColumn dataField='fecha_envio_2' editable={ { type: 'input', attrs: attrs } }>fecha_envio_2</TableHeaderColumn>
        <TableHeaderColumn dataField='fecha_envio_3' editable={ { type: 'input', attrs: attrs } }>fecha_envio_3</TableHeaderColumn>
        <TableHeaderColumn dataField='fecha_envio_4' editable={ { type: 'input', attrs: attrs } }>fecha_envio_4</TableHeaderColumn>
        <TableHeaderColumn dataField='fecha_envio_5' editable={ { type: 'input', attrs: attrs } }>fecha_envio_5</TableHeaderColumn>
        <TableHeaderColumn dataField='fecha_envio_6' editable={ { type: 'input', attrs: attrs } }>fecha_envio_6</TableHeaderColumn>
        <TableHeaderColumn dataField='fecha_envio_7' editable={ { type: 'input', attrs: attrs } }>fecha_envio_7</TableHeaderColumn>
        <TableHeaderColumn dataField='fecha_envio_8' editable={ { type: 'input', attrs: attrs } }>fecha_envio_8</TableHeaderColumn>
        <TableHeaderColumn dataField='fecha_envio_9' editable={ { type: 'input', attrs: attrs } }>fecha_envio_9</TableHeaderColumn>
        <TableHeaderColumn dataField='fecha_envio_10' editable={ { type: 'input', attrs: attrs } }>fecha_envio_10</TableHeaderColumn>
        <TableHeaderColumn dataField='calificaion_2' editable={ { type: 'input', attrs: attrs } }>calificaion_2</TableHeaderColumn>
        <TableHeaderColumn dataField='calificaion_3' editable={ { type: 'input', attrs: attrs } }>calificaion_3</TableHeaderColumn>
        <TableHeaderColumn dataField='calificaion_4' editable={ { type: 'input', attrs: attrs } }>calificaion_4</TableHeaderColumn>
        <TableHeaderColumn dataField='calificaion_5' editable={ { type: 'input', attrs: attrs } }>calificaion_5</TableHeaderColumn>
        <TableHeaderColumn dataField='calificaion_6' editable={ { type: 'input', attrs: attrs } }>calificaion_6</TableHeaderColumn>
        <TableHeaderColumn dataField='calificaion_7' editable={ { type: 'input', attrs: attrs } }>calificaion_7</TableHeaderColumn>
        <TableHeaderColumn dataField='calificaion_8' editable={ { type: 'input', attrs: attrs } }>calificaion_8</TableHeaderColumn>
        <TableHeaderColumn dataField='calificaion_9' editable={ { type: 'input', attrs: attrs } }>calificaion_9</TableHeaderColumn>
        <TableHeaderColumn dataField='calificaion_10' editable={ { type: 'input', attrs: attrs } }>calificaion_10</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}