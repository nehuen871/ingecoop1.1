/* eslint max-len: 0 */
/* eslint no-console: 0 */
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../styles/react-bootstrap-table.css';
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
const selectRowProp = {
  mode: 'checkbox'
};
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
function jobStatusValidator(value, row) {
    const nan = isNaN(parseInt(value, 10));
    if (nan) {
      return 'Job Status must be a integer!';
    }
    return true;
  }
async function onAfterSaveCell(row, cellName, cellValue) {
  let resultado = 0;
  let resultado2 = 0;
  let resultado3 = 0;
  if(cellName === "fechaDeEmision"){
    row.fechaDeEmision = moment(cellValue).format('YYYY-MM-DD');
  }else{
    row.fechaDeEmision = moment(row.fechaDeEmision,'DD-MM-YYYY').format('YYYY-MM-DD');
  }
  switch(cellName) {
    case "tituloCotiazacion":
      row.certificacion_control_cotizacion_id = row.tituloCotiazacion;
      break;
    case "nombreDocumento":
      row.list_docs_id = row.nombreDocumento;
      break;
    case "certificaCionPedido":
      row.certificacion_id = row.certificaCionPedido;
      break;
    case "codigoControl":
      row.certificacion_control_id = row.codigoControl;
      break;
    case "porcentajeAvancePrecente":
        resultado = Number(row.porcentajeAvancePrecente) + Number(row.porcentajeAvanceAcumulado);
        resultado2 = Number(row.porcentajeAvancePrecente) / Number(row.cantidadDeHoras);
        row.total_certificacion = resultado2;
        resultado3 = resultado2 * Number(row.costoHoraDoc);
        row.totalPlataCerificada = resultado3;
      break;
    default:
      // code block
  }
  if(resultado > 100){
    alert("El avance acumulado no puede ser mayor a 100");
  }else{
    const settings = {
      method: 'PUT',
      body: JSON.stringify(row),
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      }
    };
    let url = "/datosCertificacion/" + row.id;
    try {
        const fetchResponse = await fetch(url, settings);
        const data = await fetchResponse.json();
        erroHandrle(data);
        console.log(data);
    } catch (e) {
      console.log(e);
    }
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
      const fetchResponse = await fetch(`/datosCertificacion`, settings);
      const data = await fetchResponse.json();
      console.log(data);
  } catch (e) {
    console.log(e);
  }
}

