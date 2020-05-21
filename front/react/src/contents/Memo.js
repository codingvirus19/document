import React from "react";

import styles from "./Memo.css";

export default class Memo extends React.Component {
  render() {
    return (
      <input
        className={styles.memo}
        type="textarea"
      />
    );
  }
}