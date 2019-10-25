import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import Cliente from './components/Cliente';
import Certificacion from './components/Certificacion';
import Control from './components/Control';
import Cotizacion from './components/Cotizacion';
import DatosControl from './components/DatosControl';
import DatosCotiazacion from './components/DatosCotiazacion';
import List_docs from './components/List_docs';
import Proyecto from './components/Proyecto';
import * as serviceWorker from './serviceWorker';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

//ReactDOM.render(<NavBar />, document.getElementById('navBar'));
ReactDOM.render(<SideBar />, document.getElementById('sideBar'));

ReactDOM.render(<Certificacion />, document.getElementById('Container'));
ReactDOM.render(<Cotizacion />, document.getElementById('Container'));
ReactDOM.render(<DatosControl />, document.getElementById('Container'));
ReactDOM.render(<Control />, document.getElementById('Container'));
ReactDOM.render(<DatosCotiazacion />, document.getElementById('Container'));
ReactDOM.render(<List_docs />, document.getElementById('Container'));
ReactDOM.render(<Proyecto />, document.getElementById('Container'));
ReactDOM.render(<Cliente />, document.getElementById('Container'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
