import React, { Fragment } from "react";
import styles from "./Alarm.css";

const API_URL = "http://localhost:8080/codingvirus19";
const API_HEADERS = {
  "Content-Type": "application/json",
};
export default class Alarm extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            users: this.props.users,
            alarmDatas : []
        }
    }
    componentDidMount() {
        fetch(`${API_URL}/api/alarmList`, {
            method: "post",
            headers: API_HEADERS
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json.data);
                this.setState({
                    alarmDatas : json.data
                });
            })
            .catch((err) => console.error(err));
    }

    render() {
        console.log(this.state.alarmDatas)
        return (
            <div className={styles.alarm}>
                <h6 className={styles.alarmHeader}>알람목록</h6>
                <ul className={styles.alarmList}>
                    {this.state.alarmDatas.map((content, index) => {
                        return (
                            <div key={index} className={styles.alarmLine}>
                                <li>{index+1}. {content.chat}</li>
                                <h5>{content.date}</h5>
                            </div>
                        )
                    })}
                </ul>
            </div>
        );
    }
}