import React, { Fragment } from "react";
import styles from "./Alarm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import AlarmAddGroup from "./AlarmAddGroup";

const API_URL = ".";
const API_HEADERS = {
    "Content-Type": "application/json",
};
export default class Alarm extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            users: this.props.users,
            alarmDatas: [],
            addGroupAlarm: this.props.addgroup_alarm
        }
    }

    componentDidMount() {
        this.getAlarmList();
    }

    getAlarmList() {
        fetch(`${API_URL}/api/alarmList`, {
            method: "post",
            headers: API_HEADERS
        })
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    alarmDatas: json.data
                });
            })
            .catch((err) => console.error(err));
    }

    joinCancel(cancel) {
        this.setState({
            addGroupAlarm: cancel
        })
    }

    clickAlram(g_no) {
        this.props.SidebarGroupUpdate(g_no);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.addgroup_alarm != null) {
            this.setState({
                addGroupAlarm: nextProps.addgroup_alarm
            })
        }
        if (nextProps.alarm.basic == true) {
            this.getAlarmList();
        }
    }

    alarmDelete(index, e) {
        e.stopPropagation();
        let data = {
            notiNo: this.state.alarmDatas[index].notiNo
        }
        fetch(`${API_URL}/api/alarmDelete`, {
            method: "post",
            headers: API_HEADERS,
            body: JSON.stringify(data)
        })
            .then(() => { this.getAlarmList() })
            .catch((err) => console.error(err));
    }

    render() {
        return (
            <div className={styles.alarm}>
                <h5 className={styles.alarmHeader}>알람목록</h5>
                <ul className={styles.alarmList}>
                    {(this.state.addGroupAlarm != null && this.state.addGroupAlarm.message != "") ?
                        <AlarmAddGroup
                            addGroupAlarm={this.state.addGroupAlarm}
                            joinCancel={this.joinCancel.bind(this)}
                            SidebarGroupUpdate={this.props.SidebarGroupUpdate}
                            AlarmAddGroup={this.props.AlarmAddGroup} />
                        : null}
                    {this.state.alarmDatas.map((content, index) => {
                        return (
                            <div key={index} className={styles.alarmLine} onClick={this.clickAlram.bind(this, content.gNo)}>
                                <div>
                                    <li> {index + 1}. {content.chat} </li>
                                </div>
                                <button
                                    // aria-label="알람 삭제"
                                    onClick={(e) => this.alarmDelete(index, e)}
                                    className={styles.alarmDelete}>
                                    <FontAwesomeIcon className={styles.faTrash} icon={faTrash} />
                                </button>
                                <h6 className={styles.dates}>{content.date} ({content.week})</h6>
                            </div>
                        )
                    })}
                    <p className={styles.alarmPtag}>알람은 최대 10개까지 표시됩니다.</p>
                </ul>
            </div>
        );
    }
}