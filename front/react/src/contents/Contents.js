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
      memoArr: null,
    };
  }

  render() {
    return (
      <div className="contents">
        <ContentsHeader />

        {/* {this.props.memo_bigArr.memo_no.map((memoNo, content) => ( */}
        <ContentsMemo memo_bigArr={this.props.memo_bigArr} />
        {/* ))} */}
        {/* <ContentsMemo key={memo.no} content={memo.content} />; */}
        {/* <ContentsMemo memoArr={this.state.memoArr} /> */}
        {/* {this.state.memoArr.map((memo) => {
        })} */}
        <Footer />
      </div>
    );
  }
}
