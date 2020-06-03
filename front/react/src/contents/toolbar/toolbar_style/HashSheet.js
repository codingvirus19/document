import React, { Fragment } from "react";
import CreatableSelect from "react-select/creatable";
import styles from "../Sheets.css";

const API_URL = "http://localhost:8080/codingvirus19";
const API_HEADERS = {
  "Content-Type": "application/json",
};

export default class HashSheet extends React.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      memo_hash: null,
      selectedHash: [{value: '', label: ''}]
    };
  }

  componentDidMount() {
    this.setState({
      memo_hash: this.props.memo_hash.map((element) => {
        return {
          value: element.no,
          label: element.name,
          memo_no: element.memo_no,
        };
      }),
    });
  }

  addHash(event) {
    if (event != null) {
      let lastetEvent = event[event.length - 1];
      if(lastetEvent.__isNew__) {
      let data = {
        gNo: this.props.memo_gNo,
        mNo: this.props.memo_no,
        name: lastetEvent.label,
        // name: lastetEvent.label,
      };
      let hash = { value: "", label: "" };
      fetch(`${API_URL}/api/addHash`, {
        method: "post",
        headers: API_HEADERS,
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((json) => {
          this.state.memo_hash.push(hash);
          this.props.IsHashUpdate();
          this.props.SidebarGroupUpdate(this.props.groupBySidebar.no, this.props.groupBySidebar.name)
        })
        .catch((err) => console.error(err));
      }
      else {
      console.log(event)
      }
    }
  }

  render() {
    if (!this.state.memo_hash) {
      return null;
    }
    return (
      <div className={styles.hashSheet} ref={this.props.refChange}>
        <div className={styles.container}>
          <div className={styles.title}>해시 추가</div>
          <div onClick={(e) => e.stopPropagation()} className={styles.contents}>
            <CreatableSelect
              defaultValue={this.state.memo_hash}
              autoFocus={true}
              isMulti
              className={styles.searchHash}
              defaultMenuIsOpen={true}
              closeMenuOnSelect={false}
              menuIsOpen={true}
              onChange={this.addHash.bind(this)}
              maxMenuHeight={120}
              options={this.props.group_hash_for_select}
              placeholder="해시선택 및 생성할 해시 입력"
            />
          </div>
        </div>

        <div className={styles.btns}>
          <button
            // onClick={this.share.bind(this)}
            type="submit"
            className={styles.confirm_btn}
          >
            추가
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