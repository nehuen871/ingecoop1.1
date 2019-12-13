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
    this.getAllRemitosFormControl = this.getAllRemitosFormControl.bind(this);
    this.getCertificacionFromcControl = this.getCertificacionFromcControl.bind(this);
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
        const fetchResponse = await fetch(`/control/getControlById`, settings);
        const data = await fetchResponse.json();
        let response = this.formatData(data);
        for(let i = 0; i<response.length;i++){
          this.setState({id_cotizacion: response[i].cotizacionId,id_control:response[i].id})
          let docsControl = this.getAllDocsForControl();
          docsControl.then(result => {
            for(let a = 0;a<response.length;a++){
                response[i].children = result;
            }
          });
          let certificacionControl = this.getCertificacionFromcControl();
          certificacionControl.then(result => {
            for(let a = 0;a<result.length;a++){
              response.push(result[a]);
            }
          });
          let docsRemitos = this.getAllRemitosFormControl();
          docsRemitos.then(result => {
            for(let a = 0;a<result.length;a++){
              response.push(result[a]);
            }
          });
        }
        this.setState({treeData: response});

    } catch (e) {
        console.log(e);
    }
  }

  getAllDocsForControl = async () =>{
    let controlData;
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
        controlData = data.map(function (data, index, array) {
          return {id:data.id,title:data.nombre,idControl: data.controlId};
        });
    } catch (e) {
        console.log(e);
    }
    return controlData;
  }

  getCertificacionFromcControl = async () =>{
    let data = {id:this.state.id_control};
    const settings = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    };
    try {
        const fetchResponse = await fetch(`/certificacion/dataByIdControl`, settings);
        const data = await fetchResponse.json();
        let dataMapValue = data.map(function (data, index, array) {
            return {id:data.id,title:data.nombre,idControl: data.control_id};
        });
        return dataMapValue;
    } catch (e) {
        console.log(e);
    }
  }

  getAllRemitosFormControl = async () => {
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

  formatData(data){
    let response = data.map(function(data, index, array){
      return {id:data.id,title:data.numero_control,cotizacionId:data.cotizacion_id,children:[]};
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