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
  if(window.confirm('Desea Certificar?')){
    let suma = parseInt(row.porcentajeAvanceAcumulado) +  parseInt(row.inputSend);
    console.log(suma);
    if(suma < 100){
      const settings = {
        method: 'POST',
        body: JSON.stringify(row),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
      };
      let url = "/datosCertificacion/updateAvance/";
      try {
          const fetchResponse = await fetch(url, settings);
          const data = await fetchResponse.json();
          alert("Avace certificado");
      } catch (e) {
        console.log(e);
      }
    }else{
      alert("No se puede certificar mas del 100%");
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

  componentDidUpdate(prevProps) {
    if (this.props.idSearch !== prevProps.idSearch) {
        this.callApi();
    }
  }

  callApi = async () => {
    jobs = [];
    if(this.props.idSearch){
        let test = this.props.idSearch;
        let response = await fetch('/datosCertificacion/codigoUnificador/' + test);
        var data = await response.json();
        if (response.status !== 200) throw Error(data.message);
        for (let i = 0; i < data.length; i++) {
            jobs.push({
                id: data[i].id,
                certificacion_id: data[i].certificacion_id,
                certificacion_control_id: data[i].certificacion_control_id,
                certificacion_control_cotizacion_id: data[i].certificacion_control_cotizacion_id,
                porcentajeAvanceAcumulado: data[i].porcentajeAvanceAcumulado,
                list_docs_id: data[i].list_docs_id,
                inputSend: 0,
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
      let mergeNombre = data[i].nombre + " " + data[i].titulo_documento;
      jobTypesDocumentos.push({
        value: data[i].id,
        text: mergeNombre
      });
    }
  }
  render() {
    // custom attributes on editor
    return (
        <div>
        <BootstrapTable data={ jobs } cellEdit={ cellEditProp } pagination={ true } options={ options } exportCSV={ true }>
            <TableHeaderColumn dataField='id' isKey={ true } autoValue={ true } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } } hidden>ID</TableHeaderColumn>
            <TableHeaderColumn dataField='certificacion_id' editable={ false } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } }>certificacion_id</TableHeaderColumn>
            <TableHeaderColumn dataField='certificacion_control_id' editable={ false } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } }>certificacion_control_id</TableHeaderColumn>
            <TableHeaderColumn dataField='certificacion_control_cotizacion_id' editable={ false } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } }>certificacion_control_cotizacion_id</TableHeaderColumn>
            <TableHeaderColumn dataField='list_docs_id' editable={ false } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } }>list_docs_id</TableHeaderColumn>
            <TableHeaderColumn dataField='porcentajeAvanceAcumulado' editable={ false } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } }>porcentajeAvanceAcumulado</TableHeaderColumn>
            <TableHeaderColumn dataField='inputSend' editable={ { validator: jobStatusValidator,type: 'input'} }y>inputSend</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

