import React from "react";
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

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
          <input type='text' value={this.keyword} placeholder="해" onChange={this.onInputChange.bind(this)} />
          <Nav className="sidebar-nav">
            {this.state.hash && this.state.hash
              .filter(element => element.hash_name.indexOf(this.state.keyword) != -1)
              .map(({ no, hash_name }) => (
                <Nav.Link href="#" key={no} className="sidebar-nav-menu">{hash_name}</Nav.Link>
              ))}
          </Nav>
        </div>
      )
    }
    return (
      <div className="sidebar">
        <Nav className="sidebar-nav">
          <Nav.Link href="#"
            onClick={() => this.update(null)}
            className="sidebar-nav-menu"> 개인메모 </Nav.Link>
            <NavDropdown title="그룹메모" className="sidebar-nav-menu" drop="right">

              {this.props.group.gname.map((name,index) => (
                <NavDropdown.Item href="#" key={index}
                  onClick={() => this.update(this.props.group.no[index], name)}
                  className="sidebar-nav-menu-groupmenu"> {name} </NavDropdown.Item>
              ))}
            </NavDropdown>
        </Nav>
        <div className="sidebar-nav-menu">
          {hashtagList}
        </div>
      </div>
    );
  }
}