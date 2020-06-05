import React from "react";

import styles from "./Memo.css";
import Editor from "./Editor";
import { Remarkable } from 'remarkable';
import ShareEditor from "../header/headerMemu/ShareEditor";

export default class Memo extends React.Component {

  constructor() {
    super(...arguments)
    this.state = {
      showPopup: false,
      shareEditorPopup: false,
    }
    this.md = new Remarkable('full', {
      html: false,        // Enable HTML tags in source
      xhtmlOut: false,        // Use '/' to close single tags (<br />)
      breaks: false,        // Convert '\n' in paragraphs into <br>
      langPrefix: 'language-',  // CSS language prefix for fenced blocks
      linkify: true,         // autoconvert URL-like texts to links
      linkTarget: '',           // set target to open link in
      typographer: false,
      markOpen: false

    });


  }

  viewPopup(popdown) {
    this.setState({
      showPopup: !this.state.showPopup,
    })
  }

  getReMarkDown() {
    return { __html: this.md.render(this.props.content) };
  }


  render() {
    return (
      <div onClick={this.viewPopup.bind(this)} id={this.props.index} name={this.props.no} value={this.props.content}
        className={styles.memo}>
        <div
          dangerouslySetInnerHTML={this.getReMarkDown()} />

        {this.state.showPopup ? (

          <ShareEditor
          bringMemoByGroup={this.props.bringMemoByGroup}
            no={this.props.memo_bigArr[this.props.index].no}
            memo_gNo={this.props.memo_bigArr.gNo}
            group={this.props.group}
            groupBySidebar={this.props.groupBySidebar}
            color={this.props.memo_bigArr.color}
            content={this.props.content} 
            group_hash={this.props.group_hash}
            memo_hash={this.props.memo_hash}
            memoClose={this.viewPopup.bind(this)}
            />
          // <Editor
          //   groupBySidebar={this.props.groupBySidebar}
          //   group={this.props.group}
          //   memo_bigArr={this.props.memo_bigArr}
          //   index={this.props.index}
          //   content={this.props.content}
          //   viewPopup={this.viewPopup.bind(this)} />
          ) : null}
      </div>
    );
  }
}