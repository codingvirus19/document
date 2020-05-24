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
        // groupuser에서 가져온 group의 데이터값
        groupDatas = json.data;

        console.log(groupDatas);

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
          // console.log(group);
        });

        this.Update(group);
      })
      .catch((err) => console.error(err));
    // 그룹의 db를 가져오는 코드

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
          <Contents memo_bigArr={this.state.memo_bigArr} group={this.state.group} />
        ) : (
            <Contents />
          )}
      </div>
    );
  }
}
