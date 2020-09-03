/* eslint max-len: 0 */
/* eslint no-console: 0 */
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../styles/react-bootstrap-table.css';

let jobs = [];
let jobTypesCotizacion = [];
let jobTypesDocumentos = [];
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
async function onAfterSaveCell(row, cellName, cellValue) {
  const settings = {
    method: 'PUT',
    body: JSON.stringify(row),
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
  };
  let url = "/datosCotizacion/" + row.id;
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
      const fetchResponse = await fetch(`/datosCotizacion`, settings);
      const data = await fetchResponse.json();
      console.log(data);
  } catch (e) {
    console.log(e);
  }
}

async function onAfterDeleteRow(rowKeys,rows) {
  for(let i = 0; i<rowKeys.length; i++){
    let url = '/datosCotizacion/' + rows[i].id;
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

export default class datosCotizacion extends React.Component {
  constructor(props) {
    super(props);
    this.formatType = this.formatType.bind(this);
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res }))
      .catch(err => console.log(err));
    this.callApiDroopCotizacion()
      .then(res => this.setState({ response: res }))
      .catch(err => console.log(err));
    this.callApiDroopDocumentos()
      .then(res => this.setState({ response: res }))
      .catch(err => console.log(err));
  }

  componentDidUpdate(prevProps) {
    // Uso tipico (no olvides de comparar los props):
    if (this.props.sendData !== prevProps.sendData) {
      this.callApi();
    }
  }

  formatType(cell) {
    return `TYPE_${cell}`;
  }

  callApi = async () => {
    if(this.props.sendData){
      jobs = [];
      const response = await fetch('/datosCotizacion/codigoUnificador/'+this.props.sendData);
      var data = await response.json();
      if (response.status !== 200) throw Error(data.message);
      for (let i = 0; i < data.length; i++) {
        jobs.push({
          id: data[i].id,
          numeroRecotizacion: data[i].numeroRecotizacion,
          cotizacion_id: data[i].cotizacion_id,
          descripcion_doc: data[i].descripcion_doc,
          revicion: data[i].revicion,
          cantidad_doc: data[i].cantidad_doc,
          HHUnidades: data[i].HHUnidades,
          total: data[i].total,
          observacion: data[i].observacion,
          HH_asociado: data[i].HH_asociado,
          proveerdor: data[i].proveerdor,
          viatico: data[i].viatico,
          list_docs_id: data[i].list_docs_id
        });
      }
    }else{
      jobs = [];
      const response = await fetch('/datosCotizacion');
      var data = await response.json();
      if (response.status !== 200) throw Error(data.message);
      for (let i = 0; i < data.length; i++) {
        jobs.push({
          id: data[i].id,
          numeroRecotizacion: data[i].numeroRecotizacion,
          cotizacion_id: data[i].cotizacion_id,
          descripcion_doc: data[i].descripcion_doc,
          revicion: data[i].revicion,
          cantidad_doc: data[i].cantidad_doc,
          HHUnidades: data[i].HHUnidades,
          total: data[i].total,
          observacion: data[i].observacion,
          HH_asociado: data[i].HH_asociado,
          proveerdor: data[i].proveerdor,
          viatico: data[i].viatico,
          list_docs_id: data[i].list_docs_id
        });
      }
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

  callApiDroopDocumentos = async () => {
    const response = await fetch('/list_docs');
    var data = await response.json();
    if (response.status !== 200) throw Error(data.message);
    for (let i = 0; i < data.length; i++) {
      let mergeNombre = data[i].nombre + " " + data[i].titulo_documento;
      jobTypesDocumentos.push({
        value: data[i].id,
        text: mergeNombre
      });
    }
  }

  render() {
    return (
      <BootstrapTable data={ jobs } cellEdit={ cellEditProp } insertRow={ true } pagination={ true } options={ options } exportCSV={ true } deleteRow={ true } selectRow={ selectRowProp }>
        <TableHeaderColumn dataField='id' isKey={ true } autoValue={ true } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } } hidden>ID</TableHeaderColumn>
        <TableHeaderColumn dataField='numeroRecotizacion'  editable={ { validator: jobStatusValidator,type: 'input' } } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } }>numeroRecotizacion</TableHeaderColumn>
        <TableHeaderColumn dataField='cotizacion_id'  editable={ { validator: jobStatusValidator,type: 'select', options: { values: jobTypesCotizacion } } } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } }>cotizacion_id</TableHeaderColumn>
        <TableHeaderColumn dataField='descripcion_doc'  editable={ { type: 'input' } } filter={ { type: 'TextFilter', delay: 1000 } }>descripcion_doc</TableHeaderColumn>
        <TableHeaderColumn dataField='revicion'  editable={ { validator: jobStatusValidator,type: 'input' } } filter={ { type: 'TextFilter', delay: 1000 } }>revicion</TableHeaderColumn>
        <TableHeaderColumn dataField='cantidad_doc' hiddenOnInsert editable={ false } filter={ { type: 'TextFilter', delay: 1000 } }>cantidad_doc</TableHeaderColumn>
        <TableHeaderColumn dataField='HHUnidades' hiddenOnInsert editable={ false } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } }>HHUnidades</TableHeaderColumn>
        <TableHeaderColumn dataField='total' hiddenOnInsert editable={ false } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } }>Total de control datos</TableHeaderColumn>
        <TableHeaderColumn dataField='observacion'  editable={ { type: 'input' } } filter={ { type: 'TextFilter', delay: 1000 } }>observacion</TableHeaderColumn>
        <TableHeaderColumn dataField='HH_asociado'  editable={ { validator: jobStatusValidator,type: 'input' } } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } }>HH_asociado</TableHeaderColumn>
        <TableHeaderColumn dataField='proveerdor'  editable={ { validator: jobStatusValidator,type: 'input' } } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } }>proveerdor</TableHeaderColumn>
        <TableHeaderColumn dataField='viatico'  editable={ { validator: jobStatusValidator,type: 'input' } } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } }>viatico</TableHeaderColumn>
        <TableHeaderColumn dataField='list_docs_id'  editable={ { validator: jobStatusValidator,type: 'select', options: { values: jobTypesDocumentos } } } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } }>list_docs_id</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}