import React from "react";
import ContentsHeader from "./ContentsHeader";
import ContentsMemo from "./ContentsMemo";
import Footer from "../footer/Footer";

export default class Contents extends React.Component {
  render() {
    return (
      <div className="contents">
        <ContentsHeader />
        <ContentsMemo />
        <Footer />
      </div>
    );
  }
}
