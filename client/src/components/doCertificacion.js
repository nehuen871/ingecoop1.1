import React, { Component } from 'react';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app
export default class doCertificacion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      certificacion_data:[],
      id:[],
      idSend:0,
      porcentajeAvanceSend:0,
      porcentajeAvance:[]
    };
    this.certificarData = this.certificarData.bind(this);
    this.updateAvance = this.updateAvance.bind(this);
  }

  updateAvance = async () => {
    let test = this.state.porcentajeAvance;
    for(let i = 0; i< test.length;i++){
        let dataId = {"porcentajeAvance":this.state.porcentajeAvance[i],"id":this.state.id[i]};
        const settings = {
        method: 'POST',
        body: JSON.stringify(dataId),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
        };
        try {
            const fetchResponse = await fetch(`/datosCertificacion/updateAvance`, settings);
            const data = await fetchResponse.json();
        } catch (e) {
            console.log(e);
        }
    }
  }
  certificarData = async () => {
    let array1 = [];
    let array2 = [];
    let dataId = {"id":this.props.changeLink};
    const settings = {
      method: 'POST',
      body: JSON.stringify(dataId),
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      }
    };
    try {
        const fetchResponse = await fetch(`/datosCertificacion/dataById`, settings);
        const data = await fetchResponse.json();
        let response = data.map(function(data, index, array){
            return {id:data.id,porcentajeAvance:data.porcentajeAvance};
        });
        for(let i = 0; i<response.length;i++){
            array1.push(response[i].id);
            array2.push(response[i].porcentajeAvance);
            this.setState({id:array1,porcentajeAvance:array2})
        }
        this.setState({certificacion_data: [...data]})
    } catch (e) {
        console.log(e);
    }
  }

  listItems() {
    return (
        this.state.certificacion_data.map(function(items, index, array){
            return <div key={index}><label/>{items.nombre}<input id={this.state.id[index]} defaultValue={this.state.porcentajeAvance[index]}/></div>;
          },this)
    );
  }

  render() {
    return (
      <div style={{ height: 600 }}>
        <button onClick={this.certificarData} className="btn btn-primary">Agregar Avance</button>
        <button onClick={this.updateAvance} className="btn btn-secondary">Certificar</button>
        { this.listItems() }
      </div>
    );
  }
}