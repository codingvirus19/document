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
    this.props.clientRef.sendMessage(
      "/app/alarm/" + this.props.users.no[0],
      JSON.stringify({
        gNo: this.props.group.no[e.target.id],
        type: false,
        readCheck: false,
      })
    );
    this.setState({
      chatOpen: !this.state.chatOpen,
      gNo: this.props.group.no[e.target.id],
      gName: this.props.group.gname[e.target.id],
    });
  }
  close() {
    this.setState({
      chatOpen: false,
    });
  }


    groupByalarm(gNo) {
        if (this.props.alarm.g_no == gNo) {
            if (this.props.alarm.chatting == true) {
                return (<span className={alarm_styles.alarmbell} />);
            }
        }
        return (null);
        
    }
  

  render() {
    console.log("---->" + this.props.group.no[0]);
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
            this.props.group.gname.map((gname, index) => {
              return (
                <Fragment>
                  <div
                    className={styles.chatList}
                    id={index}
                    key={index}
                    onClick={this.open.bind(this)}
                  >
                    채팅그룹 : {gname}
                    {this.groupByalarm.call(this, this.props.group.no[index])}
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
