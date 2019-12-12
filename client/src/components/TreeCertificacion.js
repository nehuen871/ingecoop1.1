import React, { Component } from 'react';
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app
export default class TreeCertificacion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      treeData:[],
      idControl:0,
      id_certifiacion:[],
      certificacion_data:[]
    };
    this.searchData = this.searchData.bind(this);
    this.getAllDocsForCertificacion = this.getAllDocsForCertificacion.bind(this);
  }

  searchData = async () => {
    let dataId = {"id":this.props.changeLink};
    let response;
    const settings = {
      method: 'POST',
      body: JSON.stringify(dataId),
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      }
    };
    try {
        const fetchResponse = await fetch(`/certificacion/dataById`, settings);
        const data = await fetchResponse.json();
        response = this.formatData(data);
        console.log(response);
        let docsCotizacion = this.getAllDocsForCertificacion();
        docsCotizacion.then(result => {
            for(let i = 0;i<response.length;i++){
                response[i].children = result;
            }
        });
    } catch (e) {
        console.log(e);
    }
    this.setState({treeData: response});
  }

  getAllDocsForCertificacion = async () =>{
    let data = {id:this.state.idControl};
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
        return dataMapValue;
    } catch (e) {
        console.log(e);
    }
  }

  formatData(data){
    let clienteData = [];
    for(let i = 0;i<data.length;i++){
        clienteData.push({
            certificacionId: data[i].id,
            title: data[i].nombre,
            controId: data[i].control_id,
            children:[]
        });
    }
    return clienteData;
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