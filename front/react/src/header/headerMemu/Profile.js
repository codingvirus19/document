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
      image: this.props.getProfileValue.image,
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
  onChangeImage(e) {
    this.setState({
      image: e.target.value,
    });
  }

  render() {
    console.log(this.props.getProfileValue)
    return (
      <>
        {this.props.callBackFromProfile(
          this.state.id,
          this.state.email,
          this.state.password,
          this.state.nickname,
          this.state.image
        )}
        <p>아이디</p>
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
        <p>이메일</p>
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
        <p>비밀번호</p>
        <input
          className={popupStyles.input}
          type="password"
          placeholder="비밀번호"
          value={this.state.password}
          onChange={this.onChangePassword.bind(this)}
          name="password1"
          id="password1"
        ></input>
        <p>닉네임</p>
        <input
          className={popupStyles.input}
          type="text"
          placeholder="닉네임"
          value={this.state.nickname}
          onChange={this.onChangeNickname.bind(this)}
          name="nickname"
          id="nickname"
        ></input>
        <p>이미지</p>
        <input
          className={popupStyles.input}
          type="text"
          placeholder="이미지"
          value={this.state.image}
          onChange={this.onChangeImage.bind(this)}
          name="image"
          id="image"
        ></input>
      </>
    );
  }
}
