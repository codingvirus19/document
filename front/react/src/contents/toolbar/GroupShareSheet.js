import React from "react";

import CreatableSelect from 'react-select/creatable';

import styles from "./Sheets.css";

const API_URL = "http://localhost:8080/codingvirus19";
const API_HEADERS = {
    "Content-Type": "application/json",
};

export default class GroupShareSheet extends React.Component {

    constructor() {
        super(...arguments);
        this.state = {
            g_noUpdate: '',
            currentG_no: null,
            groups: this.props.g_name.map(element => {
                return {
                    value: element,
                    label: element
                }
            }),
            addElement: null
            // 다 삭제 안되는 오류
        }
    }

    addGroup(event) {
        if (event.__isNew__) {
            this.setState({
                addElement: event.label
            })
            console.log(event.label);
            let data = {
                name: event.label
            };
            console.log(data);
            fetch(`${API_URL}/api/addGroup`, {
                method: "post",
                headers: API_HEADERS,
                body: JSON.stringify(data)
            })
                .then((response) => response.json())
                .then((json) => {
                    this.setState({
                        result: json.data,
                    });
                })
                .catch((err) => console.error(err));
        }
    }

    render() {
        return (
            <div
                className={styles.groupShareSheet}
                ref={this.props.refChange}>
                <div className={styles.container}>
                    <div className={styles.title}>공유할 그룹</div>
                    <div className={styles.contents}>
                        <CreatableSelect
                            autoFocus={true}
                            className={styles.select}
                            defaultMenuIsOpen={true}
                            closeMenuOnSelect={false}
                            menuIsOpen={true}
                            onChange={this.addGroup.bind(this)}
                            maxMenuHeight={50}
                            options={this.state.groups}
                            placeholder="공유할 그룹 선택"
                        />
                    </div>
                </div>
                <div className={styles.btns}>
                    <button
                        type="submit"
                        className={styles.confirm_btn}>공유하기</button>
                    <button
                        className={styles.cancel_btn}
                        onClick={this.props.closeGroupShareSheet}>
                        취소
              </button>
                </div>
            </div >
        );
    }
}