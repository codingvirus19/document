import React from "react";
import ColorSearch from "./ColorSearch"
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
    this.props.SearchColordelete();
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
    this.props.UpdateSearchColor("", g_no);
  }

  clickHash(hash) {
    this.props.SearchColordelete();
    this.props.SidebarHashUpdate(this.state.g_no, hash)
    this.props.onCloseGroupAndHash();
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
              <li className={this.props.classMenuIndi}>
                <a onClick={this.clickGroup.bind(this, null, null)}>
                  <div className="menu-title">개인메모</div>
                </a>
              </li>
              <li className={this.props.classMenuGroup}>
                <a onClick={this.onGroup.bind(this)}>
                  <div className="menu-title">그룹메모</div>
                </a>
              </li>
              <li className={this.props.classMenuHash}>
                <a onClick={this.onHash.bind(this)}>
                  <div className="menu-title">해시태그</div>
                </a>
              </li>
              <li className={this.props.classMenuColor}>
                <a onClick={this.onColor.bind(this)}>
                  <div className="menu-title">색상검색</div>
                </a>
                {/* 색상검색 */}
                {this.props.clickColor ?
                  <ol className="sub-menu2">
                    {this.props.distinctColor.map((color) =>
                    <ColorSearch 
                    key={color}
                    g_no={this.state.g_no}
                    color={color}
                    searchColor={this.props.searchColor}
                    UpdateSearchColor={this.props.UpdateSearchColor}
                    classMenuColorSelect={this.props.classMenuColorSelect}
                    />
                    )}
                  </ol>
                  : null}
              </li>
            </ol>
          </div>
        </nav>
        {/* 그룹메모 */}
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
        {/* 해시태그 */}
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
                    <div className="submenu-item__span3">
                      <p>2</p>
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