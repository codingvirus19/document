import React from "react";
import Popup from "./Popup";

export default class HeaderAddMemo extends React.Component {
  constructor() {
    super();
    this.state = {
      showPopup: false,
    };
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }

  render() {
    return (
      <div className="header-addmemo">
        <button
          className="header-memo_btn"
          onClick={this.togglePopup.bind(this)}>
          <i className="fas fa-plus"></i>
        </button>

        {this.state.showPopup ? (
          <Popup 
          closePopup={this.togglePopup.bind(this)} />
        ) : null}
      </div>
    );
  }
}
