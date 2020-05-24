import ChatRoom from './chatroom';
import React, { Fragment } from "react";
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'

import styles from "./chatroomList.css";
import "./chatroomList.css";

export default class ChatRoomList extends React.Component {

    constructor() {
        super(...arguments)
        this.state = {
            result: '',
            contents: []
        }
    }
    eventButton(e){
        e ++;
        if(e % 2 == 0){
            <div className={styles.collapsedown}></div>
        }
        else{
            <div className={styles.collapseopen}></div>
        }
    }

    render() {
        return (
            <Card>
                {this.props.group.gname.map((name, index) => {
                    return (
                        <Fragment key={index}>
                            <Accordion.Toggle className={styles.card__header} as={Card.Header} eventKey={index}>
                                {/* onClick={()=> {this.getchatList(this.props.group.no[index])}} */}
                                <p>{name}</p>
                            </Accordion.Toggle>
                            <Accordion.Collapse className="collapse" onClick={this.eventButton.bind(this)} eventKey={index} >
                                    <Card.Body>
                                        <ChatRoom group_no={this.props.group.no[index]} users={this.props.users} />
                                    </Card.Body>
                            </Accordion.Collapse>
                        </Fragment>
                    )
                })}
            </Card>
        )
    }
}