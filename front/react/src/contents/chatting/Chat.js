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
              chatAlarmNotReceive={this.props.chatAlarmNotReceive}/>
            : <div></div>}
        </Fragment>
      );
    }
}