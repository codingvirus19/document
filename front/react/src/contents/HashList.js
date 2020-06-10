import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import "./HashList.scss"

const API_URL = ".";
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
        this.props.SidebarGroupUpdate(this.props.groupBySidebar.no, this.props.groupBySidebar.name);
      })
      .catch((err) => console.error(err));
  }

  render() {
    if (!this.props.memo_hash) {
      return null;
    }
    return (
      <div className="hashlist">
        {/* 메모1의 해시 */}
        {this.props.memo_hash.map(({ no, name }) => (
          <div className="hash" key={no}>
            <div className="hash_name">
              #{name}
            </div>
            <div className="delete_btn">
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