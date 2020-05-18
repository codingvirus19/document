import React from "react";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import Contents from "./contents/Contents";

const API_URL = "http://localhost:8080/codingvirus19";
const API_HEADERS = {
  "Content-Type": "application/json",
};

export default class Container extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      g_no: '',
      g_noUpdate: '',
      uNo : 2
    }
  }
  componentDidMount() {
    let data = {
      uNo : this.state.uNo
    }
    console.log(this.state.uNo);
    // call api
    fetch(`${API_URL}/api/container`, {
      method: "post",
      headers: API_HEADERS,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          result: json.data,
        });
        console.log(json.data);
      })
      .catch((err) => console.error(err));
  }

  g_noUpdate(update) {
    this.setState({
      g_no: update
    })
  }
  
  render() {
    return (
      <div className="container">
        <Header />
        <Sidebar  />
        <Contents />
      </div>
    );
  }
}