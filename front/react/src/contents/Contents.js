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

  componentDidMount() {
    let input_date = {
      no: this.props.group_no,
      name: this.props.group_name,
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
        let newResult = json.data;
        console.log(json);
        console.log(json.data);
        this.setState({
          result: newResult,
        });
      })
      .catch((err) => console.error(err));
  }

  render() {
    console.log(this.props.group_name[0]);
    return (
      <div className="contents">
        <ContentsHeader />
        <ContentsMemo group_no={this.props.group_no} />
        <Footer />
      </div>
    );
  }
}
