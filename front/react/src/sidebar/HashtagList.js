import React from "react";
import Nav from 'react-bootstrap/Nav';
import styles from "./Sidebar.css";

export default class HashtagList extends React.PureComponent {

  render() {
    return (
      <div>
        <h5>해시태그</h5>
        <Nav className={styles.nav}>
          {this.props.hash.map(({ no, name }) => (
            <Nav.Link href="#" key={no} className={styles.dropdown_menu}>{name}</Nav.Link>
          ))}
        </Nav>
      </div>
    );
  }
}