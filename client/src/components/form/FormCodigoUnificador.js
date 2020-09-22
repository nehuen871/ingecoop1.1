import React from "react";

/* Import Components */
import BusquedaCodigoUnificador from "../BusquedaCodigoUnificador";

export default class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      valueRecotizacion: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
  }
  handleChange(values) {
    this.setState({value: values.target.value});
  }
  handleChange2(values) {
    this.setState({valueRecotizacion: values.target.value});
  }
  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
      <div className="col-md-12">
      <label>
          Codigo unificador:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
      </div>
      <div className="col-md-12">
      <label>
         Numero de recotizacion:
          <input type="text" value={this.state.valueRecotizacion} onChange={this.handleChange2} />
        </label>
      </div>
      </form>
      <BusquedaCodigoUnificador changeLink={this.state.value} changeLinkRecotizacion={this.state.valueRecotizacion}/>
      </div>
    );
  }
}