import React, { Fragment } from "react";
import styles from "./GroupInUserList.css";
import SockJsClient from "react-stomp";

export default class GroupInUserList extends React.Component {
    constructor() {
        super(...arguments)
        this.state = {
            groupInUserList: this.props.groupInUserList
        }
    }
    
    userSessionReceive(userSession){

    }

    render() {
        console.log(this.props.users.no[0]);
        const wsSourceUrl = "http://localhost:8080/codingvirus19/api/userList";
        console.log(this.props.groupInUserList);
        return (
            <div className={styles.groupUserList}>
                {this.props.groupInUserList.map((element) => {
                    if (this.props.groupInUserList != null) {
                        return (
                            <ul key={element.user_no} className={styles.users}>
                                <button className={styles.userImage}>{element.img}</button>
                                <span className={styles.userNotLogin}></span><br/>
                                <li>{element.nickname}</li>
                            </ul>
                        );
                    }
                })}
                {this.props.users.no[0] != null ? (
                <SockJsClient
                    url={wsSourceUrl}
                    topics={[`api/userList/${this.props.users.no[0]}`]}
                    onMessage={this.userSessionReceive.bind(this)}
                    ref={(client) => { this.clientRef = client; }}>
                </SockJsClient>
                ) : null}
            </div>
        );
    }
}