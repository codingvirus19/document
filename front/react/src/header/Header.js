import React from "react";
import Userbell from "./userbell";
import HeaderProfile from "./headerprofile";
import HeaderAddMemo from "./headeraddmemo";
import Serach from "./Serach";
import Chatting from "../contents/chatting/chat.js";

export default class header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="header_wrapper">
          <div className="logo-header">
            <div className="logo-title_container">
              <img
                className="logo"
                src="http://localhost:8090/images/logo.png"
              />
              <p className="logo-header-title">ShareEditor.Md</p>
            </div>
          </div>
          <Serach />

          <div className="right-header">
            <HeaderAddMemo />
            <HeaderProfile />
            <Userbell />
            <Chatting />
          </div>
        </div>
      </div>
    );
  }
}
