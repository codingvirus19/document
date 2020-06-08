import React, { Fragment } from "react";
import styles from "./Alarm.css";
import popupStyles from "../Popup2.css";

export default class ShowAddGroup extends React.Component {
    constructor(){
        super(...arguments)
    }

    joinGroup(){
        
    }

    render() {
        return (
            <div className={styles.alarmLine}>
                <li>{this.props.addgroup_alarmroup.message}</li>
                <h5>{this.props.addgroup_alarmroup.date}</h5>
                <button className={popupStyles.confirm_btn}
                onClick={this.joinGroup.bind(this)}
                >수락</button>
                <button className={popupStyles.cancel_btn}>취소</button>
            </div>
        );
    }
}