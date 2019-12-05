import React, { Component } from 'react';
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app
export default class TreeControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      treeData:[],
      id_control:[],
      control_data:[],
      id_remito:[],
      id_certificacion:[],
      certificacion_data:[]
    };
    this.searchData = this.searchData.bind(this);
    this.getAllRemitosFromControl = this.getAllRemitosFromControl.bind(this);
    this.getAllCertificacion = this.getAllCertificacion.bind(this);
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
        const fetchResponse = await fetch(`/control/getCertificadosFormControl`, settings);
        const data = await fetchResponse.json();
        let response = this.formatData(data);
        let docsControl = this.getAllDocsForControl();
        docsControl.then(result => {
          for(let a = 0;a<response.length;a++){
            for(let i = 0;i<result.length;i++){
              if(response[a].controlId === result[i][0].idControl){
                response[a].children = result[i];
              }
            }
          }
        });
        let docsRemitos = this.getAllRemitosFromControl();
        docsRemitos.then(result => {
          for(let i = 0;i<result.length;i++){
            if(result[0][i]){
              response.push(result[0][i]);
            }
          }
          this.setState({treeData: response});
        });
    } catch (e) {
        console.log(e);
    }
  }

  getAllRemitosFromControl = async () => {
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
          const fetchResponse = await fetch(`/remitos/fromControl`, settings);
          const data = await fetchResponse.json();
          let dataMapValue = data.map(function (data, index, array) {
            return {id:data.id,title:data.nombre,idRemito:data.controlId};
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

  getAllCertificacion = async () =>{
    let dataMap = [];
      for(let i = 0; i< this.state.id_certificacion.length; i++){
      let data = {"id":this.state.id_certificacion[i]};
      const settings = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
      };
      try {
          const fetchResponse = await fetch(`/certifiacion/controlChild`, settings);
          const data = await fetchResponse.json();
          let dataMapValue = data.map(function (data, index, array) {
            return {id:data.id,title:data.nombre,idCertificacion: data.certificacionlId};
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
    const certificacionlData = [];
    const mapCerti = new Map();
    const mapControl = new Map();
    let arrayCertificaionIds = [];
    let arrayConIds = [];
    for (const item of data) {
      if(!mapCerti.has(item.certificacion_id)){
        mapCerti.set(item.certificacion_id, true);    // set any value to Map
          arrayCertificaionIds.push(item.certificacion_id);
          this.setState({id_cotizacion: arrayCertificaionIds});
          certificacionlData.push({
            title:item.certificacion_name,
            certificacionId: item.certificacion_id,
            children:{}
          });
      }
      if(!mapControl.has(item.contro_id)){
        mapControl.set(item.contro_id, true);    // set any value to Map
          arrayConIds.push(item.control_id);
          this.setState({id_control: arrayConIds});
          controlData.push({
            title:item.nombre,
            controlId:item.control_id,
            children:{}
          });
      }
    }
    let result = [...controlData,...certificacionlData];
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