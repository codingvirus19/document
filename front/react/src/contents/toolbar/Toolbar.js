import React from "react";

import GroupShare from "./toolbar_style/GroupShare";
import ColorChange from "./toolbar_style/ColorChange";
import AddHash from "./toolbar_style/AddHash";
import SaveLocal from "./toolbar_style/SaveLocal";
import ExternalSharing from "./toolbar_style/ExternalSharing";
import MemoDelete from "./toolbar_style/MemoDelete";

import styles from "./Toolbar.css";

export default class Toolbar extends React.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      // showShareSheet: false,
      // no: this.props.no,
      memo_gNo: this.props.memo_gNo,
      // gNo: this.props.groupBySidebar.no,
      // gName: this.props.groupBySidebar.name,
    };
  }

  render() {
    return (
      <div className={styles.toolbar}>
        {/* 그룹공유 */}
        <GroupShare
          // gName,gNo : 임의의 작동을 한 그룹의 no와 name으로 콜백이동하기위한 props
          gName={this.props.groupBySidebar.name}
          gNo={this.props.groupBySidebar.no}
          // SidebarGroupUpdate: shareMemo 전송 후 수정된 메모list를 다시뿌려주기 위한 callback함수
          SidebarGroupUpdate={this.props.SidebarGroupUpdate}
          // memo_gNo: 선택한 메모의 g_no이다. callback함수에 input되며,
          //  메모리스트를 새로 불러올 때 해당 gNo페이지를 불러옴
          memo_gNo={this.props.memo_gNo}
          // no: 선택한 메모의 no
          no={this.props.no}
          // 해당 세션no에 포함되어있는 모든 group이다.
          group={this.props.group}
          clientRef={this.props.clientRef}
          users={this.props.users}
        />

        <ColorChange />

        {/* 해시추가 */}
        <AddHash
          hash={this.props.hash}
          no={this.props.no}
          memo_gNo={this.state.memo_gNo}
          memo_hash={this.props.memo_hash}
        />

        {/* 내 컴퓨터에 저장 */}
        <SaveLocal />

        {/* 외부공유 */}
        <ExternalSharing />

        {/* 메모삭제 */}
        <MemoDelete
          // SidebarGroupUpdate: delete클릭 후 수정된 메모list를 다시뿌려주기 위한 callback함수
          SidebarGroupUpdate={this.props.SidebarGroupUpdate}
          no={this.props.no}
          gName={this.props.groupBySidebar.name}
          gNo={this.props.groupBySidebar.no}
        />
      </div>
    );
  }
}
