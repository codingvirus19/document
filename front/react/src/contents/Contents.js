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
              userlistSession={this.props.userlistSession}
              getGroupInUser={this.props.getGroupInUser}
              notify={this.props.notify}
              SidebarGroupUpdate={this.props.SidebarGroupUpdate}
              groupBySidebar={this.props.groupBySidebar}
              group={this.props.group}
              getGroup={this.props.getGroup}
              clientRef={this.props.clientRef}
              groupInUserList={this.props.groupInUserList}
              users={this.props.users}
            />
            {(this.props.memo_bigArr!=null)?
            <ContentsMemo
              groupInUserList={this.props.groupInUserList}
              notify={this.props.notify}
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
            // {true ? (
            <Chat 
            chatListGroup={this.props.chatListGroup} 
            users={this.props.users} 
            clientRef={this.props.clientRef} 
            //group 지워짐 필터 다시 하자
            userListInGroupByUser={this.props.userListInGroupByUser/>
          ) : null}

          {this.props.showAlarm ?(
           <Alarm 
            users={this.props.users} 
            addgroup_alarm={this.props.addgroup_alarm} 
            SidebarGroupUpdate={this.props.SidebarGroupUpdate} 
            AlarmAddGroup={this.props.AlarmAddGroup} />

          ) : null}
        </div>
        {/* <Footer /> */}
      </div>
    );
  }
}