import React from "react";
import Select from "react-select";
import { ToastContainer, toast, Slide } from "react-toastify";
import "../../../ReactToastify.scss";
import styles from "../Sheets.css";

const API_URL = "http://localhost:8080/codingvirus19";
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
      clientRef: this.props.clientRef
      selectedOption: null,
      // 다 삭제 안되는 오류
    };
  }

  // 희망하는 그룹을 선택 시 selectedOption에 해당 그룹의 value가 담긴다.
  handleChange(selectedOption) {
    this.setState({
      selectedOption: selectedOption,
    });
    console.log(selectedOption);
  }

  onClickSendShare(e, g_no) {
    e.preventDefault();

    this.props.clientRef.share("/app/alarm/" + g_no, JSON.stringify({
      gNo : g_no,
      chat : "그룹에 메모가 공유되었습니다."
    }));
    
    let send_memoNoAndGNo = {
      // no: 메모의 no로 db에서 content, color를 뽑아온다.
      no: this.props.no,
      // gNo의 수만큼, user session, 위에서 가져온 content, color를 memo에 insert해준다.
      gNo: this.state.selectedOption,
    };

    // call api (GroupShare)
    this.ajaxGroupShare(send_memoNoAndGNo);

    // toast알림
    toast("그룹에 메모가 공유되었습니다.", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  }

  ajaxGroupShare(_send_memoNoAndGNo) {
    // call api
    let memoVoObj = null;
    let memoVoArr = [];
    let getTrue = null;
    let gNameFromGroupsState;
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
        // memoShare전송 후 내가 클릭한 메모의 gName페이지로 이동하기위해
        // 클릭한 메모의 gNo를 전체 그룹과 비교하여 gName을 찾아내는 반복문
        for (i = 0; i < this.state.groups.length; i++) {
          if (this.props.memo_gNo == this.state.groups[i].value) {
            gNameFromGroupsState = this.state.groups[i].label;
          }
        }
        getTrue = json.data;

        // shareGroup 전송 클릭시 쿼리 삭제 전에 콜백에서 메모를 뿌려주기 때문에 실시간으로 작동 x
        // 아래에서 db에서 삭제 진행 완료 후 true신호가 오면 콜백을 보내도록 설정한 코드이다.
        if (getTrue != false) {
          this.props.SidebarGroupUpdate(
            this.props.memo_gNo,
            gNameFromGroupsState
          );
        }
      })
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <div className={styles.groupShareSheet} ref={this.props.refChange}>
        <div className={styles.container}>
          <div className={styles.title}>공유할 그룹</div>
          <div className={styles.contents}>
            <Select
              value={this.state.selectedOption}
              onChange={this.handleChange.bind(this)}
              isMulti
              autoFocus={true}
              className={styles.select}
              defaultMenuIsOpen={true}
              closeMenuOnSelect={false}
              menuIsOpen={true}
              maxMenuHeight={100}
              options={this.state.groups}
              placeholder="공유할 그룹 선택"
              transition={Slide}
            />
          </div>
        </div>
        <div className={styles.btns}>
          <button
            onClick={this.onClickSendShare.bind(this, this.state.groups.gNo)}
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
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable={false}
            pauseOnHover
            transition={Slide}
          />
        </div>
      </div>
    );
  }
}
//