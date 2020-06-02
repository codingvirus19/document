import React from "react";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import Contents from "./contents/Contents";
import SockJsClient from "react-stomp";

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
      hash: [{ no: "", name: "" }],
      memo_bigArr: null,
      groupBySidebar: { no: null, name: null },
      showChat: false,
      clientRef: '',
      alarm: { readcheck: [], type: [], content: [], date: [], userNo: [] }
    };
  }

  componentDidMount() {
    // 현재 sessionUser를 input하여 그룹의 db를 가져오는 코드
    let group = { no: [], gname: [] };
    let groupDatas = null;
    this.bringMemoByGroup(this.state.groupBySidebar.no);
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
        // UpdateGroup(): group에 setState하는 함수
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
        console.log(users);
      })
      .catch((err) => console.error(err));

    // Sidebar의 HashtagList를 가져오는 코드
    let g_no = { no: this.state.g_no };
    let hash = [{ no: "", name: "" }];
    fetch(`${API_URL}/api/getHashListByGroup`, {
      method: "post",
      headers: API_HEADERS,
      body: JSON.stringify(g_no),
    })
      .then((response) => response.json())
      .then((json) => {
        hash = json.data.map((element) => {
          return {
            no: element.no,
            name: element.name,
          };
        });
        this.UpdateHash(hash);
      })
      .catch((err) => console.error(err));

    let alarm = { readcheck: [], type: [], content: [], date: [], userNo: [] };
    // let alarm = [];
    let alarmDatas = null;
    // call api
    fetch(`${API_URL}/api/alarm`, {
      method: "post",
      headers: API_HEADERS
    })
      .then((response) => response.json())
      .then((json) => {
        alarmDatas = json.data;
        alarmDatas.map((json) => {
          alarm.readcheck.push(json.readCheck);
          alarm.type.push(json.type);
          alarm.content.push(json.chat);
          alarm.date.push(json.date);
          alarm.userNo.push(json.uNo);
        });
        this.UpdateAlarm(alarm);
      })
      .catch((err) => console.error(err));
    // 알람 가져올 때, type이 true이면 기본 알람, false이면 채팅 알람 구별
    // db에서 받을때는 true = 1, false = 0
    // 읽지 않은건 false = 0, 읽은 건 true = 1
  }

  UpdateHash(hash) {
    this.setState({
      hash: hash,
    });
  }

  // group의 no와 Session no로
  bringMemoByGroup(_groupNumbers) {
    let data = {
      no: _groupNumbers,
    };
    let memo_bigArr = [];

    // call api
    fetch(`${API_URL}/api/memoList`, {
      method: "post",
      headers: API_HEADERS,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        // memo_bigArr : input한 그룹의 memo db 전부를 가져온다.
        memo_bigArr = json.data;
        this.UpdateMemo(memo_bigArr);
      })
      .catch((err) => console.error(err));
    // 그룹의 data로 memo의 db를 가져오는 코드
  }

  UpdateMemo(_memo_bigArr) {
    this.setState({
      memo_bigArr: _memo_bigArr,
    });
  }

  // 렌더 시 통신으로 받은 group값을 Array화 시킨다.
  UpdateGroup(group) {
    this.setState({
      group: group,
    });
  }

  UpdateUser(users) {
    this.Users = users;
  }

  UpdateAlarm(alarm) {
    this.setState({
      alarm: alarm
    })
  }
  // sidebar에서 콜백된 파라미터 no와 name
  // sitebar에서 클릭 할 때마다 groupNo에 해당하는 memo를 뿌려준다.
  // callback함수 사용처 : sidebar클릭시, delete 클릭 시, shareMemo , changeColor 클릭 시....
  SidebarGroupUpdate(no, name) {
    this.bringMemoByGroup(no);
    this.setState({
      groupBySidebar: {
        no: no,
        name: name,
      },
    });
  }

  chattingPopup(showChatClick) {
    this.setState({
      showChat: !showChatClick,
    });
  }
  memo_Change(drag, drop) {
    //를 서버로 보내야댐 ㅇㅋㅇㅋ;
  }

  callbackFromToolbar(_gNo) {
    bringMemoByGroup(_gNo);
  }

  alarmReceive(alarm_msg) {
    this.setState({
      alarmMessage: alarm_msg,
    });
  }


  render() {
    console.log(this.state.alarm)
    const wsSourceUrl = "http://localhost:8080/codingvirus19/api/alarm";
    return (
      <div className={styles.container}>
        {/* <SockJsClient
          url={wsSourceUrl}
          topics={[`/api/alarm/${this.state.users.no}`]}
          onMessage={this.alarmReceive.bind(this)}

          ref={(client) => {
            this.clientRef = client;
          }}
        ></SockJsClient>
        {/*속성 groupBySidebar : 사이드바의 개인/그룹 클릭 시 해당 group의 no, name을 전달 */}
        {/*속성 group : 로그인 시 session user의 모든 그룹들의 no, name이 담겨있다.  */}
        {/*속성 users : 유저 session이 담긴다. */}
        {/*속성 memo_bigArr : 메모의 정보가 이중배열로 담겨있다.*/}
        {/*속성 SidebarGroupUpdate : delete 버튼 클릭시 콜백으로 gno와 gname이 전달된다.  */}
        <Header
          groupBySidebar={this.state.groupBySidebar}
          //변경함수
          bringMemoByGroup={this.bringMemoByGroup.bind(this)}
          chattingPopup={this.chattingPopup.bind(this)}
          alarm={this.state.alarm}
        />
        <Sidebar
          group={this.state.group}
          group_update={this.SidebarGroupUpdate.bind(this)}
        />
        <Contents
          UpdateGroup={this.UpdateGroup.bind(this)}
          SidebarGroupUpdate={this.SidebarGroupUpdate.bind(this)}
          group={this.state.group}
          groupBySidebar={this.state.groupBySidebar}
          memo_bigArr={this.state.memo_bigArr}
          memo_Change={this.memo_Change.bind(this)}
          users={this.Users}
          showChat={this.state.showChat}
          clientRef={this.clientRef}
          //변경된 결과 값 state :true false
        />
      </div>
    );
  }
}
