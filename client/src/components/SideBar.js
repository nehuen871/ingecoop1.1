import React, { Component } from 'react';
import '../styles/SideBar.css';
class SideBar extends Component {
    constructor(props) {
        super(props);
        this.handleClickProyecto = this.handleClickProyecto.bind(this);
        this.handleClickCliente = this.handleClickCliente.bind(this);
        this.handleClickCotizacion = this.handleClickCotizacion.bind(this);
        this.handleClickControl = this.handleClickControl.bind(this);
        this.handleClickCertificacion = this.handleClickCertificacion.bind(this);
        this.handleClickDContizacion = this.handleClickDContizacion.bind(this);
        this.handleClickDControl = this.handleClickDControl.bind(this);
        this.handleClickListoDocs = this.handleClickListoDocs.bind(this);
    }
    handleClickProyecto(e) {
        e.preventDefault();
        console.log('The link was clicked.');
        //this.setState(state => ({}));
    }
    handleClickCliente() {
        this.setState(state => ({}));
    }
    handleClickCotizacion() {
        this.setState(state => ({}));
    }
    handleClickControl() {
        this.setState(state => ({}));
    }
    handleClickCertificacion() {
        this.setState(state => ({}));
    }
    handleClickDContizacion() {
        this.setState(state => ({}));
    }
    handleClickDControl() {
        this.setState(state => ({}));
    }
    handleClickListoDocs() {
        this.setState(state => ({}));
    }

    render() {
        return (
            <div class="sidebar-container sticky-top">
                <div class="sidebar-logo">
                    Ingecoop Alpha
                </div>
            <ul class="sidebar-navigation">
                <li class="header">Navigation</li>
                <li>
                <a href="#" onClick={this.handleClickProyecto}>
                    <i class="fa fa-home" aria-hidden="true"></i> Proyecto
                </a>
                </li>
                <li>
                <a href="#" onClick={this.handleClickCliente}>
                    <i class="fa fa-tachometer" aria-hidden="true"></i> Cliente
                </a>
                </li>
                <li>
                <a href="#" onClick={this.handleClickCotizacion}>
                    <i class="fa fa-users" aria-hidden="true"></i> Cotizacion
                </a>
                </li>
                <li>
                <a href="#" onClick={this.handleClickControl}>
                    <i class="fa fa-cog" aria-hidden="true"></i> Control
                </a>
                </li>
                <li>
                <a href="#" onClick={this.handleClickCertificacion}>
                    <i class="fa fa-info-circle" aria-hidden="true"></i> Certificacion
                </a>
                </li>
                <li>
                <a href="#" onClick={this.handleClickDContizacion}>
                    <i class="fa fa-info-circle" aria-hidden="true"></i> Datos de Contizacion
                </a>
                </li>
                <li>
                <a href="#" onClick={this.handleClickDControl}>
                    <i class="fa fa-info-circle" aria-hidden="true"></i> Datos de Control
                </a>
                </li>
                <li>
                <a href="#" onClick={this.handleClickListoDocs}>
                    <i class="fa fa-info-circle" aria-hidden="true"></i> Lista de documentos
                </a>
                </li>
                <li class="header">Busquedas</li>
                <li>
                <a href="#" onClick={this.handleClickListoDocs}>
                    <i class="fa fa-info-circle" aria-hidden="true"></i> Proyecto
                </a>
                </li>
                <li>
                <a href="#" onClick={this.handleClickListoDocs}>
                    <i class="fa fa-info-circle" aria-hidden="true"></i> Cliente
                </a>
                </li>
                <li>
                <a href="#" onClick={this.handleClickListoDocs}>
                    <i class="fa fa-info-circle" aria-hidden="true"></i> Cotizacion
                </a>
                </li>
                <li>
                <a href="#" onClick={this.handleClickListoDocs}>
                    <i class="fa fa-info-circle" aria-hidden="true"></i> Control
                </a>
                </li>
                <li>
                <a href="#" onClick={this.handleClickListoDocs}>
                    <i class="fa fa-info-circle" aria-hidden="true"></i> Certificacion
                </a>
                </li>
            </ul>
            </div>
      );
    }
}

  export default SideBar;
