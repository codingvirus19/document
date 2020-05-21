import React from "react";
import Accordion from 'react-bootstrap/Accordion'
import Dropdown from "react-bootstrap/Dropdown";
import content from "./chat.json";
import ChatRoomList from "./chatroomList";

import styles from './chat.css';

export default class Chatting extends React.Component {
   render() {
      return (
         <Dropdown className={styles.chat} >
            <Dropdown.Toggle variant="success" id="dropdown-basic" >
               <i className="fas fa-sms"></i>
               <img src="" />
            </Dropdown.Toggle>
            <Dropdown.Menu className={styles.dropdown__chat} >
               <Accordion>
                  <ChatRoomList group={this.props.group} />
               </Accordion>
            </Dropdown.Menu>
         </Dropdown>
      );
   }
}