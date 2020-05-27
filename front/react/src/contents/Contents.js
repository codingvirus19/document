import React from "react";
import ContentsHeader from "./ContentsHeader";
import ContentsMemo from "./ContentsMemo";
import Footer from "../footer/Footer";
import Chat from "./Chat";
import styles from "./Contents.css";

export default class Contents extends React.Component {
  constructor() {
    super(...arguments);
  }

  render() {
    return (
      <div className={styles.contents}>
        <div className={styles.box}>
          <div className={styles.contentsMemo}>
            <ContentsHeader
              groupBySidebar={this.props.groupBySidebar}
              group={this.props.group}
            />
            <ContentsMemo
              groupBySidebar={this.props.groupBySidebar}
              group={this.props.group}
              memo_bigArr={this.props.memo_bigArr}
            />
          </div>
          <Chat group={this.props.group}
          users={this.props.users} />
        </div>
        {/* <Footer /> */}
      </div>
    );
  }
}
