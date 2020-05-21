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
      groups: null,
      g_no:null,
      g_name: [],
      g_noUpdate: false,
      memoArr: null,
      memo_bigArr: null,
    };
  }
  componentDidMount() {
    // 그룹의 db를 가져오는 코드
	let group = {no:[],gname:[]}  
    let groupDatas = null;

    // call api
    fetch(`${API_URL}/api/container`, {
      method: "post",
      headers: API_HEADERS,
    })
      .then((response) => response.json())
      .then((json) => {
        // 배열
        groupDatas = json.data;
        this.bringMemoByGroup(groupDatas);

        json.data.map((json)=>{
            group.no.push(json.no);
            group.gname.push(json.name);
          })
          console.log(group);
          this.Update(group);
      })
      .catch((err) => console.error(err));
    // 그룹의 db를 가져오는 코드
  }

  bringMemoByGroup(_groupDatas) {
    // 그룹의 data로 memo의 db를 가져오는 코드
    let memo_bigArr = [];
    let input_groupNo = {
      no: 1,
    };
    let _memoArr = null;

    // call api
    fetch(`${API_URL}/api/contents`, {
      method: "post",
      headers: API_HEADERS,
      body: JSON.stringify(input_groupNo),
    })
      .then((response) => response.json())
      .then((json) => {
        _memoArr = json.data;

        memo_bigArr.push(_memoArr);
        this.UpdateMemo(memo_bigArr);
      })
      .catch((err) => console.error(err));
    // // 그룹의 data로 memo의 db를 가져오는 코드
  }

  UpdateMemo(_memo_bigArr) {
    this.setState({
      memo_bigArr: _memo_bigArr,
    });
  }

  UpdateGroup(_group) {
    this.setState({
      groups: _group,
    });
  }

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
        {this.state.memo_bigArr ? (
          <Contents memo_bigArr={this.state.memo_bigArr} />
        ) : (
          <Contents />
        )}
      </div>
    );
  }
}
