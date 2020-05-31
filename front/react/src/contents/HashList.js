import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import styles from "./HashList.css"

const API_URL = "http://localhost:8080/codingvirus19";
const API_HEADERS = {
  "Content-Type": "application/json",
};

export default class HashList extends React.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      hash: [{ no: "", name: "", memo_no: "" }],
    }
  }

  componentDidMount() {
    let data = { no: this.props.memo_no }
    let hashDatas = null;
    let hash = { no: "", name: "" }
    fetch(`${API_URL}/api/getHashListByMemo`, {
      method: "post",
      headers: API_HEADERS,
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((json) => {
        hashDatas = json.data;
        hash = hashDatas.map((element) => {
          return {
            no: element.no,
            name: element.name,
            memo_no: this.props.memo_no
          }
        });
        this.UpdateHash(hash);
        this.props[`setMemo_hash`](hash);
      })
      .catch((err) => console.error(err));
  }

  onmouseEnter(e) {
    if (e.target.childNodes[1] == undefined) return;
    e.target.childNodes[1].className = `${styles.delete_btn_hover}`;
  }
  onmouseLeave(e) {
    if (e.target.childNodes[1] == undefined) return;
    e.target.childNodes[1].className = `${styles.delete_btn}`;
  }

  UpdateHash(hash) {
    this.setState({
      hash: hash
    })
  }

  deleteHash(no) {
    let data = { no: no }
    fetch(`${API_URL}/api/deleteHash`, {
    method: "post",
    headers: API_HEADERS,
    body: JSON.stringify(data)
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json.data);
    })
    .catch((err) => console.error(err));
  }

  render() {
    return (
      <div className={styles.hashlist}>
        {/* 메모1의 해시 */}
        {this.state.hash.map(({ no, name }) => (
          <div className={styles.hash} key={no}
            onMouseEnter={this.onmouseEnter}
            onMouseLeave={this.onmouseLeave}>
            <div className={styles.hash_name}>
              #{name}
            </div>
            <div className={styles.delete_btn}>
              <button onClick={this.deleteHash.bind(this, no)}>
                <FontAwesomeIcon icon={faTimesCircle} />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}