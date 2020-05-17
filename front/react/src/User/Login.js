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
    if (this.state.result === true) {
      return (
        <Redirect to="./main" />
      );
    }
    return (
      <div className={`${styles.wrapper} ${styles.fadeInDown}`}>
        <div className={styles.formContent}>
          <h2 className={styles.active}> Sign In </h2>

          <h2 className={`${styles.inactive} ${styles.underlineHover}`}>Sign Up </h2>
          <div className={`${styles.fadeIn} ${styles.first}`}>
            {/* <img src="http://danielzawadzki.com/codepen/01/icon.svg" id="icon" alt="User Icon" /> */}
          </div>

          {/* <form> */}
            <input type="text" id="login" className={`${styles.fadeIn} ${styles.second}`} name="login" placeholder="login" />
            <input type="text" id="password" className={`${styles.fadeIn} ${styles.third}`} name="login" placeholder="password" />
            <input type="submit" className={`${styles.fadeIn} ${styles.fourth}`} value="Log In" />
          {/* </form> */}

          <div className={styles.formFooter}>
            <a className={styles.underlineHover} href="#">Forgot Password?</a>
          </div>

        </div>
      </div>

    );
  }
}
