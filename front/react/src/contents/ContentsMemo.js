import React from "react";
import Memo from "./Memo";
import HashList from "./HashList";
import Toolbar from "./toolbar/Toolbar";

const API_URL = "http://localhost:8080/codingvirus19";
const API_HEADERS = {
  "Content-Type": "application/json",
};

export default class Contents extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      memoArr: this.props.memoArr,
    };
  }
  render() {
    // console.log(this.state.memoArr.no);
    return (
      <div className="contents-memo">
        <div className="memo_container">
          <form className="container_memo-form">
            <Memo />
            <HashList />
            <Toolbar />
          </form>
        </div>
      </div>
    );
  }
}
