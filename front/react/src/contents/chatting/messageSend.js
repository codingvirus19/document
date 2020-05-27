import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

import styles from './messageSend.css';

export default class MessageList extends React.Component{

    constructor() {
        super();
        this.state = {
           message: '',
           //messageBox:''
        }
        this.onChatSubmit = this.onChatSubmit.bind(this);
        this.onInputChanged = this.onInputChanged.bind(this);
     }

    onInputChanged(event) {
        this.setState({
           message: event.target.value
        });
    }

     chatKeyPress(event) {
        if (event.key === "Enter") {
           this.onChatSubmit(event);
        }
    };

    onChatSubmit(event) {
        event.preventDefault()
        //this.state.messageBox.push(this.state.message);
        this.props.sendMessage(this.state.message, this.props.gNo);
        this.setState({
            message: ''
        })
    }

    render(){
        return(
            <form onSubmit={this.onChatSubmit.bind(this)} className={styles.inputTable}>
                <input name='chat' type="text" className={styles.Message} placeholder="내용을 입력하세요"
                    value={this.state.message}
                    onChange={this.onInputChanged.bind(this)}
                    onKeyPress={this.chatKeyPress.bind(this)} />
                <button className={styles.button} onClick={this.onChatSubmit.bind(this)}> <FontAwesomeIcon className={styles.faPaperPlane} icon={faPaperPlane}/> </button>
            </form>
        )
    }
}