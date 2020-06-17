import React from "react";
import styles from "./messageList.css";

export default class MessageList extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      gNo: this.props.gNo,
      users: this.props.users,
    };
  }

  render() {
    //내 메세지
    return (
      <ul className={styles.chat__messagelist} ref="messageBox" >
        {this.props.addMessage.map((message, index) => {
          if (this.state.users == message.nickname) {
            return (
              <li key={index} className={styles.mychat} ref={e => { (e != undefined) ? e.parentNode.parentNode.scrollTop = e.parentNode.parentNode.scrollHeight : null }}>
                <div className={styles.mychat_message}>
                  <span>{message.message}</span>
                </div>
                <h6>{message.date}</h6>
              </li>
            )
          }
          else {
            //상대방 메세지
            return (
              <li key={index} className={styles.otherchat} ref={e => { (e != undefined) ? e.parentNode.parentNode.scrollTop = e.parentNode.parentNode.scrollHeight : null }}>
                <div className={styles.otherchat_profile_image}>
                  <img className={styles.profile_image} src={"." + message.image} />
                </div>
                <div>
                  <div className={styles.otherchat_nickname}>
                    {message.nickname}{" "}
                  </div>
                  <div className={styles.otherchat_message}>
                    <span>{message.message}</span>
                  </div>
                  <h6 className={styles.otherchat_time}>{message.date}</h6>
                </div>
              </li>
            )
          }
        })}
      </ul>
    )
  }
}

