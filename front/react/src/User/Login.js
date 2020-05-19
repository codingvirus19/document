import React from "react";
import Join from "./Join";
import Container from "../Container";
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import Router1 from "../Router1";
import styles from './Login.css';

const API_URL = "http://192.168.1.132:8080/codingvirus19";
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
      showJoin: false,
      nickname:'',
      Email:'',
      JoinPassword:'',
      JoinPassword2:'',
      ID:''
    };
  }


  Login() {
    console.log(this.state);
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
  ViewChange() {
    this.setState({
      showJoin: !this.state.showJoin,
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
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
          <input type="text" className={`${styles.fadeIn} `} value={this.state.nickname} onChange={this.handleChange.bind(this)}  name="nickname" placeholder="nickname" />
          <input type="text" className={`${styles.fadeIn} ${styles.second}`} value={this.state.ID} onChange={this.handleChange.bind(this)} name="ID" placeholder="ID" />
          <input type="text" className={`${styles.fadeIn} ${styles.third}`} value={this.state.Email} onChange={this.handleChange.bind(this)} name="Email" placeholder="Email" />
          <input type="text" className={`${styles.fadeIn} ${styles.third}`} value={this.state.JoinPassword} onChange={this.handleChange.bind(this)} name="JoinPassword" placeholder="Password" />
          <input type="text" className={`${styles.fadeIn} ${styles.fourth}`} value={this.state.JoinPassword2} onChange={this.handleChange.bind(this)} name="JoinPassword2" placeholder="Password" />
          <input type="submit" className={`${styles.fadeIn} ${styles.fourth}`} value="Join" onClick={(e)=>e.preventDefault()} />
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
      <input type="text" id="login"  className={`${styles.fadeIn} ${styles.second}`} name="email" value={this.state.email} onChange={this.handleChange.bind(this)}placeholder="login" ></input>
        <input type="password" id="password" className={`${styles.fadeIn} ${styles.third}`} name="password"  value={this.state.password}  onChange={this.handleChange.bind(this)} placeholder="password" />
        <input type="submit" className={`${styles.fadeIn} ${styles.fourth}`} value="Log In" onClick={this.Login.bind(this)} />
        {/* </form> */}

        <div className={styles.formFooter}>
          {/* <a className={styles.underlineHover} href="#">Forgot Password?</a> */}
        </div>

      </div>)
    }
  }
  /* 05.14 수정 건들지말 것!! */



  render() {
    if (this.state.result === true) {
      return (
        <Redirect to="./main" />
      );
    }
    return (
      <div className={`${styles.wrapper} ${styles.fadeInDown}`}>
        {this.View()}
      </div>

    );
  }
}
