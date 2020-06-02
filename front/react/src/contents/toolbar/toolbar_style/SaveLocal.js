import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faFileUpload } from "@fortawesome/free-solid-svg-icons";
import ColorSheet from "./ColorSheet";
import styles from "../Toolbar.css";

export default class SaveLocal extends React.Component {
  saveLocal() {
    alert("local 저장");
  }
  render() {
    return (
      <Fragment>
        {/* 내 컴퓨터에 저장 */}
        <button
          style={this.props.setStyle}
          className={styles.tool}
          aria-label="내 컴퓨터에 저장"
          onClick={this.saveLocal.bind(this)}
        >
          <FontAwesomeIcon className={styles.faSave} icon={faSave} />
        </button>

        <button
          style={this.props.setStyle}
          className={styles.tool}
          aria-label="파일 올리기"
        >
          {/* <input type="file"></input> */}
          <FontAwesomeIcon
            className={styles.faFileUpload}
            icon={faFileUpload}
          />
        </button>
      </Fragment>
    );
  }
}
