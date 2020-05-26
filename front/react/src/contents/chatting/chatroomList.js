import ChatRoom from './chatroom';
import React, { Fragment } from "react";
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import { Element, animateScroll } from "react-scroll";

import styles from "./chatroomList.css";
import "./chatroomList.scss";
export default class ChatRoomList extends React.Component {

    constructor() {
        super(...arguments)
        this.state = {
            result: '',
            contents: []
        }
    }
    

    render() {
        return (
            <Card>
                {this.props.group.gname.map((name, index) => {
                    return (
                        <Fragment key={index}>
                            <Accordion.Toggle onClick={()=>this.setState({open: !this.state.open})} className={styles.card__header} as={Card.Header} eventKey={index} >
                                {/* onClick={()=> {this.getchatList(this.props.group.no[index])}} */}
                                <p className={styles.chatroom_name}>{name}</p>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey={index} >
                                    <Card.Body>
                                        <ChatRoom group_no={this.props.group.no[index]} users={this.props.users}  open={this.state.open} />
                                    </Card.Body>
                            </Accordion.Collapse>
                        </Fragment>
                    )
                })}
            </Card>
        )
    }
   
}
   