/* eslint max-len: 0 */
/* eslint no-console: 0 */
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../styles/react-bootstrap-table.css';
import moment from 'moment';


let jobs = [];
let jobTypesCotizacion = [];
let jobTypesControl = [];
let jobTypesCertificacion = [];
let jobTypesDocumentos = [];

const cellEditProp = {
  mode: 'click',
  blurToSave: true,
  afterSaveCell: onAfterSaveCell
};
const selectRowProp = {
  mode: 'checkbox'
};

async function onAfterSaveCell(row, cellName, cellValue) {
  if(cellName === "fechaDeEmision"){
    row.fechaDeEmision = moment(cellValue).format('YYYY-MM-DD');
  }
  const settings = {
    method: 'PUT',
    body: JSON.stringify(row),
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
  };
  let url = "/certificacion/" + row.id;
  try {
      const fetchResponse = await fetch(url, settings);
      const data = await fetchResponse.json();
      console.log(data);
  } catch (e) {
    console.log(e);
  }
}

async function onAfterInsertRow(row) {
  const settings = {
    method: 'POST',
    body: JSON.stringify(row),
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
  };
  try {
      const fetchResponse = await fetch(`/datosCertificacion`, settings);
      const data = await fetchResponse.json();
      console.log(data);
  } catch (e) {
    console.log(e);
  }
}

async function onAfterDeleteRow(rowKeys,rows) {
  for(let i = 0; i<rowKeys.length; i++){
    let url = '/datosCertificacion/' + rows[i].id;
    const settings = {
    method: 'DELETE'
    };
    try {
        const fetchResponse = await fetch(url, settings);
        const data = await fetchResponse.json();
        console.log(data);
    } catch (e) {
      console.log(e);
    }
  }
}

const options = {
  page: 1,  // which page you want to show as default
  sizePerPageList: [ {
    text: 5, value: 5
  },
  {
    text: 10, value: 10
  },
  {
    text: 15, value: 15
  },
  {
    text: 20, value: 20
  },
  {
    text: 30, value: 30
  },
  {
    text: 40, value: 40
  },
  {
    text: 50, value: 50
  }/*,
  {
    text: 'All', value: jobs.length
  }*/ ], // you can change the dropdown list for size per page
  sizePerPage: 50,  // which size per page you want to locate as default
  pageStartIndex: 1, // where to start counting the pages
  paginationSize: 3,  // the pagination bar size.
  prePage: 'Prev', // Previous page button text
  nextPage: 'Next', // Next page button text
  firstPage: 'First', // First page button text
  lastPage: 'Last', // Last page button text
  prePageTitle: 'Go to previous', // Previous page button title
  nextPageTitle: 'Go to next', // Next page button title
  firstPageTitle: 'Go to first', // First page button title
  lastPageTitle: 'Go to Last', // Last page button title
  paginationPosition: 'bottom',  // default is bottom, top and both is all available
  // keepSizePerPageState: true //default is false, enable will keep sizePerPage dropdown state(open/clode) when external rerender happened
  // hideSizePerPage: true > You can hide the dropdown for sizePerPage
  // alwaysShowAllBtns: true // Always show next and previous button
  // withFirstAndLast: false > Hide the going to First and Last page button
  // hidePageListOnlyOnePage: true > Hide the page list if only one page.
  afterDeleteRow: onAfterDeleteRow,
  afterInsertRow: onAfterInsertRow
  //handleConfirmDeleteRow: customConfirm REVISTAR CONFIRM
};

