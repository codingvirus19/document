import React from "react";

import styles from "./messageList.css";

export default class MessageList extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      gNo: this.props.gNo,
      users: this.props.users,
    };
    this.autoscrollRef = React.createRef();
  }


  render() {
    // console.log(this.props.group_no);
    console.log(this.props.addMessage);
    // this.props.scrollBottom();
    this.props.scrollBottom();
    return (
      <ul className={styles.chat__messagelist} ref="messageBox" >
        {this.props.addMessage.map((message, index) => {
          if (this.state.users == message.nickname) {
            return (
              <li key={index} className={styles.mychat}>
                <div className={styles.mychat_message}>
                  <span>{message.message}</span>
                </div>
                <h6>{message.date}</h6>
              </li>
            )
          }
          else {
            return (
              <li key={index} className={styles.otherchat}>
                <div className={styles.otherchat_profile_image}>
                  <img className={styles.profile_image} src={"."+message.image} />
                  </div>
                <div>
                  <div className={styles.otherchat_nickname}>
                    {message.nickname}{" "}
                  </div>
                  <div className={styles.otherchat_message}>
                    <span>{message.message}</span>
                  </div>
                  <h6>{message.date}</h6>
                </div>
              </li>
            )
          }
        })}
      </ul>
    )
  }
  UNSAFE_componentWillUpdate() {
    this.props.scrollBottomChange();
  }
}

