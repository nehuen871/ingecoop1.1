import React from 'react';

export default class SendDataButtonRecotizacion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchDataId: 0,
    };
    this.searchData = this.searchData.bind(this);
  }
  
  searchData = async () => {
    if(window.confirm('Desea generar los datos?')){
      for(let i = 0; i < this.props.changeLink.length; i++){
        let idSend = {'id' : this.props.changeLink[i].id};
        let settings = {
          method: 'POST',
          body: JSON.stringify(idSend),
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          }
        };
        try {
          let fetchResponse = await fetch(`/cotizacion/recotizacion`, settings);
          let data = await fetchResponse.json();
          console.log(data);
        } catch (e) {
          console.log(e);
        }
      }
      alert("Datos Generados");
    }
  }

  render() {
    return (
      <button onClick={this.searchData} className="btn btn-primary">Generar Recotizacion</button>
    )
  }
}