import React from "react";
import Memo from "./Memo";
import HashList from "./HashList";
import Toolbar from "./toolbar/Toolbar";
import styles from "./ContentsMemo.css";

export default class Contents extends React.Component {
  constructor() {
    super(...arguments);
  }

  render() {
    return (
      <div className={styles.memo}>
        {this.props.memo_bigArr &&
          this.props.memo_bigArr.map((memos) =>
            memos.map((memo, index) => (
              <div key={memos[index].no} className={styles.container_memo_form}>
                <Memo content={memos[index].content} />
                <HashList />
                <Toolbar
                  callbackFromToolbar={this.props.callbackFromToolbar}
                  no={memos[index].no}
                  memo_gNo={memos[index].gNo}
                  group={this.props.group}
                  groupBySidebar={this.props.groupBySidebar}
                  color={memos[index].color}
                />
              </div>
            ))
          )}
      </div>
    );
  }
}
// 내가 할 부분
