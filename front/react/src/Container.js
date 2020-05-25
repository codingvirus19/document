import React from "react";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import Contents from "./contents/Contents";

import styles from "./Container.css";
import { faBoxTissue } from "@fortawesome/free-solid-svg-icons";

const API_URL = "http://localhost:8080/codingvirus19";
const API_HEADERS = {
  "Content-Type": "application/json",
};

export default class Container extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      group: { no: [], gname: [] },
      users: { no: [], name: [] },
      memo_bigArr: null,
    };
  }

  componentDidMount() {
    // 그룹의 db를 가져오는 코드
    let group = { no: [], gname: [] };
    let groupDatas = null;

    this.bringMemoByGroup(null);

    // call api
    fetch(`${API_URL}/api/container`, {
      method: "post",
      headers: API_HEADERS,
    })
      .then((response) => response.json())
      .then((json) => {
        groupDatas = json.data;

        // group의 데이터값으로 sidebar를 불러오는 함수
        groupDatas.map((json) => {
          group.no.push(json.no);
          group.gname.push(json.name);
        });
        console.log(group);
        this.UpdateGroup(group);
      })
      .catch((err) => console.error(err));
    // 그룹의 db를 가져오는 코드
// -------------------------------------------------------------

    // 로그인한 user를 가져오는 코드
    let users = { no: [], name: [] };
    // call api
    fetch(`${API_URL}/api/getUserSession`, {
      method: "post",
      headers: API_HEADERS,
    })
      .then((response) => response.json())
      .then((json) => {
        users.no.push(json.data.no);
        users.name.push(json.data.name);
        
        this.UpdateUser(users);
      })
      .catch((err) => console.error(err));

  }

  bringMemoByGroup(_groupDatas) {
    let data = {
      no : _groupDatas
    }
    // console.log(groupData.no);
    let memo_bigArr = [];
    // let input_groupNo;
    let _memoArr = null;

    console.log(_groupDatas);
    // call api
    fetch(`${API_URL}/api/memoList`, {
      method: "post",
      headers: API_HEADERS,
      body: JSON.stringify(data),
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

  UpdateGroup(group) {
    this.setState({
      group: group
    });
  }
  UpdateUser(users){
    this.setState({
      users:users
    });
  }

  SidebarGroupUpdate(no) {
    this.bringMemoByGroup(no);
    console.log(no);
  }

  render() {
    console.log(this.state.users);
    return (
      <div className={styles.container}>
        <Header group={this.state.group} users={this.state.users} />
        <Sidebar
          group={this.state.group}
          group_update={this.SidebarGroupUpdate.bind(this)}
        />
        {this.state.memo_bigArr ? (
          <Contents 
          group={this.state.group}
          memo_bigArr={this.state.memo_bigArr} />
        ) : (
            <Contents group={this.state.group} />
          )}
      </div>
    );
  }
}
