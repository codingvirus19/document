import React, { Fragment } from "react";

import MessageList from "./messageList";
import MessageSend from "./messageSend";
import SockJsClient from "react-stomp";

import styles from './chatroom.css';

const API_URL = "http://localhost:8080/codingvirus19";
const API_HEADERS = {
    "Content-Type": "application/json",
};

export default class ChatRoomList extends React.Component {
    constructor() {
        super(...arguments)
        this.state = {
            g_no: this.props.group_no,
            clientConnected: false,
            contents: [],
            oepn:false
        }
        this.autoscrollRef = React.createRef()
    }

    componentDidMount() {
        let data = { gNo: this.state.g_no };
        // call api
        console.log(data);
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

            // animateScroll.scrollToBottom({
            //     containerId: this.autoscrollRef.current.data
            // });
    }

    onMessageReceive(msg) {
        console.log(msg);
        this.setState({
            contents: this.state.contents.concat(msg),
        })
        this.scrollToBottom();
    }

    sendMessage(mg) {
        console.log(mg);
        this.clientRef.sendMessage("/app/chat/" + this.state.g_no,
            JSON.stringify({
                gNo: this.state.g_no,
                uNo: this.props.users.no[0],
                nickname:this.props.users.name[0],
                message: mg,
                date: new Date(),
                aCount: 1
            }));
    }

    scrollToBottom(){
        this.autoscrollRef.current.scrollIntoView({behavior: "smooth"});
        this.autoscrollRef.current.scrollTop = this.autoscrollRef.current.scrollHeight;
        // animateScroll.scrollToBottom({
        //     containerId: this.autoscrollRef.current.id
        // });
        
    }
//   componentDidUpdate(){
//       this.scrollToBottom();
//     }
    openChange(){
        this.setState({
            open:!this.state.oepn
        })
    }
    render() {
        const wsSourceUrl = "http://localhost:8080/codingvirus19/api/chat";
        return (
            <Fragment>
                <div id="Chatting" className={styles.Chatting}>
                    <div id={`${this.state.g_no}scroll`} onMouseLeave={this.scrollToBottom.bind(this)} className={styles.chatOutput}  ref={this.autoscrollRef}>
                        <MessageList  group_no={this.state.g_no} users={this.props.users.name[0]} addMessage={this.state.contents} openChange={this.openChange.bind(this)}  />
                    </div>
                    <div id="chatInput" className="chatInput">
                        <MessageSend group_no={this.state.g_no} sendMessage={this.sendMessage.bind(this)} />
                    </div>
                    <SockJsClient
                        url={wsSourceUrl}
                        topics={[`/api/chat/${this.state.g_no}`]}
                        onMessage={this.onMessageReceive.bind(this)}
                        ref={(client) => { this.clientRef = client }}
                        onConnect={() => { this.setState({ clientConnected: true })} }
                        onDisconnect={ () => { return false }} >
                    </SockJsClient>
                </div>
            </Fragment>
        )
    }
    componentWillUpdate(){
        this.scrollToBottom();
    }
}
