import React from "react";
import CreatableSelect from 'react-select/creatable';
import styles from "./Sheets.css";

const API_URL = "http://localhost:8080/codingvirus19";
const API_HEADERS = {
  "Content-Type": "application/json",
};

export default class HashSheet extends React.PureComponent {

  constructor() {
    super(...arguments);
    this.state = {
      hash: [{ value: '', label: '' }],
    }
  }

  componentDidMount() {
    let hashDatas = null;
    let hash = { value: '', label: '' };
    fetch(`${API_URL}/api/getHashListByUser`, {
      method: "post",
      headers: API_HEADERS,
    })
      .then((response) => response.json())
      .then((json) => {
        hashDatas = json.data;

        hash = hashDatas.map((element) => {
          return {
            value: element.name,
            label: element.name
          }
        });
        this.UpdateHash(hash);
      })
      .catch((err) => console.error(err));
  }

  UpdateHash(hash) {
    this.setState({
      hash: hash
    })
  }

  addHash(event) {
    // 다 삭제 안되는 오류
    let lastetEvent = event[event.length - 1]
    if (lastetEvent.__isNew__) {
      let data = {
        gNo: this.props.memo_gNo,
        mNo: this.props.memo_no,
        name: lastetEvent.label
      };
      // console.log(data);
      let hash = { value: '', label: '' };
      fetch(`${API_URL}/api/addHash`, {
        method: "post",
        headers: API_HEADERS,
        body: JSON.stringify(data)
      })
        .then((response) => response.json())
        .then((json) => {
          hash.value = json.data.name,
            hash.label = json.data.name
          this.state.hash.push(hash)
          console.log(this.state.hash);
        })
        .catch((err) => console.error(err));
    }
  }

  render() {
    return (
      <div className={styles.hashSheet} ref={this.props.refChange}>
        <div className={styles.container}>
          <div className={styles.title}>해시 추가</div>
          <div className={styles.contents}>
            <CreatableSelect
              autoFocus={true}
              isMulti
              className={styles.searchHash}
              defaultMenuIsOpen={true}
              closeMenuOnSelect={false}
              menuIsOpen={true}
              onChange={this.addHash.bind(this)}
              maxMenuHeight={120}
              options={this.state.hash}
              placeholder="해시선택 및 생성할 해시 입력"
            // deleteRemoves={true}
            />
          </div>
        </div>

        <div className={styles.btns}>
          <button
            // onClick={this.share.bind(this)}
            type="submit"
            className={styles.confirm_btn}>추가</button>
          <button
            className={styles.cancel_btn}
            onClick={this.props.closeGroupShareSheet}>
            취소
              </button>

        </div>

      </div>
    );
  }
}
