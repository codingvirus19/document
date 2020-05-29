import React from "react";
import Select from "react-select";
import { ToastContainer, toast, Slide } from "react-toastify";
import "../../ReactToastify.scss";
import styles from "./Sheets.css";

export default class GroupShareSheet extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      g_noUpdate: "",
      currentG_no: null,
      groups: this.props.addNullToGroup,
    };
  }

  //   onClickChange(e) {
  //     console.log(e.target.value);
  //   }

  handleChange(selectedOption) {
    // 희망하는 그룹을 선택 시 Array에 해당 그룹의 no와 name 담긴다.
    this.setState({
      selectedOption: selectedOption,
    });
    console.log(selectedOption);
  }
  onClickSendShare(e) {
    e.preventDefault();
    console.log(this.props.no);
    let send_gNoAndMemoNo = {
      no: this.props.no,
      gName: this.state.selectedOption,
    };
    console.log(send_gNoAndMemoNo);

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

  ajaxShareMemo() {
    // call api
    fetch(`${API_URL}/api/memo/shareMemo`, {
      method: "post",
      headers: API_HEADERS,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        memo_bigArr = json.data;
        this.UpdateMemo(memo_bigArr);
      })
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <div className={styles.groupShareSheet} ref={this.props.refChange}>
        <div className={styles.container}>
          <div className={styles.title}>공유할 그룹</div>
          <div onClick={(e) => e.stopPropagation()} className={styles.contents}>
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
