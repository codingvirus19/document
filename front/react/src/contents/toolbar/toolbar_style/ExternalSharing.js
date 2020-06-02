import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import styles from "../Toolbar.css";

import ShareSheet from "../ShareSheet";

export default class ExternalSharing extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      showShareSheet: false,
    };
  }

  toggleShareSheet(showShareSheet) {
    this.setState({
      showShareSheet,
    });
  }

  render() {
    return (
      <Fragment>
        {/* 외부공유 */}
        <button
          style={this.props.setStyle}
          className={styles.tool}
          aria-label="외부 공유"
          onMouseEnter={() => this.setState({ showShareSheet: true })}
          onMouseLeave={() => this.setState({ showShareSheet: false })}
        >
          <FontAwesomeIcon
            className={styles.faExternalLinkAlt}
            icon={faExternalLinkAlt}
          />
        </button>
        {this.state.showShareSheet ? (
          // {/* {true ? ( */}
          <ShareSheet
            toggleShareSheetHandler={this.toggleShareSheet.bind(this)}
          />
        ) : null}
      </Fragment>
    );
  }
}
