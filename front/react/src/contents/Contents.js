import React from "react";
import ContentsHeader from "./ContentsHeader";
import ContentsMemo from "./ContentsMemo";
import Footer from "../footer/Footer";

import styles from "./Contents.css";

export default class Contents extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      result: null,
    };
  }

  render() {
    return (
      <div className={styles.contents}>
        <ContentsHeader group={this.props.group}/>
        <ContentsMemo g_no={this.props.g_no} g_name={this.props.g_name}/>
        <Footer />
      </div>
    );
  }
}