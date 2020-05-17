import React from "react";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import Contents from "./contents/Contents";


export default class Container extends React.Component {
  constructor(){
    super(...arguments);
    this.state = {
      g_no: '',
      g_noUpdate: ''
    }
  }

  g_noUpdate(update){
      this.setState({
        g_no: update
      })
  }

  render() {
    return (
      <div className="container">
        <Header />
        <Sidebar />
        <Contents />
      </div>
    );
  }
}
