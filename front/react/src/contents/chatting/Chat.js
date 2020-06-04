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
        <ChatList group={this.props.group}
        users={this.props.users} clientRef={this.props.clientRef} alarm={this.props.alarm}/>
        : <div></div>}
        </Fragment>
      );
  }
  }