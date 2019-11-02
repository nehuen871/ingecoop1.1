/* eslint max-len: 0 */
/* eslint no-console: 0 */
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../styles/react-bootstrap-table.css';

const jobs = [];

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
      const fetchResponse = await fetch(`/certificacion`, settings);
      const data = await fetchResponse.json();
      console.log(data);
  } catch (e) {
    console.log(e);
  }
}

async function onAfterDeleteRow(rowKeys,rows) {
  for(let i = 0; i<rowKeys.length; i++){
    let url = '/certificacion/' + rows[i].id;
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

export default class certificacion extends React.Component {
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

  callApi = async () => {
    const response = await fetch('/certificacion');
    var data = await response.json();
    if (response.status !== 200) throw Error(data.message);
    for (let i = 0; i < data.length; i++) {
      jobs.push({
        id: data[i].id,
        control_id: data[i].control_id,
        control_cotizacion_id: data[i].control_cotizacion_id,
        numeroDePedido: data[i].numeroDePedido,
        proyecto: data[i].proyecto,
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
    return (
      <BootstrapTable data={ jobs } cellEdit={ cellEditProp } insertRow={ true } pagination={ true } options={ options } exportCSV={ true } deleteRow={ true } selectRow={ selectRowProp }>
        <TableHeaderColumn dataField='id' isKey={ true }>ID</TableHeaderColumn>
        <TableHeaderColumn dataField='control_id' editable={ { type: 'input' } }>control_id</TableHeaderColumn>
        <TableHeaderColumn dataField='control_cotizacion_id' editable={ { type: 'input' } }>control_cotizacion_id</TableHeaderColumn>
        <TableHeaderColumn dataField='numeroDePedido' editable={ { type: 'input' } }>numeroDePedido</TableHeaderColumn>
        <TableHeaderColumn dataField='proyecto' editable={ { type: 'input' } }>proyecto</TableHeaderColumn>
        <TableHeaderColumn dataField='especialidad' editable={ { type: 'input' } }>especialidad</TableHeaderColumn>
        <TableHeaderColumn dataField='fechaDeEmision' editable={ { type: 'input' } }>fechaDeEmision</TableHeaderColumn>
        <TableHeaderColumn dataField='moneda' editable={ { type: 'input' } }>moneda</TableHeaderColumn>
        <TableHeaderColumn dataField='costoHoraDoc' editable={ { type: 'input' } }>costoHoraDoc</TableHeaderColumn>
        <TableHeaderColumn dataField='cantdeHs' editable={ { type: 'input' } }>cantdeHs</TableHeaderColumn>
        <TableHeaderColumn dataField='cantdeDocs' editable={ { type: 'input' } }>cantdeDocs</TableHeaderColumn>
        <TableHeaderColumn dataField='porcentajeAvance' editable={ { type: 'input' } }>porcentajeAvance</TableHeaderColumn>
        <TableHeaderColumn dataField='horasCertificadas' editable={ { type: 'input' } }>horasCertificadas</TableHeaderColumn>
        <TableHeaderColumn dataField='cetifiacacionInterna_id' editable={ { type: 'input' } }>cetifiacacionInterna_id</TableHeaderColumn>
        <TableHeaderColumn dataField='total_certificacion' editable={ { type: 'input' } }>total_certificacion</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}