import React from "react";
import styles from "./Logo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVirus } from "@fortawesome/free-solid-svg-icons";

export default class Logo extends React.Component {
  render() {
    return (
        <div className={styles.container}>
          <FontAwesomeIcon className={styles.faVirus} icon={faVirus} />
          <p className={styles.title}>ShareEditor.Md</p>
        </div>
    );
  }
}