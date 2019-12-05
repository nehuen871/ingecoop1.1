import React, { Component } from 'react';
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app
export default class TreeProyecto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      treeData:[],
      id_control:[],
      control_data:[],
      id_cotizacion:[],
      cotizaicon_data:[]
    };
    this.searchData = this.searchData.bind(this);
    this.getAllDocsForCotizacion = this.getAllDocsForCotizacion.bind(this);
    this.getAllDocsForControl = this.getAllDocsForControl.bind(this);
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
        const fetchResponse = await fetch(`/proyecto/all`, settings);
        const data = await fetchResponse.json();
        let response = this.formatData(data);
        console.log(response);
        let docsCotizacion = this.getAllDocsForCotizacion();
        docsCotizacion.then(result => {
          for(let a = 0;a<response.length;a++){
            for(let i = 0; i< this.state.id_cotizacion.length; i++){
              if(response[a].children[i].cotizacionId){
                if(response[a].children[i].cotizacionId === result[a][0].idContizacion){
                  response[a].children[i].children = result[a];
               }
              }
            }
          }
        });
        let docsControl = this.getAllDocsForControl();
        docsControl.then(result => {
          for(let a = 0;a<response.length;a++){
            for(let i = 0; i< this.state.id_control.length; i++){
              if(response[a].children[i].controlId){
                if(response[a].children[i].controlId === result[a][0].idControl){
                    response[a].children[i].children = result[a];
                }
              }
            }
          }
        });
        this.setState({treeData: response});
    } catch (e) {
        console.log(e);
    }
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
          const fetchResponse = await fetch(`/control/all`, settings);
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

  formatData(data){
  const controlData = [];
  const cotizacionlData = [];
  const proyectoData = [];
  const mapP = new Map();
  const mapCoti = new Map();
  const mapControl = new Map();
  let arrayCotiIds = [];
  let arrayConIds = [];

  for (const item of data) {
      if(!mapP.has(item.proyecto_id)){
          mapP.set(item.proyecto_id, true);    // set any value to Map
          proyectoData.push({
              proyectoId: item.proyecto_id,
              title: item.nombre,
              children:[{}]
          });
      }
    if(!mapCoti.has(item.cotizacion_id)){
        mapCoti.set(item.cotizacion_id, true);    // set any value to Map
        arrayCotiIds.push(item.cotizacion_id);
        this.setState({id_cotizacion: arrayCotiIds});
        cotizacionlData.push({
          title:item.titulo_cotiazacion,
          cotizacionId: item.cotizacion_id,
          children:{}
        });
    }

    if(!mapControl.has(item.contro_id)){
      mapControl.set(item.contro_id, true);    // set any value to Map
        arrayConIds.push(item.contro_id);
        this.setState({id_control: arrayConIds});
        controlData.push({
          title:item.numero_control,
          controlId:item.contro_id,
          children:{}
        });
    }
  }
  let result = [...proyectoData];
  for(let i = 0;i<proyectoData.length;i++){
    result[i].children = [cotizacionlData[i],controlData[i]];
  }
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