import React from 'react';

export default class sendDataButtonCertificacionAutomatica extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchDataId: 0,
    };
    this.searchData = this.searchData.bind(this);
  }
  
  searchData = async () => {
    for(let i = 0; i < this.props.changeLink.length; i++){
      let idSend = this.props.changeLink[i].id;
      let settings = {
        method: 'POST',
        body: JSON.stringify(idSend),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
      };
      console.log(idSend);
      let fetchResponse = await fetch(`/datosCertificacion/updateAvance`, settings);
      let data = await fetchResponse.json();
      console.log(data);
    }
  }

  render() {
    return (
      <button onClick={this.searchData} className="btn btn-primary">Certificar</button>
    )
  }
}