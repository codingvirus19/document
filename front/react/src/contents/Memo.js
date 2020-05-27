import React from "react";

import styles from "./Memo.css";

export default class Memo extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      showPopup: false,
    };
  }

  viewPopup() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }

  render() {
    return (
      <div
        onClick={this.viewPopup.bind(this)}
        value={this.props.content}
        // onChange={}
        className={styles.memo}
      ></div>
    );
  }
}
