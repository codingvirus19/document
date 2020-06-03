import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import styles from "./HashList.css"

const API_URL = "http://localhost:8080/codingvirus19";
const API_HEADERS = {
  "Content-Type": "application/json",
};

export default class HashList extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      hash: [{ no: "", name: "", memo_no: "" }],
    }
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
        this.props.IsHashUpdate();
      })
      .catch((err) => console.error(err));
  }

  render() {
    if (!this.props.memo_hash) {
      return null;
    }
    return (
      <div className={styles.hashlist}>
        {/* 메모1의 해시 */}
        {this.props.memo_hash.map(({ no, name }) => (
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