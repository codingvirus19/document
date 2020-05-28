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
  }

  dragStart(e){
    this.props.dragStart(e);
  }
  

  render() {
    return (
      <input onClick={this.viewPopup.bind(this)} id={this.props.index} value={this.props.content}

        // onChange={}
        className={styles.memo}
      ></input>
    );
  }
}
