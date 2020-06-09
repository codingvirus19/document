import React from "react";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import Contents from "./contents/Contents";
import SockJsClient from "react-stomp";
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
      group_hash: [{ no: "", name: "", memo_no: "" }],
      distinctGroup_hash: [""],
      SelectedHash: null,
      memo_bigArr: null,
      groupBySidebar: { no: null, name: null },
      showChat: false,
      showAlarm: false,
      clientRef: "",
      alarm: { basic: "", chatting: "" },
      addgroup_alarm: {message:"", date:"", group_no:"", group_name:""},
      keyword: "",
    };
    this.drag = null;
    this.drop = null;
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
    this.getGroup();

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
    fetch(`${API_URL}/api/alarmCheck`, {
      method: "post",
      headers: API_HEADERS,
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json.data)
        this.UpdateAlarm(json.data);
      })
      .catch((err) => console.error(err));
    // 알람 가져올 때, type이 true이면 기본 알람, false이면 채팅 알람 구별
    // db에서 받을때는 true = 1, false = 0
    // 읽지 않은건 false = 0, 읽은 건 true = 1

    // Sidebar의 HashtagList를 가져오는 코드
    this.getHashListByGroup(this.state.groupBySidebar.no);
  }

  // 현재 sessionUser를 input하여 그룹의 db를 가져오는 코드
  getGroup() {
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
  }

  getHashListByGroup(gNo) {
    let g_no = { no: gNo };
    let group_hash = [{ no: "", name: "", memo_no: "" }];
    let distinctGroup_hash = [{ name: "" }];
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
        distinctGroup_hash = group_hash.map(function (val, index) {
          return val['name'];
        }).filter(function (val, index, arr) {
          return arr.indexOf(val) === index;
        });
        this.UpdateDistinctGroupHash(distinctGroup_hash);
        this.UpdateGroupHash(group_hash);
      })
      .catch((err) => console.error(err));
  }

  // group의 no와 Session no로 memoList를 뿌리는 함수
  bringMemoByGroup(_groupNumbers) {
    let data = { no: _groupNumbers, };
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
        if (this.state.keyword == "") {
          memo_bigArr = json.data;
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
          this.UpdateMemo(filteredMemo_bigArr);
        }
      })
      .catch((err) => console.error(err));
    // 그룹의 data로 memo의 db를 가져오는 코드
  }

  bringMemoByHash(g_no, hash) {
    let memo_bigArr;
    let data = { gNo: g_no, hash: hash };
    fetch(`${API_URL}/api/memoListByHash`, {
      method: "post",
      headers: API_HEADERS,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        memo_bigArr = json.data;
        this.UpdateMemo(memo_bigArr);
      })
      .catch((err) => console.error(err));
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
      alarm: { basic: alarmDatas.basic, chatting: alarmDatas.chatting },
    });
  }

  UpdateGroupHash(group_hash) {
    this.setState({
      group_hash: group_hash,
    });
  }

  UpdateDistinctGroupHash(distinctGroup_hash) {
    this.setState({
      distinctGroup_hash: distinctGroup_hash,
    });
  }

  // sidebar에서 콜백된 파라미터 no와 name
  // sitebar에서 클릭 할 때마다 groupNo에 해당하는 memo를 뿌려준다.
  // callback함수 사용처 : sidebar클릭시, delete 클릭 시, shareMemo , changeColor 클릭 시....
  SidebarGroupUpdate(no, name) {
    //     // 검색창에 keyword입력 후 다시 ""로 설정되도록 하는 코드.
    // this.onCallbackKeywordChange("");
    this.bringMemoByGroup(no);
    this.getHashListByGroup(no);
    this.setState({
      groupBySidebar: {
        no: no,
        name: name,
      },
    });
  }

  AlarmAddGroup(){
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
  }

  //해시 검색 (ex) #~~~)
  SearchHash(g_no, keyword) {
    // 해시일 경우 앞에 #을 자른 후 해시 저장
    let hash = keyword.slice(1);
    this.onCallbackKeywordChange(keyword)
    this.bringMemoByHash(g_no, hash)
  }

  //sidebar에서 선택된 해시
  SidebarHashUpdate(g_no, hash) {
    this.bringMemoByHash(g_no, hash)
  }

  chattingPopup(showChatClick) {
    this.setState({
      showChat: !showChatClick,
    });
  }
  AlarmPopup(showAlarmClick) {
    this.setState({
      showAlarm: !showAlarmClick,
    });
  }
  memo_Change(drag, drop) {
    if (this.drag != drag) {
      this.drag = drag;
      this.drop = drop;
    } else if (this.drop == drop) {
      return;
    }
    let memoList = [];
    const dragNo = this.state.memo_bigArr[drag].no;
    const dragListNo = this.state.memo_bigArr[drag].listNo;
    const dropNo = this.state.memo_bigArr[drop].no;
    const dropListNo = this.state.memo_bigArr[drop].listNo;
    let memo_change = {
      dragNo: `${dragNo}`,
      dropNo: `${dropNo}`,
      dragListNo: `${dragListNo}`,
      dropListNo: `${dropListNo}`
    };
    this.state.memo_bigArr.map((list) => {
      memoList.push(list);
    })
    memoList[drag].listNo = dropListNo;
    memoList[drop].listNo = dragListNo;
    memoList[drag] = this.state.memo_bigArr[drop];
    memoList[drop] = this.state.memo_bigArr[drag];
    this.setState({
      memo_bigArr: memoList
    })
    fetch(`${API_URL}/api/memo/memoposition`, {
      method: "post",
      headers: API_HEADERS,
      body: JSON.stringify(memo_change),
    })

  }

  alarmReceive(alarm_msg) {
    this.state.addgroup_alarm=null
    console.log(alarm_msg);
    if (alarm_msg.addgroup == true && alarm_msg.type == true && alarm_msg.readCheck == true) { //그룹초대  
      console.log("그룹추가에 온거 맞지?");
      this.setState({
        addgroup_alarm: {
          message: alarm_msg.chat,
          date: alarm_msg.date,
          group_no: alarm_msg.gNo,
          group_name: alarm_msg.groupName
        },
        alarm: {
          basic: true,
          chatting: false
        }
      })
    }
    if (alarm_msg.basic != null) { //기본
      this.AlarmPopup(true);
      this.setState({
        alarm: {
          basic: alarm_msg.basic,
          chatting: this.state.alarm.chatting,
          g_no: this.state.alarm.g_no
        }
      })
    } else if (alarm_msg.chatting != null) {//채팅
      this.setState({
        alarm: {
          chatting: alarm_msg.chatting,
          g_no: alarm_msg.gNo,
          basic: this.state.alarm.basic
        }
      })
    }
    if (alarm_msg.type == true && alarm_msg.readCheck == false) {
      this.setState({
        alarm: {
          basic: false,
          chatting: this.state.alarm.chatting,
        }
      })
    } else if (alarm_msg.type == false && alarm_msg.readCheck == false) {
      this.setState({
        alarm: {
          basic: this.state.alarm.basic,
          chatting: false,
        }
      })
      // this.setState({
      //   alarm: {
      //     g_no: alarm_msg.gNo,
      //     basic: alarm_msg.readCheck,
      //     chat: alarm_msg.type
      //   }
      // })
    }
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
          SearchHash={this.SearchHash.bind(this)}
          bringMemoByGroup={this.bringMemoByGroup.bind(this)}
          chattingPopup={this.chattingPopup.bind(this)}
          AlarmPopup={this.AlarmPopup.bind(this)}
          alarm={this.state.alarm}
          clientRef={this.clientRef}
          users={this.Users}
          // hash={this.state.distinctGroup_hash}
        />
        <div className={styles.body}>
          <Sidebar
            hash={this.state.distinctGroup_hash}
            group={this.state.group}
            SidebarGroupUpdate={this.SidebarGroupUpdate.bind(this)}
            SidebarHashUpdate={this.SidebarHashUpdate.bind(this)}
            onCallbackKeywordChange={this.onCallbackKeywordChange.bind(this)}
          />
          <Contents
            memo_noSelectedByHash={this.state.memo_noSelectedByHash}
            getGroup={this.getGroup.bind(this)}
            SidebarGroupUpdate={this.SidebarGroupUpdate.bind(this)}
            group={this.state.group}
            groupBySidebar={this.state.groupBySidebar}
            bringMemoByGroup={this.bringMemoByGroup.bind(this)}
            memo_bigArr={this.state.memo_bigArr}
            memo_Change={this.memo_Change.bind(this)}
            users={this.Users}
            showChat={this.state.showChat}
            showAlarm={this.state.showAlarm}
            alarm={this.state.alarm}
            clientRef={this.clientRef}
            addgroup_alarm={this.state.addgroup_alarm}
            //중복 제거 안한 해시(memo_no 가지고 있음)            
            group_hash={this.state.group_hash}
            //중복 제거한 해시
            distinctGroup_hash={this.state.distinctGroup_hash}
          //변경된 결과 값 state :true false
            AlarmAddGroup={this.AlarmAddGroup.bind(this)}
          />
        </div>
      </div>
    );
  }
}