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

  onClickSendShare(e) {
    e.preventDefault();
    console.log(this.props.no);

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

    for (let i = 0; i < _send_memoNoAndGNo.gNo.length; i++) {
      memoVoObj = {
        no: _send_memoNoAndGNo.no,
        gNo: _send_memoNoAndGNo.gNo[i].value,
      };
      memoVoArr.push(memoVoObj);
    }
    console.log(memoVoArr);
    fetch(`${API_URL}/api/memo/shareMemo`, {
      method: "post",
      headers: API_HEADERS,
      body: JSON.stringify(memoVoArr),
    })
      .then((response) => response.json())
      .then((json) => {
        getTrue = json.data;
        if (getTrue != false) {
          this.props.SidebarGroupUpdate(this.props.memo_gNo, this.state.gName);
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
