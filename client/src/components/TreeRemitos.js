import React, { Component } from 'react';
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app
export default class Tree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      treeData:[],
      id_control:[],
      control_data:[],
      id_cotizacion:[],
      id_remito:[],
      cotizaicon_data:[]
    };
    this.searchData = this.searchData.bind(this);
    this.getAllDocsForCotizacion = this.getAllDocsForCotizacion.bind(this);
    this.getAllDocsForControl = this.getAllDocsForControl.bind(this);
  }

  getAllDocsForCotizacion = async () => {
    let dataMap = [];
      let data = {"id":this.state.id_cotizacion};
      const settings = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
      };
      try {
          const fetchResponse = await fetch(`/cotizacion/all`, settings);
          const data = await fetchResponse.json();
          let dataMapValue = data.map(function (data, index, array) {
            return {id:data.id,title:data.nombre,idContizacion:data.cotizacionId};
          });
          dataMap.push(dataMapValue);
      } catch (e) {
          console.log(e);
      }
    return dataMap;
  }

  getAllDocsForControl = async () =>{
    let dataMap = [];
      let data = {"id":this.state.id_control};
      const settings = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
      };
      try {
          const fetchResponse = await fetch(`/control/getListDocsFormControl`, settings);
          const data = await fetchResponse.json();
          let dataMapValue = data.map(function (data, index, array) {
            return {id:data.id,title:data.nombre,idControl: data.controlId};
          });
          dataMap.push(dataMapValue);
      } catch (e) {
          console.log(e);
      }
    return dataMap;
  }

  searchData = async () => {
      let data = {"id":this.props.changeLink};
      const settings = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
      };
    try {
        const fetchResponse = await fetch('/remitos/dataFromRemitos', settings);
        let data = await fetchResponse.json();
        let response = this.formatData(data);
        
        let docsCotizacion = this.getAllDocsForCotizacion();
        docsCotizacion.then(result => {
          response[0][2].children = result[0];
        });
        let docsControl = this.getAllDocsForControl();
        docsControl.then(result => {
          response[0][1].children = result[0];
          this.setState({treeData: response[0]});
        });
    } catch (e) {
        console.log(e);
    }
  }

  formatData(data){
  let dataMapValue = data.map(function (data, index, array) {
    return [{remitoId:data.id,title:data.nombre},{title:data.numero_control,idControl: data.controlId,children:[]},{title:data.titulo_cotiazacion,idCotizacion: data.cotizacionId,children:[]}];
  });
  this.setState({id_control: dataMapValue[0][1].idControl});
  this.setState({id_cotizacion: dataMapValue[0][2].idCotizacion});
  return dataMapValue;
  }

  render() {
    return (
      <div style={{ height: 400 }}>
        <SortableTree
          treeData={this.state.treeData}
          onChange={treeData => this.setState({ treeData })}
        />
        <button onClick={this.searchData} className="btn btn-primary">Buscar</button>
      </div>
    );
  }
}