export default class datosCertificacion extends React.Component {
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
    this.callApiDroopCotizacion()
      .then(res => this.setState({ response: res }))
      .catch(err => console.log(err));
    this.callApiDroopControl()
      .then(res => this.setState({ response: res }))
      .catch(err => console.log(err));
    this.callApiDroopCertificacion()
      .then(res => this.setState({ response: res }))
      .catch(err => console.log(err));
    this.callApiDroopDocumentos()
      .then(res => this.setState({ response: res }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    jobs = [];
    const response = await fetch('/datosCertificacion');
    var data = await response.json();
    if (response.status !== 200) throw Error(data.message);
    for (let i = 0; i < data.length; i++) {
      jobs.push({
        id: data[i].id,
        certificacion_id: data[i].certificacion_id,
        certificacion_control_id: data[i].control_id,
        certificacion_control_cotizacion_id: data[i].control_cotizacion_id,
        costoHoraDoc: data[i].costoHoraDoc,
        cantidadDeHoras: data[i].cantidadDeHoras,
        cantidadDeDocs: data[i].cantidadDeDocs,
        porcentajeAvance: data[i].porcentajeAvance,
        total_certificacion: data[i].total_certificacion,
        list_docs_id: data[i].list_docs_id
      });
    }
  }
  callApiDroopCotizacion = async () => {
    const response = await fetch('/cotizacion');
    var data = await response.json();
    if (response.status !== 200) throw Error(data.message);
    for (let i = 0; i < data.length; i++) {
      jobTypesCotizacion.push({
        value: data[i].id,
        text: data[i].titulo_cotiazacion
      });
    }
  }

  callApiDroopControl = async () => {
    const response = await fetch('/control');
    var data = await response.json();
    if (response.status !== 200) throw Error(data.message);
    for (let i = 0; i < data.length; i++) {
      jobTypesControl.push({
        value: data[i].id,
        text: data[i].numero_control
      });
    }
  }

  callApiDroopCertificacion = async () => {
    const response = await fetch('/certificacion');
    var data = await response.json();
    if (response.status !== 200) throw Error(data.message);
    for (let i = 0; i < data.length; i++) {
      jobTypesCertificacion.push({
        value: data[i].id,
        text: data[i].numeroDePedido
      });
    }
  }

  callApiDroopDocumentos = async () => {
    const response = await fetch('/list_docs');
    var data = await response.json();
    if (response.status !== 200) throw Error(data.message);
    for (let i = 0; i < data.length; i++) {
      jobTypesDocumentos.push({
        value: data[i].id,
        text: data[i].nombre
      });
    }
  }
  render() {
    // custom attributes on editor
    return (
      <BootstrapTable data={ jobs } cellEdit={ cellEditProp } insertRow={ true } pagination={ true } options={ options } exportCSV={ true } deleteRow={ true } selectRow={ selectRowProp }>
        <TableHeaderColumn dataField='id' isKey={ true } autoValue={ true }>ID</TableHeaderColumn>
        <TableHeaderColumn dataField='certificacion_id' editable={ { type: 'select', options: { values: jobTypesCertificacion } } }>certificacion_id</TableHeaderColumn>
        <TableHeaderColumn dataField='certificacion_control_id' editable={ { type: 'select', options: { values: jobTypesControl } } }>certificacion_control_id</TableHeaderColumn>
        <TableHeaderColumn dataField='certificacion_control_cotizacion_id' editable={ { type: 'select', options: { values: jobTypesCotizacion } } }>certificacion_control_cotizacion_id</TableHeaderColumn>
        <TableHeaderColumn dataField='list_docs_id' editable={ { type: 'select', options: { values: jobTypesDocumentos } } }>list_docs_id</TableHeaderColumn>
        <TableHeaderColumn dataField='costoHoraDoc' editable={ { type: 'input' } }>costoHoraDoc</TableHeaderColumn>
        <TableHeaderColumn dataField='cantidadDeHoras' editable={ { type: 'input' } }>cantidadDeHoras</TableHeaderColumn>
        <TableHeaderColumn dataField='cantidadDeDocs' editable={ { type: 'input' } }>cantidadDeDocs</TableHeaderColumn>
        <TableHeaderColumn dataField='porcentajeAvance' editable={ { type: 'input' } }>porcentajeAvance</TableHeaderColumn>
        <TableHeaderColumn dataField='total_certificacion' editable={ { type: 'input' } }>total_certificacion</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}