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
           randomName: Math.round(Math.random()*100)
        }
     }

    sendMessage(mg) {
        // console.log(this.state.contents);
        if (!mg.trim()) {
            return;
        }
        // this.state.contents.push({
        //    group_no: 1,
        //    name: 'hi',
        //    message: mg
        //  })

        // this.setState({
        //   message: mg
        // })
        this.clientRef.sendMessage("/app/message/" + this.state.g_no, JSON.stringify({group_no:(this.state.g_no), nickname: `유저` + (this.state.randomName), message: mg }));
    }

    onMessageReceive(msg, topic) {
        console.log(msg)
        this.props.chatMessages.push(msg)
        this.setState({
            contents: this.props.chatMessages
        });
        //alert(JSON.stringify(msg) + " @ " +  JSON.stringify(this.state.messages)+" @ " + JSON.stringify(topic));
    }

    outoscroll() {
        var scrollBottom = document.getElementById("chatOutput");
        scrollBottom.scrollTop = scrollBottom.scrollHeight;
    }

    render() {
        const wsSourceUrl = "./codingvirus19/chat/";
        return (
            <Fragment>
                <div id="Chatting" className={styles.Chatting}>
                    <div id="chatOutput" className={styles.chatOutput} ref={this.outoscroll.bind(this)}>
                        <MessageList contents={this.state.contents} g_no={this.state.g_no} />
                    </div>
                    <div id="chatInput" className="chatInput">
                        <MessageSend sendMessage={this.sendMessage.bind(this)} topic={`/topic/testchat/${this.state.g_no}`} />
                    </div>
                    <SockJsClient
                        url={wsSourceUrl}
                        topics={[`/topic/testchat/${this.state.g_no}`]}
                        onMessage={this.onMessageReceive.bind(this)}
                        ref={(client) => { this.clientRef = client; }}
                        onConnect={() => { this.setState({ clientConnected: true }) }} />
                </div>
            </Fragment>
        )
    }
}
