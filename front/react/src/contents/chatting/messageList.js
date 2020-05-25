import React from "react";

import styles from './messageList.css';

export default class MessageList extends React.Component {
    constructor() {
        super(...arguments)
        this.state = {
            g_no: this.props.group_no,
            users: this.props.users
        }
    }
    render() {
        // console.log(this.props.group_no);
        // console.log(this.props.addMessage);
        return (
            <ul className={styles.chat__messagelist} ref="messageBox" >
                {this.props.addMessage.map((message, index) => {
                    if (this.state.users == message.nickname) {
                        return (
                            <li key={index} className={styles.mychat} >
                                <div >
                                    {message.nickname} : {message.message}
                                    <h6>{message.date}</h6>
                                </div>
                            </li>
                        )
                    }
                    else {
                        return (
                            <li key={index} className={styles.otherchat}>
                                <div >
                                    {message.nickname} : {message.message}
                                    <h6>{message.date}</h6>
                                </div>
                            </li>
                        )
                    }
                })}
            </ul>
        )
    }
}