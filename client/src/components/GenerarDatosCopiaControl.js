import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../styles/react-bootstrap-table.css';
import SendDataButton from "./button/sendDataButtonCopiaControl";
import moment from 'moment';

let jobs = [];
let jobTypes = [];

const selectRowProp = {
  mode: 'checkbox',
  clickToSelect: true,
  onSelect: onRowSelect
}
let dataSelected = [];
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

function onRowSelect(row, isSelected, e, rowIndex) {
  dataSelected.push({
    id: row.id
  });
}

export default class generarDatosControl extends React.Component {
  constructor(props) {
    super(props);
    this.formatType = this.formatType.bind(this);
  }

  componentDidMount(){
    this.callApi()
      .then(res => this.setState({ response: res }))
      .catch(err => console.log(err));
    this.callApiDroop()
      .then(res => this.setState({ response: res }))
      .catch(err => console.log(err));
  }

  formatType(cell) {
    return `TYPE_${cell}`;
  }

  callApi = async () => {
      jobs = [];
      const response = await fetch('/control');
      var data = await response.json();
      if (response.status !== 200) throw Error(data.message);
      for (let i = 0; i < data.length; i++) {
        let fecha1 = moment(data[i].fecha_emision_proyectada).format('DD-MM-YYYY');
        let fecha3 = moment(data[i].fecha_calificaion).format('DD-MM-YYYY');
        jobs.push({
          id: data[i].id,
          cotizacion_id: data[i].cotizacion_id,
          tituloCotiazacion: data[i].tituloCotiazacion,
          fecha_emision_proyectada: fecha1,
          revision: data[i].revision,
          fecha_calificaion: fecha3,
          codigo_unificador: data[i].codigo_unificador
        });
      }
  }

  callApiDroop = async () => {
    const response = await fetch('/cotizacion');
    var data = await response.json();
    if (response.status !== 200) throw Error(data.message);
    jobTypes = [];
    for (let i = 0; i < data.length; i++) {
      jobTypes.push({
        value: data[i].id,
        text: data[i].titulo_cotiazacion
      });
    }
  }

  render() {
    return (
      <div>
        <BootstrapTable data={ jobs }  pagination={ true } options={ options } exportCSV={ true }  selectRow={ selectRowProp }>
        <TableHeaderColumn width='200' dataField='id' isKey={ true } autoValue={ true } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } } hidden>ID</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='codigo_unificador' editable={ { type: 'input' } } filter={ { type: 'TextFilter', delay: 1000 } }>Codigo unificado</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='cotizacion_id' editable={ { type: 'select', options: { values: jobTypes } } } filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } } hidden>Cotizacion</TableHeaderColumn>
        <TableHeaderColumn width='200' hiddenOnInsert dataField='tituloCotiazacion' editable={ { type: 'select', options: { values: jobTypes } } } filter={ { type: 'TextFilter', delay: 1000 } }>Titulo de cotizacion</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='fecha_emision_proyectada' editable={ { type: 'date' } } filter={ { type: 'DateFilter' } }>Fecha de emision proyectada</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='fecha_calificaion' editable={ { type: 'date' } } filter={ { type: 'DateFilter' } }>Fecha de calificacion</TableHeaderColumn>
        </BootstrapTable>
        <SendDataButton changeLink={dataSelected}/>
      </div>
    );
  }
}