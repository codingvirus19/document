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
            users: [{ value: '', label: '' }],
            selectGroup: null,
            selectUsers: null
        }
    }

    componentDidMount() {
        let userDatas = null;
        let users = { value: '', label: '' };
        fetch(`${API_URL}/api/getUserList`, {
            method: "post",
            headers: API_HEADERS,
        })
            .then((response) => response.json())
            .then((json) => {
                userDatas = json.data;

                users = userDatas.map((element) => {
                    return {
                        value: element.nickname,
                        label: element.nickname
                    }
                });
                this.UpdateUser(users);
            })
            .catch((err) => console.error(err));
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (JSON.stringify(nextState) != JSON.stringify(this.state));
    }

    componentDidUpdate(prevProps, prevState) {
        this.props.UpdateGroup(this.state.group);
        this.setState({
            groups: this.state.group.gname.map(gname => {
                return {
                    value: gname,
                    label: gname
                }
            })
        })
    }

    UpdateUser(users) {
        this.setState({
            users: users
        })
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
                })
                .catch((err) => console.error(err));
        }
        this.setState({
            selectGroup: event.value
        })
    }

    groupAdd(group) {
        this.setState({
            group: {
                no: this.state.group.no.concat(group.no),
                gname: this.state.group.gname.concat(group.gname)
            }
        })
    }

    addUser(event) {
        if (event != null) {
            this.setState({
                selectUsers: event.map(event => {
                    return event.value
                })
            })
        }
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
