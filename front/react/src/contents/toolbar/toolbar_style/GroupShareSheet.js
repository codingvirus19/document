import React from "react";
import Select from "react-select";
import styles from "../Sheets.css";

const API_URL = ".";
const API_HEADERS = {
  "Content-Type": "application/json",
};

export default class GroupShareSheet extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      g_noUpdate: "",
      currentG_no: null,
      groups: this.props.addNullToGroup,
      clientRef: this.props.clientRef,
      selectedOption: null,
    };
  }

  // 희망하는 그룹을 선택 시 selectedOption에 해당 그룹의 value가 담긴다.
  handleChange(selectedOption) {
    this.setState({
      selectedOption: selectedOption,
    });
  }

  onClickSendShare(e) {
    e.preventDefault();
    
    let send_memoNoAndGNo = {
      // no: 메모의 no로 db에서 content, color를 뽑아온다.
      no: this.props.no,
      // gNo의 수만큼, user session, 위에서 가져온 content, color를 memo에 insert해준다.
      gNo: this.state.selectedOption,
    };
    this.state.selectedOption.map((no, index) => {
      this.props.clientRef.sendMessage("/app/alarm/" + this.props.users.no[0], JSON.stringify({
        gNo: no.value,
        chat: this.state.selectedOption[index].label + " 그룹에 메모가 공유되었습니다.",
        date: new Date(),
        type: true,
        readCheck: true
        // 알람 넣을 때, type이 true이면 기본 알람, false이면 채팅 알람 구별
        // db에서 받을때는 true = 1, false = 0
      }))
    });

    // call api (GroupShare)
    this.ajaxGroupShare(send_memoNoAndGNo);

    // groupShareSheet 닫기
    this.props.closeGroupShareSheet();

    this.props.notify(`${this.state.selectedOption.map(element => element.label)} 그룹에 메모가 공유되었습니다.`)
  }

  ajaxGroupShare(_send_memoNoAndGNo) {
    // call api
    let memoVoObj = null;
    let memoVoArr = [];
    let getTrue = null;
    let i = null;

    for (i = 0; i < _send_memoNoAndGNo.gNo.length; i++) {
      memoVoObj = {
        no: _send_memoNoAndGNo.no,
        gNo: _send_memoNoAndGNo.gNo[i].value,
      };
      memoVoArr.push(memoVoObj);
    }
    fetch(`${API_URL}/api/memo/shareMemo`, {
      method: "post",
      headers: API_HEADERS,
      body: JSON.stringify(memoVoArr),
    })
      .then((response) => response.json())
      .then((json) => {
        getTrue = json.data;

        // shareGroup 전송 클릭시 쿼리 삭제 전에 콜백에서 메모를 뿌려주기 때문에 실시간으로 작동 x
        // 아래에서 db에서 삭제 진행 완료 후 true신호가 오면 콜백을 보내도록 설정한 코드이다.
        if (getTrue != false) {
          this.props.SidebarGroupUpdate(this.props.memo_gNo, this.props.gName);
        }
      })
      .catch((err) => console.error(err));
  }
  styleChnage(e) {
    (e != null) ? (e.select.menuListRef.parentNode.style.position = "relative") : null;
    (e != null) ? console.log(e.select.menuListRef.style.height = "69px") : null;
  }

  render() {
    return (
      <div className={styles.groupShareSheet} ref={this.props.refChange} onClick={e => e.stopPropagation()}>
        <div className={styles.container}>
          <div className={styles.title}>공유할 그룹</div>
          <div className={styles.contents}>
            <Select
              // 스타일 강제 주입
              ref={(e) => this.styleChnage(e)}
              value={this.state.selectedOption}
              onChange={this.handleChange.bind(this)}
              isMulti={true}
              autoFocus={false}
              className={styles.select}
              defaultMenuIsOpen={true}
              closeMenuOnSelect={false}
              menuIsOpen={true}
              options={this.state.groups}
              placeholder="공유할 그룹 선택"
            />
          </div>
        </div>
        <div className={styles.btns}>
          <button
            onClick={this.onClickSendShare.bind(this)}
            type="submit"
            className={styles.confirm_btn}
          >
            공유하기
          </button>
          <button
            className={styles.cancel_btn}
            onClick={this.props.closeGroupShareSheet}
          >
            취소
          </button>
        </div>
      </div>
    );
  }
}