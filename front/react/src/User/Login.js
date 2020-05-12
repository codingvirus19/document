import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import ApiService from "../ApiService";

function Login({ authenticated, login, location }) {
  function onChangeId(e) {
    setId(e.target.value);
  }

  useEffect(() => {
    ApiService.fetchLogin().catch((err) => {
      console.log("error", err);
    });
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => {
    try {
      login({ email, password });
    } catch (e) {
      alert("아이디나 비밀번호가 틀립니다");
      setEmail("");
      setPassword("");
    }
  };

  const { from } = location.state || { from: { pathname: "/main" } };
  if (authenticated) return <Redirect to={from} />;

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
                value={email}
                onChange={
                  (onChangeId, ({ target: { value } }) => setEmail(value))
                }
                type="text"
                placeholder="아이디/이메일"
              />
            </div>

            <div className="form-group">
              <label>비밀번호</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={({ target: { value } }) => setPassword(value)}
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
                <label className="custom-control-label" htmlFor="customCheck1">
                  아이디 저장하기
                </label>
              </div>
            </div>

            <button
              type="submit"
              onClick={handleClick}
              className="btn btn-primary btn-block"
            >
              로그인
            </button>
            <p className="forgot-password text-right">
              아이디가 없으신가요?<a href="/join"> 회원가입하기</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login;
