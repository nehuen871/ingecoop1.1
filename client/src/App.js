import React, { Component } from 'react';
import SideBar from './components/SideBar';
import Cliente from './components/Cliente';
import Certificacion from './components/Certificacion';
import Control from './components/Control';
import Cotizacion from './components/Cotizacion';
import DatosControl from './components/DatosControl';
import DatosCotiazacion from './components/DatosCotizacion';
import List_docs from './components/List_docs';
import Proyecto from './components/Proyecto';
import clienteHasCotizacion from './components/clienteHasCotizacion';
import Remitos from './components/Remitos';
import searchProyecto from './components/searchProyecto';
import searchCliente from './components/searchCliente';
import searchCotizacion from './components/searchCotizacion';
import searchControl from './components/searchControl';
import searchRemitos from './components/searchRemitos';
import searchCertificacion from './components/searchCertificacion';
import {
  Switch,
  Route
} from "react-router-dom";

export default class App extends Component {
render() {
    return (
      <div className="container-fluid h-100">
      <div className="row">
        <div id="sideBar" className="col-sm-2"><SideBar /></div>
        <div id="Container" className="col-md-10">
        <Switch>
          <Route exact path="/" component={Proyecto} />
          <Route path="/Cliente" component={Cliente} />
          <Route path="/Certificacion" component={Certificacion} />
          <Route path="/Control" component={Control} />
          <Route path="/Cotizacion" component={Cotizacion} />
          <Route path="/DatosControl" component={DatosControl} />
          <Route path="/DatosCotizacion" component={DatosCotiazacion} />
          <Route path="/ListDocs" component={List_docs} />
          <Route path="/clienteHasCotizacion" component={clienteHasCotizacion} />
          <Route path="/Remitos" component={Remitos} />
          <Route path="/searchProyecto" component={searchProyecto} />
          <Route path="/searchCliente" component={searchCliente} />
          <Route path="/searchCotizacion" component={searchCotizacion} />
          <Route path="/searchControl" component={searchControl} />
          <Route path="/searchRemitos" component={searchRemitos} />
          <Route path="/searchCertificacion" component={searchCertificacion} />
        </Switch>
        </div>
      </div>
    </div>
    );
  }
}