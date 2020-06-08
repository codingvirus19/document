import React, { Fragment } from "react";
import styles from "./Alarm.css";
import popupStyles from "../Popup2.css";

const API_URL = "http://localhost:8080/codingvirus19";
const API_HEADERS = {
  "Content-Type": "application/json",
};

export default class AlarmAddGroup extends React.Component {
    constructor() {
        super(...arguments)
        this.state = {
            groupNo: this.props.addgroup_alarm.group_no
        }
    }

    joinGroup() {
        let data = { gNo: this.state.groupNo };
        fetch(`${API_URL}/api/alarmGroupJoin`, {
            method: "post",
            headers: API_HEADERS,
            body: JSON.stringify(data),
        })
    }
    // joinCancelGroup(){
    //     null;
    // }

    render() {
        return (
            <div className={styles.alarmLine}>
                <li>{this.props.addgroup_alarm.message}</li>
                <h5>{this.props.addgroup_alarm.date}</h5>
                <button className={popupStyles.confirm_btn}
                    onClick={this.joinGroup.bind(this)} >
                    수락</button>
                <button onClick={this.joinCancelGroup.bind(this)} className={popupStyles.cancel_btn}>취소</button>
            </div>
        );
    }
}