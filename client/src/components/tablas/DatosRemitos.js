/* eslint max-len: 0 */
/* eslint no-console: 0 */
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../styles/react-bootstrap-table.css';
import moment from 'moment';

let jobs = [];
let jobTypesControl = [];
let jobTypesCotizacion = [];
let jobTypesDocumentos = [];
let jobTypesRemitos = [];

const cellEditProp = {
  mode: 'click',
  blurToSave: true,
  afterSaveCell: onAfterSaveCell
};
const selectRowProp = {
  mode: 'checkbox'
};
function jobStatusValidator(value, row) {
  const nan = isNaN(parseInt(value, 10));
  if (nan) {
    return 'Job Status must be a integer!';
  }
  return true;
}
function erroHandrle(data){
  switch(data.errno) {
    case 1451:
      alert("No se puede editar o borrar el registro ya que tiene asociado un dato");
      break;
    case 1452:
        alert("No se puede editar o borrar el registro ya que tiene asociado un dato");
        break;
    default:
      // code block
  } 
}
async function onAfterSaveCell(row, cellName, cellValue) {
  switch(cellName) {
    case "codigo_unificador":
      row.remitos_control_id = row.codigo_unificador;
      break;
    case "tituloCotiazacion":
      row.remitos_control_cotizacion_id = row.tituloCotiazacion;
      break;
    case "nombreDocumento":
      row.list_docs_id = row.nombreDocumento;
      break;
    default:
      // code block
  } 
  const settings = {
    method: 'PUT',
    body: JSON.stringify(row),
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
  };
  let url = "/datosRemitos/" + row.id;
  try {
      const fetchResponse = await fetch(url, settings);
      const data = await fetchResponse.json();
      erroHandrle(data);
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
      const fetchResponse = await fetch(`/datosRemitos/`, settings);
      const data = await fetchResponse.json();
      console.log(data);
  } catch (e) {
      console.log(e);
  }
}

async function onAfterDeleteRow(rowKeys,rows) {
  for(let i = 0; i<rowKeys.length; i++){
    let url = '/datosRemitos/' + rows[i].id;
    const settings = {
    method: 'DELETE'
    };
    try {
        const fetchResponse = await fetch(url, settings);
        const data = await fetchResponse.json();
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

export default class proyecto extends React.Component {
  constructor(props) {
    super(props);
    this.formatType = this.formatType.bind(this);
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res }))
      .catch(err => console.log(err));
    this.callApiDroopControl()
      .then(res => this.setState({ response: res }))
      .catch(err => console.log(err));
    this.callApiDroopCotizacion()
      .then(res => this.setState({ response: res }))
      .catch(err => console.log(err));
    this.callApiDroopDocumentos()
      .then(res => this.setState({ response: res }))
      .catch(err => console.log(err));
    this.callApiDroopRemitos()
      .then(res => this.setState({ response: res }))
      .catch(err => console.log(err));
  }

  formatType(cell) {
    return `TYPE_${cell}`;
  }

  callApi = async () => {
    jobs = [];
    const response = await fetch('/datosRemitos/');
    var data = await response.json();
    if (response.status !== 200) throw Error(data.message);
    for (let i = 0; i < data.length; i++) {
      jobs.push({
        id: data[i].id,
        remitos_id: data[i].remitos_id,
        calificacion: data[i].calificacion,
        remitos_control_id: data[i].remitos_control_id,
        list_docs_id: data[i].list_docs_id,
        codigo_unificador: data[i].codigo_unificador,
        tituloCotiazacion: data[i].tituloCotiazacion,
        nombreDocumento: data[i].nombreDocumento,
        nombreRemito: data[i].nombreRemito,
        remitos_control_cotizacion_id: data[i].remitos_control_cotizacion_id
      });
    }
  }

  callApiDroopCotizacion = async () => {
    const response = await fetch('/cotizacion');
    var data = await response.json();
    if (response.status !== 200) throw Error(data.message);
    jobTypesCotizacion = [];
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
    jobTypesControl = [];
    for (let i = 0; i < data.length; i++) {
      jobTypesControl.push({
        value: data[i].id,
        text: data[i].codigo_unificador
      });
    }
  }

  callApiDroopDocumentos = async () => {
    const response = await fetch('/list_docs');
    var data = await response.json();
    if (response.status !== 200) throw Error(data.message);
    jobTypesDocumentos = [];
    for (let i = 0; i < data.length; i++) {
        let mergeNombre = data[i].nombre + " " + data[i].titulo_documento;
        jobTypesDocumentos.push({
          value: data[i].id,
          text: mergeNombre
        });
    }
  }

  callApiDroopRemitos = async () => {
    const response = await fetch('/remitos');
    var data = await response.json();
    if (response.status !== 200) throw Error(data.message);
    jobTypesRemitos = [];
    for (let i = 0; i < data.length; i++) {
      jobTypesRemitos.push({
        value: data[i].id,
        text: data[i].remito
      });
    }
  }

  render() {
    return (
      <BootstrapTable data={ jobs } cellEdit={ cellEditProp } insertRow={ true } pagination={ true } options={ options } exportCSV={ true } deleteRow={ true } selectRow={ selectRowProp }>
        <TableHeaderColumn width='200' dataField='id' isKey={ true } autoValue={ true } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } } hidden>ID</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='remitos_id' editable={ { type: 'select', options: { values: jobTypesRemitos } } } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } } hidden>Nombre del remito</TableHeaderColumn>
        <TableHeaderColumn width='200' hiddenOnInsert dataField='nombreRemito' editable={ { type: 'select', options: { values: jobTypesRemitos } } } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } }>Nombre del remito</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='remitos_control_id' editable={ { type: 'select', options: { values: jobTypesControl } } } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } } hidden>Control</TableHeaderColumn>
        <TableHeaderColumn width='200' hiddenOnInsert dataField='codigo_unificador' editable={ { type: 'select', options: { values: jobTypesControl } } } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } }>Codigo unificado</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='remitos_control_cotizacion_id' editable={ { type: 'select', options: { values: jobTypesCotizacion } } } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } } hidden>Titulo de la cotizacion</TableHeaderColumn>
        <TableHeaderColumn width='200' hiddenOnInsert dataField='tituloCotiazacion' editable={ { type: 'select', options: { values: jobTypesCotizacion } } } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } }>Titulo de la cotizacion</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='calificacion' editable={ { type: 'input' } } filter={ { type: 'TextFilter', delay: 1000 } }>Calificacion</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='list_docs_id' editable={ { type: 'select', options: { values: jobTypesDocumentos } } } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } } hidden>Nombre del documento</TableHeaderColumn>
        <TableHeaderColumn width='200' hiddenOnInsert dataField='nombreDocumento' editable={ { type: 'select', options: { values: jobTypesDocumentos } } } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } }>Nombre del documento</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}