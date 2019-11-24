import React, { Component } from 'react';
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app

export default class Tree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataTest: 0,
      treeData: [
        { title: 'Chicken', children: [{ title: 'Egg' }] },
        { title: 'Fish', children: [{ title: 'fingerline'}] }
      ],
    };
    this.changeLinkValue = this.changeLinkValue.bind(this);
  }
  changeLinkValue(){
    this.props.changeLink(this.state.dataTest);
    console.log(this.state.dataTest);
  }
  render() {
    return (
      <div style={{ height: 400 }}>
        <SortableTree
          treeData={this.state.treeData}
          onChange={treeData => this.setState({ treeData })}
        />
        <button onClick={this.changeLinkValue} className="btn btn-primary">Tests</button>
      </div>
    );
  }
}