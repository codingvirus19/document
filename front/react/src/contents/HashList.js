import React from "react";

import styles from "./HashList.css"

export default class HashList extends React.Component {
  render() {
    return (
      <div className={styles.hashlist}>
        {/* 메모1의 해시 */}
        {/* {this.props.hash
          .filter(element => element.memo_no.indexOf(1) != -1)
          .map(({ no, hash_name }) => (
            <div
              className={styles.hash}
              key={no}
            >
              #{hash_name}
            </div>
          ))} */}
      </div>
    );
  }
}