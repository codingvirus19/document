import React, { Fragment } from "react";
import Popup2 from "../Popup2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faFolderPlus, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import styles from "./ContentsHeader.css";
import GroupInUserList from "./GroupInUserList";
import GroupOutEveryone from "./GroupOutEveryone";
import GroupOutAlone from "./GroupOutAlone";

export default class ContentsHeader extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      ShowGroupAddOrInvite: false,
    };
  }

  toggleGroupAddOrInvite() {
    this.setState({
      ShowGroupAddOrInvite: !this.state.ShowGroupAddOrInvite,
    });
  }  
  
 
  
  render() {
    console.log()
    return (
      <Fragment>
      <div className={styles.header}>
        <div className={styles.title}>
          {this.props.groupBySidebar.name != null ? <h3>- {this.props.groupBySidebar.name} -</h3> : <h3>- 개인 -</h3>}
        </div>
        {/* <div className={styles.showinglist}>
          <button className="contents-header__btns" aria-label="보기방식 변환">
            <FontAwesomeIcon className={styles.faBars} icon={faBars} />
          </button>
        </div>
        <div className={styles.addgroup} aria-label="그룹 추가(잘모르겠어요)">
          <button className="contents-header__btns">
            <FontAwesomeIcon
              className={styles.faFolderPlus}
              icon={faFolderPlus}
            />
          </button>
        </div> */}

        <div className={styles.invite}>
          <button
            className={styles.btns}
            aria-label="그룹생성"
            onClick={this.toggleGroupAddOrInvite.bind(this)}
          >
            <FontAwesomeIcon className={styles.faUserPlus} icon={faUserPlus} />
          </button>
          {this.state.ShowGroupAddOrInvite ? (
            <Popup2
            notify={this.props.notify}
              inner_header="그룹생성 및 초대"
              contents={"groupAddOrInvite"}
              closePopup={this.toggleGroupAddOrInvite.bind(this)}
              group={this.props.group}
              getGroup={this.props.getGroup}
              clientRef={this.props.clientRef}
            />
          ) : null}
        </div>
        {(this.props.groupBySidebar.no != null) ? 
          <GroupInUserList groupInUserList={this.props.groupInUserList} groupBySidebar={this.props.groupBySidebar.no} users={this.props.users} /> : null}

      </div>

      <div className={styles.groupOut}>
        
        {/* 그룹 삭제 : 그룹이 개인일때는 아래 버튼이 작동되어선 안된다!   */}
        {this.props.groupBySidebar.no != null && this.props.groupInUserList[1] == undefined ?
        <GroupOutEveryone getGroup={this.props.getGroup} groupBySidebar={this.props.groupBySidebar} SidebarGroupUpdate={this.props.SidebarGroupUpdate} />
        : null}

        {/* 그룹 나가기 : 그룹이 개인일때는 아래 버튼이 작동되어선 안된다!  */}
        {this.props.groupBySidebar.no != null && this.props.groupInUserList[1] != undefined ? 
          <GroupOutAlone getGroup={this.props.getGroup} groupBySidebar={this.props.groupBySidebar} SidebarGroupUpdate={this.props.SidebarGroupUpdate} />
          : null}
      </div>
      </Fragment>
    );
  }
}