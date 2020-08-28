import React from "react";

/* Import Components */
//import Tree from "TreeProyecto";
import Proyecto from './Proyecto';
import Certificacion from './Certificacion';
import DatosCertificacion from './DatosCertificacion';
import Control from './Control';
import Cotizacion from './Cotizacion';
import DatosControl from './DatosControl';
import DatosCotiazacion from './DatosCotizacion';

export default class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchCodigoUnificador: 0,
    };
    this.searchData = this.searchData.bind(this);
  }

  searchData = async () => {
    this.setState({searchCodigoUnificador: this.props.changeLink});
  }

  render() {
    return (
      <div>
      <button onClick={this.searchData} className="btn btn-primary">Buscar</button>
      <br/>
      <br/>
      <br/>
      <label>Proyecto</label>
      <Proyecto sendData={this.state.searchCodigoUnificador}/>
      <label>Cotizacion</label>
      <Cotizacion sendData={this.state.searchCodigoUnificador}/>
      <DatosCotiazacion sendData={this.state.searchCodigoUnificador}/>
      <label>Control</label>
      <Control sendData={this.state.searchCodigoUnificador}/>
      <DatosControl sendData={this.state.searchCodigoUnificador}/>
      <label>Certificacion</label>
      <Certificacion sendData={this.state.searchCodigoUnificador}/>
      <DatosCertificacion sendData={this.state.searchCodigoUnificador}/>
      </div>
    );
  }
}