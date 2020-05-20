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
    // console.log(this.props.content);

    return (
      <div className="contents-memo">
        {/* {this.props.memo_bigArr.memo_no.map()} */}
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
