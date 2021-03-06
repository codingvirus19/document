import React, { Fragment } from "react";
import MessageList from "./messageList";
import MessageSend from "./messageSend";
import styles from "./Chat.css";
import SockJsClient from "react-stomp";

const API_URL = ".";
const API_HEADERS = {
  "Content-Type": "application/json",
};

export default class Chat extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      contents: [],
      scrollBottom: true
    }
    this.chatInputRef = React.createRef();
  }

  componentDidMount() {
    let data = { gNo: this.props.gNo };
    // call api
    fetch(`${API_URL}/api/chatlist`, {
      method: "post",
      headers: API_HEADERS,
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          contents: json.data
        });
      })
      .catch((err) => console.error(err));
  }

  onMessageReceive(msg) {
    this.setState({
      contents: this.state.contents.concat(msg),
    })

    // this.scrollToBottom();
  }

  sendMessage(mg) {

    let dates = new Date();
    let DateSend;
    if (dates.getMonth() + 1 < 10 && dates.getHours() > 10) {
      DateSend = (
        "0" + (dates.getMonth() + 1) + "-" +
        dates.getDate() + " " +
        dates.getHours() + ":" +
        dates.getUTCMinutes());
    } else if (dates.getMonth() + 1 < 10 && dates.getHours() < 10) {
      DateSend = (
        "0" + (dates.getMonth() + 1) + "-" +
        dates.getDate() + " " +
        "0" + dates.getHours() + ":" +
        dates.getUTCMinutes());
    } else {
      DateSend = (
        (dates.getMonth() + 1) + "-" +
        dates.getDate() + " " +
        dates.getHours() + ":" +
        dates.getUTCMinutes());
    }

    this.clientRef.sendMessage("/app/chat/" + this.props.gNo,
      JSON.stringify({
        gNo: this.props.gNo,
        uNo: this.props.users.no[0],
        nickname: this.props.users.name[0],
        message: mg,
        image: this.props.users.image[0],
        date: DateSend,
        aCount: 1
      }));

    this.props.clientRef.sendMessage("/app/alarm/" + this.props.users.no[0],
      JSON.stringify({
        gNo: this.props.gNo,
        chat: "채팅알람",
        date: DateSend,
        type: false,
        readCheck: true
      }));
  }

  DragEnd(e) {
    this.dragStart.style.opacity = 1;
    if (this.dragOver == undefined) {
      return;
    }
  }

  DragOver(e){
    e.preventDefault();
    this.dragOver = e.currentTarget;
    const content = this.props.content(this.props.dragStart.dataset.id);
    this.setState({
      chatdragStart: content
    })
  }
  DragDrop(){
    this.setState({
      chatdragStart: null
    })
    this.chatInputRef.current.childNodes[0][0].focus();
  }

  render() {
    const wsSourceUrl = "./api/chat";
    return (
      <Fragment>
        <SockJsClient
          url={wsSourceUrl}
          topics={[`/api/chat/${this.props.gNo}`]}
          onMessage={this.onMessageReceive.bind(this)}
          ref={(client) => { this.clientRef = client }}>
        </SockJsClient>

        <div className={styles.top}>
          <div className={styles.image_div}>
            {/* 그룹 인원 1명일때 */}
            {this.props.userListInGroupByUser.length === 1
              ? (<img
                className={styles.img1}
                src={"." + this.props.userListInGroupByUser[0].image} />)
              // 그룹인원 2명 이상일때
              : (<>
                <img
                  className={styles.img2}
                  src={"." + this.props.userListInGroupByUser[0].image} />
                <img
                  className={styles.img3}
                  src={"." + this.props.userListInGroupByUser[1].image} />
              </>
              )}
          </div>
          <div className={styles.title}>
            <div className={styles.group_name}>
              {this.props.gName}
            </div>
            <div className={styles.member_number}>
              ({this.props.userListInGroupByUser.length})
            </div>
          </div>
          <button
            aria-label="목록"
            className={styles.close}
            onClick={this.props.close}>
            <img
              className={styles.back_btn}
              src="./assets/images/back.png" />
          </button>
        </div>

        <div id={`${this.props.gNo}scroll`} className={styles.chatOutput} 
        onDrop={this.DragDrop.bind(this)}
        onDragEnd={this.DragEnd.bind(this)} onDragOver={this.DragOver.bind(this)}>
          <MessageList
            gNo={this.props.gNo}
            users={this.props.users.name[0]}
            addMessage={this.state.contents} />
        </div>

        <div id="chatInput" className="chatInput" ref={this.chatInputRef}>
          <MessageSend
            gNo={this.props.gNo}
            sendMessage={this.sendMessage.bind(this)}
            chatdragStart={this.state.chatdragStart}
            />
        </div>

      </Fragment>

    );
  }
}