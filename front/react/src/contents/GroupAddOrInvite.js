import React from "react";
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import styles from '../Popup2.css';

const API_URL = "http://localhost:8080/codingvirus19";
const API_HEADERS = {
    "Content-Type": "application/json",
};
const selectStyles = {
    multiValue: (base, state) => {
        return state.data.isFixed ? { ...base, backgroundColor: 'gray' } : base;
    },
    multiValueLabel: (base, state) => {
        return state.data.isFixed
            ? { ...base, fontWeight: 'bold', color: 'white', paddingRight: 6 }
            : base;
    },
    multiValueRemove: (base, state) => {
        return state.data.isFixed ? { ...base, display: 'none' } : base;
    },
};

export default class GroupAddOrInvite extends React.Component {
    constructor() {
        super(...arguments);
        this.groupfocus = React.createRef();

        this.state = {
            group: this.props.group,
            users: [],
            // groupUsers: null,
            selectGroupName: null,
            selectGroupNo: null,
            selectUsers: null,
            countUser: null,
            userfocus: false,
        }
    }

    handleOnChange(event) {
        //그룹 선택시 선택했던 사용자 초기화
        // this.setState({ selectUsers: null })
        // 그룹 추가
        if (event.__isNew__) {
            this.addGroup(event)
        }
        ////////////////일단 그룹 클릭시 가져오는 no 부분
        this.props.GroupAddOrInviteCallBack(event.no, event.value)
        ///////////////////////////////////
        this.setState({
            selectGroupName: event.value,
            selectGroupNo: event.no
        })
        //그룹에 없는 사용자 가져오는 함수 
        this.getUserListNotInGroup(event.no)
        //그룹에 있는 사용자 가져오는 함수
        this.getUserListByGroup(event.no)
        //그룹 인원이 4명 미만이면 사용자 추가 열고 넘으면 닫기
        this.countUserByGroup(event.no)
    }

    addGroup(event) {
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
                this.props.GroupAddOrInviteCallBack(group.no[0], group.gname[0])
                this.props.getGroup();
                return;
            })
            .catch((err) => console.error(err));
    }

    getUserListNotInGroup(no) {
        let userDatas = null;
        let users = { value: '', label: '', no: '' };
        let data = { no: no }
        fetch(`${API_URL}/api/getUserListNotInGroup`, {
            method: "post",
            headers: API_HEADERS,
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((json) => {
                userDatas = json.data;
                users = userDatas.map((element) => {
                    return {
                        value: element.nickname,
                        label: element.nickname,
                        no: element.no,
                    }
                });
                this.UpdateUser(users);
            })
            .catch((err) => console.error(err));
    }

    getUserListByGroup(no) {
        let userDatas = null;
        let users = { value: '', label: '', no: '' };
        let data = { no: no }
        fetch(`${API_URL}/api/getUserListByGroup`, {
            method: "post",
            headers: API_HEADERS,
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((json) => {
                userDatas = json.data;
                users = userDatas.map((element) => {
                    return {
                        value: element.nickname,
                        label: element.nickname,
                        no: element.no,
                        isFixed: true
                    }
                });
                this.UpdateSelectUser(users);
            })
            .catch((err) => console.error(err));
    }

    countUserByGroup(no) {
        let data = { no: no }
        let countUser = null;
        fetch(`${API_URL}/api/countUserByGroup`, {
            method: "post",
            headers: API_HEADERS,
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((json) => {
                countUser = json.data
                this.setState({
                    countUser: countUser
                })
                if (countUser < 4) {
                    this.setState({
                        userfocus: true
                    })
                }
                else {
                    this.setState({
                        userfocus: false
                    })
                }
            })
            .catch((err) => console.error(err));
    }

    addUser(event, { action, removedValue }) {
        // console.log(action)
        // console.log(removedValue)
        //event.length 오류때문에 잡아줌
        if (event === null) {
            event = [];
        }
        //그룹 미선택시 사용자 추가 X
        if (this.state.selectGroupNo == null) {
            this.groupfocus.current.focus(true);
        }
        //그룹내 존재하는 사용자 4명 넘으면 추가 X
        else if (event.length >= 4) {
            this.setState({ userfocus: false })
        }
        else {
            this.setState({ userfocus: true })
        }
        //선택한 사용자 추가
        if(event != []) {
            this.setState({
                selectUsers: event
            })
        }
    }

    UpdateUser(users) {
        this.setState({
            users: users
        })
    }

    UpdateSelectUser(users) {
        this.setState({
            selectUsers: users
        })
    }

    render() {
        console.log("aaaaa")
        console.log(this.state.selectUsers)
        if (this.state.selectUsers != null) {
            this.props.UserAddOrInviteCallBack(this.state.selectUsers)
        }
        return (
            <>
                <div className={styles.inner_form_component}>
                    <span className={styles.inner_form_container_title}>그룹이름</span>
                    <CreatableSelect
                        autoFocus={true}
                        ref={this.groupfocus}
                        className={styles.inner_select}
                        defaultMenuIsOpen={true}
                        closeMenuOnSelect={false}
                        menuIsOpen={true}
                        onChange={this.handleOnChange.bind(this)}
                        maxMenuHeight={120}
                        options={this.props.groups}
                        placeholder="그룹선택 및 생성할 그룹이름 입력"
                    />
                </div>
                <div className={styles.inner_form_component}>
                    <span className={styles.inner_form_container_title}>초대할 사용자 (최대 4명)</span>
                    <Select
                        value={this.state.selectUsers}
                        className={styles.inner_select}
                        isMulti
                        defaultMenuIsOpen={true}
                        closeMenuOnSelect={false}
                        menuIsOpen={this.state.userfocus}
                        onChange={this.addUser.bind(this)}
                        maxMenuHeight={120}
                        options={this.state.users}
                        placeholder="그룹 선택시 사용자 선택 가능"
                        styles={selectStyles}
                    />
                </div>
            </>
        );
    }
}
