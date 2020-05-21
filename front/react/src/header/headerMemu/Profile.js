import React from "react";

import popupStyles from "../../Popup2.css";

export default class Profile extends React.Component {
  render() {
    return (
      <>
        <input
          className={popupStyles.input}
          type="text"
          placeholder="아이디"
          name="id"
          id="id"
        ></input>
        <input
          className={popupStyles.input}
          type="password"
          placeholder="비밀번호"
          name="password1"
          id="password1"
        ></input>
        <input
          className={popupStyles.input}
          type="password"
          placeholder="비밀번호 확인"
          name="password2"
          id="password2"
        ></input>
        <input
          className={popupStyles.input}
          type="text"
          placeholder="닉네임"
          name="nickname"
          id="nickname"
        ></input>
        <input
          className={popupStyles.input}
          type="email"
          placeholder="이메일"
          name="email"
          id="email"
        ></input>
      </>
    );
  }
}