import React from "react";

import styles from "./Memo.css";
import Editor from "./Editor";
import { Remarkable } from 'remarkable';
import ShareEditor from "../header/headerMemu/ShareEditor";

export default class Memo extends React.Component {

  constructor() {
    super(...arguments)
    this.state = {
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

  getReMarkDown() {
    return { __html: this.md.render(this.props.content) };
  }

  render() {
    return (
      <div onClick={this.props.viewPopup} id={this.props.index} name={this.props.no} value={this.props.content}
        className={styles.memo}>
        <div
          className={styles.markmemo}
          dangerouslySetInnerHTML={this.getReMarkDown()} />

        {this.props.showPopup ? (
          <ShareEditor
            groupInUserList={this.props.groupInUserList}
            users={this.props.users}
            bringMemoByGroup={this.props.bringMemoByGroup}
            no={this.props.no}
            gNo={this.props.memo_gNo}
            group={this.props.group}
            groupBySidebar={this.props.groupBySidebar}
            color={this.props.color}
            content={this.props.content} 
            group_hash={this.props.group_hash}
            memo_hash={this.props.memo_hash}
            memoClose={this.props.viewPopup}
            SidebarGroupUpdate={this.props.SidebarGroupUpdate}
            distinctGroup_hash={this.props.distinctGroup_hash}
            clientRef={this.props.clientRef}
            setStyle={this.props.setState}
            notify={this.props.notify}
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