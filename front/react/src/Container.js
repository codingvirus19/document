import React from "react";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import Contents from "./contents/Contents";

import styles from "./Container.css"

const API_URL = "http://localhost:8080/codingvirus19";
const API_HEADERS = {
  "Content-Type": "application/json",
};

export default class Container extends React.Component {

  constructor() {
    super(...arguments);
    this.state = {

      group:{no:[],gname:[]},
      g_noUpdate: false,
      g_no:null
    }
  }
  componentDidMount() {
    let group = {no:[],gname:[]}
    let user_data = {
      no : 1
    };

    // call api
    fetch(`${API_URL}/api/container`, {
      method: "post",
      headers: API_HEADERS,
      body: JSON.stringify(user_data),
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          result: json.data,
        });
        console.log(json.data);
        json.data.map((json)=>{
          group.no.push(json.no);
          group.gname.push(json.name);
        })
        console.log(group);
        this.Update(group);
        this.Update("",aapp);
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

  Update(group) {

    this.setState({
      group: group 
    })
  }

  SidebarGroupUpdate(no){
    this.setState({
      g_no : no
    })
    console.log(no)
    // let a = this.getSnapshotBeforeUpdate(gno);
    // console.log(a);
  }

  // getSnapshotBeforeUpdate(e){
  //   return e;
  // }

  render() {
    return (
      <div className="container">
        <Header />
        <Sidebar group={this.state.group} group_update={this.SidebarGroupUpdate.bind(this)} />
        <Contents />
//         <Sidebar g_no={this.state.g_no} g_name={this.state.g_name} hashs={"해시1"}/>
//         <Contents g_no={this.state.g_no} g_name={this.state.g_name}/>
      </div>
    );
  }
}