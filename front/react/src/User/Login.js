import React from "react";
import Join from "./Join";

const API_URL = "http://localhost:8080/codingvirus19";
const API_HEADERS = {
  "Content-Type": "application/json",
};
export default class login extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      id: "",
      password: "",
      result: false,
      showPopup: false,
    };
  }

  IdChange(e) {
    this.setState({
      id: e.target.value,
    });
  }

  PassWordChange(e) {
    this.setState({
      password: e.target.value,
    });
  }

  Login() {
    let input_date = {
      id: this.state.id,
      password: this.state.password,
    };
    console.log(input_date);
    // call api
    fetch(`${API_URL}/api/login`, {
      method: "post",
      headers: API_HEADERS,
      body: JSON.stringify(input_date),
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          result: json.data,
        });
      })
      .catch((err) => console.error(err));
  }

  joinPopup() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
    console.log(this.state.showPopup);
  }

  render() {
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

              <div
                // type="submit"
                // className="btn btn-primary btn-block"
                onClick={this.Login.bind(this)}
              >
                로그인
              </div>
            </form>
            <div className="forgot-password text-right">
              아이디가 없으신가요?
              <button onClick={this.joinPopup.bind(this)}>회원가입하기</button>
              {this.state.showPopup ? (
                <Join closePopup={this.joinPopup.bind(this)} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
