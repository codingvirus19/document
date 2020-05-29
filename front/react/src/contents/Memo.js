import React from "react";

import styles from "./Memo.css";
import Editor from "./Editor";
import ShareEditor from "../header/headerMemu/ShareEditor";

export default class Memo extends React.Component {

  constructor() {
    super(...arguments)
    this.state = {
      showPopup: false,
      shareEditorPopup: false,
      droptarget: '',
      dragtarget: '',
    }
  }

  viewPopup(popdown) {
    this.setState({
      showPopup: !this.state.showPopup,
    })
  }

  render() {
    return (
      <div onClick={this.viewPopup.bind(this)} id={this.props.index} name={this.props.no} value={this.props.content}
        className={styles.memo}>
        <input value={this.props.content} />
        {this.state.showPopup ? (
          <Editor groupBySidebar={this.props.groupBySidebar}
            group={this.props.group}
            memo_bigArr={this.props.memo_bigArr} 
            content={this.props.content} 
            viewPopup={this.viewPopup.bind(this)} />
        ) : null}
      </div>
    );
  }
}
