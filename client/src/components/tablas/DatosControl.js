/* eslint max-len: 0 */
/* eslint no-console: 0 */
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../styles/react-bootstrap-table.css';
import moment from 'moment';

let jobs = [];
let jobTypesCotizacion = [];
let jobTypesDocumentos = [];
let jobTypesControl = [];

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
  if(cellName === "fecha_envio_remito"){
    row.fecha_envio_remito = moment(cellValue).format('YYYY-MM-DD');
  }else{
    row.fecha_envio_remito = moment(row.fecha_envio_remito,'DD-MM-YYYY').format('YYYY-MM-DD');
  }
  switch(cellName) {
    case "codigo_unificador":
      row.control_id = row.codigo_unificador;
      break;
    case "tituloCotiazacion":
      row.control_cotizacion_id = row.tituloCotiazacion;
      break;
    case "nombreDocumento":
      row.list_docs_id = row.nombreDocumento;
      break;
    case "porcentajeAvancePrecente":
      resultado = Number(row.porcentajeAvancePrecente) + Number(row.porcentajeAvanceAnterior);
      break;
    default:
      // code block
  }
  if(resultado > 100){
    alert("El avance acumulado no puede ser mayor a 100");
  }else{
    row.porcentajeAvanceAcumulado = resultado;
    const settings = {
      method: 'PUT',
      body: JSON.stringify(row),
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      }
    };
    let url = "/datosControl/" + row.id;
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
      const fetchResponse = await fetch(`/datosControl`, settings);
      const data = await fetchResponse.json();
      console.log(data);
  } catch (e) {
    console.log(e);
  }
}

