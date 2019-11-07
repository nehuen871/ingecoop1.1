/* eslint max-len: 0 */
/* eslint no-console: 0 */
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../styles/react-bootstrap-table.css';
import moment from 'moment';

let jobs = [];


const cellEditProp = {
  mode: 'click',
  blurToSave: true,
  afterSaveCell: onAfterSaveCell
};
const selectRowProp = {
  mode: 'checkbox'
};
async function onAfterSaveCell(row, cellName, cellValue) {
  if(cellName === "fecha_emision_proyectada"){
    row.fecha_emision_proyectada = moment(cellValue).format('YYYY-MM-DD');
  }else if(cellName === "fecha_envio_1"){
    row.fecha_envio_1 = moment(cellValue).format('YYYY-MM-DD');
  }else if(cellName === "fecha_calificaion"){
    row.fecha_calificaion = moment(cellValue).format('YYYY-MM-DD');
  }else if(cellName === "fecha_envio_2"){
    row.fecha_envio_2 = moment(cellValue).format('YYYY-MM-DD');
  }else if(cellName === "fecha_envio_3"){
    row.fecha_envio_3 = moment(cellValue).format('YYYY-MM-DD');
  }else if(cellName === "fecha_envio_4"){
    row.fecha_envio_4 = moment(cellValue).format('YYYY-MM-DD');
  }else if(cellName === "fecha_envio_5"){
    row.fecha_envio_5 = moment(cellValue).format('YYYY-MM-DD');
  }else if(cellName === "fecha_envio_6"){
    row.fecha_envio_6 = moment(cellValue).format('YYYY-MM-DD');
  }else if(cellName === "fecha_envio_7"){
    row.fecha_envio_7 = moment(cellValue).format('YYYY-MM-DD');
  }else if(cellName === "fecha_envio_8"){
    row.fecha_envio_8 = moment(cellValue).format('YYYY-MM-DD');
  }else if(cellName === "fecha_envio_9"){
    row.fecha_envio_9 = moment(cellValue).format('YYYY-MM-DD');
  }else if(cellName === "fecha_envio_10"){
    row.fecha_envio_10 = moment(cellValue).format('YYYY-MM-DD');
  }

  const settings = {
    method: 'PUT',
    body: JSON.stringify(row),
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
  };
  let url = "/control/" + row.id;
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
      const fetchResponse = await fetch(`/control`, settings);
      const data = await fetchResponse.json();
      console.log(data);
  } catch (e) {
      console.log(e);
  }
}

async function onAfterDeleteRow(rowKeys,rows) {
  for(let i = 0; i<rowKeys.length; i++){
    let url = '/control/' + rows[i].id;
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
  }, {
    text: 10, value: 10
  }, {
    text: 'All', value: jobs.length
  } ], // you can change the dropdown list for size per page
  sizePerPage: 5,  // which size per page you want to locate as default
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

