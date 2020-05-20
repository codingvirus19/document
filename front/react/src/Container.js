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
      group: {},
      g_no: [],
      g_name: [],
      g_noUpdate: "",
    };
  }
  componentDidMount() {
    let _g_no = [];
    let _g_name = [];
    let groupDatas = null;

    // call api
    fetch(`${API_URL}/api/container`, {
      method: "post",
      headers: API_HEADERS,
    })
      .then((response) => response.json())
      .then((json) => {
        groupDatas = json.data;

        groupDatas.map((data) => {
          this.UpdateGroup(data);
          console.log(data);
        });

        json.data.map((temp) => {
          _g_no.push(temp.no);
          _g_name.push(temp.name);
        });
        this.Update(_g_no);
        this.Update(_g_name);
      })
      .catch((err) => console.error(err));
  }

  UpdateGroup(_group) {
    this.setState({
      group: _group,
    });
  }

  Update(_g_no, _g_name) {
    this.setState({
      g_no: _g_no,
      g_name: _g_name,
    });
  }

  render() {
    return (
      <div className="container">
        <Header />
        <Sidebar group_no={this.state.g_no} group_name={this.state.g_name} />
        <Contents group={this.state.group} />
      </div>
    );
  }
}
