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