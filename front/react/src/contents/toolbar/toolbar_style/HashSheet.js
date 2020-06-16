import React, { Fragment } from "react";
import CreatableSelect from "react-select/creatable";
import styles from "../Sheets.css";

const API_URL = ".";
const API_HEADERS = {
  "Content-Type": "application/json",
};

export default class HashSheet extends React.Component {

  handleOnChange(event) {
    //event가 null일 경우 event.length 처리를 위해 []으로 세팅
    if (event === null) {
      event = [];
    }
    // 기존 메모해시가 새 메모해시보다 길면 = 메모해시가 삭제되면 
    if (this.props.memo_hash.length > event.length) {
      let deleteHash = this.props.memo_hash.filter(x => !event.some(y => x.value === y.value));
      this.deleteHash(deleteHash);
    }
    // 아니면 해시 추가 됨
    else {
      let lastetEvent = event[event.length - 1];
      this.addHash(lastetEvent);
    }
  }

  addHash(event) {
    if(event.label.length > 8){
      this.props.notify("해시 이름은 최대 8자까지 가능합니다.")
      return;
    }
    let data = {
      gNo: this.props.memo_gNo,
      mNo: this.props.memo_no,
      name: event.label,
    };

    let hash = { value: "", label: "" };
    if(this.props.clientRef != undefined && this.props.users != undefined && this.props.memo_gNo != undefined){
    this.props.clientRef.sendMessage(`/app/memo/update/${this.props.memo_gNo}`,JSON.stringify({update:'update',userNo:this.props.users.no[0]}));
    }
    fetch(`${API_URL}/api/addHash`, {
      method: "post",
      headers: API_HEADERS,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        this.props.memo_hash.push(hash);
        this.props.SidebarGroupUpdate(this.props.groupBySidebar.no, this.props.groupBySidebar.name)
      })
      .catch((err) => console.error(err));
  }

  deleteHash(hash) {
    hash = hash[0];
    let data = {
      gNo: this.props.memo_gNo,
      mNo: this.props.memo_no,
      name: hash.value
    }
    if(this.props.clientRef != undefined && this.props.users != undefined && this.props.memo_gNo != undefined){
      this.props.clientRef.sendMessage(`/app/memo/update/${this.props.memo_gNo}`,JSON.stringify({update:'update',userNo:this.props.users.no[0]}));
      }
    fetch(`${API_URL}/api/deleteHash`, {
      method: "post",
      headers: API_HEADERS,
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((json) => {
        this.props.SidebarGroupUpdate(this.props.groupBySidebar.no, this.props.groupBySidebar.name);
      })
      .catch((err) => console.error(err));
  }

  render() {
    if (!this.props.memo_hash) {
      return null;
    }
    return (
      <div className={styles.hashSheet} ref={this.props.refChange}>
        <div className={styles.closebutton}>
          <button onClick={this.props.closeHashSheet}>
            <i className="fas fa-times-circle"></i>
          </button>
        </div>
        <div className={styles.container}>
          <div className={styles.title}>해시 추가</div>
          <div onClick={(e) => e.stopPropagation()} className={styles.contents}>
            <CreatableSelect
              ref={(e) => (e != null) ? (e.select.select.menuListRef.parentNode.style.position = "relative") : null}
              defaultValue={this.props.memo_hash}
              autoFocus={true}
              isMulti
              className={styles.searchHash}
              defaultMenuIsOpen={true}
              closeMenuOnSelect={false}
              menuIsOpen={true}
              onChange={this.handleOnChange.bind(this)}
              // maxMenuHeight={200}
              options={this.props.distinctGroup_hash}
              placeholder="해시선택 및 생성할 해시 입력"
            />
          </div>
        </div>
      </div>
    );
  }
}