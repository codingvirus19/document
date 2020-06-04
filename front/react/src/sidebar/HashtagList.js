import React from "react";
import Nav from 'react-bootstrap/Nav';
import styles from "./Sidebar.css";

export default class HashtagList extends React.PureComponent {

  clickHash(hash) {
  this.props.SidebarHashUpdate(this.props.g_no, hash)
  }

  render() {
    if(this.props.hash == null){
      return null;
    }
    return (
      <div>
        <h5>해시태그</h5>
        <Nav className={styles.nav}>
          {this.props.hash
          .map((hash) => (
            <Nav.Link 
            key={hash} 
            className={styles.dropdown_menu}
            onClick={this.clickHash.bind(this, hash)}
            >
              {hash}
              </Nav.Link>
          ))}
        </Nav>
      </div>
    );
  }
}