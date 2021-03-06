/* eslint max-len: 0 */
/* eslint no-console: 0 */
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../styles/react-bootstrap-table.css';
import moment from 'moment';

let jobs = [];
let jobTypesControl = [];
let jobTypesCotizacion = [];

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
  if(cellName === "fecha_envio"){
    row.fecha_envio = moment(cellValue).format('yyyy-MM-DD');
  }else{
    row.fecha_envio = moment(row.fecha_envio,'DD-MM-YYYY').format('yyyy-MM-DD');
  }
  switch(cellName) {
    case "identificadorControl":
      row.control_id = row.identificadorControl;
      break;
    case "tituloCotiazacion":
      row.control_cotizacion_id = row.tituloCotiazacion;
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
  let url = "/remitos/" + row.id;
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
      const fetchResponse = await fetch(`/remitos`, settings);
      const data = await fetchResponse.json();
  } catch (e) {
      console.log(e);
  }
}

async function onAfterDeleteRow(rowKeys,rows) {
  for(let i = 0; i<rowKeys.length; i++){
    let url = '/remitos/' + rows[i].id;
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
  }

  formatType(cell) {
    return `TYPE_${cell}`;
  }

  callApi = async () => {
    jobs = [];
    const response = await fetch('/remitos');
    var data = await response.json();
    if (response.status !== 200) throw Error(data.message);
    for (let i = 0; i < data.length; i++) {
      let fecha1 = moment(data[i].fecha_envio).format('DD-MM-YYYY');
      jobs.push({
        id: data[i].id,
        remito: data[i].remito,
        fecha_envio: fecha1,
        control_id: data[i].control_id,
        control_cotizacion_id: data[i].control_cotizacion_id,
        tituloCotiazacion: data[i].tituloCotiazacion,
        identificadorControl: data[i].identificadorControl,
        codigo_unificador: data[i].codigo_unificador
      });
    }
  }

  callApiDroopCotizacion = async () => {
    const response = await fetch('/cotizacion');
    var data = await response.json();
    if (response.status !== 200) throw Error(data.message);
    jobTypesControl = [];
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

  render() {
    return (
      <BootstrapTable data={ jobs } cellEdit={ cellEditProp } insertRow={ true } pagination={ true } options={ options } exportCSV={ true } deleteRow={ true } selectRow={ selectRowProp }>
        <TableHeaderColumn width='200' dataField='id' isKey={ true } autoValue={ true } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } } hidden>ID</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='control_id' editable={ { type: 'select', options: { values: jobTypesControl } } } filter={ { type: 'TextFilter', delay: 1000} } hidden>Codigo Control</TableHeaderColumn>
        <TableHeaderColumn width='200' hiddenOnInsert dataField='identificadorControl' editable={ { type: 'select', options: { values: jobTypesControl } } } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } }>Codigo del control</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='control_cotizacion_id' editable={ { type: 'select', options: { values: jobTypesCotizacion } } } filter={ { type: 'TextFilter', delay: 1000 } } hidden>Titulo de la cotizacion</TableHeaderColumn>
        <TableHeaderColumn width='200' hiddenOnInsert dataField='tituloCotiazacion' editable={ { type: 'select', options: { values: jobTypesCotizacion } } } filter={ { type: 'TextFilter', delay: 1000 } }>Titulo de la cotizacion</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='codigo_unificador' editable={ { type: 'input' } } filter={ { type: 'TextFilter', delay: 1000 } }>Codigo unificado</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='remito' editable={ { type: 'input' } } filter={ { type: 'TextFilter', delay: 1000 } }>Remito</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='fecha_envio' editable={ { type: 'date' } } filter={ { type: 'DateFilter' } }>Fecha de envio</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}