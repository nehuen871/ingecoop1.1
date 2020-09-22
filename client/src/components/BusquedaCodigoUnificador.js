import React from "react";

/* Import Components */

import Proyecto from './tablas/Proyecto';
import Certificacion from './tablas/Certificacion';
import DatosCertificacion from './tablas/DatosCertificacion';
import Control from './tablas/Control';
import Cotizacion from './tablas/Cotizacion';
import DatosControl from './tablas/DatosControl';
import DatosCotiazacion from './tablas/DatosCotizacion';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export default class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchCodigoUnificador: 0,
      searchRecotizacion: 0,
    };
    this.searchData = this.searchData.bind(this);
  }

  searchData = async () => {
    this.setState({searchCodigoUnificador: this.props.changeLink,searchRecotizacion: this.props.changeLinkRecotizacion});
  }

  render() {
    return (
      <Tabs>
      <button onClick={this.searchData} className="btn btn-primary">Buscar</button>
      <br/>
      <br/>
      <br/>
      <TabList>
        <Tab>Proyecto</Tab>
        <Tab>Cotizacion</Tab>
        <Tab>DatosCotiazacion</Tab>
        <Tab>Control</Tab>
        <Tab>DatosControl</Tab>
        <Tab>Certificacion</Tab>
        <Tab>DatosCertificacion</Tab>
      </TabList>
      <TabPanel>
        <Proyecto sendData={this.state.searchCodigoUnificador}/>
      </TabPanel>
      <TabPanel>
        <Cotizacion sendData={this.state.searchCodigoUnificador}/>
      </TabPanel>
      <TabPanel>
        <DatosCotiazacion sendData={this.state.searchCodigoUnificador} senDataRecotizacion={this.state.searchRecotizacion}/>
      </TabPanel>
      <TabPanel>
        <Control sendData={this.state.searchCodigoUnificador}/>
      </TabPanel>
      <TabPanel>
        <DatosControl sendData={this.state.searchCodigoUnificador}/>
      </TabPanel>
      <TabPanel>
        <Certificacion sendData={this.state.searchCodigoUnificador}/>
      </TabPanel>
      <TabPanel>
        <DatosCertificacion sendData={this.state.searchCodigoUnificador}/>
      </TabPanel>
      </Tabs>
    );
  }
}