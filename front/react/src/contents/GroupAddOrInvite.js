import React from "react";
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import { ToastContainer, toast, Slide } from "react-toastify";
import "../ReactToastify.scss";
import styles from '../Popup2.css';

const API_URL = ".";
const API_HEADERS = {
    "Content-Type": "application/json",
};
const selectStyles = {
    multiValue: (base, state) => {
        return state.data.isFixed ? { ...base, backgroundColor: 'blue' } : base;
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
            //선택한 그룹에 있는 유저 뺀 나머지 유저(초대 가능한 유저)
            users: [],
            //각 그룹의 유저
            groupUsers: null,
            // selectGroupName: null,
            selectGroupNo: null,
            //user select에서 새로 선택된 유저(초대할 유저)
            selectUsers: null,
            //선택한 그룹의 유저 수 (4명 제한에 필요)
            userfocus: false,
            //user select의 value값
            valueUsers: null,
        }
    }

    notify(message) {
        toast(message, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
        })
    }

    handleOnChange(event) {
        // 그룹 추가
        if (event.__isNew__) {
            //그룹 10개 이하  생성 가능
            if(this.props.groups.length < 50) {
            this.addGroup(event)
            }
            else {
                this.notify("그룹생성 실패! 그룹은 최대 50개까지 생성 가능 합니다.")
            }
        }
        else {
            ////////////////일단 그룹 클릭시 가져오는 no 부분
            this.props.GroupAddOrInviteCallBack(event.no, event.value)
            this.setState({
                // selectGroupName: event.value,
                selectGroupNo: event.no
            })
            //그룹에 없는 사용자 가져오는 함수 
            this.getUserListNotInGroup(event.no)
            //그룹에 있는 사용자 가져오는 함수
            this.getUserListByGroup(event.no)
        }
    }

    addGroup(event) {
        let data = {
            name: event.label
        };
        //그룹 글자수 제한 8자
        if (data.name.length > 8) {
            this.notify("그룹명이 너무 깁니다.(8자 제한)")
            return;
        }
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
                this.setState({
                    // selectGroupName: event.value,
                    selectGroupNo: group.no[0]
                })
                //그룹에 없는 사용자 가져오는 함수 
                this.getUserListNotInGroup(group.no[0])
                //그룹에 있는 사용자 가져오는 함수
                this.getUserListByGroup(group.no[0])
                this.notify(`${group.gname[0]} 그룹이 생성되었습니다.`)
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
                if(json.data == null){
                    return {
                        value: null,
                        label: null,
                        no: null,
                    }
                }
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
                let countUser = users.length;
                //그룹내 사용자 4명 미만이면 사용자 열기
                if (countUser < 4) {
                    this.setState({ userfocus: true })
                }
                else {
                    this.setState({ userfocus: false })
                }
                this.UpdateGroupUser(users);
                this.UpdateValueUser(users);
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
        //그룹내 존재하는 사용자 4명 넘으면 사용자 추가 X
        else if (event.length >= 4) {
            this.setState({ userfocus: false })
        }
        else {
            this.setState({ userfocus: true })
        }
        //선택한 사용자 추가
        if (event != []) {
            this.setState({
                valueUsers: event
            })
            //그룹내 있던 유저 빼고 selectUsers로 세팅
            event = event.filter(event => !event.isFixed)
            this.UpdateSelectUser(event)
        }
    }

    UpdateUser(users) {
        this.setState({
            users: users
        })
    }
    UpdateValueUser(users) {
        this.setState({
            valueUsers: users
        })
    }
    UpdateGroupUser(users) {
        this.setState({
            groupUsers: users
        })
    }
    UpdateSelectUser(users) {
        this.setState({
            selectUsers: users
        })
    }

    render() {
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
                    <span className={styles.inner_form_container_title}>초대할 사용자 (최대 4명, 접속한 사용자)</span>
                    <Select
                        value={this.state.valueUsers}
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
                <ToastContainer
                    position="bottom-right"
                    autoClose={3000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable={false}
                    pauseOnHover
                    transition={Slide}
                />
            </>
        );
    }
}
