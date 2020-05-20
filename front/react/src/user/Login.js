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
    formData.append("username", this.state.email);
    formData.append("password", this.state.password);
    fetch(`${API_URL}/user/auth`, {
      method: "post",
      headers: API_HEADERS,
      body: formData,
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.result == "success") {
          this.setState({ result: true });
        }
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
// import React from "react";
// import Join from "./Join";
// import Container from "../Container";
// import {
//   BrowserRouter as Router,
//   Route,
//   Switch,
//   Link,
//   Redirect,
// } from "react-router-dom";
// import Router1 from "../Router1";

// const API_URL = "http://localhost:8080/codingvirus19";
// const API_HEADERS = {
//   "Content-Type": "application/json",
// };
// export default class login extends React.Component {
//   constructor() {
//     super(...arguments);
//     this.state = {
//       id: "",
//       password: "",
//       result: false,
//       /* 05.14 수정 건들지말 것!! */
//       showPopup: false,
//       /* 05.14 수정 건들지말 것!! */
//       result: "",
//     };
//   }

//   IdChange(e) {
//     this.setState({
//       id: e.target.value,
//     });
//   }

//   PassWordChange(e) {
//     this.setState({
//       password: e.target.value,
//     });
//   }

//   Login() {
//     let input_date = {
//       id: this.state.id,
//       password: this.state.password,
//     };
//     console.log(input_date);
//     // call api
//     fetch(`${API_URL}/api/login`, {
//       method: "post",
//       headers: API_HEADERS,
//       body: JSON.stringify(input_date),
//     })
//       .then((response) => response.json())
//       .then((json) => {
//         console.log(json);
//         console.log(json.data);
//         this.setState({
//           result: json.data,
//         });
//       })
//       .catch((err) => console.error(err));
//   }

//   // addResult() {
//   //   login();
//   //   this.setState ({
//   //     result:
//   //   })
//   // }

//   /* 05.14 수정 건들지말 것!! */
//   joinPopup() {
//     this.setState({
//       showPopup: !this.state.showPopup,
//     });
//   }
//   /* 05.14 수정 건들지말 것!! */
//   /* 0517 수정 */
//   /* 0517 수정 */

//   render() {
//     if (this.state.result === true) {
//       return <Redirect to="/main" />;
//     }
//     return (
//       <div className="App">
//         <div className="auth-wrapper">
//           <div className="auth-inner">
//             <form>
//               <h3>로그인</h3>

//               <div className="form-group">
//                 <label>아이디/이메일</label>
//                 <input
//                   type="email"
//                   className="form-control"
//                   value={this.state.id}
//                   onChange={this.IdChange.bind(this)}
//                   type="text"
//                   placeholder="아이디/이메일"
//                 />
//               </div>

//               <div className="form-group">
//                 <label>비밀번호</label>
//                 <input
//                   type="password"
//                   className="form-control"
//                   value={this.state.password}
//                   onChange={this.PassWordChange.bind(this)}
//                   type="password"
//                   placeholder="비밀번호"
//                 />
//               </div>

//               <div className="form-group">
//                 <div className="custom-control custom-checkbox">
//                   <input
//                     type="checkbox"
//                     className="custom-control-input"
//                     id="customCheck1"
//                   />
//                   <label
//                     className="custom-control-label"
//                     htmlFor="customCheck1"
//                   >
//                     아이디 저장하기
//                   </label>
//                 </div>
//               </div>
//             </form>
//             {/* 05.14 수정 건들지말 것!! */}
//             <div>
//               <div onClick={this.Login.bind(this)}> 로그인</div>
//             </div>
//             <div className="forgot-password text-right">
//               아이디가 없으신가요?
//               <button onClick={this.joinPopup.bind(this)}>회원가입하기</button>
//               {this.state.showPopup ? (
//                 <Join closePopup={this.joinPopup.bind(this)} />
//               ) : null}
//             </div>
//             {/* 05.14 수정 */}
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
