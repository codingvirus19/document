import React from "react";

import Popup from "./Popup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import styles from "./AddMemo.css";

export default class AddMemo extends React.Component {
  constructor() {
    super();
    this.state = {
      showPopup: false,
    };
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }

  render() {
    return (
      <div className={styles.addmemo}>
        <button
          onClick={this.togglePopup.bind(this)}>
            <FontAwesomeIcon className={styles.faPlus} icon={faPlus}/>
        </button>
        {this.state.showPopup ? (
          <Popup closePopup={this.togglePopup.bind(this)} />
        ) : null}
      </div>
    );
  }
}
