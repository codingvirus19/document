import React from "react";
import "./Sidebar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faThumbtack, faBookmark, faHashtag, faCog } from "@fortawesome/free-solid-svg-icons";

export default class Sidebar extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      g_no: null,
      g_name: null,
      clickGroup: this.props.clickGroup,
      clickHash: this.props.clickHash,
      clickColor: this.props.clickColor,
    };
    this.tempGno = null;
  }

  clickGroup(g_no, g_name) {
    this.update(g_no, g_name);
  }

  update(g_no, g_name) {
    this.setState({
      g_no: g_no,
      g_name: g_name
    })
    this.props.onCallbackKeywordChange("");
    this.props.SidebarGroupUpdate(g_no, g_name);
    this.props.onCloseGroupAndHash();
  }

  clickHash(hash) {
    this.props.SidebarHashUpdate(this.state.g_no, hash)
    this.props.onCloseGroupAndHash();
  }
  clickColor(color) {
    this.props.UpdateSearchColor(color.color);
  }

  onGroup() {
    this.props.onOpenGroup();
  }
  onHash() {
    this.props.onOpenHash();
  }
  onColor() {
    this.props.onOpenColor();
  }

  render() {
    return (
      <div className="sidebar">
        <nav className="nav">
          <div className="menu">
            <ol>
              <li className="menu-item">
                <a onClick={this.clickGroup.bind(this, null, null)}>
                  {/* 개인메모 */}
                </a>
              </li>
              <li className="menu-item">
                <a onClick={this.onGroup.bind(this)}>
                  {/* 그룹메모 */}
                </a>
              </li>
              <li className="menu-item">
                <a onClick={this.onHash.bind(this)}>
                  {/* 해시태그 */}
                </a>
              </li>
              <li className="menu-item">
                <a onClick={this.onColor.bind(this)}>
                  {/* 색상검색 */}
                </a>
              </li>
              {this.props.clickColor ?
                <li className="menu-item">
                  <ol className="sub-menu2">
                  {this.props.distinctColor.map((color) =>
                  <li 
                  className="menu-item"
                  onClick={this.clickColor.bind(this, { color })} >
                    <div
                      key={color}
                      className="color_btn"
                      style={{ backgroundColor: color }} 
                      />
                      </li>
                  )}
                  </ol>
                </li>
                : null}
            </ol>
            {/* <div className="menu-setting--container">
              <a className="container__setting">
                Settings
                <FontAwesomeIcon className="fa-cog" icon={faCog} />
              </a>
            </div> */}
          </div>
        </nav>
        {this.props.clickGroup == true ?
          <div className="sidebar__menu">
            <div className="sidebar__menu__title-container">
              <p className="container__title">Group</p>
            </div>
            <ol className="sub-menu">
              {this.props.group.gname.map((name, index) => (
                <li
                  key={this.props.group.no[index]}
                  className="submenu-item"
                  onClick={this.clickGroup.bind(this, this.props.group.no[index], name)}>
                  <a>
                    <div className="submenu-item__span1">
                      <FontAwesomeIcon className="fas fa-bookmark" icon={faBookmark} />
                    </div>
                    <div className="submenu-item__span2">
                      {name}
                    </div>
                  </a>
                </li>
              ))}
            </ol>
          </div>
          : null}
        {this.props.clickHash == true && this.props.hash != null ?
          <div className="sidebar__menu">
            <div className="sidebar__menu__title-container">
              <p className="container__title">Hash</p>
            </div>
            <ol className="sub-menu">
              {this.props.hash.map((hash) => (
                <li key={hash} className="submenu-item" onClick={this.clickHash.bind(this, hash)}>
                  <a>
                    <div className="submenu-item__span1">
                      <FontAwesomeIcon className="fas fa-hashtag" icon={faHashtag} />
                    </div>
                    <div className="submenu-item__span2">
                      {hash}
                    </div>
                  </a>
                </li>
              ))}
            </ol>
          </div>
          : null}
      </div>
    );
  }
}