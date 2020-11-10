import React, { Component } from 'react';
import Select from 'react-select';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../styles/react-bootstrap-table.css';


let optionsSelect = [];
let jobs = [];
let inserts = [];
const selectRowProp = {
  mode: 'checkbox',
  onSelect: (row, isSelect, rowIndex, e) => {
    if(row.cantidadDedocs === "" || row.cantidadDedocs === null || row.cantidadDedocs === undefined){
      alert("Primero tiene que agregar la cantidad de documentos");
      return false;
    }else{
      if(isSelect){
        inserts.push({
          id: row.id,
          nombre: row.nombre,
          cantidadDedocs: row.cantidadDedocs,
          unidad_hh: row.unidad_hh,
          especialidad: row.especialidad,
          tipodocumento: row.tipodocumento,
          idCoti: row.idCoti,
          titulo_documento: row.titulo_documento
        });
      }else{
        for( var i = 0; i < inserts.length; i++){ 
          if ( inserts[i].id === row.id) { 
            inserts.splice(i, 1); 
          }
        }
      }
    }
  }
};
const cellEditProp = {
  mode: 'click',
  blurToSave: true
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
  let url = "/list_docs/" + row.id;
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
      const fetchResponse = await fetch(`/list_docs`, settings);
      const data = await fetchResponse.json();
      console.log(data);
  } catch (e) {
    console.log(e);
  }
}

async function onAfterDeleteRow(rowKeys,rows) {
  for(let i = 0; i<rowKeys.length; i++){
    let url = '/list_docs/' + rows[i].id;
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

export default class insertCotizacion extends Component {
  constructor(props) {
    super(props);
    this.formatType = this.formatType.bind(this);
    this.state = {
      searchDataId: 0,
    };
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res }))
      .catch(err => console.log(err));
    this.callApiDroopCotizacion()
      .then(res => this.setState({ response: res }))
      .catch(err => console.log(err));
    this.searchData = this.searchData.bind(this);
  }

  formatType(cell) {
    return `TYPE_${cell}`;
  }

  callApi = async () => {
    jobs = [];
    const response = await fetch('/list_docs');
    var data = await response.json();
    if (response.status !== 200) throw Error(data.message);
    for (let i = 0; i < data.length; i++) {
      jobs.push({
        id: data[i].id,
        nombre: data[i].nombre,
        cantidadDedocs: data[i].cantidadDedocs,
        unidad_hh: data[i].unidad_hh,
        especialidad: data[i].especialidad,
        tipodocumento: data[i].tipodocumento,
        idCoti: data[i].idCoti,
        titulo_documento: data[i].titulo_documento
      });
    }
  }

  callApiDroopCotizacion = async () => {
    jobs = [];
    const response = await fetch('/cotizacion');
    var data = await response.json();
    if (response.status !== 200) throw Error(data.message);
    optionsSelect = [];
    for (let i = 0; i < data.length; i++) {
      optionsSelect.push({
        value: data[i].id,
        label: data[i].numero_doc
      });
    }
  }
  asignarIdCoti = async (test,row) => {
    for (let i = 0; i < jobs.length; i++) {
      jobs[i].idCoti = test.value;
    }
  }
  state = {
    selectedOption: null,
  };
  handleChange = selectedOption => {
    this.setState({ selectedOption });
    this.asignarIdCoti(selectedOption);
  };
  
  searchData = async () => {
    if(window.confirm('Desea generar los datos?')){
      for(let i = 0; i< inserts.length; i++){
        for(let a = 0; a< inserts[i].cantidadDedocs; a++){
          const settings = {
            method: 'POST',
            body: JSON.stringify(inserts[i]),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
          };
          try {
              const fetchResponse = await fetch(`/datosCotizacion/datosCotizacionInsert`, settings);
              const data = await fetchResponse.json();
          } catch (e) {
            console.log(e);
          }
        }
      }
      alert("Datos Generados");
    }
  }


  render() {
    const { selectedOption } = this.state;
    return (
      <div className="col-md-12">
        <Select
          value={selectedOption}
          onChange={this.handleChange}
          options={optionsSelect}
        />
        <BootstrapTable data={ jobs } cellEdit={ cellEditProp }  pagination={ true } options={ options } selectRow={ selectRowProp }>
        <TableHeaderColumn width='200' dataField='id' isKey={ true } autoValue={ true } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } } hidden>ID</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='nombre' editable={ { type: 'input' } } filter={ { type: 'TextFilter', delay: 1000 } }>Nombre</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='especialidad' editable={ { type: 'input' } } filter={ { type: 'TextFilter', delay: 1000 } }>Especialidad</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='tipodocumento' editable={ { type: 'input' } } filter={ { type: 'TextFilter', delay: 1000 } }>Tipo de documento</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='titulo_documento' editable={ { type: 'input' } } filter={ {  type: 'TextFilter', delay: 1000  } }>Titulo del documento</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='cantidadDedocs' editable={ { type: 'input' } } filter={ {  type: 'TextFilter', delay: 1000  } }>Cantidad de documentos</TableHeaderColumn>
        <TableHeaderColumn hidden width='200' dataField='idCoti' editable={ { type: 'input' } } filter={ {  type: 'TextFilter', delay: 1000  } }>idCoti</TableHeaderColumn>
      </BootstrapTable>
      <button onClick={this.searchData} className="btn btn-primary">Insertar Datos</button>
      </div>
    );
  }
}