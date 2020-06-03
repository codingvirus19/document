import React from "react";
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import HashtagList from "./HashtagList"
import styles from "./Sidebar.css";

export default class Sidebar extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      g_no: null,
      g_name: null,
      hash: this.props.hash
    };
  }

  update(g_no, g_name) {
    this.setState({
      g_no: g_no,
      g_name: g_name
    })
    this.props.group_update(g_no, g_name);
  }

  render() {
    return (
      <div className={styles.sidebar}>
        <Nav className={styles.nav}>
          <Nav.Link
            onClick={() => this.update(null, null)}
            className={styles.menu}> 개인메모 </Nav.Link>
          <NavDropdown title="그룹메모" className={styles.menu} drop="right">
            {this.props.group.gname.map((name, index) => (
              <NavDropdown.Item
                key={index}
                onClick={() => this.update(this.props.group.no[index], name)}
                className={styles.groupmenu}> {name} </NavDropdown.Item>
            ))}
          </NavDropdown>
        </Nav>
        <div className={styles.hashtagList}>
          <HashtagList hash={this.props.hash} />
        </div>
      </div>
    );
  }
}