import React from "react";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import Contents from "./contents/Contents";

const API_URL = "http://localhost:8080/codingvirus19";
const API_HEADERS = {
  "accept": "application/json"
};

export default class Container extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      g_no: '',
      g_noUpdate: '',
      no : 1
    }
  }
  componentDidMount() {
    console.log(this.state.no);
    // call api
    fetch(`${API_URL}/api/container`, {
      method: "post",
      headers: API_HEADERS,
      body: JSON.stringify(this.state.no),
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
