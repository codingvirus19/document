import React from "react";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import Logo from "../header/Logo.js"
import JoinSuccess from "./JoinSucess.js"
import styles from './Login.css';

const API_URL = ".";
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
      nickname: "",
      id: "",
      email: "",
      JoinPassword: "",
      JoinPassword2: "",
      Error: false,
      Errormessage: "",  //비밀번호불일치, id중복, email중복
      JoinSuccess: false
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
    this.handleChange(e)
    this.UpdateError(this.state.JoinPassword !== e.target.value, "패스워드가 일치하지 않습니다")
    // 비밀번호 일치시 박스색 다르게 className줘서
  }

  UpdateError(Error, Errormessage) {
    this.setState({
      Error: Error,
      Errormessage: Errormessage,
    })
  }

  Errormessage() {
    if (this.state.Error) {
      return (
        <h5 className={styles.active}> {this.state.Errormessage} </h5>
      );
    }
  }

  chkEmail(str) {
    var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    return regExp.test(str) ? true : false;
  };

  Join(e) {
    e.preventDefault();
    //빈값 확인
    if(this.state.id === "") {
      this.UpdateError(true, "id를 입력해 주세요")
    }
    else if(this.state.nickname === "") {
      this.UpdateError(true, "닉네임을 입력해 주세요")
    }
    //닉네임 8자 미만 제한
    else if(this.state.nickname > 8){
      this.UpdateError(true, "닉네임은 8자 미만으로 해주십시오");
      this.setState({
        nickname: ""
      })
    } 
    else if(this.state.email === "") {
      this.UpdateError(true, "이메일을 입력해 주세요")
    }
    //이메일 확인
    else if (!this.chkEmail(this.state.email)) {
      this.UpdateError(true, "이메일 형식이 유효하지 않습니다.");
      this.setState({
        email: ""
      })
    } 
    else if(this.state.JoinPassword === "") {
      this.UpdateError(true, "비밀번호를 입력해 주세요")
    }
    else if(this.state.JoinPassword2 === "") {
      this.UpdateError(true, "비밀번호를 확인해 주세요")
    }
    else if(this.state.Error && this.state.Errormessage === "패스워드가 일치하지 않습니다"){
      return;
    }
    else {
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
          if (response.result == "fail" && (response.message == "id중복" || response.message == "email중복")) {
            this.UpdateError(true, response.message);
          }
          else {
            this.setState({
              JoinSuccess: true,
              showJoin: false,
              nickname: '',
              id: '',
              email: '',
              JoinPassword: '',
              Error: false,
              Errormessage: "",
            })
          }
        })
        .catch((err) => console.error(err));
    }
  }

  loginEnter(event){
    if(event.key === "Enter"){
      this.Login();
    }
  }

  View() {
    if (this.state.showJoin) {//회원가입
      return (
        < div className={styles.formContent} >
          <div className={styles.logo}><Logo /></div>
          <h2 className={`${styles.inactive} ${styles.underlineHover}`} onClick={this.ViewChange.bind(this)}> Sign In </h2>
          <h2 className={styles.active}>Sign Up </h2>
          <div className={`${styles.fadeIn} ${styles.first}`}>
            {/* <img src="http://danielzawadzki.com/codepen/01/icon.svg" id="icon" alt="User Icon" /> */}
          </div>

          <form>
            <input type="text" className={`${styles.fadeIn}`} value={this.state.id}
              onChange={this.handleChange.bind(this)} name="id" placeholder="ID" />
              <input type="text" className={`${styles.fadeIn} `} value={this.state.nickname}
              onChange={this.handleChange.bind(this)} name="nickname" placeholder="nickname" />
            <input type="text" className={`${styles.fadeIn}`} value={this.state.email}
              onChange={this.handleChange.bind(this)} name="email" placeholder="Email" />
            <input type="password" className={`${styles.fadeIn}`} value={this.state.JoinPassword}
              onChange={this.handleChange.bind(this)} name="JoinPassword" placeholder="Password" />
            <input type="password" className={`${styles.fadeIn}`} value={this.state.JoinPassword2}
              onChange={this.handleChangePasswordCheck.bind(this)} name="JoinPassword2" placeholder="Password confirm" />
            <div className={styles.formFooter}>
              {this.Errormessage()}
            </div>
            <input type="submit" className={`${styles.fadeIn}`} value="Join" onClick={this.Join.bind(this)} />
          </form>

          <div className={styles.formFooter}>
          </div>

        </div >
      )
    } else {
      return (
        <div className={styles.formContent}>
          <div className={styles.logo}><Logo /></div>
          <div className={`${styles.fadeIn}`}>
            {this.state.JoinSuccess ? <JoinSuccess /> : null}
          </div>
          <h2 className={styles.active} > Sign In </h2>
          <h2 className={`${styles.inactive} ${styles.underlineHover}`} onClick={this.ViewChange.bind(this)} >Sign Up </h2>
          {/* <form> */}
          <input type="text" id="login" className={`${styles.fadeIn}`} name="username" value={this.state.username} onChange={this.handleChange.bind(this)} placeholder="id" ></input>
          <input type="password" id="password" className={`${styles.fadeIn}`} name="password" value={this.state.password} onChange={this.handleChange.bind(this)} placeholder="password" onKeyPress={this.loginEnter.bind(this)} />
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