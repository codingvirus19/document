import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette } from "@fortawesome/free-solid-svg-icons";
import ColorSheet from "./ColorSheet";
import styles from "../Toolbar.css";
import { TwitterPicker } from "react-color";

export default class ColorChange extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      displayColorPicker: false,
      color: "#fff",
    };
  }

  handleClick() {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  }

  handleClose() {
    this.setState({ displayColorPicker: false });
  }

  handleChange(color) {
    this.setState({
      color: color,
    });
  }

  // 색상변경
  render() {
    const popover = {
      position: "absolute",
      zIndex: "10",
    };
    const cover = {
      position: "fixed",
      top: "0px",
      right: "0px",
      bottom: "0px",
      left: "0px",
    };
    return (
      <Fragment>
        {/* 색상변경 */}

        <button
          className={styles.tool}
          aria-label="색상 변경"
          onClick={this.handleClick.bind(this)}
        >
          <FontAwesomeIcon className={styles.faPalette} icon={faPalette} />
        </button>
        {this.state.displayColorPicker ? (
          <div style={popover}>
            <div style={cover} onClick={this.handleClose.bind(this)} />
            <TwitterPicker
              color={this.state.color}
              onChange={this.handleChange.bind(this)}
            />
          </div>
        ) : null}
      </Fragment>
    );
  }
}
