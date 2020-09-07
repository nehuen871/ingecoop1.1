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
                    <Link to="/containerProyecto">
                        <i className="fa fa-home" aria-hidden="true"></i>Listado de Proyecto
                    </Link>
                </li>
                <li>
                    <Link to="/containerCliente">
                        <i className="fa fa-tachometer" aria-hidden="true"></i>Listado de Cliente
                    </Link>
                </li>
                <li>
                    <Link to="/containerCotizacion">
                        <i className="fa fa-users" aria-hidden="true"></i>Listado de Cotizacion
                    </Link>
                </li>
                <li>
                    <Link to="/containerControl">
                        <i className="fa fa-cog" aria-hidden="true"></i>Listado de Control
                    </Link>
                </li>
                <li>
                    <Link to="/containerCertificacion">
                        <i className="fa fa-info-circle" aria-hidden="true"></i>Listado de Certificacion
                    </Link>
                </li>
                <li>
                    <Link to="/containerDatosCotizacion">
                        <i className="fa fa-info-circle" aria-hidden="true"></i>Listado de Datos de Cotizacion
                    </Link>
                </li>
                <li>
                    <Link to="/containerDatosControl">
                        <i className="fa fa-info-circle" aria-hidden="true"></i>Listado de Datos de Control
                    </Link>
                </li>
                <li>
                    <Link to="/containerList_Docs">
                        <i className="fa fa-info-circle" aria-hidden="true"></i> Lista de documentos
                    </Link>
                </li>
                <li>
                    <Link to="/containerRemitos">
                        <i className="fa fa-info-circle" aria-hidden="true"></i> Lista de remitos
                    </Link>
                </li>
                <li>
                    <Link to="/containerDatosCertificacion">
                        <i className="fa fa-info-circle" aria-hidden="true"></i> Lista de Datos de Certificacion
                    </Link>
                </li>
                <li>
                    <Link to="/containerDatosRemitos">
                        <i className="fa fa-info-circle" aria-hidden="true"></i> Lista de Datos de Remitos
                    </Link>
                </li>
                <li className="header">Busquedas</li>
                <li>
                <Link to="/codigoUnificadorContainer">
                    <i className="fa fa-info-circle" aria-hidden="true"></i> Busqueda Codigo Unificador
                </Link>
                </li>
                <li>
                <Link to="/generarDatosControlContainer">
                    <i className="fa fa-info-circle" aria-hidden="true"></i> Generar Datos Control
                </Link>
                </li>
                <li>
                <Link to="/certificacionAutomatica">
                    <i className="fa fa-info-circle" aria-hidden="true"></i> Certificacion automatica
                </Link>
                </li>
                <li>
                <Link to="/searchRemitosCodUni">
                    <i className="fa fa-info-circle" aria-hidden="true"></i> Remitos Codigo Unificador
                </Link>
                </li>
            </ul>
            </div>
      );
    }
}


/**
 * <li>
                <Link to="/searchRemitos">
                    <i className="fa fa-info-circle" aria-hidden="true"></i> Remitos
                </Link>
                </li>
                <li>
                <Link to="/searchCertificacion">
                    <i className="fa fa-info-circle" aria-hidden="true"></i> Certificacion
                </Link>
                </li>
 * 
 */