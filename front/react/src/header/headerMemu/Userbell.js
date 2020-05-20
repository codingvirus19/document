import React from "react";

import Dropdown from "react-bootstrap/Dropdown";

import styles from "./Userbell.css";
import dropdownStyles from "./Dropdown.css";

export default class Userbell extends React.Component {
  render() {
    return (
      <Dropdown className={styles.userbell}>
        <Dropdown.Toggle
          className="header-bell__icon"
          variant="success"
          id="dropdown-basic">
          <i className="fas fa-bell"></i>
          <img src="" />
        </Dropdown.Toggle>

        <Dropdown.Menu className={dropdownStyles.menu}>
          <Dropdown.Item>알림1</Dropdown.Item>
          <Dropdown.Item>알림2</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
