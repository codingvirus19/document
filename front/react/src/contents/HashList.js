import React from "react";
import styles from "./HashList.css"

const API_URL = "http://localhost:8080/codingvirus19";
const API_HEADERS = {
  "Content-Type": "application/json",
};

export default class HashList extends React.PureComponent {

  constructor() {
    super(...arguments);
    this.state = {
      hash: [{ no: "", name: "" }]
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
            name: element.name
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

  render() {
    console.log(this.state.hash);
    return (
      <div className={styles.hashlist}>
        {/* 메모1의 해시 */}
        {this.state.hash.map(({ no, name }) => (
            <div
              className={styles.hash}
              key={no}
            >
              #{name}
            </div>
          ))}
      </div>
    );
  }
}