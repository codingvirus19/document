import React from "react";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import styles from './Login.css';

const API_URL = "http://localhost:8080/codingvirus19";
const API_HEADERS = {
  accept: "application/json",
};
const API_HEADERS2 = {
  "Content-Type": "application/json",
};

export default class login extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      loginFail: "",
      username: "",
      password: "",
      result: false,
      showJoin: false,
      nickname: '',
      id: '',
      email: '',
      JoinPassword: '',
      Error: false,
      Errormessage: ""  //비밀번호불일치, id중복, email중복
    };
  }


  Login() {
    const formData = new FormData();
    formData.append("username", this.state.username);
    formData.append("password", this.state.password);
    try {
      fetch(`${API_URL}/user/auth`, {
        method: "post",
        headers: API_HEADERS,
        body: formData,
      })
        .then((response) => response.json())
        .then((response) => {
          this.setState({
            result: response.result,
            loginFail: response.result
          })
        })
        .catch((err) => console.error(err));
    }
    catch (e) {
      console.log(e + "실패")
    }
  }


  /* 05.14 수정 건들지말 것!! */
  ViewChange() {
    this.setState({
      showJoin: !this.state.showJoin,
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      loginFail: ""
    });
  }
  loginFail() {
    if (this.state.loginFail == "fail") {
      return (
        <h2 className={styles.active}>아이디와 비밀번호를 확인해주세요 </h2>
      )
    }
  }

  handleChangePasswordCheck(e) {
    this.setState({
      Error: this.state.JoinPassword !== e.target.value,
      Errormessage: "비밀번호 불일치"
    })
  }
  Errormessage() {
    if (this.state.Error) {
      return (
        <h5> {this.state.Errormessage} </h5>
      );
    }
  }
  Join(e) {
    e.preventDefault();
    let joinData = {
      nickname: this.state.nickname,
      id: this.state.id,
      email: this.state.email,
      password: this.state.JoinPassword
    };
    fetch(`${API_URL}/api/join`, {
      method: "post",
      headers: API_HEADERS2,
      body: JSON.stringify(joinData)
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if(response.result=="fail" && (response.message=="id중복" || response.message=="email중복")) {
          this.setState({
            Error: true,
            Errormessage: response.message
          })
        }
      })
      .catch((err) => console.error(err));
  }



  View() {

    if (this.state.showJoin) {//회원가입
      return (
        <div className={styles.formContent}>
          <h2 className={`${styles.inactive} ${styles.underlineHover}`} onClick={this.ViewChange.bind(this)}> Sign In </h2>
          <h2 className={styles.active}>Sign Up </h2>
          <div className={`${styles.fadeIn} ${styles.first}`}>
            {/* <img src="http://danielzawadzki.com/codepen/01/icon.svg" id="icon" alt="User Icon" /> */}
          </div>

          <form>
            <input type="text" className={`${styles.fadeIn} `} value={this.state.nickname} onChange={this.handleChange.bind(this)} name="nickname" placeholder="nickname" />
            <input type="text" className={`${styles.fadeIn}`} value={this.state.id} onChange={this.handleChange.bind(this)} name="id" placeholder="ID" />
            <input type="text" className={`${styles.fadeIn}`} value={this.state.email} onChange={this.handleChange.bind(this)} name="email" placeholder="Email" />
            <input type="password" className={`${styles.fadeIn}`} value={this.state.JoinPassword}
              onChange={this.handleChange.bind(this)} name="JoinPassword" placeholder="Password" />
            <input type="password" className={`${styles.fadeIn}`}
              onChange={this.handleChangePasswordCheck.bind(this)} name="JoinPassword2" placeholder="Password confirm" />
            <br />
            {this.Errormessage()}
            <br />
            <input type="submit" className={`${styles.fadeIn}`} value="Join" onClick={this.Join.bind(this)} />
          </form>

          <div className={styles.formFooter}>
          </div>

        </div>)
    } else {
      return (<div className={styles.formContent}>
        <h2 className={styles.active} > Sign In </h2>
        <h2 className={`${styles.inactive} ${styles.underlineHover}`} onClick={this.ViewChange.bind(this)} >Sign Up </h2>
        <div className={`${styles.fadeIn} ${styles.first}`}>
          {/* <img src="http://danielzawadzki.com/codepen/01/icon.svg" id="icon" alt="User Icon" /> */}
        </div>
        {/* <form> */}
        <input type="text" id="login" className={`${styles.fadeIn}`} name="username" value={this.state.username} onChange={this.handleChange.bind(this)} placeholder="id" ></input>
        <input type="password" id="password" className={`${styles.fadeIn}`} name="password" value={this.state.password} onChange={this.handleChange.bind(this)} placeholder="password" />
        <input type="submit" className={`${styles.fadeIn}`} value="Log In" onClick={this.Login.bind(this)} />
        {/* </form> */}

        <div className={styles.formFooter}>
          {this.loginFail()}
          {/* <a className={styles.underlineHover} href="#">Forgot Password?</a> */}
        </div>

      </div>)
    }

  }
  /* 05.14 수정 건들지말 것!! */

  render() {
    if (this.state.result === "success") {
      console.log("성공");
      return (
        <Redirect to="./main" />
      );
    } else if (this.state.result === "fail") {
      console.log("실패");

    }
    return (
      <div className={`${styles.wrapper} ${styles.fadeInDown}`}>
        {this.View()}
      </div>

    );
  }
}
