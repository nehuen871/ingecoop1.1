import React, { Component } from 'react';
import SideBar from './components/SideBar';
import codigoUnificadorContainer from './components/codigoUnificadorContainer';
import generarDatosControlContainer from './components/generarDatosControlContainer';
import generarDatosCopiaCertificacionContainer from './components/generarDatosCopiaCertificacionContainer';
import generarDatosRecotizacionContainer from './components/generarRecotizacionContainer';
import certificacionAutomatica from './components/certificacionAutomatica';
import searchRemitosCodUni from './components/searchRemitosCodUni';
import containerProyecto from './components/containerProyecto';
import containerDatosCertificacion from './components/containerDatosCertificacion';
import containerDatosRemitos from './components/containerDatosRemitos';
import containerRemitos from './components/containerRemitos';
import containerList_docs from './components/containerList_docs';
import containerDatosCotizacion from './components/containerDatosCotizacion';
import containerCliente from './components/containerCliente';
import containerControl from './components/containerControl';
import containerCertificacion from './components/containerCertificacion';
import containerCotizacion from './components/containerCotizacion';
import containerDatosControl from './components/containerDatosControl';
import generarDatosCopiaControlContainer from './components/generarDatosCopiaControlContainer';
import containerInsert from './components/containerInsert';
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
          <Route exact path="/" component={codigoUnificadorContainer} />
          <Route path="/codigoUnificadorContainer" component={codigoUnificadorContainer} />
          <Route path="/generarDatosControlContainer" component={generarDatosControlContainer} />
          <Route path="/generarDatosCopiaControlContainer" component={generarDatosCopiaControlContainer} />
          <Route path="/generarDatosCopiaCertificacionContainer" component={generarDatosCopiaCertificacionContainer} />
          <Route path="/generarDatosRecotizacionContainer" component={generarDatosRecotizacionContainer} />
          <Route path="/certificacionAutomatica" component={certificacionAutomatica} />
          <Route path="/searchRemitosCodUni" component={searchRemitosCodUni} />
          <Route path="/containerDatosCertificacion" component={containerDatosCertificacion} />
          <Route path="/containerDatosRemitos" component={containerDatosRemitos} />
          <Route path="/containerRemitos" component={containerRemitos} />
          <Route path="/containerList_docs" component={containerList_docs} />
          <Route path="/containerDatosCotizacion" component={containerDatosCotizacion} />
          <Route path="/containerCliente" component={containerCliente} />
          <Route path="/containerControl" component={containerControl} />
          <Route path="/containerCertificacion" component={containerCertificacion} />
          <Route path="/containerCotizacion" component={containerCotizacion} />
          <Route path="/containerDatosControl" component={containerDatosControl} />
          <Route path="/containerInsert" component={containerInsert} />
          <Route path="/containerProyecto" component={containerProyecto} />
        </Switch>
        </div>
      </div>
    </div>
    );
  }
}