import React from "react";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import Contents from "./contents/Contents";
import SockJsClient from "react-stomp";
import { ToastContainer, toast, Slide } from "react-toastify";
import "./Container.scss";

const API_URL = ".";
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
      distinctColor: null,
      SelectedHash: null,
      memo_bigArr: null,
      groupBySidebar: { no: null, name: null },
      showChat: false,
      showAlarm: false,
      clientRef: "",
      alarm: { basic: "", chatting: "" },
      addgroup_alarm: { message: "", date: "", group_no: "", group_name: "", week: "" },
      groupInUserList: [{ user_no: "", id: "", nickname: "", img: "", auth_no: "" }],
      keyword: "",
      searchColor: "",
      chatkeyword: "",
      getProfileValue: null,
      userListInGroupByUser: null,
      chatalarm_gNo: null,
      userlistSession: [],
      // sidebar
      clickGroup: false,
      clickHash: false,
      clickColor: false,
      classMenuIndi: "menu-item",
      classMenuGroup: "menu-item",
      classMenuHash: "menu-item",
      classMenuColor: "menu-item",
      classMenuColorSelect: "menu-item",
      HashToSidebar: null,
    };
    this.tempGno = null;
  }

  // search 검색 콜백함수
  onCallbackKeywordChange(keyword) {
    this.setState({
      keyword: keyword,
    });
  }
  // chatsearch 검색 콜백함수
  onCallbackChattingKeywordChange(chatkeyword) {
    this.setState({
      chatkeyword: chatkeyword,
    });
  }

  componentDidMount() {

    this.bringMemoByGroup(this.state.groupBySidebar.no);

    // 현재 sessionUser를 input하여 그룹의 db를 가져오는 코드
    this.getProfileAjax();

    this.getGroup();

    // 로그인한 user를 가져오는 코드
    let users = { no: [], name: [], id: [], image: [] };
    // call api
    fetch(`${API_URL}/api/getUserSession`, {
      method: "post",
      headers: API_HEADERS,
    })
      .then((response) => response.json())
      .then((json) => {
        users.no.push(json.data.no);
        users.name.push(json.data.name);
        users.id.push(json.data.username);
        users.image.push(json.data.image)
        this.UpdateUser(users);
        //사용자가 있는 그룹들에 있는 사용자들 가져오는 함수
        this.getUserListInGroupByUser(json.data.no)
      })
      .catch((err) => console.error(err));

    // 처음 알람 가져오는 통신
    // let alarm = [];
    // call api
    fetch(`${API_URL}/api/alarmCheck`, {
      method: "post",
      headers: API_HEADERS,
    })
      .then((response) => response.json())
      .then((json) => {
        this.UpdateAlarm(json.data);
      })
      .catch((err) => console.error(err));
    // 알람 가져올 때, type이 true이면 기본 알람, false이면 채팅 알람 구별
    // db에서 받을때는 true = 1, false = 0
    // 읽지 않은건 false = 0, 읽은 건 true = 1

    // Sidebar의 HashtagList를 가져오는 코드
    this.getHashListByGroup(this.state.groupBySidebar.no);

  }

  //사용자가 있는 그룹들에 있는 사용자들 가져오는 함수
  getUserListInGroupByUser(no) {
    let data = { no: no };
    fetch(`${API_URL}/api/getUserListInGroupByUser`, {
      method: "post",
      headers: API_HEADERS,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        let userListInGroupByUser = json.data.map(element => {
          return {
            gNo: element.gNo,
            nickname: element.nickname,
            image: element.image
          };
        });
        this.UpdateUserListInGroupByUser(userListInGroupByUser);
      })
      .catch((err) => console.error(err));
  }

  getProfileAjax() {
    fetch(`${API_URL}/api/profile`, {
      method: "post",
      headers: API_HEADERS,
    })
      .then((response) => response.json())
      .then((json) => {
        let _getProfileValue = json.data;
        this.setState({
          getProfileValue: _getProfileValue,
        });
      })
      .catch((err) => console.error(err));
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

        let hashcoutarr= new Map();
        let hashlist = [{value:"", count:""}]
        distinctGroup_hash = group_hash.map(function (val, index) {
          return val['name']
        }).filter(function (val, index, arr) {
          
          (hashlist.indexOf(val)<0)
          ?hashlist[hashlist.length] = val :null; 

          if(group_hash.indexOf(val) <0){
            if(hashcoutarr.get(val) != null){
              hashcoutarr.set(val,hashcoutarr.get(val)+1);
            }else{
              hashcoutarr.set(val,1);
            }
          }
          return arr.indexOf(val) === index;
        });
       
        let ArrToSidebar= hashlist.map((value,index)=>{ 
          return {
            value:value,
            count: hashcoutarr.get(value),
          }
        })
        ArrToSidebar.splice(0,1);
        
        // sendHashToSidebar: sidebar에 보낼 hash정보와 중첩되는 count 
        this.sendHashToSidebar(ArrToSidebar);
        // content의 hash에 전달되는 값
        this.UpdateDistinctGroupHash(distinctGroup_hash);
        this.UpdateGroupHash(group_hash);
      })
      .catch((err) => console.error(err));
  }

  sendHashToSidebar(_ArrToSidebar){
    this.setState({
      HashToSidebar: _ArrToSidebar
    })
  }
  
  // group의 no와 Session no로 memoList를 뿌리는 함수
  bringMemoByGroup(_groupNumbers) {
    let data = { no: _groupNumbers, };
    let memo_bigArr;

    this.groupUserList(_groupNumbers);
    fetch(`${API_URL}/api/memoList`, {
      method: "post",
      headers: API_HEADERS,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        memo_bigArr = json.data;

        //색 뽑아줌(searchColor용)
        let distinctColor = memo_bigArr.map(function (val, index) {
          return val['color'];
        }).filter(function (val, index, arr) {
          return arr.indexOf(val) === index;
        });
        this.UpdateDistinctColor(distinctColor);
        // keyword가 변화할 때는 검색한 내용에 대한 memolist를 뿌려준다.
        // memo_no가 null이 아닐때는 해당메모의 no로 등록된 해시태그를 뿌려준다.

        //검색창의 keyword에 value를 input했을 경우 value와 memo의 content가 같은
        // 값을 memoList로 뿌려준다.
        if (this.state.keyword != "") {
          // keyword에 해당하는 memoList를 filter한 값을 Array로 종합
          memo_bigArr = memo_bigArr.filter(
            //indexOf() 메서드는 호출한 String 객체에서 주어진 값과
            //일치하는 첫 번째 인덱스를 반환. 일치하는 값이 없으면 -1을 반환
            (element) => element.content.indexOf(this.state.keyword) != -1
          );
        }
        //색상 검색
        else if(this.state.searchColor != "") {
          memo_bigArr = memo_bigArr.filter(
            (element) => element.color === this.state.searchColor
          )
        }
        // 검색keyword가 ""이고, sidebar의 해쉬를 클릭하지 않았을 때는
        // 전체 memoList를 뿌려준다.
        this.UpdateMemo(memo_bigArr);
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

  searchMemoByHash(g_no, hash) {
    let memo_bigArr;
    let data = { gNo: g_no, hash: hash };
    fetch(`${API_URL}/api/searchMemoByHash`, {
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
  UpdateChatList(group) {
    this.setState({
      chatListGroup: group
    })
  }

  UpdateUser(users) {
    this.Users = users;
    this.getChatListGroup();
  }

  getChatListGroup() {
    let group = { no: [], gname: [], readcheck: [], readcount: [] };
    let chatgroupDatas = null;
    let filterchatgroupDatas = null;

    fetch(`${API_URL}/api/chatlistgroup`, {
      method: "post",
      headers: API_HEADERS,
    })
      .then((response) => response.json())
      .then((json) => {
        if (this.state.chatkeyword == "") {
          chatgroupDatas = json.data;
          // group의 데이터값으로 sidebar를 불러오는 함수
          chatgroupDatas.map((json) => {
            group.no.push(json.gNo);
            group.gname.push(json.groupName);
            group.readcheck.push(json.readCheck);
            group.readcount.push(json.readCount);
          });
        } else if (this.state.chatkeyword != "") {
          chatgroupDatas = json.data;
          filterchatgroupDatas = chatgroupDatas.filter(
            (element) => element.groupName.indexOf(this.state.chatkeyword) != -1
          );
          filterchatgroupDatas.map((json) => {
            group.no.push(json.gNo);
            group.gname.push(json.groupName);
            group.readcheck.push(json.readCheck);
            group.readcount.push(json.readCount);
          });
        }
        this.UpdateChatList(group);
      })
      .catch((err) => console.error(err));
    //----------------------------------------채팅 관련 그룹 가져오기
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

  UpdateDistinctColor(distinctColor) {
    this.setState({
      distinctColor : distinctColor,
    })
  }

  UpdateSearchColor(searchColor, g_no) {
    this.setState({
      searchColor: searchColor
    })
    this.search(g_no);
  }
  SearchColordelete() {
    this.setState({
      searchColor: null
    })
  }


  UpdateUserListInGroupByUser(userListInGroupByUser) {
    this.setState({
      userListInGroupByUser: userListInGroupByUser,
    })
  }

  UpdateGroupBySidebar(no, name) {
    this.setState({
      groupBySidebar: {
        no: no,
        name: name,
      },
    });
  }

  // sidebar에서 콜백된 파라미터 no와 name
  // sitebar에서 클릭 할 때마다 groupNo에 해당하는 memo를 뿌려준다.
  // callback함수 사용처 : sidebar클릭시, delete 클릭 시, shareMemo , changeColor 클릭 시....
  SidebarGroupUpdate(no, name) {
    this.bringMemoByGroup(no);
    this.getHashListByGroup(no);
    this.getUserListInGroupByUser(this.Users.no[0]);
    this.getChatListGroup();

    this.setState({
      addgroup_alarm: null
    })

    if (no != null) {
      this.getGroupInUser(no);
    }
    //no만 있으면 gName 찾아서 넣어줌
    if (name === undefined) {
      this.getGnameByGno(no);
    }
    else {
      this.UpdateGroupBySidebar(no, name)
    }
  }

  //프로필을 변경할때 업데이트 되는 함수
  profileUpdate() {
    this.getGroupInUser(this.state.groupBySidebar.no);
    this.getUserListInGroupByUser(this.Users.no[0]);
  }
  
  getGnameByGno(no) {
    let data = { no: no };
    fetch(`${API_URL}/api/getGnameByGno`, {
      method: "post",
      headers: API_HEADERS,
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((json) => {
        this.UpdateGroupBySidebar(json.data.no, json.data.name)
      }).then(()=>this.getUserListInGroupByUser(this.Users.no[0]))
      .catch((err) => console.error(err));
  }

  getGroupInUser(no) {
    let data = { gNo: no };
    let getSession = [{ user_no: "", id: "", nickname: "", img: "", auth_no: "" }]
    // call api
    fetch(`${API_URL}/api/groupsession`, {
      method: "post",
      headers: API_HEADERS,
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((json) => {
        getSession = json.data.map((json) => {
          return {
            user_no: json.no,
            id: json.id,
            nickname: json.nickname,
            img: json.image,
            auth_no: json.auth_no
          };
        });
        this.GroupInUserList(getSession);
      })
      .catch((err) => console.error(err));
  }

  AlarmAddGroup() {
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
        groupDatas.map((json) => {
          group.no.push(json.no);
          group.gname.push(json.name);
        });
        this.UpdateGroup(group);
      })
      .catch((err) => console.error(err));
  }

  //해시 검색 (ex) #~~~)
  SearchHash(g_no, keyword) {
    // 해시일 경우 앞에 #을 자른 후 해시 저장
    let hash
    if (keyword[0] == "#") {
    hash = keyword.slice(1);
    this.searchMemoByHash(g_no, hash)
    }
    this.onCallbackKeywordChange(keyword)
  }

  search(g_no) {
    this.bringMemoByGroup(g_no);
  }

  //sidebar에서 선택된 해시
  SidebarHashUpdate(g_no, hash) {
    this.bringMemoByHash(g_no, hash)
  }

  chattingPopup(showChatClick) {
    this.setState({
      showChat: !showChatClick,
      chatalarm_gNo: null,
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
    }).then(()=>{
  if (this.state.groupBySidebar.no != null) {
              this.clientRef.sendMessage(`/app/memo/update/${this.state.groupBySidebar.no}`, JSON.stringify({ update: 'update', userNo: this.Users.no[0] }));
           }
    });

  }

  // 접속한 유저 리스트
  GroupInUserList(getSession) {
    this.setState({
      groupInUserList: getSession
    })
  }

  groupUserList(gNo) {
    if (this.Users != null) {
      if (gNo == null) {
        if (this.tempGno != null) {//disconnect 전송
          this.clientRef.sendMessage(`/app/userlist/disconnect/${this.tempGno}`, this.Users.no[0]);
          this.tempGno = null;
          return;
        }
        return;
      } else {
        if (gNo == this.tempGno) {
          return;
        } else if (gNo != this.tempGno && this.tempGno != null) {
          this.clientRef.sendMessage(`/app/userlist/disconnect/${this.tempGno}`, this.Users.no[0]);
          this.clientRef.sendMessage(`/app/userlist/connect/${gNo}`, this.Users.no[0]);
          this.tempGno = gNo;
        } else {
          this.clientRef.sendMessage(`/app/userlist/connect/${gNo}`, this.Users.no[0]);
          this.tempGno = gNo;
        }
      }
    }
  }

  chatAlarmNotReceive(data) {
    this.setState({
      chatalarm_gNo: data
    })
  }

  alarmReceive(alarm_msg) {
    if (alarm_msg.update != undefined) {
      this.bringMemoByGroup(this.state.groupBySidebar.no);
      this.getHashListByGroup(this.state.groupBySidebar.no);
      return;
    }
    if (alarm_msg.addgroup == undefined && alarm_msg.update == undefined && alarm_msg.gNo == undefined) {
      this.getGroupInUser(this.state.groupBySidebar.no);
      this.getChatListGroup();
      this.getUserListInGroupByUser(this.Users.no[0]);
      this.setState({
        userlistSession: alarm_msg
      })
    }
    this.state.addgroup_alarm = null;
    if (alarm_msg.addgroup == true && alarm_msg.type == true && alarm_msg.readCheck == true) { //그룹초대  
      this.setState({
        addgroup_alarm: {
          message: alarm_msg.chat,
          date: alarm_msg.date,
          group_no: alarm_msg.gNo,
          group_name: alarm_msg.groupName,
          week: alarm_msg.week
        },
        alarm: {
          basic: true,
          chatting: false
        }
      })
      this.notify("그룹초대 알람이 왔습니다.");
    }
    if (alarm_msg.basic != null) { //기본
      this.bringMemoByGroup(this.state.groupBySidebar.no);
      this.setState({
        alarm: {
          basic: alarm_msg.basic,
          chatting: this.state.alarm.chatting
        }
      })
      this.notify("새로운 알람이 왔습니다.");
    }
    if (this.state.chatalarm_gNo != alarm_msg.gNo) {
      if (alarm_msg.chatting != null) {//채팅
        this.getChatListGroup();
        this.getUserListInGroupByUser(this.Users.no[0]);
        this.setState({
          alarm: {
            chatting: alarm_msg.chatting,
            basic: this.state.alarm.basic
          }
        })
      }
    }
    if (alarm_msg.type == true && alarm_msg.readCheck == false) {
      this.setState({
        alarm: {
          basic: false,
          chatting: this.state.alarm.chatting,
        }
      })
    } else if (alarm_msg.type == false && alarm_msg.readCheck == false) {
      this.getChatListGroup();
      this.setState({
        alarm: {
          basic: this.state.alarm.basic,
          chatting: false,
        }
      })
    }
  }

  //toast message
  notify(message) {
    toast(message, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    })
  }

  // container의 어떤부분이든 클릭시 side창이 닫히도록 하는 함수
  onClickContainer() {
    this.setState({
      clickHash: false,
      clickGroup: false,
      clickColor: false
    })
    this.onCloseSidebarBtn()
  }
  // sidebar의 그룹클릭시 side창 열림
  onOpenGroup() {
    this.setState({
      clickGroup: !this.state.clickGroup,
      clickHash: false,
      clickColor: false
    })
    if(!this.state.clickGroup){
      this.setState({
        classMenuIndi: "menu-item",
        classMenuGroup: "menu-item-click",
        classMenuHash: "menu-item",
        classMenuColor: "menu-item",
        classMenuColorSelect: "menu-item",
      })
    }
    else {
      this.onCloseSidebarBtn()
    }
  }
  // hash의 그룹클릭시 side창 열림
  onOpenHash() {
    this.setState({
      clickHash: !this.state.clickHash,
      clickGroup: false,
      clickColor: false
    })
    if(!this.state.clickHash){
      this.setState({
        classMenuIndi: "menu-item",
        classMenuGroup: "menu-item",
        classMenuHash: "menu-item-click",
        classMenuColor: "menu-item",
        classMenuColorSelect: "menu-item",
      })
    }
    else {
      this.onCloseSidebarBtn()
    }
  }
  onOpenColor() {
    this.setState({
      clickColor: !this.state.clickColor,
      clickGroup: false,
      clickHash: false,
    })
    if(!this.state.clickColor){
      this.setState({
        classMenuIndi: "menu-item",
        classMenuGroup: "menu-item",
        classMenuHash: "menu-item",
        classMenuColor: "menu-item-click",
      })
    }
    else {
      this.onCloseSidebarBtn()
    }
  }
  // sidebar 어떤것이든 클릭 시 side창 닫힘
  onCloseGroupAndHash() {
    this.setState({
      clickGroup: false,
      clickHash: false,
      clickColor: false
    })
    this.onCloseSidebarBtn()
  }
  onCloseSidebarBtn() {
    this.setState({
      classMenuIndi: "menu-item",
      classMenuGroup: "menu-item",
      classMenuHash: "menu-item",
      classMenuColor: "menu-item",
      classMenuColorSelect: "menu-item",
    })
  }

  render() {
    const wsSourceUrl = "./api/alarm";
    return (
      <div className="container">
        {this.Users != undefined ? (
          <SockJsClient
            url={wsSourceUrl}
            topics={[`/api/alarm/${this.Users.no[0]}`]}
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
          // container의 어떤부분이든 클릭시 side창이 닫히도록 하는 함수
          onClickContainer={this.onClickContainer.bind(this)}
          // header의 사진이 실시간으로 바뀌도록 설정
          getProfileAjax={this.getProfileAjax.bind(this)}
          notify={this.notify.bind(this)}
          //profile정보
          getProfileValue={this.state.getProfileValue}
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
          groupInUserList={this.state.groupInUserList}
          // 프로필을 업데이트할때 바뀌는 함수
          profileUpdate={this.profileUpdate.bind(this)}
        />
        <div className="body">
          <Sidebar
            HashToSidebar={this.state.HashToSidebar}
            onCloseGroupAndHash={this.onCloseGroupAndHash.bind(this)}
            onOpenGroup={this.onOpenGroup.bind(this)}
            onOpenHash={this.onOpenHash.bind(this)}
            onOpenColor={this.onOpenColor.bind(this)}
            clickGroup={this.state.clickGroup}
            clickHash={this.state.clickHash}
            clickColor={this.state.clickColor}
            distinctColor={this.state.distinctColor}
            UpdateSearchColor={this.UpdateSearchColor.bind(this)}
            SearchColordelete={this.SearchColordelete.bind(this)}
            searchColor={this.state.searchColor}
            classMenuIndi={this.state.classMenuIndi}
            classMenuGroup={this.state.classMenuGroup}
            classMenuHash={this.state.classMenuHash}
            classMenuColor={this.state.classMenuColor}
            classMenuColorSelect={this.state.classMenuColorSelect}
            users={this.Users}
            hash={this.state.distinctGroup_hash}
            group={this.state.group}
            SidebarGroupUpdate={this.SidebarGroupUpdate.bind(this)}
            SidebarHashUpdate={this.SidebarHashUpdate.bind(this)}
            onCallbackKeywordChange={this.onCallbackKeywordChange.bind(this)}
          />
          <Contents
            // container의 어떤부분이든 클릭시 side창이 닫히도록 하는 함수
            onClickContainer={this.onClickContainer.bind(this)}
            userlistSession={this.state.userlistSession}
            getGroupInUser={this.getGroupInUser.bind(this)}
            notify={this.notify.bind(this)}
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
            chatkeyword={this.state.chatkeyword}
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
            groupInUserList={this.state.groupInUserList}
            chatListGroup={this.state.chatListGroup}
            userListInGroupByUser={this.state.userListInGroupByUser}
            chatAlarmNotReceive={this.chatAlarmNotReceive.bind(this)}
            getChatListGroup={this.getChatListGroup.bind(this)}
            getUserListInGroupByUser={this.getUserListInGroupByUser.bind(this)}
            onCallbackChattingKeywordChange={this.onCallbackChattingKeywordChange.bind(this)}
          />
        </div>
        <ToastContainer
          position="bottom-right"
          // autoClose={100000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
          transition={Slide}
        />
      </div>
    );
  }
}