import React from "react";
import Join from "./Join";
import Container from "../Container";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";
import Router1 from "../Router1";
import styles from './Login.css';

const API_URL = "http://localhost:8080/codingvirus19";
const API_HEADERS = {
  accept: "application/json",
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
      Email: '',
      JoinPassword: '',
      JoinPassword2: '',
      ID: ''
    };
  }


  Login() {
    const formData = new FormData();
    formData.append("username", this.state.username);
    formData.append("password", this.state.password);
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


  /* 05.14 수정 건들지말 것!! */
  ViewChange() {
    this.setState({
      showJoin: !this.state.showJoin,
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      loginFail:""
    });
  }
  loginFail() {
    if (this.state.loginFail == "fail") {
      return (
          <h2 className={styles.active}>아이디와 비밀번호를 확인해주세요 </h2>
      )
    }
  }

  View() {

    if (this.state.showJoin) {
      return (
        <div className={styles.formContent}>
          <h2 className={`${styles.inactive} ${styles.underlineHover}`} onClick={this.ViewChange.bind(this)}> Sign In </h2>
          <h2 className={styles.active}>Sign Up </h2>
          <div className={`${styles.fadeIn} ${styles.first}`}>
            {/* <img src="http://danielzawadzki.com/codepen/01/icon.svg" id="icon" alt="User Icon" /> */}
          </div>

          {/* <form> */}
          <form method="post" action="/">
            <input type="text" className={`${styles.fadeIn} `} value={this.state.nickname} onChange={this.handleChange.bind(this)} name="nickname" placeholder="nickname" />
            <input type="text" className={`${styles.fadeIn} ${styles.second}`} value={this.state.ID} onChange={this.handleChange.bind(this)} name="ID" placeholder="ID" />
            <input type="text" className={`${styles.fadeIn} ${styles.third}`} value={this.state.Email} onChange={this.handleChange.bind(this)} name="Email" placeholder="Email" />
            <input type="text" className={`${styles.fadeIn} ${styles.third}`} value={this.state.JoinPassword} onChange={this.handleChange.bind(this)} name="JoinPassword" placeholder="Password" />
            <input type="text" className={`${styles.fadeIn} ${styles.fourth}`} value={this.state.JoinPassword2} onChange={this.handleChange.bind(this)} name="JoinPassword2" placeholder="Password" />
            <input type="submit" className={`${styles.fadeIn} ${styles.fourth}`} value="Join" onClick={(e) => e.preventDefault()} />
          </form>
          {/* </form> */}

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
        <input type="text" id="login" className={`${styles.fadeIn} ${styles.second}`} name="username" value={this.state.username} onChange={this.handleChange.bind(this)} placeholder="login" ></input>
        <input type="password" id="password" className={`${styles.fadeIn} ${styles.third}`} name="password" value={this.state.password} onChange={this.handleChange.bind(this)} placeholder="password" />
        <input type="submit" className={`${styles.fadeIn} ${styles.fourth}`} value="Log In" onClick={this.Login.bind(this)} />
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
