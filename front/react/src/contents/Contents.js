import React from "react";
import ContentsHeader from "./ContentsHeader";
import ContentsMemo from "./ContentsMemo";
import Footer from "../footer/Footer";

export default class Contents extends React.Component {

  render() {
    return (
      <div className="contents">
        <ContentsHeader  g_no={this.props.g_no} g_name={this.props.g_name}/>
        <ContentsMemo />
        <Footer />
      </div>
    );
  }
}
