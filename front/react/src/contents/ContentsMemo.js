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
                  SidebarGroupUpdate={this.props.SidebarGroupUpdate}
                  no={memos[index].no}
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
