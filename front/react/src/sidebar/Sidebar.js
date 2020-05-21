import React from "react";

import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import styles from "./Sidebar.css";

export default class Sidebar extends React.Component {

  constructor() {
    super(...arguments);
    this.state = {
      showHashtagList: false,
      hashs: null,
      hash: null,
      g_name: null,
      g_no: null
    }
  }

  hashsFilter() {
    this.setState({
      hash: this.state.hashs.filter(hash => hash.g_no === this.props.g_no)
    })
  }

  render() {
    console.log(this.state.g_name);
    console.log(this.state.g_no);
    console.log(this.props.group_name);
    console.log(this.props.group_no);

    let hashtagList;
    // hashtagList = (
    //   <div>
    //     {this.props.group_name}
    //     <br /><br />
    //     <h5>해시태그</h5>
    //     <Nav className={styles.nav}>
    //       {this.state.hash.map(({ no, hash_name }) => (
    //         <Nav.Link
    //           key={no}
    //           className={styles.menu}>{hash_name}</Nav.Link>
    //       ))}
    //     </Nav>
    //   </div>
    // )

    return (
      <div className={styles.sidebar}>
        <Nav className={styles.nav}>
          <Nav.Link
            onClick={() => this.setState({
              showHashtagList: true,
              g_name: "개인"
            })}
            className={styles.menu}> 개인메모 </Nav.Link>
          <NavDropdown title="그룹메모" className={styles.menu} drop="right">
            {/* {this.state.g_name.map(element => (
              <NavDropdown.Item href="#"
                onClick={() => this.setState({
                  showHashtagList: true
                })}
                className="sidebar-nav-menu-groupmenu"> {element} </NavDropdown.Item>
            ))} */}
          </NavDropdown>
        </Nav>
        {this.state.showHashtagList ? (
          { hashtagList }
        ) : null}
      </div>
    )
  }
}