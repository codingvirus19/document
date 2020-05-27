import React from "react";
import ContentsHeader from "./ContentsHeader";
import ContentsMemo from "./ContentsMemo";
import Footer from "../footer/Footer";
import styles from "./Contents.css";

export default class Contents extends React.Component {
  constructor() {
    super(...arguments);
  }

  render() {
    return (
      <div className={styles.contents}>

        <ContentsHeader
          groupBySidebar={this.props.groupBySidebar}
          group={this.props.group}
        />
    
        <ContentsMemo
          groupBySidebar={this.props.groupBySidebar}
          group={this.props.group}
          memo_bigArr={this.props.memo_bigArr}
        />
        <Footer />
      </div>
    );
  }
}
