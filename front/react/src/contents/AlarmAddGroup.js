import React, { Fragment } from "react";
import styles from "./Alarm.css";
import popupStyles from "../Popup2.css";

const API_URL = ".";
const API_HEADERS = {
  "Content-Type": "application/json",
};

export default class AlarmAddGroup extends React.Component {
    constructor() {
        super(...arguments)
        this.state = {
            groupNo: this.props.addGroupAlarm.group_no,
            addGroupAlarm : this.props.addGroupAlarm
        }
    }

    joinGroup() {
        
        let data = { gNo: this.state.groupNo };
        fetch(`${API_URL}/api/alarmGroupJoin`, {
            method: "post",
            headers: API_HEADERS,
            body: JSON.stringify(data),
        })
        .then(()=> this.props.AlarmAddGroup())
        .then(()=> this.props.SidebarGroupUpdate(this.state.addGroupAlarm.group_no,
                   this.state.addGroupAlarm.group_name ))
        this.joinCancelGroup();
    }
    joinCancelGroup(){
        this.props.joinCancel(null);
    }

    render() {
        return (
            <div className={styles.alarmLine}>
                <li>{this.state.addGroupAlarm.message}</li>
                <h5>{this.state.addGroupAlarm.date}</h5>
                <button className={popupStyles.confirm_btn}
                    onClick={this.joinGroup.bind(this)} >
                    수락</button>
                <button onClick={this.joinCancelGroup.bind(this)} className={popupStyles.cancel_btn}>취소</button>
            </div>
        );
    }
}