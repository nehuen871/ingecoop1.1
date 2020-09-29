/* eslint max-len: 0 */
/* eslint no-console: 0 */
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../styles/react-bootstrap-table.css';
import moment from 'moment';

let jobs = [];
let jobTypes = [];
let jobTypesCliente = [];

const cellEditProp = {
  mode: 'click',
  blurToSave: true,
  afterSaveCell: onAfterSaveCell
};
const selectRowProp = {
  mode: 'checkbox'
};

async function onAfterSaveCell(row, cellName, cellValue) {
  if(cellName === "fecha_fin"){
    row.fecha_fin = moment(cellValue).format('yyyy-MM-DD');
    row.fehca_inicio = moment(row.fehca_inicio,'DD-MM-YYYY').format('yyyy-MM-DD');
  }else if(cellName === "fehca_inicio"){
    row.fehca_inicio = moment(cellValue).format('yyyy-MM-DD');
    row.fecha_fin = moment(row.fecha_fin,'DD-MM-YYYY').format('yyyy-MM-DD');
  }else{
    row.fehca_inicio = moment(row.fehca_inicio,'DD-MM-YYYY').format('yyyy-MM-DD');
    row.fecha_fin = moment(row.fecha_fin,'DD-MM-YYYY').format('yyyy-MM-DD');
  }
  switch(cellName) {
    case "nombreCliente":
      row.cliente_id = row.nombreCliente;
      break;
    case "nombreCotizacion":
      row.cotizacion_id = row.nombreCotizacion;
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
  let url = "/proyecto/" + row.id;
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
      const fetchResponse = await fetch(`/proyecto`, settings);
      const data = await fetchResponse.json();
      console.log(data);
  } catch (e) {
      console.log(e);
  }
}

async function onAfterDeleteRow(rowKeys,rows) {
  for(let i = 0; i<rowKeys.length; i++){
    let url = '/proyecto/' + rows[i].id;
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
  paginationSize: 5,  // the pagination bar size.
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
function jobStatusValidator(value, row) {
  const nan = isNaN(parseInt(value, 10));
  if (nan) {
    return 'Tiene que ser un numero entero!';
  }
  return true;
}
export default class proyecto extends React.Component {
  constructor(props) {
    super(props);
    this.formatType = this.formatType.bind(this);
  }
  componentDidUpdate(prevProps) {
    // Uso tipico (no olvides de comparar los props):
    if (this.props.sendData !== prevProps.sendData) {
      this.callApi();
    }
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res }))
      .catch(err => console.log(err));
    this.callApiDroop()
      .then(res => this.setState({ response: res }))
      .catch(err => console.log(err));
    this.callApiDroopCliente()
      .then(res => this.setState({ response: res }))
      .catch(err => console.log(err));
  }

  formatType(cell) {
    return `TYPE_${cell}`;
  }

  callApi = async () => {
    if(this.props.sendData){
      jobs = [];
      const response = await fetch('/proyecto/codigoUnificador/'+this.props.sendData);
      var data = await response.json();
      if (response.status !== 200) throw Error(data.message);
      for (let i = 0; i < data.length; i++) {
        let fecha1 = moment(data[i].fehca_inicio).format('DD-MM-YYYY');
        let fecha2 = moment(data[i].fecha_fin).format('DD-MM-YYYY');
        jobs.push({
          id: data[i].id,
          nombre: data[i].nombre,
          revision: data[i].revision,
          cotizacion_id: data[i].cotizacion_id,
          numero_proyecto: data[i].numero_proyecto,
          cliente_id: data[i].cliente_id,
          nombreCliente: data[i].nombreCliente,
          nombreCotizacion: data[i].nombreCotizacion,
          fehca_inicio: fecha1,
          codigo_unificador: data[i].codigo_unificador,
          activo: data[i].activo,
          fecha_fin: fecha2
        });
      }
    }else{
      if(this.props.sendData != "0"){
        jobs = [];
        const response = await fetch('/proyecto');
        var data = await response.json();
        if (response.status !== 200) throw Error(data.message);
        for (let i = 0; i < data.length; i++) {
          let fecha1 = moment(data[i].fehca_inicio).format('DD-MM-YYYY');
          let fecha2 = moment(data[i].fecha_fin).format('DD-MM-YYYY');
          jobs.push({
            id: data[i].id,
            nombre: data[i].nombre,
            revision: data[i].revision,
            cotizacion_id: data[i].cotizacion_id,
            numero_proyecto: data[i].numero_proyecto,
            cliente_id: data[i].cliente_id,
            nombreCliente: data[i].nombreCliente,
            nombreCotizacion: data[i].nombreCotizacion,
            fehca_inicio: fecha1,
            codigo_unificador: data[i].codigo_unificador,
            activo: data[i].activo,
            fecha_fin: fecha2
          });
        }
      }
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

  callApiDroopCliente = async () => {
    const response = await fetch('/cliente');
    var data = await response.json();
    if (response.status !== 200) throw Error(data.message);
    jobTypesCliente = [];
    for (let i = 0; i < data.length; i++) {
      jobTypesCliente.push({
        value: data[i].id,
        text: data[i].nombre
      });
    }
  }

  render() {
    return (
      <BootstrapTable data={ jobs } cellEdit={ cellEditProp } insertRow={ true } pagination={ true } options={ options } exportCSV={ true } deleteRow={ true } selectRow={ selectRowProp }>
        <TableHeaderColumn width='200' dataField='id' isKey={ true } autoValue={ true } hidden>ID</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='codigo_unificador' editable={ { type: 'input' } } filter={ { type: 'TextFilter', delay: 1000 } }>Codigo unificado</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='nombre' editable={ { type: 'input' } } filter={ { type: 'TextFilter', delay: 1000 } }>Nombre</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='revision' editable={ { type: 'input' } } filter={ { type: 'TextFilter', delay: 1000 } }>Revision</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='numero_proyecto' editable={ { type: 'TextFilter', delay: 1000 } } filter={ { type: 'TextFilter', delay: 1000 } }>Numero de proyecto</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='cliente_id' editable={ { type: 'select', options: { values: jobTypesCliente } } } filter={ { type: 'TextFilter', delay: 1000 } } hidden>Cliente</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='nombreCliente' editable={ { type: 'select', options: { values: jobTypesCliente } } } filter={ { type: 'TextFilter', delay: 1000 } }>Cliente</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='fehca_inicio' editable={ { type: 'date' } } filter={ { type: 'DateFilter' } }>Fecha de inicio</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='fecha_fin' editable={ { type: 'date' } } filter={ { type: 'DateFilter' } }>Fecha de fin</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='cotizacion_id'  editable={ { validator: jobStatusValidator,type: 'select', options: { values: jobTypes } } } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } } hidden>Nombre de cotizacion</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='nombreCotizacion'  editable={ { validator: jobStatusValidator,type: 'select', options: { values: jobTypes } } } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } } >Nombre de cotizacion</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='activo' editable={ { validator: jobStatusValidator,type: 'input' } } filter={ { type: 'TextFilter', delay: 1000 } }>Activo</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}