import React from "react";

import styles from "./Memo.css";

export default class Memo extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      content: this.props.content,
    };
  }

  onChangeContent(e) {
    this.setState({
      content: e.target.value,
    });
  }

  render() {
    return (
      <input
        value={this.state.content}
        onChange={this.onChangeContent.bind(this)}
        disabled
        className={styles.memo}
        type="textarea"
      ></input>
    );
  }
}
