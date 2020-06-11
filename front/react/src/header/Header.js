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

export default class Header extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      showPopup: false,
      showProfile: false,
      showChat: false,
      redirect: false,
      showAlarm: false,
      alarm: this.props.alarm
    };
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }

  toggleShowProfile() {
    this.setState({
      showProfile: !this.state.showProfile,
    });
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
    if(!this.props.getProfileValue){
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
                {this.state.showProfile ? (
                  <Popup2
                  notify={this.props.notify}
                    getProfileValue={this.props.getProfileValue}
                    inner_header="프로필정보"
                    contents={"profile"}
                    closePopup={this.toggleShowProfile.bind(this)}
                    clientRef={this.props.clientRef}
                  />
                ) : null}
              </Dropdown>

            <Dropdown className={styles.userbell}>
              <Dropdown.Toggle aria-label="알람" onClick={this.alarmClick.bind(this)} >
                {(this.props.alarm.basic) ? <span className={styles.alarmbell}/> : null }  
                <FontAwesomeIcon className={styles.faBell} icon={faBell} />
              </Dropdown.Toggle>
            </Dropdown>

            <div>
              <button aria-label="채팅" className={styles.chat} onClick={this.chattingClick.bind(this) }>
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
