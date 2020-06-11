import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import styles from "../Toolbar.css";
import Modal from "../../../Modal.js"

import ShareSheet from "../ShareSheet";

const API_URL = ".";
const API_HEADERS = {
  "Content-Type": "application/json",
};

export default class MemoDelete extends React.Component {
  constructor() {
    
    super(...arguments);
    this.state = {
      openModal: false,
      contents: null,
      agreeDelete: false,
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
    // 열려있던 modal을 꺼준다.
    this.setState({
      openModal: false,
    })

    let input_deleteMemo = {
      // memo의 no와 gNo이다.
      no: this.props.no,
      gNo: this.props.gNo,
    };
    this.ajaxDeleteMemo(input_deleteMemo);
  }

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
        console.log(getTrue);
        // delete를 클릭시 쿼리 삭제 전에 콜백에서 메모를 뿌려주기 때문에 실시간으로 작동 x
        // 아래에서 db에서 삭제 진행 완료 후 true신호가 오면 콜백을 보내도록 설정한 코드이다.
        if (getTrue != false) {
          console.log("메모 삭제 동작 완료!");
          this.props.SidebarGroupUpdate(this.props.gNo, this.props.gName);
        }else if(getTrue == false){
          this.setState({
            openModal: !this.state.openModal,
            contents: "메모삭제안됨"
          })
          console.log("다른 User의 메모는 지울 수 없다");
        }
      })
      .catch((err) => console.error(err));

  }

  // 클로즈 콜백함수로 <Modal>을 사용 시 반드시 사용할 것!!!!
  onClickFalse(){
    this.setState({openModal:false,})
}

  // 메모 삭제 toolbar버튼 클릭시 변경되는 setState
  onClickTrue(){
    this.setState({openModal:true, contents: "메모삭제"})
}
  
  render() {
    return (
      <Fragment>
        {/* 메모삭제 */}
        <button
          style={this.props.setStyle}
          className={this.className}
          aria-label="메모 삭제"
          onClick={this.onClickTrue.bind(this)}
        >
          <FontAwesomeIcon className={this.buttonName} icon={faTrashAlt} />
        </button>
        
        {this.state.openModal == true ? <Modal contents={this.state.contents} onClickDelete={this.onClickDelete.bind(this)} onClickFalse={this.onClickFalse.bind(this)} getGroup={this.props.getGroup} groupBySidebar={this.props.groupBySidebar} SidebarGroupUpdate={this.props.SidebarGroupUpdate}/> 
        :null }
      </Fragment>
    );
  }
}
