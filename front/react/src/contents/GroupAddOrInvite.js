import React from "react";

import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import styles from '../Popup2.css';

const API_URL = "http://localhost:8080/codingvirus19";
const API_HEADERS = {
    "Content-Type": "application/json",
};

export default class GroupAddOrInvite extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            group: this.props.group,
            groups: this.props.group.gname.map(gname => {
                return {
                    value: gname,
                    label: gname
                }
            }),
            users: [
                { value: '사용자1', label: '사용자1' },
                { value: '사용자2', label: '사용자2' },
                { value: '사용자3', label: '사용자3' },
                { value: '사용자4', label: '사용자4' }
            ]
        }
        // 다 삭제 안되는 오류
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("shouldComponentUpdate");
        if (nextProps != nextState) {
            console.log("update")
            return true;
        }
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("componentDidUpdate");
        console.log(prevProps);
        console.log(prevState);
        const { group, UpdateGroup } = this.props;
        console.log(group);
        console.log(UpdateGroup);

    }

    addGroup(event) {
        if (event.__isNew__) {
            let data = {
                name: event.label
            };
            let group = { no: [], gname: [] };
            fetch(`${API_URL}/api/addGroup`, {
                method: "post",
                headers: API_HEADERS,
                body: JSON.stringify(data)
            })
                .then((response) => response.json())
                .then((json) => {
                    group.no.push(json.data.no);
                    group.gname.push(json.data.name);
                    this.groupAdd(group);
                    // this.getDerivedStateFromProps(group);
                })
                .catch((err) => console.error(err));
        }

    }

    groupAdd(group) {
        this.setState({
            group: {
                no: this.state.group.no.concat(group.no),
                gname: this.state.group.gname.concat(group.gname)
            }
        })
        this.props.UpdateGroup(this.state.group);
    }

    // componentWillReceiveProps(nextProps){
    //     console.log("componentWillReceiveProps");
    //     console.log(nextProps);
    // }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return true;
    // }
    // UpdateGroup(group) {
    //     this.setState({
    //       group: this.state.group.concat(group)
    //     });
    //   }

    addUser(event) {
    }

    render() {
        return (
            <>
                <div className={styles.inner_form_component}>
                    <span className={styles.inner_form_container_title}>그룹이름</span>
                    <CreatableSelect
                        autoFocus={true}
                        className={styles.inner_select}
                        defaultMenuIsOpen={true}
                        closeMenuOnSelect={false}
                        menuIsOpen={true}
                        onChange={this.addGroup.bind(this)}
                        maxMenuHeight={120}
                        options={this.state.groups}
                        placeholder="그룹선택 및 생성할 그룹이름 입력"
                    // deleteRemoves={true}
                    />
                </div>
                <div className={styles.inner_form_component}>
                    <span className={styles.inner_form_container_title}>초대할 사용자</span>
                    <Select
                        className={styles.inner_select}
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
