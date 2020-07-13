import React, { Fragment } from "react";
import styles from "./GroupInUserList.css";


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
    shouldComponentUpdate(prev){
        console.log(prev.groupInUserList);
        if(prev.groupInUserList.length == 0 ){
            return false;
        }else{
            return true;
        }
    }
    render() {
        return (
            <div className={styles.groupUserList}>
                {this.props.groupInUserList.map((element) => {
                    if (this.props.groupInUserList != null) {
                        if (this.props.userlistSession.indexOf(element.id) == -1) {
                            return (
                                <ul key={element.user_no} className={styles.users}>
                                    <li>
                                        <button className={styles.userImage}>
                                            <img className={styles.userImage} src={"."+element.img} />
                                        </button>
                                        <span className={styles.userNotLogin}></span><br />

                                        <p>{element.nickname}</p>
                                    </li>
                                </ul>
                            );
                        } else {
                            return (
                                <ul key={element.user_no} className={styles.users}>
                                    <li>
                                        <button className={styles.userImage}>
                                            <img className={styles.userImage} src={"."+element.img} />
                                        </button>
                                        <span className={styles.userInLogin}></span><br />
                                        <p>{element.nickname}</p>
                                    </li>
                                </ul>
                            );
                        }
                    }
                })}
                {/* 로그인한 유저 no */}
            </div>
        );
    }
}