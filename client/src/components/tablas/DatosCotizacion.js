/* eslint max-len: 0 */
/* eslint no-console: 0 */
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../styles/react-bootstrap-table.css';

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
const inStockStatus = {
  1: 'Si',
  0: 'No'
};

function enumFormatter(cell, row, enumObject) {
  return enumObject[cell];
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
  switch(cellName) {
    case "tituloCotiazacion":
      row.control_cotizacion_id = row.tituloCotiazacion;
      break;
    case "nombreDocumento":
      row.list_docs_id = row.nombreDocumento;
      break;
    case "cantidad_doc":
      resultado = Number(row.cantidad_doc) * Number(row.HHUnidades);
      row.total = resultado;
      break;
    case "HHUnidades":
      resultado = Number(row.cantidad_doc) * Number(row.HHUnidades);
      resultado2 = Number(row.valorHora) * Number(row.total);
      row.total = resultado;
      row.totalValorHora = resultado2;
      break;
    default:
      case "valorHora":
      resultado = Number(row.valorHora) * Number(row.total);
      row.totalValorHora = resultado;
      break;
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
      let numReco = 0;
      if(!this.props.senDataRecotizacion){
        numReco = 0;
      }else{
        numReco = this.props.senDataRecotizacion;
      }
      jobs = [];
      const response = await fetch('/datosCotizacion/codigoUnificador/'+this.props.sendData+'/'+numReco);
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
          tituloCotiazacion: data[i].tituloCotiazacion,
          nombreDocumento: data[i].nombreDocumento,
          numero_documento: data[i].numero_documento,
          valorHora: data[i].valorHora,
          totalValorHora: data[i].totalValorHora,
          list_docs_id: data[i].list_docs_id
        });
      }
    }else{
      if(this.props.sendData != "0"){
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
            tituloCotiazacion: data[i].tituloCotiazacion,
            nombreDocumento: data[i].nombreDocumento,
            numero_documento: data[i].numero_documento,
            valorHora: data[i].valorHora,
            totalValorHora: data[i].totalValorHora,
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
    return (
      <BootstrapTable data={ jobs } cellEdit={ cellEditProp } insertRow={ true } pagination={ true } options={ options } exportCSV={ true } deleteRow={ true } selectRow={ selectRowProp }>
        <TableHeaderColumn width='200' dataField='id' isKey={ true } autoValue={ true } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } } hidden>ID</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='cotizacion_id'  editable={ { validator: jobStatusValidator,type: 'select', options: { values: jobTypesCotizacion } } } filter={ { type: 'TextFilter', delay: 1000 } } hidden>Cotizacion</TableHeaderColumn>
        <TableHeaderColumn width='200' hiddenOnInsert dataField='tituloCotiazacion' editable={ { type: 'select', options: { values: jobTypesCotizacion } } } filter={ { type: 'TextFilter', delay: 1000 } }>Titulo cotizacion</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='list_docs_id'  editable={ { validator: jobStatusValidator,type: 'select', options: { values: jobTypesDocumentos } } } filter={ { type: 'TextFilter', delay: 1000 } } hidden>Nombre del documento</TableHeaderColumn>
        <TableHeaderColumn width='200' hiddenOnInsert dataField='nombreDocumento' editable={ { type: 'select', options: { values: jobTypesDocumentos } } } filter={ { type: 'TextFilter', delay: 1000 } }>Nombre del documento</TableHeaderColumn>
        <TableHeaderColumn width='200' hiddenOnInsert dataField='numero_documento' editable={ { type: 'input' } } filter={ { type: 'TextFilter', delay: 1000 } }>Numero del documento</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='numeroRecotizacion'  editable={ { validator: jobStatusValidator,type: 'input' } } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } }>Numero de recotizacion</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='descripcion_doc'  editable={ { type: 'input' } } filter={ { type: 'TextFilter', delay: 1000 } }>Descripcion del documento</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='cantidad_doc' hiddenOnInsert editable={ { type: 'input' } } filter={ { type: 'TextFilter', delay: 1000 } }>Cantidad de documentos</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='HHUnidades' hiddenOnInsert editable={ { type: 'input' } } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } }>HHUnidades</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='total' hiddenOnInsert editable={  false  } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } }>Total de HH</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='valorHora' hiddenOnInsert editable={ { type: 'input' } } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } }>Valor de hora</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='totalValorHora' hiddenOnInsert editable={ { type: 'input' } } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } }>Total $$</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='revicion'  editable={ { type: 'input' } } filter={ { type: 'TextFilter', delay: 1000 } }>Revision</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='observacion' editable={ { type: 'input' } } filter={ { type: 'TextFilter', delay: 1000 } }>Observacion</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='HH_asociado' dataFormat={ enumFormatter } formatExtraData={ inStockStatus } editable={ { type: 'checkbox', options: { values: '1:0' } } }>HH_asociado</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='proveerdor' dataFormat={ enumFormatter } formatExtraData={ inStockStatus } editable={ { type: 'checkbox', options: { values: '1:0' } } }>Proveedor</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='viatico' dataFormat={ enumFormatter } formatExtraData={ inStockStatus } editable={ { type: 'checkbox', options: { values: '1:0' } } }>Viatico</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}