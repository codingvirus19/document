import ChatRoom from './chatroom';
import React, { Fragment } from "react";
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import SockJsClient from "react-stomp";

import styles from "./chatroomList.css";
export default class ChatRoomList extends React.Component {

    constructor() {
        super(...arguments)
        this.state = {
            connect:true,
            clientConnected: true
        }
    }
    onMessageReceive(msg) {
        // console.log(msg)
        // this.props.chatMessages.push(msg)
        // this.setState({
        //     contents: msg
        // });
    }
    sendMessage(mg,gno, toggle) {
        let load = true;
        if(toggle === undefined){
            load = false;
        }
        this.clientRef.sendMessage("/app/chat/" + gno,
            JSON.stringify({
                gNo: gno,
                uNo : 1,
                message: mg,
                connect: load
            }));
    }
    
    render() {
        console.log(this.props.group);
        const wsSourceUrl = "http://localhost:8080/codingvirus19/api/chat";
        return (
            <Card>
                {this.props.group.gname.map((name, index) => {
                    return (
                        <Fragment key={index}>
                            <Accordion.Toggle className={styles.card__header} as={Card.Header} eventKey={index}
                                onClick={()=>{this.sendMessage("",this.props.group.no[index],true)}} >
                                <p>{name}</p>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey={index} >
                                <Fragment>
                                    <ChatRoom group_no={this.props.group.no[index]} sendMessage={this.sendMessage.bind(this)} />
                                </Fragment>
                            </Accordion.Collapse>

                            <SockJsClient
                                url={wsSourceUrl}
                                topics={[`/api/chat/${this.state.g_no}`]}
                                onMessage={this.onMessageReceive.bind(this)}
                                ref={(client) => { this.clientRef = client }}
                                onConnect={() => { this.setState({ clientConnected: true }) }} />
                        </Fragment>
                    )
                })}
            </Card>
        )
    }
}