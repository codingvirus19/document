import React, { Fragment } from "react";
import Dropdown from "react-bootstrap/Dropdown";

import Serach from "./Serach";
import Logo from "./Logo";
import Popup2 from "../Popup2";
import CreateEditor from "./headerMemu/CreateEditor";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faUser,
  faBell,
  faSms,
} from "@fortawesome/free-solid-svg-icons";

import dropdownstyles from "./Dropdown.css";
import styles from "./Header.css";

const API_URL = "http://localhost:8080/codingvirus19";
const API_HEADERS = {
  "Content-Type": "application/json",
};

export default class Header extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      showPopup: false,
      showProfile: false,
      _getProfileValue: null,
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
    // this.getProfileAjax();
  }

  // getProfileAjax
  componentDidMount() {
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

  setRedirect() {
    window.location = "http://localhost:8080/codingvirus19/logout";
  }

  chattingClick() {
    this.setState({
      showChat: !this.state.showChat,
    });
    this.props.chattingPopup(this.state.showChat)
  }

  alarmClick(){
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
    return (
      <div className={styles.header}>
        <div className={styles.wrapper}>
          <Logo />
          <Serach
            groupBySidebar={this.props.groupBySidebar}
            SidebarGroupUpdate={this.props.SidebarGroupUpdate}
            // search 검색 콜백함수
            onCallbackKeywordChange={this.props.onCallbackKeywordChange}
            // 검색창에 입력한 keyword
            keyword={this.props.keyword}
          />
          <div className={styles.right_header}>
            <div className={styles.addmemo}>
              <button onClick={this.togglePopup.bind(this)}>
                <FontAwesomeIcon className={styles.faPlus} icon={faPlus} />
              </button>
              {this.state.showPopup ? (
                <CreateEditor
                  users = {this.props.users}
                  bringMemoByGroup={this.props.bringMemoByGroup}
                  groupNoForGroupUser={this.props.groupBySidebar}
                  closePopup={this.togglePopup.bind(this)}
                  clientRef={this.props.clientRef}
                />
              ) : null}
            </div>

            <Dropdown className={styles.account}>
              <Dropdown.Toggle>
                <FontAwesomeIcon className={styles.faUser} icon={faUser} />
              </Dropdown.Toggle>
              <Dropdown.Menu className={dropdownstyles.menu}>
                <Dropdown.Item onClick={this.toggleShowProfile.bind(this)}>
                  개인프로필 수정
                </Dropdown.Item>
                <Dropdown.Item onClick={this.setRedirect.bind(this)}>
                  로그아웃
                </Dropdown.Item>
              </Dropdown.Menu>
              {this.state.showProfile ? (
                <Popup2
                  getProfileValue={this.state.getProfileValue}
                  inner_header="프로필정보"
                  contents={"profile"}
                  closePopup={this.toggleShowProfile.bind(this)}
                />
              ) : null}
            </Dropdown>

            <Dropdown className={styles.userbell}>
              <Dropdown.Toggle onClick={this.alarmClick.bind(this)} >
                {(this.props.alarm.type == true && this.props.alarm.readcheck == true) ? <span className={styles.alarmbell}/> : null }  
                <FontAwesomeIcon className={styles.faBell} icon={faBell} />
              </Dropdown.Toggle>
            </Dropdown>

            <div>
              <button onClick={this.chattingClick.bind(this)}>
              {(this.props.alarm.type == false && this.props.alarm.readcheck == true) ?  <span className={styles.alarmbell}/> : null } 
                <FontAwesomeIcon className={styles.faSms} icon={faSms} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
