import React from "react";

import styles from "./Memo.css";

export default class Memo extends React.Component {

  constructor() {
    super(...arguments)
    this.state = {
      showPopup: true
    }
  }

  viewPopup() {
    this.setState({
      showPopup: !this.state.showPopup
    })
    console.log(this.state.showPopup)
  }

  render() {
    return (
      <div onClick={this.viewPopup.bind(this)}>
        <input value={this.props.content} className={styles.memo} >
            {/* onChange={} */}
        </input>
      </div>
    );
  }
}
