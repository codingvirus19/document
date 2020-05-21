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
    console.log(this.props.memo_bigArr);
    return (
      <div className="contents">
        <ContentsHeader />
        <ContentsMemo memo_bigArr={this.props.memo_bigArr} />
        <Footer />
      </div>
    );
  }
}
