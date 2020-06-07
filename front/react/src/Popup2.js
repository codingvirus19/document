import React from "react";
import Profile from "./header/headerMemu/Profile";
import GroupAddOrInvite from "./contents/GroupAddOrInvite";
import popupStyles from "./Popup2.css";

const API_URL = "http://localhost:8080/codingvirus19";
const API_HEADERS = {
  "Content-Type": "application/json",
};

export default class Popup2 extends React.Component {
  callBackFromProfile(_id, _email, _password, _nickname, _image) {
    if (
      _id != null &&
      _email != null &&
      _password != null &&
      _nickname != null &&
      _image != null
    ) {
      let modifyProfile = {
        id: _id,
        email: _email,
        password: _password,
        nickname: _nickname,
        image: _image,
      };
      this.getModifiedValue(modifyProfile)
    }
  }

  getModifiedValue(modifyProfile){
    this.ajaxModifyProfile(modifyProfile);
  }

  ajaxModifyProfile(_modifyProfile) {
    console.log(_modifyProfile)
    fetch(`${API_URL}/api/profile/modify`, {
      method: "post",
      headers: API_HEADERS,
      body: JSON.stringify(_modifyProfile),
    }).catch((err) => console.error(err));
  }

  callBackGroupAdd(){
    console.log(this.groupNo, this.groupName, this.userList);
    // if(this.userList[0].no != null && this.groupNo != null){
    //   this.userList.map((index) => {
    //     this.props.clientRef.sendMessage("/app/alarm" + this.userList[index].no,
    //       JSON.stringify({
    //         gNo : this.groupNo,
    //         chat : this.groupName + " 그룹에 초대되었습니다.",
    //         date: new Date(),
    //         type: true,
    //         readCheck: true,
    //         addgroup: true
    //       })
    //     )
    //   })
    //   this.props.closePopup;
    // }
    // else if(this.userList[0].no == ''){
    //   console.log("사용자를 선택해 주세요")
    // }
  }

  GroupAddOrInviteCallBack(groupNo, groupName, userList){
    if(groupNo != null)this.groupNo = groupNo;
    if(groupName != null)this.groupName = groupName;
    if(userList != null)this.userList = userList;

    // console.log(this.groupNo, this.groupName, this.userList);
  }

  render() {
    console.log(this.props.getProfileValue)
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
          UpdateGroup={this.props.UpdateGroup}
          group={this.props.group}
          GroupAddOrInviteCallBack={this.GroupAddOrInviteCallBack.bind(this)}
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
                (this.props.contents === "profile") ? this.getModifiedValue.bind(this) && this.props.closePopup
                : this.callBackGroupAdd.bind(this)}
              className={popupStyles.confirm_btn}>
              {popup2_confirm_btn}
            </button>
            <button
              className={popupStyles.cancel_btn}
              onClick={this.props.closePopup}>
              취소
            </button>
          </div>
        </div>
      </div>
    );
  }
}
