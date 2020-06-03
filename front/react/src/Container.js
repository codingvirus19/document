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
      group_hash: [{ no: "", name: "", memo_no: "" }],
      group_hash_for_select: [{ value: "", label: "", memo_no: "" }],
      memo_noSelectedByHash: '',
      IsHashUpdate: false,
      memo_bigArr: null,
      groupBySidebar: { no: null, name: null },
      showChat: false,
      clientRef: '',
      alarm: { type: '', readcheck: '' }
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
      })
      .catch((err) => console.error(err));

    // 처음 알람 가져오는 통신

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
        this.UpdateAlarm(alarmDatas);
      })
      .catch((err) => console.error(err));
    // 알람 가져올 때, type이 true이면 기본 알람, false이면 채팅 알람 구별
    // db에서 받을때는 true = 1, false = 0
    // 읽지 않은건 false = 0, 읽은 건 true = 1
    // Sidebar의 HashtagList를 가져오는 코드
    this.getHashListByGroup(this.state.groupBySidebar.no)

  }

  getHashListByGroup(gNo) {
    let g_no = { no: gNo }
    let group_hash = [{ no: "", name: "", memo_no: ""}];
    let group_hash_forselect = [{ value: "", label: "", memo_no: "" }];
    fetch(`${API_URL}/api/getHashListByGroup`, {
      method: "post",
      headers: API_HEADERS,
      body: JSON.stringify(g_no),
    })
      .then((response) => response.json())
      .then((json) => {
        group_hash = json.data.map((element) => {
          return {
            no: element.no,
            name: element.name,
            memo_no: element.mNo,
          };
        });
        this.UpdateGroupHash(group_hash);
        group_hash_forselect = json.data.map((element) => {
          return {
            value: element.no,
            label: element.name,
            memo_no: element.mNo,
          };
        });
        this.UpdateGroupHashForSelect(group_hash_forselect);
      })
      .catch((err) => console.error(err));
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
        if (!this.state.memo_noSelectedByHash) {
          memo_bigArr = json.data;
        }
        //sidebar에서 해시태그를 선택하면 해당 메모만 가져온다
        else {
          memo_bigArr = json.data.filter(element => element.no === this.state.memo_noSelectedByHash);
        }
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

  UpdateAlarm(alarmDatas) {
    this.setState({
      alarm: { type: alarmDatas.type, readcheck: alarmDatas.readCheck }
    })
  }

  UpdateGroupHash(group_hash) {
    this.setState({
      group_hash: group_hash,
    });
  }
  
  UpdateGroupHashForSelect(group_hash_for_select) {
    this.setState({
      group_hash_for_select: group_hash_for_select,
    });
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
  IsHashUpdate() {
    this.setState({
      IsHashUpdate: true
    })
  }

  // sidebar 해시태그에서 클릭한 해시를 가지고 있는 메모
  grouppingHashtag(memo_no) {
    this.setState({
      memo_noSelectedByHash: memo_no
    })
  }

  IsHashUpdate() {
    this.setState({
      IsHashUpdate: true
    })
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
      alarm: {
        type: alarm_msg.type,
        readcheck: alarm_msg.readCheck
      }
    })
    // this.setState({
    //   alarm: {
    //     readcheck: this.state.alarm.readcheck.concat(alarmdata.readCheck),
    //     type: this.state.alarm.type.concat(alarmdata.type),
    //     content: this.state.alarm.content.concat(alarmdata.chat),
    //     date: this.state.alarm.date.concat(alarmdata.date),
    //     userNo: this.state.alarm.userNo.concat(alarmdata.uNo),
    //   }
    // })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (JSON.stringify(nextState) != JSON.stringify(this.state));
  }

  componentDidUpdate(prevProps, prevState) {
    this.getHashListByGroup(this.state.groupBySidebar.no);
    this.setState({
      IsHashUpdate: false
    })
  }


  render() {
    const wsSourceUrl = "http://localhost:8080/codingvirus19/api/alarm";
    return (
      <div className={styles.container}>

        {this.Users != undefined ?
          <SockJsClient
            url={wsSourceUrl}
            topics={[`/api/alarm/${this.Users.no}`]}
            onMessage={this.alarmReceive.bind(this)}
            ref={(client) => { this.clientRef = client; }}>
          </SockJsClient> : null}


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
          grouppingHashtag={this.grouppingHashtag.bind(this)}
          hash={this.state.group_hash}
          group={this.state.group}
          group_update={this.SidebarGroupUpdate.bind(this)}
          SidebarGroupUpdate={this.SidebarGroupUpdate.bind(this)}
          groupBySidebar={this.state.groupBySidebar}
        />
        <Contents
          memo_noSelectedByHash={this.state.memo_noSelectedByHash}
          UpdateGroup={this.UpdateGroup.bind(this)}
          SidebarGroupUpdate={this.SidebarGroupUpdate.bind(this)}
          group={this.state.group}
          groupBySidebar={this.state.groupBySidebar}
          bringMemoByGroup={this.bringMemoByGroup.bind(this)}
          memo_bigArr={this.state.memo_bigArr}
          memo_Change={this.memo_Change.bind(this)}
          users={this.Users}
          showChat={this.state.showChat}
          clientRef={this.clientRef}
          group_hash_for_select={this.state.group_hash_for_select}
          group_hash={this.state.group_hash}
          IsHashUpdate={this.IsHashUpdate.bind(this)}
        //변경된 결과 값 state :true false
        />
      </div>
    );
  }
}