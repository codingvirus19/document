import React from "react";
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import HashtagList from "./HashtagList"
import "./Sidebar.scss";

export default class Sidebar extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      g_no: null,
      g_name: null,
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
      <div className="sidebar">

        <div className="hashtagList">
          <HashtagList
            hash={this.props.hash}
            g_no={this.state.g_no}
            SidebarHashUpdate={this.props.SidebarHashUpdate}
          />
        </div>

        <nav className="menu">
          <ol>
            <li className="menu-item"><a onClick={() => this.update(null, null)}>개인메모</a></li>
            <li className="menu-item">
              <a href="#0">그룹메모</a>
              <ol className="sub-menu">
                {this.props.group.gname.map((name, index) => (
                  <li key={name} className="menu-item">
                    <a onClick={() => this.update(this.props.group.no[index], name)}>
                      {name}
                    </a>
                  </li>
                ))}
              </ol>
            </li>
            <li className="menu-item"><a href="#0">Contact</a></li>
          </ol>
        </nav>
      </div>
    );
  }
}