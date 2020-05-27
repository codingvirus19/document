import React from "react";

import styles from "./Memo.css";

export default class Memo extends React.Component {
  render() {
    return (
      <input
        value={this.props.content}
        // onChange={}
        className={styles.memo}
        type="textarea"
      ></input>
    );
  }
}
//