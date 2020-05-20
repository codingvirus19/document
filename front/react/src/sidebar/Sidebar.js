import React from "react";

import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import styles from "./Sidebar.css";

export default class Sidebar extends React.Component {

  constructor() {
    super(...arguments);
    this.state = {
      showHashtagList: false,
      showGroupList: false,
      hashtagList: null,
      hash: null,
      // g_name: this.props.group_name,
      // g_no: this.props.group_no
      g_name: "그룹1",
      g_no: 1
    }
  }

  render() {
    // console.log(this.state.g_name);
    // console.log(this.state.g_no);
    // console.log(this.props.group_name);
    // console.log(this.props.group_no);

    if (this.state.showGroupList) {
      this.state.hash = this.props.hashs.filter(hash => hash.g_no === this.props.group_no);
      this.state.hashtagList = (<div>
        {this.props.users.map(({ g_no, g_name }) => (
          <Nav.Link
            key={this.props.group_no}
            onClick={() => this.setState({
              showHashtagList: true,
              g_no: parseInt(`${this.props.group_no}`),
              g_name: `${this.props.group_name}`
            })}
            className={styles.menu}> {this.props.group_name} </Nav.Link>
        ))}
      </div>
      )
    }
    if (this.state.showHashtagList) {
      this.state.hash = this.props.hashs.filter(hash => hash.g_no === this.props.group_no);
      this.state.hashtagList = (<div>
        {this.props.group_name}
        <br /><br />
        <h5>해시태그</h5>
        <Nav className={styles.nav}>
          {this.state.hash.map(({ no, hash_name }) => (
            <Nav.Link 
            key={no} 
            className={styles.menu}>{hash_name}</Nav.Link>
          ))}
        </Nav>
      </div>
      )
    }

    return (
      <div className={styles.sidebar}>
        <Nav className={styles.nav}>
          <Nav.Link
            onClick={() => this.setState({
              showHashtagList: true,
              g_name: "개인"
            })}
            className={styles.menu}> 개인메모 </Nav.Link>
          <Nav.Link
            onClick={() => this.setState({
              showGroupList: true,
              showHashtagList: false
            })}
            className={styles.menu}> 그룹메모 </Nav.Link>
        </Nav>
        <div className={styles.menu}>
          {this.state.hashtagList}
        </div>
      </div>
    );
  }
}