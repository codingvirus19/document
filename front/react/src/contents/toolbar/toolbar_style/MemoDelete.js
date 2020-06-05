import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import styles from "../Toolbar.css";

import ShareSheet from "../ShareSheet";

const API_URL = "http://localhost:8080/codingvirus19";
const API_HEADERS = {
  "Content-Type": "application/json",
};

export default class MemoDelete extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      no: this.props.no,
      gNo: this.props.gNo,
      gName: this.props.gName,
    };
    if(this.props.className != null){
      this.className = this.props.className; 
    }else{
      this.className = styles.tool
    }
    if(this.props.buttonName != null){
      this.buttonName = this.props.buttonName; 
    }else{
      this.buttonName = styles.faTrashAlt;
    }


  }

  // delete기능
  onClickDelete(e) {
    e.preventDefault();
    let input_deleteMemo = {
      // memo의 no와 gNo이다.
      no: this.state.no,
      gNo: this.state.gNo,
    };
    console.log(input_deleteMemo);
    this.ajaxDeleteMemo(input_deleteMemo);
  }
  // delete기능

  ajaxDeleteMemo(_deleteMemo) {
    let getTrue = null;
    fetch(`${API_URL}/api/memo/delete`, {
      method: "post",
      headers: API_HEADERS,
      body: JSON.stringify(_deleteMemo),
    })
      .then((response) => response.json())
      .then((json) => {
        getTrue = json.data;
        // delete를 클릭시 쿼리 삭제 전에 콜백에서 메모를 뿌려주기 때문에 실시간으로 작동 x
        // 아래에서 db에서 삭제 진행 완료 후 true신호가 오면 콜백을 보내도록 설정한 코드이다.
        if (getTrue != false) {
          this.props.SidebarGroupUpdate(this.state.gNo, this.state.gName);
        }
      })
      .catch((err) => console.error(err));

    // 해야할 것(dongeun)0530 맨처음 delete시 작동안됨 오류 수정 필요!
  }

  render() {
    return (
      <Fragment>
        {/* 메모삭제 */}
        {/* {this.props.SidebarGroupUpdate(this.state.no, this.state.gNo)} */}
        <button
          style={this.props.setStyle}
          className={this.className}
          aria-label="메모 삭제"
          onClick={this.onClickDelete.bind(this)}
        >
          <FontAwesomeIcon className={this.buttonName} icon={faTrashAlt} />
        </button>
      </Fragment>
    );
  }
}
