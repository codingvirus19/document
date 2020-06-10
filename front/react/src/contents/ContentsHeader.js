import React, { Fragment } from "react";
import Popup2 from "../Popup2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faFolderPlus, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import styles from "./ContentsHeader.css";
import GroupInUserList from "./GroupInUserList";
import GroupOutEveryone from "./GroupOutEveryone";

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
        {(this.props.groupBySidebar.no != null) ? <GroupInUserList groupInUserList={this.props.groupInUserList} groupBySidebar={this.props.groupBySidebar.no} users={this.props.users} /> : null}
      </div>
      <div className={styles.groupOut}>
        {this.props.groupBySidebar.no != null ?
        <GroupOutEveryone getGroup={this.props.getGroup} groupBySidebar={this.props.groupBySidebar} SidebarGroupUpdate={this.props.SidebarGroupUpdate} />
          : null}
        {this.props.groupBySidebar.no != null ? 
          <button className={styles.groupOutButton}>그룹 나가기</button>
          : null}
      </div>
      </Fragment>
    );
  }
}