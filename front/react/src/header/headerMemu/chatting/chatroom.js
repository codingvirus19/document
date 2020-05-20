import React, { Fragment } from "react";
import SockJsClient from "react-stomp";
import MessageList from "./messageList";
import MessageSend from "./messageSend";

import styles from './chatroom.css';

export default class ChatRoomList extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
           // clientConnected: true,
           contents: this.props.chatMessages,
           g_no: this.props.group_no,
           randomName: Math.round(Math.random()*100),
        }
    }
    sendMessage(mg) {

        // this.outoscroll();
        // // console.log(this.state.contents);
        // if (!mg.trim()) {
        //     return;
        // }
        // this.state.contents.push({
        //    group_no: 1,
        //    name: 'hi',
        //    message: mg
        //  })

        // this.setState({
        //   message: mg
        // })
        console.log(mg);
        this.clientRef.sendMessage("/api/chat/0", JSON.stringify({group_no:0, nickname: `유저` + (this.state.randomName), message: mg }));
    }

    onMessageReceive(msg, topic) {
        console.log(msg)
        this.props.chatMessages.push(msg)
        this.setState({
            contents: this.props.chatMessages
        });
        //alert(JSON.stringify(msg) + " @ " +  JSON.stringify(this.state.messages)+" @ " + JSON.stringify(topic));
    }

    outoscroll(e) {
        let scrollBottom = document.getElementById(`chatOutput`);
        scrollBottom.scrollTop = scrollBottom.scrollHeight - scrollBottom.clientHeight;
    }

    render() {

        console.log(this.scrollBottom);
        const wsSourceUrl = "http://192.168.1.132:8080/codingvirus19/api/memo";

        return (
            <Fragment>
                <div id="Chatting" className={styles.Chatting}>
                    <div id="chatOutput" className={styles.chatOutput}>
                        <MessageList contents={this.state.contents} g_no={this.state.g_no} ref={this.outoscroll.bind(this)} />
                    </div>
                    <div id="chatInput" className="chatInput">

                        <MessageSend sendMessage={this.sendMessage.bind(this)} />

                    </div>
                    <SockJsClient
                        url={wsSourceUrl}
                        topics={[`/api/chat/0`]}
                        onMessage={this.onMessageReceive.bind(this)}
                        ref={(client) => { this.clientRef = client }}
                        onConnect={() => { this.setState({ clientConnected: true }) }} />
                </div>
            </Fragment>
        )
    }
}
