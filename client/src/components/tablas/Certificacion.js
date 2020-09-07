/* eslint max-len: 0 */
/* eslint no-console: 0 */
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../styles/react-bootstrap-table.css';
import moment from 'moment';


let jobs = [];
let jobTypesCotizacion = [];
let jobTypesControl = [];
let jobTypesProyecto = [];
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
    this.callApiDroopCotizacion()
      .then(res => this.setState({ response: res }))
      .catch(err => console.log(err));
    this.callApiDroopControl()
      .then(res => this.setState({ response: res }))
      .catch(err => console.log(err));
    this.callApiDroopProyecto()
      .then(res => this.setState({ response: res }))
      .catch(err => console.log(err));
  }

  componentDidUpdate(prevProps) {
    // Uso tipico (no olvides de comparar los props):
    if (this.props.sendData !== prevProps.sendData) {
      this.callApi();
    }
  }
  
  callApi = async () => {
    if(this.props.sendData){
      jobs = [];
      const response = await fetch('/certificacion/codigoUnificador/'+this.props.sendData);
      var data = await response.json();
      if (response.status !== 200) throw Error(data.message);
      for (let i = 0; i < data.length; i++) {
        let fecha1 = moment(data[i].fechaDeEmision).format('YYYY-MM-DD');
        jobs.push({
          id: data[i].id,
          control_id: data[i].control_id,
          control_cotizacion_id: data[i].control_cotizacion_id,
          numeroDePedido: data[i].numeroDePedido,
          proyecto: data[i].proyecto,
          especialidad: data[i].especialidad,
          fechaDeEmision: fecha1,
          codigo_unificador: data[i].codigo_unificador,
          moneda: data[i].moneda
        });
      }
    }else{
      jobs = [];
      const response = await fetch('/certificacion');
      var data = await response.json();
      if (response.status !== 200) throw Error(data.message);
      for (let i = 0; i < data.length; i++) {
        let fecha1 = moment(data[i].fechaDeEmision).format('YYYY-MM-DD');
        jobs.push({
          id: data[i].id,
          control_id: data[i].control_id,
          control_cotizacion_id: data[i].control_cotizacion_id,
          numeroDePedido: data[i].numeroDePedido,
          proyecto: data[i].proyecto,
          especialidad: data[i].especialidad,
          fechaDeEmision: fecha1,
          codigo_unificador: data[i].codigo_unificador,
          moneda: data[i].moneda
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

  callApiDroopProyecto = async () => {
    const response = await fetch('/proyecto');
    var data = await response.json();
    if (response.status !== 200) throw Error(data.message);
    for (let i = 0; i < data.length; i++) {
      jobTypesProyecto.push({
        value: data[i].id,
        text: data[i].nombre
      });
    }
  }

  render() {
    // custom attributes on editor
    return (
      <BootstrapTable data={ jobs } cellEdit={ cellEditProp } insertRow={ true } pagination={ true } options={ options } exportCSV={ true } deleteRow={ true } selectRow={ selectRowProp }>
        <TableHeaderColumn dataField='id' isKey={ true } autoValue={ true } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } } hidden>ID</TableHeaderColumn>
        <TableHeaderColumn dataField='codigo_unificador' editable={ { type: 'input' } } filter={ { type: 'TextFilter', delay: 1000 } }>codigo_unificador</TableHeaderColumn>
        <TableHeaderColumn dataField='control_id' editable={ { validator: jobStatusValidator,type: 'select', options: { values: jobTypesControl } } } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } }>control_id</TableHeaderColumn>
        <TableHeaderColumn dataField='control_cotizacion_id' editable={ { validator: jobStatusValidator,type: 'select', options: { values: jobTypesCotizacion } } } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } }>control_cotizacion_id</TableHeaderColumn>
        <TableHeaderColumn dataField='numeroDePedido' editable={ { type: 'input' } } filter={ { type: 'TextFilter', delay: 1000 } }>numeroDePedido</TableHeaderColumn>
        <TableHeaderColumn dataField='proyecto' editable={ { validator: jobStatusValidator,type: 'select', options: { values: jobTypesProyecto } } } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } }>proyecto</TableHeaderColumn>
        <TableHeaderColumn dataField='especialidad' editable={ { type: 'input' } } filter={ { type: 'TextFilter', delay: 1000 } }>especialidad</TableHeaderColumn>
        <TableHeaderColumn dataField='fechaDeEmision' editable={ { type: 'date' } } filter={ { type: 'DateFilter' } }>fechaDeEmision</TableHeaderColumn>
        <TableHeaderColumn dataField='moneda' editable={ { type: 'input' } } filter={ { type: 'TextFilter', delay: 1000 } }>moneda</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

/**<TableHeaderColumn dataField='proyecto' editable={ { type: 'input' } } filter={ { type: 'TextFilter', delay: 1000 } }>proyecto</TableHeaderColumn> */