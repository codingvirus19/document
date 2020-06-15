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
      clickGroup: false,
      clickHash: false,
    };
    this.tempGno = null;
  }

  clickGroup(g_no, g_name) {
    
    // console.log(this.tempGno,g_no,"왜안대!!");
    // if(g_no == this.tempGno)return;

    // if(this.tempGno == null && g_no==null){ //최초접근시 그룹이 없을때
    // }else if(this.tempGno == null && g_no!=null){//처음 그룹선택시 tempGno 에 그룹 주입
    //   this.tempGno = g_no;
    //   this.props.clientRef.sendMessage(`/app/userlist/connect/${g_no}`, this.props.users.no[0]);
    // }else if(this.tempGno != null && g_no == null){// 그룹에서 개인메모 이동시
    //   this.props.clientRef.sendMessage(`/app/userlist/disconnect/${this.tempGno}`, this.props.users.no[0]);
    //   this.tempGno = null;
    // }else if(this.tempGno != null && g_no != null){//그룹에서 그룹이동시
    //   this.props.clientRef.sendMessage(`/app/userlist/disconnect/${this.tempGno}`, this.props.users.no[0]);
    //   this.props.clientRef.sendMessage(`/app/userlist/connect/${g_no}`, this.props.users.no[0]);
    // }
    this.update(g_no, g_name);
    this.setState({
      clickGroup:false,
    })
  }

  update(g_no, g_name) {
    this.setState({
      g_no: g_no,
      g_name: g_name
    })
    this.props.onCallbackKeywordChange("");
    this.props.SidebarGroupUpdate(g_no, g_name);
  }

  clickHash(hash) {
    this.props.SidebarHashUpdate(this.props.g_no, hash)
    this.setState({
      clickHash:false,
    })
  }
  
  onOpenGroup(){
    this.setState({
      clickGroup: !this.state.clickGroup,
      clickHash: false,
    })
  }
  
  onOpenHash(){
    this.setState({
      clickHash: !this.state.clickHash,
      clickGroup: false,
      
    })
    
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
                <a onClick={this.onOpenGroup.bind(this)}>
                  {/* 그룹메모 */}
                  </a>
              </li>
              <li className="menu-item">
                <a onClick={this.onOpenHash.bind(this)}>
                  {/* 해시태그 */}
                </a>
              </li>
            </ol>
            <div className="menu-setting--container">
              <a className="container__setting">
                {/* Settings */}
                <FontAwesomeIcon className="fa-cog" icon={faCog} />
              </a>
            </div>
          </div>
         
        </nav>
        {this.state.clickGroup == true ? 
          <div className="sidebar__menu">
            <div className="sidebar__menu__title-container">
              <p className="container__title">Group</p>
            </div>
            <ol className="sub-menu">
                  {this.props.group.gname.map((name, index) => (
                    <li key={this.props.group.no[index]} className="submenu-item" onClick={this.clickGroup.bind(this, this.props.group.no[index], name)}>
                      <a>
                        <span className="submenu-item__span1">
                          <FontAwesomeIcon className="fas fa-bookmark" icon={faBookmark} />
                          </span>
                        <span className="submenu-item__span2">
                          {name}
                          </span>
                      </a>
                    </li>
                  ))}
            </ol>
          </div> 
        :null}
        {this.state.clickHash == true && this.props.hash != null ? 
          <div className="sidebar__menu">
            <div className="sidebar__menu__title-container">
              <p className="container__title">Hash</p>
            </div>
            <ol className="sub-menu">
            {this.props.hash.map((hash) => (
              <li key={hash} className="submenu-item" onClick={this.clickHash.bind(this, hash)}>
                <a>
                  <span className="submenu-item__span1">
                    <FontAwesomeIcon className="fas fa-hashtag" icon={faHashtag} />
                  </span>
                  <span className="submenu-item__span2">
                    {hash}
                  </span>
                </a>
              </li>
              ))}
            </ol>
          </div> 
        :null}
      </div>
    );
  }
}