async function onAfterDeleteRow(rowKeys,rows) {
  for(let i = 0; i<rowKeys.length; i++){
    let url = '/datosControl/' + rows[i].id;
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

export default class datosControl extends React.Component {
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
    this.callApiDroopControl()
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
      const response = await fetch('/datosControl/codigoUnificador/'+this.props.sendData);
      var data = await response.json();
      if (response.status !== 200) throw Error(data.message);
      for (let i = 0; i < data.length; i++) {
        let fecha1 = moment(data[i].fecha_envio_remito).format('DD-MM-yyyy');
        jobs.push({
          id: data[i].id,
          descripcion_doc: data[i].descripcion_doc,
          revicion: data[i].revicion,
          numero_documento: data[i].numero_documento,
          cantidad_doc: data[i].cantidad_doc,
          HHUnidades: data[i].HHUnidades,
          total: data[i].total,
          observacion: data[i].observacion,
          HH_asociado: data[i].HH_asociado,
          proveedor: data[i].proveedor,
          viatico: data[i].viatico,
          numero_remito: data[i].numero_remito,
          fecha_envio_remito: fecha1,
          control_id: data[i].control_id,
          control_cotizacion_id: data[i].control_cotizacion_id,
          tituloCotiazacion: data[i].tituloCotiazacion,
          codigo_unificador: data[i].codigo_unificador,
          nombreDocumento: data[i].nombreDocumento,
          porcentajeAvanceAnterior: data[i].porcentajeAvanceAnterior,
          porcentajeAvanceAcumulado: data[i].porcentajeAvanceAcumulado,
          porcentajeAvancePrecente: data[i].porcentajeAvancePrecente,
          list_docs_id: data[i].list_docs_id,
          porcentajeAvance: data[i].porcentajeAvance
        });
      }
    }else{
      if(this.props.sendData != "0"){
        jobs = [];
        const response = await fetch('/datosControl');
        var data = await response.json();
        if (response.status !== 200) throw Error(data.message);
        for (let i = 0; i < data.length; i++) {
          let fecha1 = moment(data[i].fecha_envio_remito).format('DD-MM-yyyy');
          jobs.push({
            id: data[i].id,
            descripcion_doc: data[i].descripcion_doc,
            revicion: data[i].revicion,
            numero_documento: data[i].numero_documento,
            cantidad_doc: data[i].cantidad_doc,
            HHUnidades: data[i].HHUnidades,
            total: data[i].total,
            observacion: data[i].observacion,
            HH_asociado: data[i].HH_asociado,
            proveedor: data[i].proveedor,
            viatico: data[i].viatico,
            numero_remito: data[i].numero_remito,
            fecha_envio_remito: fecha1,
            control_id: data[i].control_id,
            control_cotizacion_id: data[i].control_cotizacion_id,
            tituloCotiazacion: data[i].tituloCotiazacion,
            codigo_unificador: data[i].codigo_unificador,
            nombreDocumento: data[i].nombreDocumento,
            porcentajeAvanceAnterior: data[i].porcentajeAvanceAnterior,
            porcentajeAvanceAcumulado: data[i].porcentajeAvanceAcumulado,
            porcentajeAvancePrecente: data[i].porcentajeAvancePrecente,
            list_docs_id: data[i].list_docs_id,
            porcentajeAvance: data[i].porcentajeAvance
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
        <TableHeaderColumn width='200' dataField='list_docs_id' editable={ { validator: jobStatusValidator,type: 'select', options: { values: jobTypesDocumentos } } } filter={ { type: 'TextFilter', delay: 1000 } } hidden>Nombre del documento</TableHeaderColumn>
        <TableHeaderColumn width='200' hiddenOnInsert dataField='nombreDocumento' editable={ {type: 'select', options: { values: jobTypesDocumentos } } } filter={ { type: 'TextFilter', delay: 1000 } }>Nombre del documento</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='control_id' editable={ { validator: jobStatusValidator,type: 'select', options: { values: jobTypesControl } } } filter={ { type: 'TextFilter', delay: 1000 } } hidden>Control</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='numero_documento' editable={ { type: 'input' } } filter={ { type: 'TextFilter', delay: 1000 } }>Numero del documento</TableHeaderColumn>
        <TableHeaderColumn width='200' hidden hiddenOnInsert dataField='codigo_unificador' editable={ { type: 'select', options: { values: jobTypesControl } } } filter={ { type: 'TextFilter', delay: 1000 } }>Codigo unificado</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='control_cotizacion_id' editable={ { validator: jobStatusValidator,type: 'select', options: { values: jobTypesCotizacion } } } filter={ { type: 'TextFilter', delay: 1000 } } hidden>Cotizacion</TableHeaderColumn>
        <TableHeaderColumn width='200' hiddenOnInsert dataField='tituloCotiazacion' editable={ { type: 'select', options: { values: jobTypesCotizacion } } } filter={ { type: 'TextFilter', delay: 1000 } } hidden>Titulo cotizacion</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='descripcion_doc' editable={ { type: 'input' } } filter={ { type: 'TextFilter', delay: 1000 } } hidden>Descripcion del documento</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='revicion' editable={ { type: 'input' } } filter={ { type: 'TextFilter', delay: 1000 } }>Revision</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='cantidad_doc' editable={ { validator: jobStatusValidator,type: 'input' } } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } }>Cantidad de documentos</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='HHUnidades' editable={ { validator: jobStatusValidator,type: 'input' } } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } }>HH Unidades</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='total' editable={ { validator: jobStatusValidator,type: 'input' } } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } }>Total</TableHeaderColumn>   
        <TableHeaderColumn width='200' dataField='porcentajeAvanceAnterior' editable={ { validator: jobStatusValidator,type: 'input' } } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } }>porcentajeAvanceAnterior</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='porcentajeAvancePrecente' editable={ { validator: jobStatusValidator,type: 'input' } } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } }>porcentajeAvancePrecente</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='porcentajeAvanceAcumulado' editable={ { validator: jobStatusValidator,type: 'input' } } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } }>porcentajeAvanceAcumulado</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='numero_remito' editable={ { type: 'input' } } filter={ { type: 'TextFilter', delay: 1000 } }>Numero de remito</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='fecha_envio_remito' editable={ { type: 'date' } } filter={ { type: 'DateFilter' } }>Fecha envio del remito</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='observacion' editable={ { type: 'input' } } filter={ { type: 'TextFilter', delay: 1000 } }>Observacion</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}
/**
 * <TableHeaderColumn width='200' dataField='HH_asociado' editable={ { validator: jobStatusValidator,type: 'input' } } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } }>HH asociado</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='proveedor' editable={ { validator: jobStatusValidator,type: 'input' } } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } }>Proveedor</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='viatico' editable={ { validator: jobStatusValidator,type: 'input' } } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } }>Viatico</TableHeaderColumn>
     <TableHeaderColumn width='200' dataField='porcentajeAvance' editable={ { validator: jobStatusValidator,type: 'input' } } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } }>porcentajeAvance</TableHeaderColumn>
        */