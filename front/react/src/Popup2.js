import React from "react";

import Profile from "./header/headerMemu/Profile";
import GroupAddOrInvite from "./contents/GroupAddOrInvite";

import popupStyles from "./Popup2.css";

export default class Popup2 extends React.Component {
  callBackFromProfile(no, id, email, password, nickname, image) {
    console.log(no);
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
      contents = <GroupAddOrInvite group={this.props.group} />;
    }

    return (
      <div className={popupStyles.popup2} onClick={this.props.closePopup}>
        <div className={popupStyles.inner} onClick={(e) => e.stopPropagation()}>
          <div className={popupStyles.inner_header}>
            <h1 className={popupStyles.h1}>{this.props.inner_header}</h1>
          </div>

          <div className={popupStyles.inner_form_container}>{contents}</div>

          <div className={popupStyles.btns}>
            <button className={popupStyles.confirm_btn}>
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
