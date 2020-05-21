import React, { Fragment } from "react";

import MessageList from "./messageList";
import MessageSend from "./messageSend";

import styles from './chatroom.css';

export default class ChatRoomList extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
           clientConnected: true,
        //    contents: this.props.chatMessages,
           randomName: Math.round(Math.random()*100),
        }
    }

    outoscroll(e) {
        let scrollBottom = document.getElementById(`chatOutput`);
        scrollBottom.scrollTop = scrollBottom.scrollHeight - scrollBottom.clientHeight;
    }

    render() {
        console.log(this.props.group_no);
        return (
            <Fragment>
                <div id="Chatting" className={styles.Chatting}>
                    <div id="chatOutput" className={styles.chatOutput}>
                        <MessageList contents={this.state.contents} ref={this.outoscroll.bind(this)} />
                    </div>
                    <div id="chatInput" className="chatInput">
                        <MessageSend group_no={this.props.group_no} sendMessage={this.props.sendMessage} />
                    </div>
                </div>
            </Fragment>
        )
    }
}
