import React, { Component } from 'react';
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app
export default class TreeProyecto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      treeData:[],
      control_data:[],
      id_cotizacion:0,
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
        for(let i = 0;i<response.length;i++){
          this.setState({id_cotizacion: response[i].cotizacionId})
        }
        let docsCotizacion = this.getAllDocsForCotizacion();
        docsCotizacion.then(result => {
          for(let i = 0;i<response.length;i++){
            for(let a = 0;a<response.length;a++){
              response[i].children.push(result[a]);
            }
          }
        });
        let docsControl = this.getAllDocsForControl();
        docsControl.then(result => {
          for(let i = 0;i<response.length;i++){
            for(let a = 0;a<response.length;a++){
              response[i].children.push(result[a]);
            }
          }
        });
        this.setState({treeData: response});
    } catch (e) {
        console.log(e);
    }
  }
  getAllDocsForCotizacion = async () => {
    const mapCotizacion = new Map();
    const cotizacionData = [];
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
        const fetchResponse = await fetch(`/cotizacion/getListDocsFormCotizacion`, settings);
        const data = await fetchResponse.json();
        let dataMapValue = data.map(function (data, index, array) {
          if(!mapCotizacion.has(data.cotizacion_id)){
            mapCotizacion.set(data.cotizacion_id, true);    // set any value to Map
            cotizacionData.push({
                title:data.titulo_cotiazacion,
                cotizacionIdlId:data.cotizacionId,
                children:[]
              });
          }
          return {id:data.id,title:data.nombre,idContizacion:data.cotizacionId};
        });
        for(let i = 0;i<cotizacionData.length;i++){
          cotizacionData[i].children = dataMapValue;
        }
    } catch (e) {
        console.log(e);
    }
    return cotizacionData;
  }
  getAllDocsForControl = async () =>{
    const mapControl = new Map();
    const controlData = [];
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
        const fetchResponse = await fetch(`/control/getListDocsFormCotizacion`, settings);
        const data = await fetchResponse.json();
        let dataMapValue = data.map(function (data, index, array) {
          if(!mapControl.has(data.contro_id)){
            mapControl.set(data.contro_id, true);    // set any value to Map
              controlData.push({
                title:data.numero_control,
                controlId:data.controlId,
                children:[]
              });
          }
          return {id:data.id,title:data.nombre,idControl: data.controlId};
        });
        for(let i = 0;i<controlData.length;i++){
          controlData[i].children = dataMapValue;
        }
    } catch (e) {
        console.log(e);
    }
    return controlData;
  }

  formatData(data){
  const proyectoData = [];
  for (const item of data) {
    proyectoData.push({
        proyectoId: item.id,
        cotizacionId: item.cotizacion_id,
        title: item.nombre,
        children:[]
    });
  }
  return proyectoData;
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