import React from "react";

import styles from "./Memo.css";

export default class Memo extends React.Component {

  constructor() {
    super(...arguments)
    this.state = {
      showPopup: true,
      droptarget: '',
      dragtarget: ''
    }
  }

  viewPopup(){
    this.setState({
      showPopup: !this.state.showPopup
    })
    console.log(this.state.showPopup)
  }

  render() {
    return (
      <input onClick={this.viewPopup.bind(this)} id={this.props.index} name={this.props.no} value={this.props.content}
        // onChange={}
        className={styles.memo}
      ></input>
    );
  }
}
