import React, { Fragment } from "react";
import ChatList from "./ChatList"
import styles from "./Chat.css";

export default class Chat extends React.Component {

  render() {
      return (
        <Fragment>
          {(true) ?
            <ChatList
              chatListGroup={this.props.chatListGroup}
              users={this.props.users}
              clientRef={this.props.clientRef}
              userListInGroupByUser={this.props.userListInGroupByUser}
              chatAlarmNotReceive={this.props.chatAlarmNotReceive}
              getChatListGroup={this.props.getChatListGroup}
              chatkeyword={this.props.chatkeyword}
              onCallbackChattingKeywordChange={this.props.onCallbackChattingKeywordChange}
              dragStart={this.props.dragStart}
              content={this.props.content}
              />
            : <div></div>}
        </Fragment>
      );
    }
}