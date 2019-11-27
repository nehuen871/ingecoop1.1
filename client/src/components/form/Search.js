import React, { Component } from "react";

/* Import Components */
import Tree from "../Tree";

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



/*import React, { Component } from 'react';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: true,
    };
  }
  toggleShow = () => {
    this.setState(state => ({ isShow: !state.isShow }));
  };
  render() {
    const greeting = 'Welcome to React';
    return (
      <div>
        {this.state.isShow ? <Greeting greeting={greeting} /> : null}
        <Button onClick={this.toggleShow} />
      </div>
    );
  }
}
const Button = ({ onClick }) => (
  <button onClick={onClick} type="button">
    Toggle Show
  </button>
);
const Greeting = ({ greeting }) => <h1>{greeting}</h1>;
export default App;*/