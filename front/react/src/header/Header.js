import React from "react";

import Serach from "./Serach";
import Logo from "./Logo";
import Account from "./headerMemu/Account";
import AddMemo from "./headerMemu/AddMemo";
import Userbell from "./headerMemu/Userbell";
import Chatting from "../contents/chatting/chat.js";

import styles from "./Header.css";

export default class Header extends React.Component {

  render() {
    return (
      <div className={styles.header}>
        <div className={styles.wrapper}>
          <Logo />
          <Serach />
          <div className={styles.right_header}>
            <AddMemo />
            <Account />
            <Userbell />
            <Chatting group={this.props.group} />
          </div>
        </div>
      </div>
    );
  }
}
