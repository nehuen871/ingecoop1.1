import React, { Component } from 'react';
import FormContainer from "./certificacionAutomaticaTable";
import SendDataButton from "./button/sendDataButtonCertificacionAutomatica";
let jobs = [];
let numero = 0 ;
export default class formContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.sendData = this.sendData.bind(this);
  }
  handleChange(values) {
    this.setState({value: values.target.value});
  }
  sendData = async (values) =>{
    jobs = [];
    let test = values.target.value;
    let response = await fetch('/datosCertificacion/codigoUnificador/' + test);
    var data = await response.json();
    if (response.status !== 200) throw Error(data.message);
    for (let i = 0; i < data.length; i++) {
        jobs.push({
            id: data[i].id,
            certificacion_id: data[i].certificacion_id,
            certificacion_control_id: data[i].certificacion_control_id,
            certificacion_control_cotizacion_id: data[i].certificacion_control_cotizacion_id,
            porcentajeAvanceAcumulado: data[i].porcentajeAvanceAcumulado,
            list_docs_id: data[i].list_docs_id,
            inputSend: 0,
        });
    }
  }
  render() {
    return (
      <div className="col-md-12">
        <h3>Certificacion Automatica</h3>
        <label>CodigoUnificador:</label>
        <input type="text" value={this.props.value} onChange={this.handleChange} onKeyUp={this.sendData}/>
        <FormContainer dataSend={jobs}/>
      </div>
    );
  }
}