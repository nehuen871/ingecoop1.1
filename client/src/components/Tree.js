import React, { Component } from 'react';
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app
export default class Tree extends Component {
  constructor(props) {
    super(props);
    this.state = {treeData:[]};
    this.searchData = this.searchData.bind(this);
  }

  searchData = async () => {
    let data = {"id":this.props.changeLink};
    const settings = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      }
    };
    try {
        const fetchResponse = await fetch(`/proyecto/all`, settings);
        const data = await fetchResponse.json();
        this.formatData(data);
    } catch (e) {
        console.log(e);
    }
    //console.log(this.props.changeLink);
  }
  formatData(data){
  
  const controlData = [];
  const controlDatosData = [];
  const cotizacionlData = [];
  const cotizacionlDatosData = [];
  const proyectoData = [];
  const mapP = new Map();
  const mapCoti = new Map();
  const mapDatosCoti = new Map();
  const mapControl = new Map();
  const mapDatosControl = new Map();
  
  for (const item of data) {
      if(!mapP.has(item.proyecto_id)){
          mapP.set(item.proyecto_id, true);    // set any value to Map
          proyectoData.push({
              proyectoId: item.proyecto_id,
              title: item.nombre,
              children:[{}]
          });
      }
    if(!mapCoti.has(item.cotizacion_id)){
        mapCoti.set(item.cotizacion_id, true);    // set any value to Map
        cotizacionlData.push({
          title:item.titulo_cotiazacion,
          cotizacionId: item.cotizacion_id,
          children:[{}]
        });
    }
    
    if(!mapControl.has(item.contro_id)){
      mapControl.set(item.contro_id, true);    // set any value to Map
        controlData.push({
          title:item.numero_control,
          controlId:item.contro_id,
          children:[{}]
        });
    }

    /*if(!mapDatosCoti.has(item.datosCotizacion_id) && !mapDatosCoti.has(item.cotizacion_list_doc_nombre)){
      mapDatosCoti.set(item.datosCotizacion_id, true);    // set any value to Map
      mapDatosCoti.set(item.cotizacion_list_doc_nombre, item.cotizacion_list_doc_nombre);    // set any value to Map
      cotizacionlDatosData.push({
        title:item.cotizacion_list_doc_nombre,
        cotizacionId: item.datosCotizacion_id,
        proyectoId: item.proyecto_id
      });
    }

    if(!mapDatosControl.has(item.datosControl_list_docs_id)){
        mapDatosControl.set(item.datosControl_list_docs_id, true);    // set any value to Map
        controlDatosData.push({
          title:item.control_list_doc_nombre,
          controlDatosId: item.datosControl_list_docs_id
        });
    }*/
  }
  let result = [...proyectoData];
  for(let i = 0;i<proyectoData.length;i++){
    result[i].children = [cotizacionlData[i],controlData[i]];
  }


/*var empire = queryReturnFinal.filter(function (queryReturnFinal) {
  return queryReturnFinal.proyecto.cotizacion.cotizacion_id !== queryReturnFinal.proyecto.cotizacion.cotizacion_id;
});
  console.log(empire);*/
  //console.log(queryReturnFinal[0].proyecto.cotizacion.cotizacion_id);
  this.setState({treeData: result});
  }
  render() {
    return (
      <div style={{ height: 400 }}>
        <SortableTree
          treeData={this.state.treeData}
          onChange={treeData => this.setState({ treeData })}
        />
        <button onClick={this.searchData} className="btn btn-primary">Tests</button>
      </div>
    );
  }
}

/**
 * treeData: [
        { title: 'Chicken', children: [{ title: 'Egg' }] },
        { title: 'Fish', children: [{ title: 'fingerline'}] }
      ],
 * 
 */



/*children: [{
  title:item.numero_control,
  controlId:item.contro_id,
  children: [{
    title:item.control_list_doc_nombre,
    controlId:item.datosControl_list_docs_id
  }]
}]*/


/**
 * children:[{
                title:item.titulo_cotiazacion,
                cotizacionId: item.cotizacion_id,
                children:[{
                  title:item.control_list_doc_nombre,
                  cotizacionDataid: item.datosCotizacion_id
                }]
              }]
*/