export default class control extends React.Component {
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
    jobs = [];
    const response = await fetch('/control');
    var data = await response.json();
    if (response.status !== 200) throw Error(data.message);
    for (let i = 0; i < data.length; i++) {
      let fecha1 = moment(data[i].fecha_emision_proyectada).format('YYYY-MM-DD');
      let fecha2 = moment(data[i].fecha_envio_1).format('YYYY-MM-DD');
      let fecha3 = moment(data[i].fecha_calificaion).format('YYYY-MM-DD');
      let fecha4 = moment(data[i].fecha_envio_2).format('YYYY-MM-DD');
      let fecha5 = moment(data[i].fecha_envio_3).format('YYYY-MM-DD');
      let fecha6 = moment(data[i].fecha_envio_4).format('YYYY-MM-DD');
      let fecha7 = moment(data[i].fecha_envio_5).format('YYYY-MM-DD');
      let fecha8 = moment(data[i].fecha_envio_6).format('YYYY-MM-DD');
      let fecha9 = moment(data[i].fecha_envio_7).format('YYYY-MM-DD');
      let fecha10 = moment(data[i].fecha_envio_8).format('YYYY-MM-DD');
      let fecha11 = moment(data[i].fecha_envio_9).format('YYYY-MM-DD');
      let fecha12 = moment(data[i].fecha_envio_10).format('YYYY-MM-DD');
      jobs.push({
        id: data[i].id,
        cotizacion_id: data[i].cotizacion_id,
        fecha_emision_proyectada: fecha1,
        revision: data[i].revision,
        fecha_envio_1: fecha2,
        remito_1: data[i].remito_1,
        calificaion_1: data[i].calificaion_1,
        fecha_calificaion: fecha3,
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
        fecha_envio_2: fecha4,
        fecha_envio_3: fecha5,
        fecha_envio_4: fecha6,
        fecha_envio_5: fecha7,
        fecha_envio_6: fecha8,
        fecha_envio_7: fecha9,
        fecha_envio_8: fecha10,
        fecha_envio_9: fecha11,
        fecha_envio_10: fecha12,
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
    return (
      <BootstrapTable data={ jobs } cellEdit={ cellEditProp } insertRow={ true } pagination={ true } options={ options } exportCSV={ true } deleteRow={ true } selectRow={ selectRowProp } >
        <TableHeaderColumn dataField='id' isKey={ true }>ID</TableHeaderColumn>
        <TableHeaderColumn dataField='cotizacion_id' editable={ { type: 'input' } }>cotizacion_id</TableHeaderColumn>
        <TableHeaderColumn dataField='fecha_emision_proyectada' editable={ { type: 'date' } }>fecha_emision_proyectada</TableHeaderColumn>
        <TableHeaderColumn dataField='revision' editable={ { type: 'input' } }>revision</TableHeaderColumn>
        <TableHeaderColumn dataField='fecha_envio_1' editable={ { type: 'date' } }>fecha_envio_1</TableHeaderColumn>
        <TableHeaderColumn dataField='remito_1' editable={ { type: 'input' } }>remito_1</TableHeaderColumn>
        <TableHeaderColumn dataField='calificaion_1' editable={ { type: 'input' } }>calificaion_1</TableHeaderColumn>
        <TableHeaderColumn dataField='fecha_calificaion' editable={ { type: 'date' } }>fecha_calificaion</TableHeaderColumn>
        <TableHeaderColumn dataField='numero_documento' editable={ { type: 'input' } } filter={ { type: 'TextFilter', delay: 1000 } }>numero_documento</TableHeaderColumn>
        <TableHeaderColumn dataField='numero_control' editable={ { type: 'input' } } filter={ { type: 'TextFilter', delay: 1000 } }>numero_control</TableHeaderColumn>
        <TableHeaderColumn dataField='numero_doc' editable={ { type: 'input' } } filter={ { type: 'TextFilter', delay: 1000 } }>numero_doc</TableHeaderColumn>
        <TableHeaderColumn dataField='remito_2' editable={ { type: 'input' } }>remito_2</TableHeaderColumn>
        <TableHeaderColumn dataField='remito_3' editable={ { type: 'input' } }>remito_3</TableHeaderColumn>
        <TableHeaderColumn dataField='remito_4' editable={ { type: 'input' } }>remito_4</TableHeaderColumn>
        <TableHeaderColumn dataField='remito_5' editable={ { type: 'input' } }>remito_5</TableHeaderColumn>
        <TableHeaderColumn dataField='remito_6' editable={ { type: 'input' } }>remito_6</TableHeaderColumn>
        <TableHeaderColumn dataField='remito_7' editable={ { type: 'input' } }>remito_7</TableHeaderColumn>
        <TableHeaderColumn dataField='remito_8' editable={ { type: 'input' } }>remito_8</TableHeaderColumn>
        <TableHeaderColumn dataField='remito_9' editable={ { type: 'input' } }>remito_9</TableHeaderColumn>
        <TableHeaderColumn dataField='remito_10' editable={ { type: 'input' } }>remito_10</TableHeaderColumn>
        <TableHeaderColumn dataField='fecha_envio_2' editable={ { type: 'date' } }>fecha_envio_2</TableHeaderColumn>
        <TableHeaderColumn dataField='fecha_envio_3' editable={ { type: 'date' } }>fecha_envio_3</TableHeaderColumn>
        <TableHeaderColumn dataField='fecha_envio_4' editable={ { type: 'date' } }>fecha_envio_4</TableHeaderColumn>
        <TableHeaderColumn dataField='fecha_envio_5' editable={ { type: 'date' } }>fecha_envio_5</TableHeaderColumn>
        <TableHeaderColumn dataField='fecha_envio_6' editable={ { type: 'date' } }>fecha_envio_6</TableHeaderColumn>
        <TableHeaderColumn dataField='fecha_envio_7' editable={ { type: 'date' } }>fecha_envio_7</TableHeaderColumn>
        <TableHeaderColumn dataField='fecha_envio_8' editable={ { type: 'date' } }>fecha_envio_8</TableHeaderColumn>
        <TableHeaderColumn dataField='fecha_envio_9' editable={ { type: 'date' } }>fecha_envio_9</TableHeaderColumn>
        <TableHeaderColumn dataField='fecha_envio_10' editable={ { type: 'date' } }>fecha_envio_10</TableHeaderColumn>
        <TableHeaderColumn dataField='calificaion_2' editable={ { type: 'input' } }>calificaion_2</TableHeaderColumn>
        <TableHeaderColumn dataField='calificaion_3' editable={ { type: 'input' } }>calificaion_3</TableHeaderColumn>
        <TableHeaderColumn dataField='calificaion_4' editable={ { type: 'input' } }>calificaion_4</TableHeaderColumn>
        <TableHeaderColumn dataField='calificaion_5' editable={ { type: 'input' } }>calificaion_5</TableHeaderColumn>
        <TableHeaderColumn dataField='calificaion_6' editable={ { type: 'input' } }>calificaion_6</TableHeaderColumn>
        <TableHeaderColumn dataField='calificaion_7' editable={ { type: 'input' } }>calificaion_7</TableHeaderColumn>
        <TableHeaderColumn dataField='calificaion_8' editable={ { type: 'input' } }>calificaion_8</TableHeaderColumn>
        <TableHeaderColumn dataField='calificaion_9' editable={ { type: 'input' } }>calificaion_9</TableHeaderColumn>
        <TableHeaderColumn dataField='calificaion_10' editable={ { type: 'input' } }>calificaion_10</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}