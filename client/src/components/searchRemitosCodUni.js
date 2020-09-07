import React, { Component } from 'react';
import FormContainer from "./SearchRemitosCU";

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
    this.setState({value: values.target.value});
  }
  render() {
    return (
      <div className="col-md-12">
        <h3>Busqueda Remitos Por Codigo Unificador</h3>
        <label>CodigoUnificador:</label>
        <input type="text" value={this.props.value} onChange={this.handleChange} onKeyUp={this.sendData}/>
        <FormContainer idSearch={this.state.value}/>
      </div>
    );
  }
}