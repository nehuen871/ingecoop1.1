/* eslint max-len: 0 */
/* eslint no-console: 0 */
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../styles/react-bootstrap-table.css';

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
    text: '5', value: 5
  }, {
    text: '10', value: 10
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

export default class datosCotizacion extends React.Component {
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
    const response = await fetch('/datosCotizacion');
    var data = await response.json();
    if (response.status !== 200) throw Error(data.message);
    for (let i = 0; i < data.length; i++) {
      jobs.push({
        id: data[i].id,
        numeroRecotizacion: data[i].numeroRecotizacion,
        cotizacion_id: data[i].cotizacion_id,
        descripcion_doc: data[i].descripcion_doc,
        revicion_inicial: data[i].revicion_inicial,
        cantidad_doc: data[i].cantidad_doc,
        HHUnidades: data[i].HHUnidades,
        total: data[i].total,
        revision_unica: data[i].revision_unica,
        observacion: data[i].observacion,
        modificar_lista: data[i].modificar_lista,
        proveerdor: data[i].proveerdor,
        viatico: data[i].viatico,
        list_docs_id: data[i].list_docs_id
      });
    }
  }

  render() {
    return (
      <BootstrapTable data={ jobs } cellEdit={ cellEditProp } insertRow={ true } pagination={ true } options={ options } exportCSV={ true } deleteRow={ true } selectRow={ selectRowProp }>
        <TableHeaderColumn dataField='id' isKey={ true }>ID</TableHeaderColumn>
        <TableHeaderColumn dataField='numeroRecotizacion'  editable={ { type: 'input' } }>numeroRecotizacion</TableHeaderColumn>
        <TableHeaderColumn dataField='cotizacion_id'  editable={ { type: 'input' } }>cotizacion_id</TableHeaderColumn>
        <TableHeaderColumn dataField='descripcion_doc'  editable={ { type: 'input' } } filter={ { type: 'TextFilter', delay: 1000 } }>descripcion_doc</TableHeaderColumn>
        <TableHeaderColumn dataField='revicion_inicial'  editable={ { type: 'input' } }>revicion_inicial</TableHeaderColumn>
        <TableHeaderColumn dataField='cantidad_doc'  editable={ { type: 'input' } } filter={ { type: 'TextFilter', delay: 1000 } }>cantidad_doc</TableHeaderColumn>
        <TableHeaderColumn dataField='HHUnidades'  editable={ { type: 'input' } }>HHUnidades</TableHeaderColumn>
        <TableHeaderColumn dataField='total'  editable={ { type: 'input' } }>total</TableHeaderColumn>
        <TableHeaderColumn dataField='revision_unica'  editable={ { type: 'input' } }>revision_unica</TableHeaderColumn>
        <TableHeaderColumn dataField='observacion'  editable={ { type: 'input' } } filter={ { type: 'TextFilter', delay: 1000 } }>observacion</TableHeaderColumn>
        <TableHeaderColumn dataField='modificar_lista'  editable={ { type: 'input' } }>modificar_lista</TableHeaderColumn>
        <TableHeaderColumn dataField='proveerdor'  editable={ { type: 'input' } }>proveerdor</TableHeaderColumn>
        <TableHeaderColumn dataField='viatico'  editable={ { type: 'input' } }>viatico</TableHeaderColumn>
        <TableHeaderColumn dataField='list_docs_id'  editable={ { type: 'input' } }>list_docs_id</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}