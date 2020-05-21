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
      memo_bigArr: null,
    };
  }

  render() {
    // test(_index){
    //   for(let _index=0, _index<)
    // }
    return (
      <ul className="contents-memo">
        {this.props.memo_bigArr &&
          this.props.memo_bigArr.map((memos) =>
            memos.map((memo, index) => (
              <li key={memos[index].no} className="memo_container">
                <form className="container_memo-form">
                  <Memo content={memos[index].content} />
                  <HashList />
                  <Toolbar color={memos[index].color} />
                </form>
              </li>
            ))
          )}
      </ul>
    );
  }
}
