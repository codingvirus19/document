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
      this.ajaxModifyProfile(modifyProfile);
    }
  }

  ajaxModifyProfile(_modifyProfile) {
    fetch(`${API_URL}/api/profile/modify`, {
      method: "post",
      headers: API_HEADERS,
      body: JSON.stringify(_modifyProfile),
    }).catch((err) => console.error(err));
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
          UpdateGroup={this.props.UpdateGroup}
          group={this.props.group}
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
                this.callBackFromProfile.bind(this) && this.props.closePopup
              }
              className={popupStyles.confirm_btn}
            >
              {popup2_confirm_btn}
            </button>
            <button
              className={popupStyles.cancel_btn}
              onClick={this.props.closePopup}
            >
              취소
            </button>
          </div>
        </div>
      </div>
    );
  }
}
