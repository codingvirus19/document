import React from "react";
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

  clickGroup(g_no, g_name) {
    console.log(g_no);
    this.update(g_no, g_name);
  }

  update(g_no, g_name) {
    this.setState({
      g_no: g_no,
      g_name: g_name
    })
    this.props.onCallbackKeywordChange("");
    this.props.SidebarGroupUpdate(g_no, g_name);
  }

  render() {
    return (
      <div className="sidebar">
        <nav className="menu">
          <ol>
            <li className="menu-item">
              <a onClick={this.clickGroup.bind(this, null, null)}>
                개인메모
                </a>
            </li>
            <li className="menu-item">
              <a>그룹메모</a>
              <ol className="sub-menu">
                {this.props.group.gname.map((name, index) => (
                  <li key={this.props.group.no[index]} className="menu-item">
                    <a onClick={this.clickGroup.bind(this, this.props.group.no[index], name)}>
                      {name}
                    </a>
                  </li>
                ))}
              </ol>
            </li>
            <HashtagList
            hash={this.props.hash}
            g_no={this.state.g_no}
            SidebarHashUpdate={this.props.SidebarHashUpdate}
          />
          </ol>
        </nav>
      </div>
    );
  }
}