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

  formatType(cell) {
    return `TYPE_${cell}`;
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
    const response = await fetch('/certificacion');
    var data = await response.json();
    if (response.status !== 200) throw Error(data.message);
    for (let i = 0; i < data.length; i++) {
      jobs.push({
        id: data[i].id,
        control_id: data[i].control_id,
        control_cotizacion_id: data[i].control_cotizacion_id,
        control_cotizacion_proyecto_id: data[i].control_cotizacion_proyecto_id,
        proveedor: data[i].proveedor,
        cuit: data[i].cuit,
        numeroInternoProveedor: data[i].numeroInternoProveedor,
        numeroDePedido: data[i].numeroDePedido,
        nombre: data[i].nombre,
        especialidad: data[i].especialidad,
        fechaDeEmision: data[i].fechaDeEmision,
        moneda: data[i].moneda,
        costoHoraDoc: data[i].costoHoraDoc,
        cantdeHs: data[i].cantdeHs,
        cantdeDocs: data[i].cantdeDocs,
        porcentajeAvance: data[i].porcentajeAvance,
        horasCertificadas: data[i].horasCertificadas,
        cetifiacacionInterna_id: data[i].cetifiacacionInterna_id,
        total_certificacion: data[i].total_certificacion
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
        <TableHeaderColumn dataField='control_id' editable={ { type: 'input', attrs: attrs } }>control_id</TableHeaderColumn>
        <TableHeaderColumn dataField='control_cotizacion_id' editable={ { type: 'input', attrs: attrs } }>control_cotizacion_id</TableHeaderColumn>
        <TableHeaderColumn dataField='control_cotizacion_proyecto_id' editable={ { type: 'input', attrs: attrs } }>control_cotizacion_proyecto_id</TableHeaderColumn>
        <TableHeaderColumn dataField='proveedor' editable={ { type: 'input', attrs: attrs } }>proveedor></TableHeaderColumn>
        <TableHeaderColumn dataField='cuit' editable={ { type: 'input', attrs: attrs } }>cuit</TableHeaderColumn>
        <TableHeaderColumn dataField='numeroInternoProveedor' editable={ { type: 'input', attrs: attrs } }>numeroInternoProveedor</TableHeaderColumn>
        <TableHeaderColumn dataField='numeroDePedido' editable={ { type: 'input', attrs: attrs } }>numeroDePedido</TableHeaderColumn>
        <TableHeaderColumn dataField='nombre' editable={ { type: 'input', attrs: attrs } }>nombre></TableHeaderColumn>
        <TableHeaderColumn dataField='especialidad' editable={ { type: 'input', attrs: attrs } }>especialidad</TableHeaderColumn>
        <TableHeaderColumn dataField='fechaDeEmision' editable={ { type: 'input', attrs: attrs } }>fechaDeEmision</TableHeaderColumn>
        <TableHeaderColumn dataField='moneda' editable={ { type: 'input', attrs: attrs } }>moneda</TableHeaderColumn>
        <TableHeaderColumn dataField='costoHoraDoc' editable={ { type: 'input', attrs: attrs } }>costoHoraDoc</TableHeaderColumn>
        <TableHeaderColumn dataField='cantdeHs' editable={ { type: 'input', attrs: attrs } }>cantdeHs</TableHeaderColumn>
        <TableHeaderColumn dataField='cantdeDocs' editable={ { type: 'input', attrs: attrs } }>cantdeDocs</TableHeaderColumn>
        <TableHeaderColumn dataField='porcentajeAvance' editable={ { type: 'input', attrs: attrs } }>porcentajeAvance</TableHeaderColumn>
        <TableHeaderColumn dataField='horasCertificadas' editable={ { type: 'input', attrs: attrs } }>horasCertificadas</TableHeaderColumn>
        <TableHeaderColumn dataField='cetifiacacionInterna_id' editable={ { type: 'input', attrs: attrs } }>cetifiacacionInterna_id</TableHeaderColumn>
        <TableHeaderColumn dataField='total_certificacion' editable={ { type: 'input', attrs: attrs } }>total_certificacion</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}