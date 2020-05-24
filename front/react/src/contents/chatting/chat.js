import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSms } from '@fortawesome/free-solid-svg-icons'
import Accordion from 'react-bootstrap/Accordion'
import Dropdown from "react-bootstrap/Dropdown";
import ChatRoomList from "./chatroomList";

import styles from './chat.css';

export default class Chatting extends React.Component {
   render() {
      return (
         <Dropdown className={styles.chat} >
            <Dropdown.Toggle>
               <FontAwesomeIcon className={styles.faSms} icon={faSms} />
               <img src="" />
            </Dropdown.Toggle>
            <Dropdown.Menu className={styles.dropdown__chat} >
               <Accordion>
                  <ChatRoomList group={this.props.group} users={this.props.users} />
               </Accordion>
            </Dropdown.Menu>
         </Dropdown>
      );
   }
}