import React from "react";
import Join from "./Join";
import Container from "../Container";
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import Router1 from "../Router1";

const API_URL = "http://localhost:8080/codingvirus19";
const API_HEADERS = {
  "accept": "application/json"
};
export default class login extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      email: "",
      password: "",
      result: false,
      showPopup: false,
    };
  }

  IdChange(e) {
    this.setState({
      email: e.target.value,
    });
  }

  PassWordChange(e) {
    this.setState({
      password: e.target.value,
    });
  }

  Login() {
    const formData = new FormData();
    formData.append("email", this.state.email);
    formData.append("password", this.state.password);
    fetch(`${API_URL}/user/auth`, {
      method: "post",
      headers: API_HEADERS,
      body: formData,
    })
      .then((response) => response.json())
      .then(response => {
        if (response.result == "success") { this.setState({ result: true }) }
      })
      .catch((err) => console.error(err));
  }

  /* 05.14 수정 건들지말 것!! */
  joinPopup() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }
  /* 05.14 수정 건들지말 것!! */

  render() {
    console.log(this.state.result);
    if (this.state.result === true) {
      return (
        <Redirect to="main" />
      );
    }
    return (
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <form>
              <h3>로그인</h3>

              <div className="form-group">
                <label>아이디/이메일</label>
                <input
                  type="email"
                  className="form-control"
                  value={this.state.id}
                  onChange={this.IdChange.bind(this)}
                  type="text"
                  placeholder="아이디/이메일"
                />
              </div>

              <div className="form-group">
                <label>비밀번호</label>
                <input
                  type="password"
                  className="form-control"
                  value={this.state.password}
                  onChange={this.PassWordChange.bind(this)}
                  type="password"
                  placeholder="비밀번호"
                />
              </div>

              <div className="form-group">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customCheck1"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customCheck1"
                  >
                    아이디 저장하기
                  </label>
                </div>
              </div>
            </form>
            {/* 05.14 수정 건들지말 것!! */}
            <div>
              <div onClick={this.Login.bind(this)}> 로그인</div>
            </div>
            <div className="forgot-password text-right">
              아이디가 없으신가요?
              <button onClick={this.joinPopup.bind(this)}>회원가입하기</button>
              {this.state.showPopup ? (
                <Join closePopup={this.joinPopup.bind(this)} />
              ) : null}
            </div>
            {/* 05.14 수정 */}
          </div>
        </div>
      </div>
    );
  }
}
