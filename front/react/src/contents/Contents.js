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
      result: null,
    };
  }

  onGetMemoData() {
    let input_date = {
      no: "",
      gNo: "",
      uNo: "",
      content: "",
      color: "",
      date: "",
    };
    // call api
    fetch(`${API_URL}/api/main`, {
      method: "post",
      headers: API_HEADERS,
      body: JSON.stringify(input_date),
    })
      .then((response) => response.json())
      .then((json) => {
        let newResult = json.data;
        // if (newResult.result == "success") {
        //   console.log("성공!");
        // }
        console.log(json);
        console.log(json.data);
        this.setState({
          result: newResult,
        });
      })
      .catch((err) => console.error(err));
  }

  render() {
    // this.onGetMemoData();
    return (
      <div className="contents">
        <ContentsHeader />
        <ContentsMemo
          find={this.onGetMemoData.bind(this)}
          listMemo={
            this.state.result &&
            this.state.result.filter((re) => console.log(re))
          }
        />
        {this.onGetMemoData.bind(this)}

        <Footer />
      </div>
    );
  }
}
