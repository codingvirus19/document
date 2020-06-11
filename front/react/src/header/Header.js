import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Serach from "./Serach";
import Logo from "./Logo";
import Popup2 from "../Popup2";
import CreateEditor from "./headerMemu/CreateEditor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus,  faBell, faSms, } from "@fortawesome/free-solid-svg-icons";
import dropdownstyles from "./Dropdown.css";
import styles from "./Header.css";

const API_URL = ".";
const API_HEADERS = {
  "Content-Type": "application/json",
};

export default class Header extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      showPopup: false,
      showProfile: false,
      showChat: false,
      redirect: false,
      showAlarm: false,
      alarm: this.props.alarm,
      ClickGetProfileValue : null,
    };
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }

  toggleShowProfile() {
    this.onClickProfileAjax();
  }

  onClickProfileAjax() {
    fetch(`${API_URL}/api/profile`, {
      method: "post",
      headers: API_HEADERS,
    })
      .then((response) => response.json())
      .then((json) => {
        let _ClickGetProfileValue = json.data;
        this.setState({
          ClickGetProfileValue: _ClickGetProfileValue,
          // 버튼 클릭시 false가 true가 되면서 profile popup이 뜬다.
          showProfile: !this.state.showProfile,
        });
      })
      .catch((err) => console.error(err));
  }

  setRedirect() {
    window.location = "./logout";
  }

  chattingClick() {
    this.setState({
      showChat: !this.state.showChat,
    });
    this.props.chattingPopup(this.state.showChat)
  }

  alarmClick() {
    this.props.clientRef.sendMessage("/app/alarm/" + this.props.users.no[0], JSON.stringify({
      type: true,
      readCheck: false
    }))
    this.setState({
      showAlarm: !this.state.showAlarm,
    });
    this.props.AlarmPopup(this.state.showAlarm)
  }

  render() {
    if(this.props.getProfileValue ==null){
      return null;
    }
    return (
      <div className={styles.header}>
        <div className={styles.wrapper}>

          <div className={styles.logo}>
            <Logo />
          </div>

          <Serach
            groupBySidebar={this.props.groupBySidebar}
            SidebarGroupUpdate={this.props.SidebarGroupUpdate}
            // search 검색 콜백함수
            onCallbackKeywordChange={this.props.onCallbackKeywordChange}
            // 검색창에 입력한 keyword
            SearchHash={this.props.SearchHash}
            keyword={this.props.keyword}
          />

          <div className={styles.right_header}>
            <div>
              <button aria-label="메모 추가"
                className={styles.addmemo}
                onClick={this.togglePopup.bind(this)}>
                <FontAwesomeIcon className={styles.faPlus} icon={faPlus} />
              </button>
              {this.state.showPopup ? (
                <CreateEditor
                  users={this.props.users}
                  bringMemoByGroup={this.props.bringMemoByGroup}
                  groupNoForGroupUser={this.props.groupBySidebar}
                  closePopup={this.togglePopup.bind(this)}
                  clientRef={this.props.clientRef}
                />
              ) : null}
            </div>
              <Dropdown aria-label="계정" className={styles.account}>
                <Dropdown.Toggle className={styles.user}>
                {/* <FontAwesomeIcon className={styles.faUser} icon={faUser} /> */}
                  <img className={styles.imageIcon} src={"."+this.props.getProfileValue.image} />
                </Dropdown.Toggle>
                <Dropdown.Menu className={dropdownstyles.menu}>  
                  <Dropdown.Item onClick={this.toggleShowProfile.bind(this)} className={dropdownstyles.item}>
                    개인프로필 수정
                </Dropdown.Item>
                <Dropdown.Item onClick={this.setRedirect.bind(this)} className={dropdownstyles.item2}>
                  로그아웃
                </Dropdown.Item>
                </Dropdown.Menu>
                {this.state.showProfile == true && this.state.ClickGetProfileValue != null ? (
                  <Popup2
                    getProfileAjax={this.props.getProfileAjax}
                    getGroup={this.props.getGroup}
                    notify={this.props.notify}
                    ClickGetProfileValue={this.state.ClickGetProfileValue}
                    inner_header="프로필정보"
                    contents={"profile"}
                    closePopup={this.toggleShowProfile.bind(this)}
                    clientRef={this.props.clientRef}
                  />
                ) : null}
              </Dropdown>

            <Dropdown>
              <Dropdown.Toggle aria-label="알람" onClick={this.alarmClick.bind(this)} className={(this.state.showAlarm)?`${styles.userbellClick} ${styles.userbell}`:styles.userbell}  >
                {(this.props.alarm.basic) ? <span className={styles.alarmbell}/> : null }  
                <FontAwesomeIcon className={styles.faBell} icon={faBell} />
              </Dropdown.Toggle>
            </Dropdown>

            <div>
              <button aria-label="채팅" className={(this.state.showChat)?`${styles.chat} ${styles.chatClick}`:styles.chat}  onClick={this.chattingClick.bind(this) }>
              {(this.props.alarm.chatting) ? <span className={styles.alarmbell}/> : null } 
                <FontAwesomeIcon className={styles.faSms} icon={faSms} />
              </button>
            
            </div>
          </div>
        </div>
      </div>
    );
  }
}
