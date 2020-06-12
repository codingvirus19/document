import React, { Fragment } from "react";
import ChatList from "./ChatList"
import styles from"./Chat.css";
export default class Chat extends React.Component {
  constructor() {
    super(...arguments);
  }
  render(){
      return (
        <Fragment>
        {(true) ? 
        <ChatList chatListGroup={this.props.chatListGroup}
        users={this.props.users} clientRef={this.props.clientRef} />
        : <div></div>}
        </Fragment>
      );
  }
  }