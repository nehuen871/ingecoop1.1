import React, { Component } from 'react';
import '../styles/SideBar.css';
import {Link} from "react-router-dom";

export default class SideBar extends Component {
    render() {
        return (
            <div className="sidebar-container sticky-top">
                <div className="sidebar-logo">
                    Ingecoop Alpha
                </div>
            <ul className="sidebar-navigation">
                <li className="header">Navigation</li>
                <li>
                    <Link to="/">
                        <i className="fa fa-home" aria-hidden="true"></i>Listado de Proyecto
                    </Link>
                </li>
                <li>
                    <Link to="/Cliente">
                        <i className="fa fa-tachometer" aria-hidden="true"></i>Listado de Cliente
                    </Link>
                </li>
                <li>
                    <Link to="/Cotizacion">
                        <i className="fa fa-users" aria-hidden="true"></i>Listado de Cotizacion
                    </Link>
                </li>
                <li>
                    <Link to="/Control">
                        <i className="fa fa-cog" aria-hidden="true"></i>Listado de Control
                    </Link>
                </li>
                <li>
                    <Link to="/Certificacion">
                        <i className="fa fa-info-circle" aria-hidden="true"></i>Listado de Certificacion
                    </Link>
                </li>
                <li>
                    <Link to="/DatosCotizacion">
                        <i className="fa fa-info-circle" aria-hidden="true"></i>Listado de Datos de Cotizacion
                    </Link>
                </li>
                <li>
                    <Link to="/DatosControl">
                        <i className="fa fa-info-circle" aria-hidden="true"></i>Listado de Datos de Control
                    </Link>
                </li>
                <li>
                    <Link to="/ListDocs">
                        <i className="fa fa-info-circle" aria-hidden="true"></i> Lista de documentos
                    </Link>
                </li>
                <li>
                    <Link to="/Remitos">
                        <i className="fa fa-info-circle" aria-hidden="true"></i> Lista de remitos
                    </Link>
                </li>
                <li>
                    <Link to="/DatosCertificacion">
                        <i className="fa fa-info-circle" aria-hidden="true"></i> Lista de Datos de Certificacion
                    </Link>
                </li>
                <li>
                    <Link to="/DatosRemitos">
                        <i className="fa fa-info-circle" aria-hidden="true"></i> Lista de Datos de Remitos
                    </Link>
                </li>
                <li className="header">Busquedas</li>
                <li>
                <Link to="/searchProyecto">
                    <i className="fa fa-info-circle" aria-hidden="true"></i> Proyecto
                </Link>
                </li>
                <li>
                <Link to="/searchCliente">
                    <i className="fa fa-info-circle" aria-hidden="true"></i> Cliente
                </Link>
                </li>
                <li>
                <Link to="/searchCotizacion">
                    <i className="fa fa-info-circle" aria-hidden="true"></i> Cotizacion
                </Link>
                </li>
                <li>
                <Link to="/searchControl">
                    <i className="fa fa-info-circle" aria-hidden="true"></i> Control
                </Link>
                </li>
                <li>
                <Link to="/searchRemitos">
                    <i className="fa fa-info-circle" aria-hidden="true"></i> Remitos
                </Link>
                </li>
                <li>
                <Link to="/searchCertificacion">
                    <i className="fa fa-info-circle" aria-hidden="true"></i> Certificacion
                </Link>
                </li>
            </ul>
            </div>
      );
    }
}