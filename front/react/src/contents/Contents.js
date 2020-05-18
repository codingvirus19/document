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
      // hash: "",
      result: [
        {
          no: "",
          gNo: "",
          uNo: "",
          content: "",
          color: "",
          date: "",
        },
      ],
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
    // console.log(input_date);
    // call api
    fetch(`${API_URL}/api/memo`, {
      method: "post",
      headers: API_HEADERS,
      body: JSON.stringify(input_date),
    })
      .then((response) => response.json())
      .then((json) => {
        let newResult = json.data;
        console.log(json);
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
        <ContentsMemo />
        <Footer />
      </div>
    );
  }
}
