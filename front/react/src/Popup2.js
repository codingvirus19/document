import React from "react";
import Profile from "./header/Profile"
import GroupAddOrInvite from "./contents/GroupAddOrInvite";

export default class Popup2 extends React.Component {

  render() {

    let contents;
    let popup2_confirm_btn = "확인"

    if (this.props.contents === 'profile') {
      contents = <Profile />;
      popup2_confirm_btn = "수정"
    }
    if (this.props.contents === 'groupAddOrInvite') {
      contents = <GroupAddOrInvite />
    }

    return (
      <div className="popup2" onClick={this.props.closePopup}>
        <div
          className="inner"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="inner-header">
            <h1 className="popup2_h1">{this.props.inner_header}</h1>
          </div>
          <div className="inner_form-container">
            {contents}
          </div>
          <div className="popup2_btns">
            <button className="popup2_confirm-btn">{popup2_confirm_btn}</button>
            <button
              className="popup2_cancel-btn"
              onClick={this.props.closePopup}>
              취소
  </button>
          </div>
        </div>
      </div>
    );
  }
}
