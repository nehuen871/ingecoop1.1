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
    for(let i = 0; i< this.state.id_cotizacion.length; i++){
      let data = {"id":this.state.id_cotizacion[i]};
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
    }
    return dataMap;
  }

  getAllDocsForControl = async () =>{
    let dataMap = [];
      for(let i = 0; i< this.state.id_control.length; i++){
      let data = {"id":this.state.id_control[i]};
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
    }
    return dataMap;
  }

  searchData = async () => {
    //let data = {"id":this.props.changeLink};
    const settings = {
      method: 'GET'
    };
    let url = '/remitos/' + this.props.changeLink;
    try {
        const fetchResponse = await fetch(url, settings);
        let data = await fetchResponse.json();
        let response = this.formatData(data);
    } catch (e) {
        console.log(e);
    }
  }

  formatData(data){
  const controlData = [];
  const cotizacionlData = [];
  const mapP = new Map();
  const mapCoti = new Map();
  const mapControl = new Map();
  let arrayCotiIds = [];
  let arrayConIds = [];

  for (const item of data) {
  
  }
  let result = [...proyectoData];

  return result;
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