import React from "react";

import Popup2 from "../Popup2"
import styles from "./ContentsHeader.css"

export default class ContentsHeader extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      ShowGroupAddOrInvite: false,
    }
  }

  toggleGroupAddOrInvite() {
    this.setState({
      ShowGroupAddOrInvite: !this.state.ShowGroupAddOrInvite
    });
  }

  render() {
    return (
      <div className={styles.header}>

        <div className={styles.title}>
          <h3>{`< 개인1 >`}</h3>
        </div>
        <div className={styles.showinglist}>
          <button
            className="contents-header__btns"
            aria-label="보기방식 변환">
            <i className="fas fa-bars"></i>
          </button>
        </div>

        <div
          className={styles.addgroup}
          aria-label="그룹 추가(잘모르겠어요)">
          <button className="contents-header__btns">
            <i className="fas fa-folder-plus"></i>
          </button>
        </div>

        <div className={styles.invite}>
          <button
            className={styles.btns}
            aria-label="그룹생성"
            onClick={this.toggleGroupAddOrInvite.bind(this)}>
            <i className="fas fa-user-plus"></i>
          </button>
          {this.state.ShowGroupAddOrInvite ? (
          // { true ? (
            <Popup2
              inner_header="그룹생성 및 초대"
              contents={'groupAddOrInvite'}
              closePopup={this.toggleGroupAddOrInvite.bind(this)} 
              g_no={this.props.g_no} g_name={this.props.g_name}/>
          ) : null}
        </div>


      </div>
    );
  }
}
