import React, { Fragment } from "react";
import MessageList from "./messageList";
import MessageSend from "./messageSend";
import styles from "./Chat.css";
import SockJsClient from "react-stomp";
const API_URL = "http://localhost:8080/codingvirus19";
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
    this.clientRef.sendMessage("/app/chat/" + this.props.gNo,
      JSON.stringify({
        gNo: this.props.gNo,
        uNo: this.props.users.no[0],
        nickname: this.props.users.name[0],
        message: mg,
        date: new Date(),
        aCount: 1
      }));

    this.props.clientRef.sendMessage("/app/alarm/" + this.props.users.no[0],
      JSON.stringify({
        gNo: this.props.gNo,
        chat: "채팅알람",
        date: new Date(),
        type: false,
        readCheck: true
      }));
  }
  render() {
    const wsSourceUrl = "http://localhost:8080/codingvirus19/api/chat";
    return (
      <Fragment>
        <SockJsClient
          url={wsSourceUrl}
          topics={[`/api/chat/${this.props.gNo}`]}
          onMessage={this.onMessageReceive.bind(this)}
          ref={(client) => { this.clientRef = client }}>
        </SockJsClient>

        <button className={styles.close} onClick={this.props.close}>⏏︎</button>


        <div id={`${this.props.gNo}scroll`} className={styles.chatOutput} >
          <MessageList gNo={this.props.gNo} users={this.props.users.name[0]} addMessage={this.state.contents} />
        </div>

        <div id="chatInput" className="chatInput">
          <MessageSend gNo={this.props.gNo} sendMessage={this.sendMessage.bind(this)} />
        </div>
        
      </Fragment>

    );
  }
}