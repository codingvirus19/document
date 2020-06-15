import React, { Fragment } from "react";
import ChatList from "./ChatList"
import styles from "./Chat.css";

export default class Chat extends React.Component {

  render() {
    // 여기서 통신하고싶은데 무한 렌더링.. 
    // 라이프 사이클 이용하고 싶은데 일단 보류 
    // 걍 container componentDidMount에 넣음
    // this.props.getUserListInGroupByUser(this.props.users.no[0])
      return (
        <Fragment>
          {(true) ?
            <ChatList
              chatListGroup={this.props.chatListGroup}
              users={this.props.users}
              clientRef={this.props.clientRef}
              userListInGroupByUser={this.props.userListInGroupByUser}
              chatAlarmNotReceive={this.props.chatAlarmNotReceive}/>
            : <div></div>}
        </Fragment>
      );
    }
}