import React from "react";

import styles from './messageList.css';

export default class MessageList extends React.Component{
    constructor(){
        super(...arguments)
        this.state={
            g_no: this.props.group_no
        }
    }
    render(){
        console.log(this.props.group_no);
        console.log(this.props.addMessage);
        return(
            <ul className={styles.chat__messagelist} ref="messageBox" >
                { this.props.addMessage.map((message, index) => {
                    return(
                        <li key={index} >
                            <div>
                                {message.nickname} : {message.message}
                                <h6>{message.date}</h6>
                            </div>
                        </li>
                ) } ) }
            </ul>
        )
    }
}