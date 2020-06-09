import React from "react";
import ContentsHeader from "./ContentsHeader";
import ContentsMemo from "./ContentsMemo";
import Footer from "../footer/Footer";
import Chat from "./chatting/Chat";
import Alarm from "./Alarm";
import styles from "./Contents.css";

export default class Contents extends React.Component {

  render() {
    return (
      <div className={styles.contents}>
        <div className={styles.box}>
          <div className={styles.contentsMemo}>
            <ContentsHeader
              groupBySidebar={this.props.groupBySidebar}
              group={this.props.group}
              getGroup={this.props.getGroup}
              clientRef={this.props.clientRef}
            />
            {(this.props.memo_bigArr!=null)?
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
              group_hash={this.props.group_hash}
              distinctGroup_hash={this.props.distinctGroup_hash}
            />
              :null}
          </div>
          {this.props.showChat ? (
            <Chat group={this.props.group} users={this.props.users}   clientRef={this.props.clientRef} alarm={this.props.alarm} />
          ) : null}
          {this.props.showAlarm ? (
            <Alarm users={this.props.users} addgroup_alarm={this.props.addgroup_alarm} SidebarGroupUpdate={this.props.SidebarGroupUpdate} AlarmAddGroup={this.props.AlarmAddGroup} />
          ) : null}
        </div>
        {/* <Footer /> */}
      </div>
    );
  }
}