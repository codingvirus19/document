import React from "react";
import ContentsHeader from "./ContentsHeader";
import ContentsMemo from "./ContentsMemo";
import Footer from "../footer/Footer";

const API_URL = "http://localhost:8080/codingvirus19";
const API_HEADERS = {
  "Content-Type": "application/json",
};

export default class Contents extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      memoArr: [],
    };
  }

  componentDidMount() {
    let group = this.props.group;
    let input_date = {};
    let _memoArr = null;

    input_date = {
      no: group.no,
      name: group.name,
    };
    console.log(input_date);
    // call api
    fetch(`${API_URL}/api/contents`, {
      method: "post",
      headers: API_HEADERS,
      body: JSON.stringify(input_date),
    })
      .then((response) => response.json())
      .then((json) => {
        _memoArr = json.data;
        this.UpdateMemo(_memoArr);
        console.log(_memoArr);
      })
      .catch((err) => console.error(err));
  }

  UpdateMemo(_memoArr) {
    this.setState({
      memoArr: _memoArr,
    });
  }

  render() {
    return (
      <div className="contents">
        <ContentsHeader />
        {/* <ContentsMemo memoArr={this.state.memoArr} /> */}
        {this.state.memoArr.map((memo) => {
          <ContentsMemo key={memo.no} content={memo.content} />;
        })}
        <Footer />
      </div>
    );
  }
}
