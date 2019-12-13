import React, { Component } from 'react';
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app
export default class TreeCotizacion extends Component {
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
    this.getAllRemitosFormCotizacion = this.getAllRemitosFormCotizacion.bind(this);
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
      const fetchResponse = await fetch(`/cotizacion/getCotizacionById`, settings);
        const data = await fetchResponse.json();
        let response = this.formatData(data);
        for(let i = 0; i<response.length;i++){
          this.setState({id_cotizacion: response[i].id})
          let docsCotizacion = this.getAllDocsForCotizacion();
          docsCotizacion.then(result => {
            for(let a = 0;a<response.length;a++){
              if(result[a]){
                response[i].children.push(result[a]);
              }
            }
          });
          let docsControl = this.getAllDocsForControl();
          docsControl.then(result => {
            for(let a = 0;a<response.length;a++){
              if(result[a]){
                response[i].children.push(result[a]);
              }
            }
          });
        }
        let docsRemitos = this.getAllRemitosFormCotizacion();
          docsRemitos.then(result => {
            for(let a = 0; a<result.length;a++){
              response.push(result[a]);
            }
          });
        this.setState({treeData: response});
    } catch (e) {
        console.log(e);
    }
  }
  getAllRemitosFormCotizacion = async () => {
    let remitoData;
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
        const fetchResponse = await fetch(`/remitos/getRemitosFromCotizacion`, settings);
        const data = await fetchResponse.json();
        remitoData = data.map(function (data, index, array) {
          return {id:data.id,title:data.nombre,idContizacion:data.cotizacionId};
        });

    } catch (e) {
        console.log(e);
    }
    return remitoData;
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
    let response = data.map(function(data, index, array){
      return {id:data.id,title:data.titulo_cotiazacion,children:[]};
    });
    return response;
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