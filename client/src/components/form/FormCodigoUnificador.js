import React from "react";

/* Import Components */
import BusquedaCodigoUnificador from "../BusquedaCodigoUnificador";

export default class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(values) {
    this.setState({value: values.target.value});
  }
  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
      </form>
      <BusquedaCodigoUnificador changeLink={this.state.value}/>
      </div>
    );
  }
}