import React from "react";
<<<<<<< HEAD
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import styles from "./Sidebar.css";
=======
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
>>>>>>> dongeun

import styles from "./Sidebar.css";

export default class Sidebar extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      showDetails: false,
      keyword: "",
      hash: null,
      g_no: null,
      g_name: null
    }
  }

  onInputChange(e) {
    this.setState({
	  keyword: e.target.value
  })
};

update(g_no,g_name) {
    this.setState({
      showDetails: true,
      g_no: `${g_no}`
    })
    console.log(g_no,g_name);
    this.props.group_update(g_no);
  }

  render() {
    // console.log(this.props.group);
    let hashtagList;
    if (this.state.showDetails) {
      // this.state.hash = this.props.hashs.filter(hash => hash.g_no === this.state.g_no);
      hashtagList = (
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
      )
    }
    return (
      <div className={styles.sidebar}>
        <Nav className={styles.nav}>

          <Nav.Link href="#"
            onClick={() => this.update(null)}
            className={styles.menu}> 개인메모 </Nav.Link>
            <NavDropdown title="그룹메모" className={styles.menu} drop="right">

              {this.props.group.gname.map((name,index) => (
                <NavDropdown.Item href="#" key={index}
                  onClick={() => this.update(this.props.group.no[index], name)}
                  className={styles.groupmenu}> {name} </NavDropdown.Item>
              ))}
            </NavDropdown>

        </Nav>
        <div className={styles.menu}>
          {hashtagList}
        </div>
      </div>
    );
  }
}