async function onAfterDeleteRow(rowKeys,rows) {
  for(let i = 0; i<rowKeys.length; i++){
    let url = '/datosCertificacion/' + rows[i].id;
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
    // Uso tipico (no olvides de comparar los props):
    if (this.props.sendData !== prevProps.sendData) {
      this.callApi();
    }
  }

  callApi = async () => {
    if(this.props.sendData){
      jobs = [];
      const response = await fetch('/datosCertificacion/codigoUnificador/'+this.props.sendData);
      var data = await response.json();
      if (response.status !== 200) throw Error(data.message);
      for (let i = 0; i < data.length; i++) {
        jobs.push({
          id: data[i].id,
          certificacion_id: data[i].certificacion_id,
          certificacion_control_id: data[i].certificacion_control_id,
          certificacion_control_cotizacion_id: data[i].certificacion_control_cotizacion_id,
          costoHoraDoc: data[i].costoHoraDoc,
          cantidadDeHoras: data[i].cantidadDeHoras,
          cantidadDeDocs: data[i].cantidadDeDocs,
          porcentajeAvanceAnterior: data[i].porcentajeAvanceAnterior,
          porcentajeAvance: data[i].porcentajeAvance,
          porcentajeAvancePrecente: data[i].porcentajeAvancePrecente,
          porcentajeAvanceAcumulado: data[i].porcentajeAvanceAcumulado,
          total_certificacion: data[i].total_certificacion,
          numero_documento: data[i].numero_documento,
          nombreDocumento: data[i].nombreDocumento,
          tituloCotiazacion: data[i].tituloCotiazacion,
          codigoControl: data[i].codigoControl,
          certificaCionPedido: data[i].certificaCionPedido,
          totalPlataCerificada: data[i].totalPlataCerificada,
          list_docs_id: data[i].list_docs_id
        });
      }
    }else{
      if(this.props.sendData != "0"){
        jobs = [];
        const response = await fetch('/datosCertificacion');
        var data = await response.json();
        if (response.status !== 200) throw Error(data.message);
        for (let i = 0; i < data.length; i++) {
          jobs.push({
            id: data[i].id,
            certificacion_id: data[i].certificacion_id,
            certificacion_control_id: data[i].certificacion_control_id,
            certificacion_control_cotizacion_id: data[i].certificacion_control_cotizacion_id,
            costoHoraDoc: data[i].costoHoraDoc,
            cantidadDeHoras: data[i].cantidadDeHoras,
            cantidadDeDocs: data[i].cantidadDeDocs,
            porcentajeAvanceAnterior: data[i].porcentajeAvanceAnterior,
            porcentajeAvance: data[i].porcentajeAvance,
            porcentajeAvancePrecente: data[i].porcentajeAvancePrecente,
            porcentajeAvanceAcumulado: data[i].porcentajeAvanceAcumulado,
            total_certificacion: data[i].total_certificacion,
            numero_documento: data[i].numero_documento,
            nombreDocumento: data[i].nombreDocumento,
            tituloCotiazacion: data[i].tituloCotiazacion,
            codigoControl: data[i].codigoControl,
            certificaCionPedido: data[i].certificaCionPedido,
            totalPlataCerificada: data[i].totalPlataCerificada,
            list_docs_id: data[i].list_docs_id
          });
        }
      }
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
    jobTypesControl =  [];
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
    jobTypesCertificacion = [];
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
    jobTypesDocumentos = [];
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
      <BootstrapTable data={ jobs } cellEdit={ cellEditProp } insertRow={ true } pagination={ true } options={ options } exportCSV={ true } deleteRow={ true } selectRow={ selectRowProp }>
        <TableHeaderColumn width='200' dataField='id' isKey={ true } autoValue={ true } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } } hidden>ID</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='certificacion_id' editable={ { validator: jobStatusValidator,type: 'select', options: { values: jobTypesCertificacion } } } filter={ { type: 'TextFilter', delay: 1000 } } hidden>Certificacion</TableHeaderColumn>
        <TableHeaderColumn width='200' hiddenOnInsert dataField='certificaCionPedido' editable={ { type: 'select', options: { values: jobTypesCertificacion } } } filter={ { type: 'TextFilter', delay: 1000 } }>Nombre del pedido de Certificacion</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='certificacion_control_id' editable={ { validator: jobStatusValidator,type: 'select', options: { values: jobTypesControl } } } filter={ { type: 'TextFilter', delay: 1000 } } hidden>Control</TableHeaderColumn>
        <TableHeaderColumn width='200' hiddenOnInsert dataField='codigoControl' editable={ { type: 'select', options: { values: jobTypesControl } } } filter={ { type: 'TextFilter', delay: 1000 } }>Control</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='certificacion_control_cotizacion_id' editable={ { validator: jobStatusValidator,type: 'select', options: { values: jobTypesCotizacion } } } filter={ { type: 'TextFilter', delay: 1000 } } hidden>Cotizacion</TableHeaderColumn>
        <TableHeaderColumn width='200' hiddenOnInsert dataField='tituloCotiazacion' editable={ { type: 'select', options: { values: jobTypesCotizacion } } } filter={ { type: 'TextFilter', delay: 1000 } }>Cotizacion</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='list_docs_id' editable={ { validator: jobStatusValidator,type: 'select', options: { values: jobTypesDocumentos } } } filter={ { type: 'TextFilter', delay: 1000 } } hidden>Nombre del documento</TableHeaderColumn>
        <TableHeaderColumn width='200' hiddenOnInsert dataField='nombreDocumento' editable={ { type: 'select', options: { values: jobTypesDocumentos } } } filter={ { type: 'TextFilter', delay: 1000 } }>Nombre del documento</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='numero_documento' editable={ { validator: jobStatusValidator,type: 'input' } } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } }>Numero de documento</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='cantidadDeDocs' editable={ { validator: jobStatusValidator,type: 'input' } } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } }>Cantidad de documentos</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='costoHoraDoc' editable={ { validator: jobStatusValidator,type: 'input' } } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } }>Costo hora de documento</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='cantidadDeHoras' editable={ { validator: jobStatusValidator,type: 'input' } } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } }>Total HH</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='porcentajeAvanceAnterior' editable={ { validator: jobStatusValidator,type: 'input' } } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } }>Porcentaje Avance Anterior</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='porcentajeAvancePrecente' editable={ { validator: jobStatusValidator,type: 'input' } } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } }>Porcentaje Avance Precente</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='porcentajeAvanceAcumulado' editable={ { validator: jobStatusValidator,type: 'input' } } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } }>Porcentaje Avance Acumulado</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='total_certificacion' editable={ { validator: jobStatusValidator,type: 'input' } } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } }>Total de certificacion</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='totalPlataCerificada' editable={ { validator: jobStatusValidator,type: 'input' } } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } }>Total de $$ certificada</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

/*<TableHeaderColumn width='200' dataField='porcentajeAvance' editable={ { validator: jobStatusValidator,type: 'input' } } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } }>Porcentaje Avance</TableHeaderColumn>*/