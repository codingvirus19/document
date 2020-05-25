import React from "react";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import Contents from "./contents/Contents";

import styles from "./Container.css";

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
      groups: null,
      g_no: null,
      memo_bigArr: null,
    };
  }

  componentDidMount() {
    // 그룹의 db를 가져오는 코드
    let group = { no: [], gname: [] };
    let groupDatas = null;

    // call api
    fetch(`${API_URL}/api/container`, {
      method: "post",
      headers: API_HEADERS,
    })
      .then((response) => response.json())
      .then((json) => {
        // groupuser에서 가져온 group의 데이터값
        groupDatas = json.data;

        // group의 데이터값으로 memo를 불러오는 함수
        this.bringMemoByGroup(groupDatas);

        // group의 데이터값으로 sidebar를 불러오는 함수
        groupDatas.map((json) => {
          group.no.push(json.no);
          group.gname.push(json.name);
          if (!groupDatas[1]) {
            console.log("그룹없음");
          } else {
            console.log("그룹있음");
          }
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
    // 그룹의 data로 memo의 db를 가져오는 코드
    let memo_bigArr = [];

    // 각 그룹의 no로 memo를 가져온다.
    // u_no는 server에서 세션값으로 처리해서 전달된다.
    let input_groupNo = {
      no: 1,
    };
    let _memoArr = null;

    // call api
    fetch(`${API_URL}/api/memoList`, {
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
    this.setState({
      g_no: no,
    });
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
