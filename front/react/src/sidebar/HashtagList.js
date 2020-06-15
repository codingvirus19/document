import React from "react";
import "./Sidebar.scss";

export default class HashtagList extends React.PureComponent {

  clickHash(hash) {
    this.props.SidebarHashUpdate(this.props.g_no, hash)
  }

  render() {
    if (this.props.hash == null) {
      return null;
    }
    return (
      <>
        <li className="menu-item 2">
          <a>
            {/* 해시태그 */}
            </a>
          {/* <ol className="sub-menu2">
            {this.props.hash.map((hash) => (
              <li
                key={hash}
                className="menu-item"
                onClick={this.clickHash.bind(this, hash)}>
                <a>{hash}</a>
              </li>
            ))}
          </ol> */}
        </li>
      </>
    );
  }
}