import React from "react";

import GroupShare from "./toolbar_style/GroupShare";
import ColorChange from "./toolbar_style/ColorChange";
import AddHash from "./toolbar_style/AddHash";
import SaveLocal from "./toolbar_style/SaveLocal";
import ExternalSharing from "./toolbar_style/ExternalSharing";
import MemoDelete from "./toolbar_style/MemoDelete";

import styles from "./Toolbar.css";

export default class Toolbar extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      // showShareSheet: false,
      no: this.props.no,
      memo_gNo: this.props.memo_gNo,
      gNo: this.props.groupBySidebar.no,
      gName: this.props.groupBySidebar.name,
    };
    
  }

  render() {
    return (
      <div className={styles.toolbar}>
        {/* 그룹공유 */}
        <GroupShare group={this.props.group} />

        <ColorChange />

        {/* 해시추가 */}
        <AddHash hash={this.props.hash} no={this.props.no} memo_gNo={this.state.memo_gNo} />

        {/* 내 컴퓨터에 저장 */}
        <SaveLocal />

        {/* 외부공유 */}
        <ExternalSharing />

        {/* 메모삭제 */}
        <MemoDelete no={this.state.no} gNo={this.state.gNo} />
      </div>
    );
  }
}
