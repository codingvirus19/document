import React, { Fragment } from "react";
import styles from "./ChatList.css";
import ChatRoom from "./ChatRoom";
import "./ChatSearch.scss";

export default class Contents extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      chatOpen: false,
      gNo: "",
      keyword: "",
      searchClassName: "chatsearch"
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
    this.props.chatAlarmNotReceive(this.props.chatListGroup.no[index]);
  }

  close() {
    this.setState({
      chatOpen: false,
    });
    this.props.chatAlarmNotReceive(null);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userListInGroupByUser != null) {
      this.setState({
        userListInGroupByUser: this.props.userListInGroupByUser
      })
    }
  }

  onInputChange(event) {
    this.props.onCallbackChattingKeywordChange(event.target.value);
    this.UpdateKeyword(event.target.value);
    this.search(event.target.value);
  }

  deleteKeyword(e) {
    e.preventDefault();
    this.props.onCallbackChattingKeywordChange("")
    this.props.getChatListGroup();
  }

  onClickEnter(e) {
    if (e.key == "Enter") {
      this.onClickCallback(e);
    }
  }
  onClickCallback(e) {
    e.preventDefault();
    this.search(this.state.keyword)
  }
  search(keyword) {
    if(keyword != null){
      this.props.getChatListGroup();
    }
  }
  UpdateKeyword(keyword) {
    this.setState({
      keyword: keyword
    })
  }

  render() {
    //나중에 지우기 없어도 채팅 고정으로 열어놓은 상태 아니면 될듯 아마도..
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
              userListInGroupByUser={this.props.userListInGroupByUser
                .filter(element => element.gNo === this.state.gNo)}
              close={this.close.bind(this)}
              clientRef={this.props.clientRef}
              dragStart={this.props.dragStart}
              content={this.props.content}
            />
          ) : (
              <>
                <div className={styles.chat_title}>채팅</div>
                <div className={this.state.searchClassName}>
                  <input
                    className="input"
                    type="text"
                    value={this.props.chatkeyword}
                    onChange={this.onInputChange.bind(this)}
                    onKeyPress={this.onClickEnter.bind(this)}
                    placeholder="검색"
                  />
                  <button
                    className="delete"
                    onClick={this.deleteKeyword.bind(this)}>
                    <i className="fas fa-times"></i>
                  </button>
                  <button
                    type="submit"
                    className="submit"
                    value="검색"
                    onClick={this.onClickCallback.bind(this)}
                  >
                    <i className="fa fa-search"></i>
                  </button>
                </div>

                {this.props.chatListGroup.gname.map((gname, index) => {
                  //그룹별 멤버 
                  
                  let gmember = this.props.userListInGroupByUser
                    .filter(element => element.gNo === this.props.chatListGroup.no[index]);
                  if ((!gmember[0]) || (gmember.length != 1 && (!gmember[1]))) {
                    return null;
                  }
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
                              <img
                                className={styles.img3}
                                src={"." + gmember[1].image} />
                            </>
                            )}
                        </div>
                        <div className={styles.name}>
                          <div>
                            <div className={styles.gname}>
                              {gname} 
                            </div>
                            <div className={styles.member_number}>
                              {gmember.length === 1 ? null : gmember.length}
                            </div>
                          </div>
                          <div className={styles.gmember}>
                            {gmember.map((element, index) =>
                              ((index + 1) != gmember.length) ? element.nickname + ", " : element.nickname)}
                          </div>
                          {this.props.chatListGroup.readcheck[index] == true ?
                            <div className={styles.chatalarmbell}>
                              <div>
                                {this.props.chatListGroup.readcount[index]}
                              </div>
                            </div>
                            : null}
                        </div>
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
