import React, { Fragment } from "react";
import styles from "./ChatList.css";
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
    //나중에 지우기
    if(!this.props.userListInGroupByUser) {
      return null;
    }
    //
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
              <>
                <div className={styles.chat_title}>채팅</div>
                {this.props.group.gname.map((gname, index) => {
                  //그룹별 멤버 
                  let gmember = this.props.userListInGroupByUser
                    .filter(element => element.gNo === this.props.group.no[index]);
                  return (
                    <Fragment key={index}>
                      <div
                        className={styles.chatList}
                        id={index}
                        onClick={this.open.bind(this)} >
                          {/* 그룹 1명일때만. 2명, 3명일때도 해야함*/}
                        <div className={styles.image_div}>
                          <img
                            className={styles.img}
                            src={"." + gmember.map(element => element.image)} />
                        </div>
                        <div className={styles.gname}>
                          {gname}
                        </div>
                        <div className={styles.gmember}>
                          {gmember.map(element => element.nickname + ", ")}
                        </div>
                        {this.groupByalarm.call(this, this.props.group.no[index])}
                      </div>
                    </Fragment>
                  );
                })}
              </>
            )}
        </div>
      </Fragment>
    );
  }
}
