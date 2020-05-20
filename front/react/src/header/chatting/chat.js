import React, { useState, useEffect, useRef } from "react";
import Accordion from 'react-bootstrap/Accordion'
import Dropdown from "react-bootstrap/Dropdown";
import content from "./chat.json";
import ChatRoomList from "./chatroomList";

import styles from './chat.css';

export default class Chatting extends React.Component {
   constructor() {
      super(...arguments);
      this.state = {
         // clientConnected: true,
         contents: content,
      }
   }
   render() {
      return (
         <Dropdown className="header-chat" >
            <Dropdown.Toggle variant="success" id="dropdown-basic">
               <i className="fas fa-sms"></i>
               <img src="" />
            </Dropdown.Toggle>
            <Dropdown.Menu className={styles.dropdown__chat} >
               <Accordion>
                  <ChatRoomList contents={ this.state.contents } />
               </Accordion>
            </Dropdown.Menu>
         </Dropdown>
      );
   }
}