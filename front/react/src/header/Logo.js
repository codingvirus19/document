import React from "react";
import styles from "./Logo.css";

export default class Logo extends React.Component {
  render() {
    return (
      <div className={styles.header}>
        <div className={styles.container}>
          <img
            className={styles.logo_img}
            src="http://localhost:8090/images/logo.png"
          />
          <p className={styles.title}>ShareEditor.Md</p>
        </div>
      </div>
    );
  }
}