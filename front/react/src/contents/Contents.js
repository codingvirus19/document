import React from "react";
import ContentsHeader from "./ContentsHeader";
import ContentsMemo from "./ContentsMemo";
import Footer from "../footer/Footer";
import Chat from "./chatting/Chat";
import styles from "./Contents.css";

export default class Contents extends React.Component {
  constructor() {
    super(...arguments);
  }

  render() {
    return (
      <div className={styles.contents}>
        <div className={styles.box}>
          <div className={styles.contentsMemo}>
            <ContentsHeader
              groupBySidebar={this.props.groupBySidebar}
              group={this.props.group}
              UpdateGroup={this.props.UpdateGroup}
            />
            <ContentsMemo
              bringMemoByGroup={this.props.bringMemoByGroup}
              memo_Change={this.props.memo_Change}
              callbackFromToolbar={this.props.callbackFromToolbar}
              SidebarGroupUpdate={this.props.SidebarGroupUpdate}
              groupBySidebar={this.props.groupBySidebar}
              group={this.props.group}
              memo_bigArr={this.props.memo_bigArr}
              clientRef={this.props.clientRef}
              users={this.props.users}
              group_hash_for_select={this.props.group_hash_for_select}
              group_hash={this.props.group_hash}
              IsHashUpdate={this.props.IsHashUpdate}
            />
          </div>
          {this.props.showChat ? (
            <Chat group={this.props.group} users={this.props.users} />
          ) : null}
        </div>
        {/* <Footer /> */}
      </div>
    );
  }
}