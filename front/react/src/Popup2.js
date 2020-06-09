import React from "react";
import Profile from "./header/headerMemu/Profile";
import GroupAddOrInvite from "./contents/GroupAddOrInvite";
import popupStyles from "./Popup2.css";

const API_URL = "http://localhost:8080/codingvirus19";
const API_HEADERS = {
  "Content-Type": "application/json",
};


export default class Popup2 extends React.Component {

  constructor() {
    super(...arguments);
    this.state = {
     
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

  getModifiedValue(){
    this.ajaxModifyProfile(this.modifyProfile);
  }

  ajaxModifyProfile(_modifyProfile) {
    console.log(_modifyProfile)
    fetch(`${API_URL}/api/profile/modify`, {
      method: "post",
      headers: API_HEADERS,
      body: JSON.stringify(_modifyProfile),
    }).catch((err) => console.error(err));
  }

  GroupAddOrInviteCallBack(groupNo, groupName, userList){
    if(groupNo != null)this.groupNo = groupNo;
    if(groupName != null)this.groupName = groupName;
    if(userList != null)this.userList = userList;
  }

  render() {
    let contents;
    let popup2_confirm_btn = "확인";

    if (this.props.contents === "profile") {
      contents = (
        <Profile
          callBackFromProfile={this.callBackFromProfile.bind(this)}
          getProfileValue={this.props.getProfileValue}
        />
      );
      popup2_confirm_btn = "수정";
    }
    if (this.props.contents === "groupAddOrInvite") {
      contents = (
        <GroupAddOrInvite
          clientRef={this.props.clientRef}
          UpdateGroup={this.props.UpdateGroup}
          group={this.props.group}
          GroupAddOrInviteCallBack={this.GroupAddOrInviteCallBack}
        />
      );
    }

    return (
      <div className={popupStyles.popup2} onClick={this.props.closePopup}>
        <div className={popupStyles.inner} onClick={(e) => e.stopPropagation()}>
          <div className={popupStyles.inner_header}>
            <h1 className={popupStyles.h1}>{this.props.inner_header}</h1>
          </div>

          <div className={popupStyles.inner_form_container}>{contents}</div>

          <div className={popupStyles.btns}>
            <button
              onClick={
                (this.props.contents === "profile") ?  ()=>{this.getModifiedValue();}
                : null}
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
