import React, { Fragment } from "react";

const API_URL = "http://localhost:8080/codingvirus19";
const API_HEADERS = {
  "Content-Type": "application/json",
};
export default class Alarm extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            users: this.props.users,
            // alarmDatas :{ message: [], date: [] }
            alarmDatas : []
        }
    }
    componentDidMount() {
        // call api
        // let alarmDatas = { message: [], date: [] }
        // let alarmArray = null;
        fetch(`${API_URL}/api/alarmList`, {
            method: "post",
            headers: API_HEADERS
        })
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    alarmDatas : json.data
                });
                // alarmArray = json.data;
                // alarmArray.map((json) => {
                //     alarmDatas.message.push(json.chat),
                //     alarmDatas.date.push(json.date)
                // })
                // this.AlarmContentList(alarmDatas);
                // console.log(alarmDatas);
            })
            .catch((err) => console.error(err));
    }
    AlarmContentList(alarmDatas){
        this.setState({
            alarmDatas:alarmDatas
        })
    }

    render() {
        console.log(this.state.alarmDatas)
        return (
            <div>
                <ul>
                    {this.state.alarmDatas.map((content, index) => {
                        return (
                            <Fragment key={index}>
                                <li>{content.chat}</li>
                                <h5>{content.date}</h5>
                            </Fragment>
                        )
                    })}
                </ul>
            </div>
        );
    }
}