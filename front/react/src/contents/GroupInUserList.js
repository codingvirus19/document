import React, { Fragment } from "react";
import styles from "./GroupInUserList.css";
import SockJsClient from "react-stomp";

export default class GroupInUserList extends React.Component {
    constructor() {
        super(...arguments)
        this.state = {
            userlistSession: this.props.userlistSession,
            groupInUserList: this.props.groupInUserList
        }
    }
    userSessionReceive(userSession) {
        this.props.getGroupInUser(this.props.groupBySidebar);
        this.setState({
            userlistSession: userSession
        });
    }
    render() {
        return (
            <div className={styles.groupUserList}>
                {this.props.groupInUserList.map((element) => {
                    if (this.props.groupInUserList != null) {
                        console.log(this.props.userlistSession);
                        if (this.props.userlistSession.indexOf(element.id) == -1) {
                            return (
                                <ul key={element.user_no} className={styles.users}>
                                    <button className={styles.userImage}>
                                        <img className={styles.userImage} src={"."+element.img} />
                                        </button>
                                    <span className={styles.userNotLogin}></span><br />
                                    <li>{element.nickname}</li>
                                </ul>
                            );
                        } else {
                            return (
                                <ul key={element.user_no} className={styles.users}>
                                    <button className={styles.userImage}>
                                    <img className={styles.userImage} src={"."+element.img} />
                                    </button>
                                    <span className={styles.userInLogin}></span><br />
                                    <li>{element.nickname}</li>
                                </ul>
                            );
                        }
                    }
                })}
                {/* 로그인한 유저 no */}

                {/* {this.props.users.no[0] != null ? (
                    <SockJsClient
                        url={wsSourceUrl}
                        topics={[`/api/userlist/${this.props.groupBySidebar}`]}
                        onMessage={this.userSessionReceive.bind(this)}
                        ref={(client) => { this.clientRef = client; }}
                        // this.props.clientRef.sendMessage(`/app/userlist/disconnect/${this.tempGno}`, this.props.users.no[0]);
                        // this.props.clientRef.sendMessage(`/app/userlist/connect/${g_no}`, this.props.users.no[0]);
                        onConnect={() => { this.clientRef.sendMessage(`/app/userlist/connect/${this.props.groupBySidebar}`, this.props.users.no[0]) }}>
                    </SockJsClient>
                ) : null} */}
            </div>
        );
    }
}