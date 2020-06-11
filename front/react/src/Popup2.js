import React from "react";
import Profile from "./header/headerMemu/Profile";
import GroupAddOrInvite from "./contents/GroupAddOrInvite";
import popupStyles from "./Popup2.css";

const API_URL = ".";
const API_HEADERS = {
"Content-Type": "application/json",
};

export default class Popup2 extends React.Component {

  constructor() {
    super(...arguments);
    this.state = {
      groupNo: '',
      groupName: '',
      userList: { nickname: [], no: [] }
    };
    this.id = null;
    this.email = null;
    this.password = null;
    this.nickname = null;
    this.image = null;
    this.modifyProfile = null;
  }

  // FileUpload와 profile에서 값이 변경되었을 때 해당 콜백함수에 값이 담긴다.
  callBackFromProfile(_id, _email, _password, _nickname, _image) {
    (_id != null)? this.id= _id :null;
    (_id != null)? this.email= _email :null;
    (_id != null)? this.password= _password :null;
    (_id != null)? this.nickname= _nickname :null;
    (_id != null)? this.image= _image :null;
    
      this.modifyProfile = {
          id: this.id,
          email: this.email,
          password: this.password,
          nickname: this.nickname,
          image: this.image,
      }
  }

  // profile의 현재value or 변경된 value를 modifyProfile에 담고 통신으로 전달. 
  getModifiedValue(){
    this.props.notify("프로필을 수정하였습니다.");
    this.ajaxModifyProfile(this.modifyProfile);
  }

  ajaxModifyProfile(_modifyProfile) {
    console.log(_modifyProfile.image)
    fetch(`${API_URL}/api/profile/modify`, {
      method: "post",
      headers: API_HEADERS,
      body: JSON.stringify(_modifyProfile),
    }).then((response) => response.json())
    .then((json) => {
      let asyncTrue=json.data;
      if(asyncTrue == true){
        this.props.getProfileAjax();
        this.props.closePopup()
      }
    })
    .catch((err) => console.error(err));
  }

  callBackGroupAdd() {
    if (this.state.userList != undefined && this.state.userList.no[0] != '') {
      this.props.notify(`${this.state.userList.nickname.map(element=>element)} 를 ${this.state.groupName} 그룹에 초대하였습니다.`);
      this.state.userList.no.map((element, index) => {
        this.props.clientRef.sendMessage("/app/alarm/" + this.state.userList.no[index],
          JSON.stringify({
            gNo: this.state.groupNo,
            chat: this.state.groupName + " 그룹에 초대되었습니다.",
            groupName : this.state.groupName,
            date: new Date(),
            type: true,
            readCheck: true,
            addgroup: true
          }))
      })
      this.props.closePopup()
    }
  }

  GroupAddOrInviteCallBack(groupNo, groupName) {
    this.setState({
      groupNo: groupNo,
      groupName: groupName
    })
  }
  UserAddOrInviteCallBack(userList) {
    this.state.userList.nickname = [];
    this.state.userList.no = [];
    userList.map((index) => {
      this.state.userList.nickname.push(index.value)
      this.state.userList.no.push(index.no)
    })
  }

  render() {
    let contents;
    let popup2_confirm_btn = "확인";

    if (this.props.contents === "profile") {
      contents = (
        <Profile 
          callBackFromProfile={this.callBackFromProfile.bind(this)}
          ClickGetProfileValue={this.props.ClickGetProfileValue}
        />
      );
      popup2_confirm_btn = "수정";
    }
    if (this.props.contents === "groupAddOrInvite") {
      contents = (
        <GroupAddOrInvite
        notify={this.props.notify}
          getGroup={this.props.getGroup}
          group={this.props.group}
          groups={this.props.group.gname.map((gname, index) => {
            return {
              value: gname,
              label: gname,
              no: this.props.group.no[index]
            }
          })}
          GroupAddOrInviteCallBack={this.GroupAddOrInviteCallBack.bind(this)}
          UserAddOrInviteCallBack={this.UserAddOrInviteCallBack.bind(this)}
        />
      );
    }

    return (
      <div className={popupStyles.popup2} onClick={this.props.closePopup}>
        <div className={popupStyles.inner} onClick={(e) => e.stopPropagation()}>
          <div className={popupStyles.inner_header}>
            <h1 className={popupStyles.h1}>{this.props.inner_header}</h1>
          </div>

          <div className={popupStyles.inner_form_container}>
            {contents}
            </div>

          <div className={popupStyles.btns}>
            <button
              onClick={
                (this.props.contents === "profile") ? ()=>{this.getModifiedValue()}
                : this.callBackGroupAdd.bind(this)}
              className={popupStyles.confirm_btn}>
              {popup2_confirm_btn}
            </button>
            <button
              className={popupStyles.cancel_btn}
              onClick={this.props.closePopup}>
              닫기
            </button>
          </div>
        </div>
      </div>
    );
  }
}
