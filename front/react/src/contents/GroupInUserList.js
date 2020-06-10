import React, { Fragment } from "react";
import styles from "./GroupInUserList.css";
import SockJsClient from "react-stomp";

export default class GroupInUserList extends React.Component {
    constructor() {
        super(...arguments)
        this.state = {
            userlistSession: [],
            groupInUserList: this.props.groupInUserList
        }
    }
    userSessionReceive(userSession) {
        console.log(userSession,"접소오옥");
        this.setState({
            userlistSession: userSession
        });
    }
    render() {
        const wsSourceUrl = "./api/userlist";
        return (
            <div className={styles.groupUserList}>
                {this.props.groupInUserList.map((element) => {
                    if (this.props.groupInUserList != null) {
                        if (this.state.userlistSession.indexOf(element.id) == -1) {
                            return (
                                <ul key={element.user_no} className={styles.users}>
                                    <button className={styles.userImage}>{element.img}</button>
                                    <span className={styles.userNotLogin}></span><br />
                                    <li>{element.nickname}</li>
                                </ul>
                            );
                        } else {
                            return (
                                <ul key={element.user_no} className={styles.users}>
                                    <button className={styles.userImage}>{element.img}</button>
                                    <span className={styles.userInLogin}></span><br />
                                    <li>{element.nickname}</li>
                                </ul>
                            );
                        }

                    }
                })}
                {this.props.users.no[0] != null ? (
                    <SockJsClient
                        url={wsSourceUrl}
                        topics={[`/api/userlist/${this.props.groupBySidebar}`]}
                        onMessage={this.userSessionReceive.bind(this)}
                        ref={(client) => { this.clientRef = client; }}
                        onConnect={() => { this.clientRef.sendMessage(`/app/userlist/${this.props.groupBySidebar}`,this.props.users.no[0]) }}>
                    </SockJsClient>
                ) : null}
            </div>
        );
    }
}