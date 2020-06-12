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
  open(index) {
    if (this.props.chatListGroup.readcheck[index] == true) {
      this.props.clientRef.sendMessage(
        "/app/alarm/" + this.props.users.no[0],
        JSON.stringify({
          gNo: this.props.chatListGroup.no[index],
          type: false,
          readCheck: false,
        })
      );
    }
    this.setState({
      chatOpen: !this.state.chatOpen,
      gNo: this.props.chatListGroup.no[index],
      gName: this.props.chatListGroup.gname[index],
    });
  }
  close() {
    this.setState({
      chatOpen: false,
    });
  }

  render() {
    //나중에 지우기
    if (!this.props.userListInGroupByUser || !this.props.chatListGroup) {
      return null;
    }
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
                {this.props.chatListGroup.gname.map((gname, index) => {
                  //그룹별 멤버 
                  let gmember = this.props.userListInGroupByUser
                    .filter(element => element.gNo === this.props.chatListGroup.no[index]);
                  return (
                    <Fragment key={index}>
                      <div
                        className={styles.chatList}
                        id={index}
                        onClick={this.open.bind(this, index)} >
                        <div className={styles.image_div}>
                          {/* 그룹 인원 1명일때 */}
                          {gmember.length === 1
                            ? (<img
                              className={styles.img1}
                              src={"." + gmember[0].image} />)
                              // 그룹인원 2명 이상일때
                            : (<>
                              <img
                                className={styles.img2}
                                src={"." + gmember[0].image} />
                              <img key={index}
                                className={styles.img3}
                                src={"." + gmember[1].image} />
                            </>
                            )}
                          </div>
                        <div className={styles.gname}>
                          {gname}
                        </div>
                        <div className={styles.gmember}>
                          {gmember.map(element => element.nickname + ", ")}
                        </div>
                        {this.props.chatListGroup.readcheck[index] == true ?
                          <span className={alarm_styles.alarmbell} /> : null}
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
