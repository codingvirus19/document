import React, { Fragment } from "react";
import styles from "./Chat.css";
import ChatRoom from "./ChatRoom"
export default class Contents extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            chatOpen: false,
            gNo: ''
        }
    }
    open(e) {
        this.setState({
            chatOpen: !this.state.chatOpen,
            gNo: this.props.group.no[e.target.id],
            gName: this.props.group.gname[e.target.id]
        })
    }
    close(){
        this.setState({
            chatOpen: false
        })
    }

    render() {
        return (
            <Fragment>
                <div className={styles.ChatBox}>
                    {(this.state.chatOpen) ? <ChatRoom gNo={this.state.gNo} gName={this.state.gName} users={this.props.users} close={this.close.bind(this)} /> :
                        (this.props.group.gname.map((gname, index) => {
                                return (
                                    <div className={styles.chatList} id={index} key={index} onClick={this.open.bind(this)}>{gname}
                                    </div>
                                )
                            })
                        )
                    }
                </div>
            </Fragment>
        )
    }
}