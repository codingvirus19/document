import React from "react";
import Styles from"./Chat.css";
export default class Chat extends React.Component {
  constructor() {
    super(...arguments);
    this.state={
        chatOpen : false
    }
  }
  render(){
      return (
      <div className={Styles.ChatBox}>

      </div>
      );
  }
  }