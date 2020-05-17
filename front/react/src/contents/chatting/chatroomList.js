import ChatRoom from './chatroom';
import React, { Fragment } from "react";
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'

export default class ChatRoomList extends React.Component {
  

    render() {
       this.ab
        return (

            <Card>
                {this.props.contents.map(content => {
                    return (
                        <Fragment key={ content.group_no }>
                            <Accordion.Toggle as={Card.Header} eventKey={content.group_no} >
                                <p>그룹{content.group_no}</p>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey={content.group_no}>
                                <Fragment>
                                    <ChatRoom group_no={content.group_no} chatMessages={content.contents} />
                                </Fragment>
                            </Accordion.Collapse>

                        </Fragment>
                    )
                })}
            </Card>

        )
    }
}