import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import NavBar from './NavBar';
import SideBar from './SideBar';
import Container from './Container';
import * as serviceWorker from './serviceWorker';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(<NavBar />, document.getElementById('navBar'));
ReactDOM.render(<SideBar />, document.getElementById('sideBar'));
ReactDOM.render(<Container />, document.getElementById('Container'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
