import React from "react";
import Nav from 'react-bootstrap/Nav';
import styles from "./Sidebar.css";

export default class HashtagList extends React.Component {

  constructor() {
    super(...arguments);
    this.state = {
      hash: null
    }
  }

  render() {
    return (
      <div>
        <h5>해시태그</h5>
        <Nav className={styles.nav}>
          {this.state.hash && this.state.hash
            .filter(element => element.hash_name.indexOf(this.state.keyword) != -1)
            .map(({ no, hash_name }) => (
              <Nav.Link href="#" key={no} className={styles.dropdown_menu}>{hash_name}</Nav.Link>
            ))}
        </Nav>
      </div>
    );
  }
}
