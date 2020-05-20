import React from "react";

import styles from './messageList.css';

export default class MessageList extends React.Component{
    render(){
        return(
            <ul className={styles.chat__messagelist} ref="messageBox" >
                { this.props.contents.map((message,index) =>{
                    return(
                        <li key={index} >
                            <div>
                                {message.nickname} : {message.message}
                            </div>
                        </li>
                ) } ) }
            </ul>
        )
    }
}