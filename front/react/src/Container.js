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
      memo_noSelectedByHash: null,
      IsHashUpdate: false,
      memo_bigArr: null,
      groupBySidebar: { no: null, name: null },
      showChat: false,
      clientRef: "",
      alarm: { type: "", readcheck: "" },
      keyword: "",
    };
  }

  // search 검색 콜백함수
  onCallbackKeywordChange(keyword) {
    this.setState({
      keyword: keyword,
    });
  }

  componentDidMount() {
    this.bringMemoByGroup(this.state.groupBySidebar.no);

    // 현재 sessionUser를 input하여 그룹의 db를 가져오는 코드
    let group = { no: [], gname: [] };
    let groupDatas = null;
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
      headers: API_HEADERS,
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

    this.getHashListByGroup(this.state.groupBySidebar.no);
  }
  // 검색창에 value를 입력 시 작동하는 함수
  ajaxSearchHash() {
    fetch(`${API_URL}/api/searchHash`, {
      method: "post",
      headers: API_HEADERS,
    })
      .then((response) => response.json())
      .then((json) => { })
      .catch((err) => console.error(err));
  }

  UpdateHash(hash) {
    this.setState({
      hash: hash,
    });
  }

  getHashListByGroup(gNo) {
    let g_no = { no: gNo };
    let group_hash = [{ no: "", name: "", memo_no: "" }];
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
      })
      .catch((err) => console.error(err));
  }

  // group의 no와 Session no로 memoList를 뿌리는 함수
  bringMemoByGroup(_groupNumbers) {
    let data = {
      no: _groupNumbers,
    };
    let memo_bigArr;
    let filteredMemo_bigArr;
    // call api
    fetch(`${API_URL}/api/memoList`, {
      method: "post",
      headers: API_HEADERS,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        // 설명
        // keyword가 "" 일 때는 전체 memolist를 뿌려준다.
        // keyword가 변화할 때는 검색한 내용에 대한 memolist를 뿌려준다.
        // memo_no가 null일때는 전체 memoList를 뿌려준다.
        // memo_no가 null이 아닐때는 해당메모의 no로 등록된 해시태그를 뿌려준다.
        // 설명

        // 검색keyword가 ""이고, sidebar의 해쉬를 클릭하지 않았을 때는
        // 전체 memoList를 뿌려준다.
        if (this.state.keyword == "" && this.state.memo_noSelectedByHash == null) {
          memo_bigArr = json.data;
          /*준용이오빠가 짜던거
          let temp = null;
          let bb = [];

          for(let e in (memo_bigArr)){
            console.log(e);
          }
         console.log(memo_bigArr.find("null"));
         memo_bigArr.map((no,index)=>{

         })
          // memo_bigArr.map((()=>{
          //   bb.push(memo_bigArr.get("list_no",temp)); //마지막
          //   temp = memo_bigArr.get("no",temp);
          //   bb.push(memo_bigArr.get("list_no",temp));//마지막전
          // }))
        */
          this.UpdateMemo(memo_bigArr);
        }
        //검색창의 keyword에 value를 input했을 경우 value와 memo의 content가 같은
        // 값을 memoList로 뿌려준다.
        else if (this.state.keyword != "") {
          console.log("검색 value에 대한 memoList");
          memo_bigArr = json.data;

          // filteredMemo_bigArr: keyword에 해당하는 memoList를 filter한 값을 Array로 종합
          filteredMemo_bigArr = memo_bigArr.filter(
            //indexOf() 메서드는 호출한 String 객체에서 주어진 값과
            //일치하는 첫 번째 인덱스를 반환. 일치하는 값이 없으면 -1을 반환
            (element) => element.content.indexOf(this.state.keyword) != -1
          );
          // 검색창에 keyword입력 후 다시 ""로 설정되도록 하는 코드.
          this.onCallbackKeywordChange("");
          this.UpdateMemo(filteredMemo_bigArr);
        }
        // 사이드바의 해시이름을 클릭 시 해당 해시가 등록된 memoList를 뿌려준다.
        else if (this.state.memo_noSelectedByHash != null) {
          memo_bigArr = json.data.filter(
            (element) => element.no === this.state.memo_noSelectedByHash
          );
          // 사이드바의 해시를 클릭 후 다시 null로 설정되도록 하는 코드.
          this.grouppingHashtag(null);
          this.UpdateMemo(memo_bigArr);
        }
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
      alarm: { type: alarmDatas.type, readcheck: alarmDatas.readCheck },
    });
  }

  UpdateGroupHash(group_hash) {
    this.setState({
      group_hash: group_hash,
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
      IsHashUpdate: true,
    });
  }

  // sidebar 해시태그에서 클릭한 해시를 가지고 있는 메모
  grouppingHashtag(memo_no) {
    this.setState({
      memo_noSelectedByHash: memo_no,
    });
  }

  IsHashUpdate() {
    this.setState({
      IsHashUpdate: true,
    });
  }

  chattingPopup(showChatClick) {
    this.setState({
      showChat: !showChatClick,
    });
  }
  memo_Change(drag, drop) {
    console.log(drag, drop);

    drag < drop
    drop < drag
    // //를 서버로 보내야댐 ㅇㅋㅇㅋ;
    // let memo = { no: , list_no: }
    // fetch(`${API_URL}/api/chageMemoListNo`, {
    //   method: "post",
    //   headers: API_HEADERS,
    //   body: JSON.stringify(g_no),
    // })
    //   .then((response) => response.json())
    //   .then((json) => {
    //     console.log(json)
    //   })
    //   .catch((err) => console.error(err));
  }

  alarmReceive(alarm_msg) {
    this.setState({
      alarm: {
        type: alarm_msg.type,
        readcheck: alarm_msg.readCheck,
      },
    });
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
    return JSON.stringify(nextState) != JSON.stringify(this.state);

  }
  componentDidUpdate(prevProps, prevState) {
    this.getHashListByGroup(this.state.groupBySidebar.no);
    this.setState({
      IsHashUpdate: false,
    });
  }


  render() {
    const wsSourceUrl = "http://localhost:8080/codingvirus19/api/alarm";
    return (
      <div className={styles.container}>
        {this.Users != undefined ? (
          <SockJsClient
            url={wsSourceUrl}
            topics={[`/api/alarm/${this.Users.no}`]}
            onMessage={this.alarmReceive.bind(this)}
            ref={(client) => {
              this.clientRef = client;
            }}
          ></SockJsClient>
        ) : null}

        {/*속성 groupBySidebar : 사이드바의 개인/그룹 클릭 시 해당 group의 no, name을 전달 */}
        {/*속성 group : 로그인 시 session user의 모든 그룹들의 no, name이 담겨있다.  */}
        {/*속성 users : 유저 session이 담긴다. */}
        {/*속성 memo_bigArr : 메모의 정보가 이중배열로 담겨있다.*/}
        {/*속성 SidebarGroupUpdate : delete 버튼 클릭시 콜백으로 gno와 gname이 전달된다.  */}
        <Header
          // search 검색 콜백함수
          onCallbackKeywordChange={this.onCallbackKeywordChange.bind(this)}
          // 검색창에 입력한 keyword
          keyword={this.state.keyword}
          // group의 no와 name의 정보 들어있다.
          groupBySidebar={this.state.groupBySidebar}
          // group의 no와 name을 사용하는 callback함수
          SidebarGroupUpdate={this.SidebarGroupUpdate.bind(this)}
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
          group_hash={this.state.group_hash}
          IsHashUpdate={this.IsHashUpdate.bind(this)}
        //변경된 결과 값 state :true false
        />
      </div>
    );
  }
}
