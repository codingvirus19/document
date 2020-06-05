import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload,  } from "@fortawesome/free-solid-svg-icons";
import styles from "../Toolbar.css";

export default class SaveLocal extends React.Component {
  constructor() {
    super(...arguments);
    if(this.props.className != null){
      this.className = this.props.className; 
    }else{
      this.className = styles.tool
    }
    if(this.props.buttonName != null){
      this.buttonName = this.props.buttonName; 
    }else{
      this.buttonName = styles.faSave;
    }
  }



  // local에 md파일로 저장하는 함수
  saveLocal() {
    let md = ".md";
    let groupName;
    if (this.props.gName == null) {
      groupName = "개인";
    } else {
      groupName = this.props.gName;
    }
    // a태그 생성
    const element = document.createElement("a");
    // Blob첫번째에는 다운받을 value, 두번째에는 type을 지정
    const file = new Blob([this.props.content], { type: "text/plain" });
    // Blob 객체를 가리키는 URL을 생성
    // 이 Blob URL은 생성된 window의 document에서만(브라우저) 유효, jenkins에서 작동확인!
    element.href = URL.createObjectURL(file);
    // download 시 파일 이름 생성
    element.download = `${groupName}그룹의 메모${md}`;
    // 위의 element를 body에 자식으로 삽입
    document.body.appendChild(element);
    element.click();
  }
  render() {
    return (
      <Fragment>
        {/* 내 컴퓨터에 저장 */}
        <button
          style={this.props.setStyle}
          className={this.className}
          aria-label="내 컴퓨터에 저장"
          onClick={this.saveLocal.bind(this)}
        >
          <FontAwesomeIcon className={this.buttonName} icon={faDownload} />
        </button>
      </Fragment>
    );
  }
}
