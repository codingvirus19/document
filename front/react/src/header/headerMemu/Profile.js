import React from "react";

import popupStyles from "../../Popup2.css";

export default class Profile extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      id: this.props.getProfileValue.id,
      email: this.props.getProfileValue.email,
      password: this.props.getProfileValue.password,
      nickname: this.props.getProfileValue.nickname,
      // password:this.props.getProfileValue.password,
    };
  }

  onChangeid(e) {
    this.setState({
      id: e.target.value,
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
  onChangeNickname(e) {
    this.setState({
      nickname: e.target.value,
    });
  }

  render() {
    // console.log(this.props.getProfileValue.map((value) => value.no));
    return (
      <>
        <input
          className={popupStyles.input}
          type="text"
          placeholder="아이디"
          value={this.state.id}
          onChange={this.onChangeid.bind(this)}
          disabled
          name="id"
          id="id"
        ></input>
        <input
          className={popupStyles.input}
          type="email"
          placeholder="이메일"
          value={this.state.email}
          onChange={this.onChangeEmail.bind(this)}
          disabled
          name="email"
          id="email"
        ></input>
        <input
          className={popupStyles.input}
          type="password"
          placeholder="비밀번호"
          value={this.state.password}
          onChange={this.onChangePassword.bind(this)}
          name="password1"
          id="password1"
        ></input>
        <input
          className={popupStyles.input}
          type="password"
          placeholder="비밀번호 확인"
          value={this.props.getProfileValue.password}
          name="password2"
          id="password2"
        ></input>
        <input
          className={popupStyles.input}
          type="text"
          placeholder="닉네임"
          value={this.state.nickname}
          onChange={this.onChangeNickname.bind(this)}
          name="nickname"
          id="nickname"
        ></input>
      </>
    );
  }
}
