import React from 'react';

export default class SendDataButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchDataId: 0,
    };
    this.searchData = this.searchData.bind(this);
  }
  
  searchData = async () => {
    console.log(this.props.changeLink);
    for(let i = 0; i < this.props.changeLink.length; i++){
      let settings = {
        method: 'POST',
        body: JSON.stringify(this.props.changeLink[i].id),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
      };
      try {
        const fetchResponse = await fetch(`/updateControl`, settings);
        const data = await fetchResponse.json();
      } catch (e) {
          console.log(e);
      }
    }
  }
  
  render() {
    return (
      <button onClick={this.searchData} className="btn btn-primary">Generar Datos Control</button>
    )
  }
}