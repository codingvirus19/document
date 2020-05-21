import React from "react";
import Memo from "./Memo";
import HashList from "./HashList";
import Toolbar from "./toolbar/Toolbar";

import styles from "./ContentsMemo.css";

const API_URL = "http://localhost:8080/codingvirus19";
const API_HEADERS = {
  "Content-Type": "application/json",
};

export default class Contents extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      memo_bigArr: null,
    };
  }

  render() {
    // test(_index){
    //   for(let _index=0, _index<)
    // }
    return (
      <ul className={styles.memo}">
        {this.props.memo_bigArr &&
          this.props.memo_bigArr.map((memos) =>
            memos.map((memo, index) => (
              <li key={memos[index].no} className={styles.container_memo_form}>
                <form className="container_memo-form">
                  <Memo content={memos[index].content} />
                  <HashList />
                  <Toolbar g_no={this.props.g_no} g_name={this.props.g_name} color={memos[index].color} />
                </form>
              </li>
            ))
          )}
      </ul>
    );
  }
}
