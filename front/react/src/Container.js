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
      g_no: [],
      g_name: [],
      g_noUpdate: '',
    }
  }
  componentDidMount() {

    let gno = [];
    let gname=[];
    // call api
    fetch(`${API_URL}/api/container`, {
      method: "post",
      headers: API_HEADERS
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          result: json.data,
        });
        json.data.map((temp)=>{
          gno.push(temp.no);
          gname.push(temp.name);
        });
        this.Update(gno, gname);
      })
      .catch((err) => console.error(err));
  }

  // abcd(){
  //   fetch(`${API_URL}/api/container`, {
  //     method: "post",
  //     headers: API_HEADERS,
  //     body: JSON.stringify(data),
  //   })
  //     .then((response) => response.json())
  //     .then((json) => {
  //       this.setState({
  //         result: json.data,
  //       });
  //       json.data.map((temp)=>{
  //         gno.push(temp.no);
  //         gname.push(temp.name);
  //       });
  //       this.Update(gno, gname);
  //     })
  //     .catch((err) => console.error(err));

  // }

  Update(gno, gname) {
    this.setState({
      g_no: gno,
      g_name: gname
    })
  }

  render() {
    // console.log(this.state.g_name);
    // console.log(this.state.g_no);
    return (
      
      <div className="container">
        <Header />
        <Sidebar group_no={this.state.g_no} group_name={this.state.g_name} />
        <Contents />
      </div>
    );
  }
}