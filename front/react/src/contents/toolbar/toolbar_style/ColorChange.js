import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette } from "@fortawesome/free-solid-svg-icons";
import styles from "../Toolbar.css";
import { TwitterPicker } from "react-color";

const API_URL = ".";
const API_HEADERS = {
  "Content-Type": "application/json",
};

export default class ColorChange extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      displayColorPicker: false,
      color: this.props.color,
    };
    if(this.props.className != null){
      this.className = this.props.className; 
    }else{
      this.className = styles.tool
    }
    if(this.props.buttonName != null){
      this.buttonName = this.props.buttonName; 
    }else{
      this.buttonName = styles.faPalette;
    }
    if(this.props.colorName != null){
      this.colorName = this.props.colorName; 
    }else{
      this.colorName = styles.popover;
    }

  }

  handleClick() {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  }

  handleClose() {
    this.setState({ displayColorPicker: false });
  }

  handleChange(color) {
    this.ajaxChangeColor(color.hex);
    this.setState({
      color: color.hex,
    });
    if(this.props.clientRef != undefined && this.props.users != undefined && this.props.gNo != undefined){
      this.props.clientRef.sendMessage(`/app/memo/update/${this.props.gNo}`,JSON.stringify({update:'update',userNo:this.props.users.no[0]}));
    }
  }

  ajaxChangeColor(_changedColor) {
    let input_color = {
      // 선택한 memo 의 no, color는 바꾸고싶은 색상
      no: this.props.no,
      color: _changedColor,
    };
    let getTrue = null;
    fetch(`${API_URL}/api/memo/changeColor`, {
      method: "post",
      headers: API_HEADERS,
      body: JSON.stringify(input_color),
    })
      .then((response) => response.json())
      .then((json) => {
        getTrue = json.data;
        // colorChange 쿼리 insert 전에 콜백에서 메모를 뿌려주기 때문에 실시간으로 작동 x
        // 아래에서 db에서 삭제 진행 완료 후 true신호가 오면 콜백을 보내도록 설정한 코드이다.
        if (getTrue != false) {
          this.props.SidebarGroupUpdate(this.props.gNo, this.props.gName);
        }
      })
      .catch((err) => console.error(err));
    if(this.props.colorFind != null)this.props.colorFind(_changedColor);
    // 해야할 것(dongeun)0530 맨처음 delete시 작동안됨 오류 수정 필요!
  }

  // 색상변경
  render() {
    return (
      <Fragment>
        {/* 색상변경 */}

        <button
          className={this.className}
          aria-label="색상 변경"
          onClick={this.handleClick.bind(this)}
        >
          <FontAwesomeIcon className={this.buttonName} icon={faPalette} />
        </button>
        {this.state.displayColorPicker ? (
          <div className={this.colorName}>
            <div
              className={styles.cover}
              onClick={this.handleClose.bind(this)}
            />
            <TwitterPicker
              triangle={'hide'}
              color={this.state.color}
              onChange={this.handleChange.bind(this)}
            />
          </div>
        ) : null}
      </Fragment>
    );
  }
}
