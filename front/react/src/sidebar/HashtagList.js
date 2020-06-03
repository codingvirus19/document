import React from "react";
import Nav from 'react-bootstrap/Nav';
import styles from "./Sidebar.css";

export default class HashtagList extends React.PureComponent {

  clickHash(memo_no) {
  this.props.grouppingHashtag(memo_no)
  this.props.SidebarGroupUpdate(this.props.groupBySidebar.no, this.props.groupBySidebar.name)
  }

  render() {
    if(this.props.hash == null){
      return null;
    }
    // console.log(this.props.hash
    //   .map(({ no, name, memo_no }) => (
    //   {name})))
    return (
      <div>
        <h5>해시태그</h5>
        <Nav className={styles.nav}>
          {this.props.hash
          // .filter(({name}) =>this.props.hash.indexOf({name}) )
          .map(({ no, name, memo_no }) => (
            <Nav.Link 
            key={no} 
            className={styles.dropdown_menu}
            onClick={this.clickHash.bind(this, memo_no)}
            >
              {name}
              </Nav.Link>
          ))}
        </Nav>
      </div>
    );
  }
}