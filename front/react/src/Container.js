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
        // 배열
        groupDatas = json.data;
        console.log(groupDatas);
        this.bringMemoByGroup(groupDatas);

        json.data.map((json) => {
          group.no.push(json.no);
          group.gname.push(json.name);
        });
        console.log(group);
        this.Update(group);
      })
      .catch((err) => console.error(err));
    // 그룹의 db를 가져오는 코드

  }

  bringMemoByGroup(_groupDatas) {
    // 그룹의 data로 memo의 db를 가져오는 코드
    let memo_bigArr = [];
    // 그룹값이 null이면 개인 1부터 그룹으로 표시
    // ex_ g_no가 null이고, u_no가 있을 때 개인, g_no가 not null이고, u_no가 있을때 그룹.
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

  Update(group) {
    this.setState({
      group: group,
    });
  }

  SidebarGroupUpdate(no) {
    this.setState({
      g_no: no,
    });
    console.log(no);
  }

  render() {
    return (
      <div className={styles.container}>
        <Header group={this.state.group} />
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
