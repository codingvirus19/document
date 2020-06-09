import React from "react";

import popupStyles from "../../Popup2.css";
import FileUpload from "../../contents/FileUpload.js"
import styles from "../../contents/FileUpLoad.css"

export default class Profile extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      id: this.props.getProfileValue.id,
      email: this.props.getProfileValue.email,
      password: this.props.getProfileValue.password,
      nickname: this.props.getProfileValue.nickname,
      image: this.props.getProfileValue.image,
      value: "",
      cursor: "",
    };
    this.image = null;
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

  // FileUpload에서 이미지를 새로 올릴 때 해당이미지의 
  //이름을 변환시키고 setState에 설정해준다.
  FileUpload(e) {
    console.log("프로파일 실행")
    const formData = new FormData();
    formData.append("multipartFile", e.currentTarget.files[0]);
    fetch("http://localhost:8080/codingvirus19/api/upload", {
      method: "post",
      headers: { append: "application/json" },
      body: formData,
    })
      .then((response) => response.json())
      .then((json) => {
        // this.image: 이름이 바뀐 image의 값이 나온다.
        this.image = json.data;
        this.setState({ image: json.data });
      })
      .catch((err) => console.error(err));
  }
  
  render() {
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

        <p>이미지:</p>
        <FileUpload 
          className={popupStyles.input} 
          Value={this.state.image} 
          File={e => this.FileUpload(e)} 
          image={this.state.image} 
          />  

      </>
    );
  }
}
