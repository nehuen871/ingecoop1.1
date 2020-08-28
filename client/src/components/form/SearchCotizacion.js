import React from "react";

/* Import Components */
import Tree from "../TreeCotizacion";

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
      <Tree changeLink={this.state.value}/>
      </div>
    );
  }
}