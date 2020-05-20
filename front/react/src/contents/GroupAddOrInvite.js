import React from "react";

import CreatableSelect from 'react-select/creatable';
import Select from 'react-select'

const API_URL = "http://localhost:8080/codingvirus19";
const API_HEADERS = {
  "Content-Type": "application/json",
};

export default class GroupAddOrInvite extends React.Component {
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
            users: [
                { value: '사용자1', label: '사용자1' },
                { value: '사용자2', label: '사용자2' },
                { value: '사용자3', label: '사용자3' },
                { value: '사용자4', label: '사용자4' }
            ],
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
            let data={
                name:event.label
            };
            console.log(data);
            fetch(`${API_URL}/api/addGroup`, {
                method: "post",
                headers: API_HEADERS,
                data:JSON.stringify(data)
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

    addUser(event) {
        // console.log(event);
        // // console.log(event.label);
        // this.setState({
        //     addElement: event.label
        // })
        // this.setState({
        //     users: event.map(element => {
        //         return {
        //             value: element.label,
        //             label: element.label
        //         }
        //     })
        // })
    }

    render() {
        // console.log(this.state.groups)
        // console.log(this.state.addElement)
        return (
            <>
                <div className="inner_form-component">
                    <span className="inner_form-container-title">그룹이름</span>
                    <CreatableSelect
                        autoFocus={true}
                        className="popup2_inner_select"
                        defaultMenuIsOpen={true}
                        closeMenuOnSelect={false}
                        menuIsOpen={true}
                        onChange={this.addGroup.bind(this)}
                        maxMenuHeight={120}
                        options={this.state.groups}
                        placeholder="그룹선택"
                    />
                </div>
                <div className="inner_form-component">
                    <span className="inner_form-container-title">초대할 사용자</span>
                    <Select
                        className="popup2_inner_select"
                        isMulti
                        defaultMenuIsOpen={true}
                        closeMenuOnSelect={false}
                        menuIsOpen={true}
                        onChange={this.addUser.bind(this)}
                        maxMenuHeight={120}
                        options={this.state.users}
                        placeholder="사용자 선택"
                    />
                </div>
            </>
        );
    }
}
