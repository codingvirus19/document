import React from "react";

import styles from "./Footer.css";

export default class Footer extends React.Component {
  render() {
    return (
      <div className={styles.footer}>
        <p>(c)opyright 2015, 2016, 2017, 2018, 2019, 2020</p>
      </div>
    );
  }
}
