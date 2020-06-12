import React, { Fragment } from "react";
import styles from "./Chat.css";
import alarm_styles from "../../header/Header.css";
import ChatRoom from "./ChatRoom";

export default class Contents extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      chatOpen: false,
      gNo: "",
    };
  }
  open(e) {
    if (this.props.chatListGroup.readcheck[e.target.id] == true) {
      this.props.clientRef.sendMessage(
        "/app/alarm/" + this.props.users.no[0],
        JSON.stringify({
          gNo: this.props.chatListGroup.no[e.target.id],
          type: false,
          readCheck: false,
        })
      );
    }
    this.setState({
      chatOpen: !this.state.chatOpen,
      gNo: this.props.chatListGroup.no[e.target.id],
      gName: this.props.chatListGroup.gname[e.target.id],
    });
  }
  close() {
    this.setState({
      chatOpen: false,
    });
  }

  render() {
    console.log("---->" + this.props.chatListGroup.no[0]);
    console.log(this.props.chatListGroup);
    return (
      <Fragment>
        <div className={styles.ChatBox}>
          {this.state.chatOpen ? (
            <ChatRoom
              gNo={this.state.gNo}
              gName={this.state.gName}
              users={this.props.users}
              close={this.close.bind(this)}
              clientRef={this.props.clientRef}
            />
          ) : (
              this.props.chatListGroup.gname.map((gname, index) => {
                return (
                  <Fragment key={index}>
                    <div
                      className={styles.chatList}
                      id={index}
                      onClick={this.open.bind(this)} >
                      {gname}
                      {this.props.chatListGroup.readcheck[index] == true ?
                        <span className={alarm_styles.alarmbell} /> : null}
                    </div>
                  </Fragment>
                );
              })
            )}
        </div>
      </Fragment>
    );
  }
}
