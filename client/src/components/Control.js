/* eslint max-len: 0 */
/* eslint no-console: 0 */
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../styles/react-bootstrap-table.css';
import moment from 'moment';

let jobs = [];
let jobTypes = [];

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
  }else if(cellName === "fecha_calificaion"){
    row.fecha_calificaion = moment(cellValue).format('YYYY-MM-DD');
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
    this.callApiDroop()
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
      let fecha3 = moment(data[i].fecha_calificaion).format('YYYY-MM-DD');
      jobs.push({
        id: data[i].id,
        cotizacion_id: data[i].cotizacion_id,
        fecha_emision_proyectada: fecha1,
        revision: data[i].revision,
        fecha_calificaion: fecha3,
        numero_documento: data[i].numero_documento,
        numero_control: data[i].numero_control,
        numero_doc: data[i].numero_doc,
        codigo_doc_cliente: data[i].codigo_doc_cliente
      });
    }
  }

  callApiDroop = async () => {
    const response = await fetch('/cotizacion');
    var data = await response.json();
    if (response.status !== 200) throw Error(data.message);
    for (let i = 0; i < data.length; i++) {
      jobTypes.push({
        value: data[i].id,
        text: data[i].titulo_cotiazacion
      });
    }
  }

  render() {
    // custom attributes on editor
    return (
      <BootstrapTable data={ jobs } cellEdit={ cellEditProp } insertRow={ true } pagination={ true } options={ options } exportCSV={ true } deleteRow={ true } selectRow={ selectRowProp } >
        <TableHeaderColumn dataField='id' isKey={ true } autoValue={ true }>ID</TableHeaderColumn>
        <TableHeaderColumn dataField='cotizacion_id' editable={ { type: 'select', options: { values: jobTypes } } }>cotizacion_id</TableHeaderColumn>
        <TableHeaderColumn dataField='fecha_emision_proyectada' editable={ { type: 'date' } }>fecha_emision_proyectada</TableHeaderColumn>
        <TableHeaderColumn dataField='revision' editable={ { type: 'input' } }>revision</TableHeaderColumn>
        <TableHeaderColumn dataField='fecha_calificaion' editable={ { type: 'date' } }>fecha_calificaion</TableHeaderColumn>
        <TableHeaderColumn dataField='numero_documento' editable={ { type: 'input' } } filter={ { type: 'TextFilter', delay: 1000 } }>numero_documento</TableHeaderColumn>
        <TableHeaderColumn dataField='numero_control' editable={ { type: 'input' } } filter={ { type: 'TextFilter', delay: 1000 } }>numero_control</TableHeaderColumn>
        <TableHeaderColumn dataField='numero_doc' editable={ { type: 'input' } } filter={ { type: 'TextFilter', delay: 1000 } }>numero_doc</TableHeaderColumn>
        <TableHeaderColumn dataField='codigo_doc_cliente' editable={ { type: 'input' } } filter={ { type: 'TextFilter', delay: 1000 } }>codigo_doc_cliente</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}