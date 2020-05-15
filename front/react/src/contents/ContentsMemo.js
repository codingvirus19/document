import React from "react";
import Memo from "./Memo";
import HashList from "./HashList";
import Toolbar from "./toolbar/Toolbar";

const API_URL = "http://localhost:8080/codingvirus19";
const API_HEADERS = {
  "Content-Type": "application/json",
};

export default class Contents extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      no: "",
      gNo: "",
      uNo: "",
      content: "",
      color: "",
      date: "",
      hash: ""
      // result: "",
    };
  }
  noChange(e) {
    this.setState({
      no: e.target.value,
    });
  }
  onGetMemoData() {
    let input_date = {
      no: this.state.no,
      gNo: this.state.gNo,
      uNo: this.state.uNo,
      content: this.state.content,
      color: this.state.color,
      date: this.state.date,
    };
    console.log(input_date);
    // call api
    fetch(`${API_URL}/main/api/memo`, {
      method: "get",
      headers: API_HEADERS,
      body: JSON.parse(input_date),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        this.setState({
          result: json.data,
        });
      })
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <div className="contents-memo">
        <div
          onClick={() => {
            this.onGetMemoData.bind(this);
            this.noChange.bind(this);
          }}
          className="memo_container"
          value={this.state.no}
        >
          <div className="container_memo-form">
            <Memo content={this.state.content}/>
            <HashList hash={this.state.hash} />
            <Toolbar hash={this.state.hash}/>
          </div>
        </div>
        {/* <div>
          <form className="contents-memo_momo-form">
            <input className="snip1535 hover" type="textarea"></input>
          </form>
        </div> */} 
      </div>
    );
  }
}