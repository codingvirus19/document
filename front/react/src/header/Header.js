import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

import Serach from "./Serach";
import Logo from "./Logo";
import Popup2 from "../Popup2";
import Popup from "./headerMemu/Popup";
import Chatting from "../contents/chatting/chat.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faUser, faBell } from '@fortawesome/free-solid-svg-icons'

import dropdownstyles from "./Dropdown.css";
import styles from "./Header.css";

export default class Header extends React.Component {

  constructor() {
    super();
    this.state = {
      showPopup: false,
      showProfile: false
    };
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }
  toggleShowProfile() {
    this.setState({
      showProfile: !this.state.showProfile
    });
  }

  render() {
    return (
      <div className={styles.header}>
        <div className={styles.wrapper}>
          <Logo />
          <Serach />
          <div className={styles.right_header}>

            <div className={styles.addmemo}>
              <button
                onClick={this.togglePopup.bind(this)}>
                <FontAwesomeIcon className={styles.faPlus} icon={faPlus} />
              </button>
              {this.state.showPopup ? (
                <Popup closePopup={this.togglePopup.bind(this)} />
              ) : null}
            </div>

            <Dropdown className={styles.account}>
              <Dropdown.Toggle>
                <FontAwesomeIcon className={styles.faUser} icon={faUser} />
              </Dropdown.Toggle>
              <Dropdown.Menu className={dropdownstyles.menu}>
                <Dropdown.Item
                  onClick={this.toggleShowProfile.bind(this)}>
                  개인프로필 수정
          </Dropdown.Item>
                <Dropdown.Item>로그아웃</Dropdown.Item>
              </Dropdown.Menu>
              {this.state.showProfile ? (
                <Popup2
                  inner_header="프로필정보"
                  contents={'profile'}
                  closePopup={this.toggleShowProfile.bind(this)} />
              ) : null}
            </Dropdown>

            <Dropdown className={styles.userbell}>
              <Dropdown.Toggle>
                <FontAwesomeIcon className={styles.faBell} icon={faBell} />
              </Dropdown.Toggle>
              <Dropdown.Menu className={dropdownstyles.menu}>
                <Dropdown.Item>알림1</Dropdown.Item>
                <Dropdown.Item>알림2</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Chatting />
          </div>
        </div>
      </div>
    );
  }
}
