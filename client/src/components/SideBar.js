import React, { Component } from 'react';
import '../styles/SideBar.css';
import {Link} from "react-router-dom";

export default class SideBar extends Component {
    constructor(props) {
        super(props);
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
                    <Link to="/">
                        <i class="fa fa-home" aria-hidden="true"></i> Proyecto
                    </Link>
                </li>
                <li>
                    <Link to="/Cliente">
                        <i class="fa fa-tachometer" aria-hidden="true"></i> Cliente
                    </Link>
                </li>
                <li>
                    <Link to="/Cotizacion">
                        <i class="fa fa-users" aria-hidden="true"></i> Cotizacion
                    </Link>
                </li>
                <li>
                    <Link to="/Control">
                        <i class="fa fa-cog" aria-hidden="true"></i> Control
                    </Link>
                </li>
                <li>
                    <Link to="/Certificacion">
                        <i class="fa fa-info-circle" aria-hidden="true"></i> Certificacion
                    </Link>
                </li>
                <li>
                    <Link to="/DatosCotiazacion">
                        <i class="fa fa-info-circle" aria-hidden="true"></i> Datos de Contizacion
                    </Link>
                </li>
                <li>
                    <Link to="/DatosControl">
                        <i class="fa fa-info-circle" aria-hidden="true"></i> Datos de Control
                    </Link>
                </li>
                <li>
                    <Link to="/ListDocs">
                        <i class="fa fa-info-circle" aria-hidden="true"></i> Lista de documentos
                    </Link>
                </li>
                <li class="header">Busquedas</li>
                <li>
                <Link to="/">
                    <i class="fa fa-info-circle" aria-hidden="true"></i> Proyecto
                </Link>
                </li>
                <li>
                <Link to="/">
                    <i class="fa fa-info-circle" aria-hidden="true"></i> Cliente
                </Link>
                </li>
                <li>
                <Link to="/">
                    <i class="fa fa-info-circle" aria-hidden="true"></i> Cotizacion
                </Link>
                </li>
                <li>
                <Link to="/">
                    <i class="fa fa-info-circle" aria-hidden="true"></i> Control
                </Link>
                </li>
                <li>
                <Link to="/">
                    <i class="fa fa-info-circle" aria-hidden="true"></i> Certificacion
                </Link>
                </li>
            </ul>
            </div>
      );
    }
}