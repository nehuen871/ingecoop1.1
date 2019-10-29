/* eslint max-len: 0 */
/* eslint no-console: 0 */
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../styles/react-bootstrap-table.css';
import '../styles/fix.css';

const jobs = [];

const cellEditProp = {
  mode: 'click',
  blurToSave: true
};
const selectRowProp = {
  mode: 'checkbox'
};

/** REVISAR CONFIRM */
/*function customConfirm(next, dropRowKeys) {
  const dropRowKeysStr = dropRowKeys.join(',');
  if (confirm(`(It's a custom confirm)Are you sure you want to delete ${dropRowKeysStr}?`)) {
    // If the confirmation is true, call the function that
    // continues the deletion of the record.
    next();
  }
}*/
/** FIN */


export default class EditCellClassNameTable extends React.Component {
  constructor(props) {
    super(props);
    this.formatType = this.formatType.bind(this);
    const options = {
      page: 2,  // which page you want to show as default
      sizePerPageList: [ {
        text: '5', value: 5
      }, {
        text: '10', value: 10
      }, {
        text: 'All', value: jobs.length
      } ], // you can change the dropdown list for size per page
      sizePerPage: 5,  // which size per page you want to locate as default
      pageStartIndex: 0, // where to start counting the pages
      paginationSize: 3,  // the pagination bar size.
      prePage: 'Prev', // Previous page button text
      nextPage: 'Next', // Next page button text
      firstPage: 'First', // First page button text
      lastPage: 'Last', // Last page button text
      prePageTitle: 'Go to previous', // Previous page button title
      nextPageTitle: 'Go to next', // Next page button title
      firstPageTitle: 'Go to first', // First page button title
      lastPageTitle: 'Go to Last', // Last page button title
      paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
      paginationPosition: 'top',  // default is bottom, top and both is all available
      // keepSizePerPageState: true //default is false, enable will keep sizePerPage dropdown state(open/clode) when external rerender happened
      // hideSizePerPage: true > You can hide the dropdown for sizePerPage
      // alwaysShowAllBtns: true // Always show next and previous button
      // withFirstAndLast: false > Hide the going to First and Last page button
      // hidePageListOnlyOnePage: true > Hide the page list if only one page.
      afterDeleteRow: this.onAfterDeleteRow
      //handleConfirmDeleteRow: customConfirm REVISTAR CONFIRM
    };
  }

  onAfterDeleteRow(rowKeys, rows) {
    alert('The rowkey you drop: ' + rowKeys);
  }

  renderShowsTotal(start, to, total) {
    return (
      <p style={ { color: 'blue' } }>
        From { start } to { to }, totals is { total }&nbsp;&nbsp;(its a customize text)
      </p>
    );
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
    const response = await fetch('/cliente');
    var data = await response.json();
    if (response.status !== 200) throw Error(data.message);
    for (let i = 0; i < data.length; i++) {
      jobs.push({
        id: data[i].id,
        nombre: data[i].nombre,
        codigoCliente: data[i].codigoCliente
      });
    }
  }

  render() {
    // custom attributes on editor
    const attrs = {
      rows: 10,
      onKeyDown: function() {
        console.log('keydown event trigger');
      }
    };

    return (
      <BootstrapTable data={ jobs } cellEdit={ cellEditProp } insertRow={ true } pagination={ true } options={ this.options } exportCSV={ true } deleteRow={ true } selectRow={ selectRowProp }>
        <TableHeaderColumn dataField='id' isKey={ true }>ID</TableHeaderColumn>
        <TableHeaderColumn dataField='nombre' editable={ { type: 'input', attrs: attrs } }>Nombre</TableHeaderColumn>
        <TableHeaderColumn dataField='codigoCliente' editable={ { type: 'input', attrs: attrs } }>codigoCliente</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}
