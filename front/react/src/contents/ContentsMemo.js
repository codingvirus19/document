import React from "react";
import Memo from "./Memo";
import HashList from "./HashList";
import Toolbar from "./toolbar/Toolbar";
import toolbar from "./toolbar/Toolbar.css";
import styles from "./ContentsMemoList.css";
import ContentsMemo from "./ContentsMemo"
import CreateEditor from "../header/headerMemu/CreateEditor"

export default class ContentsMemoList extends React.Component {
  constructor(props) {
    super(...arguments);
    this.memohover = React.createRef();
    this.state = {
      memo_hash: [{ no: "", name: "", memo_no: "" }],
      color: "#ffffff",
      memo_bigArr: this.props.memo_bigArr,
      showPopup: false,
      hoverMemo: false,
    };
    
  }
  setMemo_hash(memo_hash) {
    this.setState({
      memo_hash: this.state.memo_hash.concat(memo_hash),
    });
  }

  componentWillReceiveProps(nextProps) {
  }

  onClickHere(e) {
    // e.preventDefault();
    console.log("test");
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }

  render() {
    return (
            <div
              style={{ background: this.props.color}}
              key={this.props.no}
              data-id={this.props.index}
              draggable="true"
              onDragStart={this.props.DragStart}
              onDragEnd={this.props.DragEnd}
              onDragOver={this.props.DragOver}
              onMouseEnter={(e) => this.setState({
                hoverMemo:true
              })}
              onMouseLeave={(e) => this.setState({
                hoverMemo:false
            })}
              className={styles.container_memo_form}
            >
              {/* <ContentsMemo /> */}
              <Memo 
                notify={this.props.notify}
                groupInUserList={this.props.groupInUserList}
                memo_gNo={this.props.gNo}
                distinctGroup_hash={this.props.distinctGroup_hash}
                SidebarGroupUpdate={this.props.SidebarGroupUpdate}
                bringMemoByGroup={this.props.bringMemoByGroup}
                groupBySidebar={this.props.groupBySidebar}
                group={this.props.group}
                memo_bigArr={this.props.memo_bigArr}
                index={this.props.index}
                no={this.props.no}
                clientRef={this.props.clientRef}
                content={this.props.content}
                memo_hash={this.props.memo_hash}
                color={this.props.color}
                group_hash={this.props.group_hash}
                users={this.props.users}
                setStyle={{ background: this.props.color }}
              />
              <HashList
                memo_no={this.props.no}
                setMemo_hash={this.setMemo_hash.bind(this)}
                memo_hash={this.props.memo_hash}
                clientRef={this.props.clientRef}
                SidebarGroupUpdate={this.props.SidebarGroupUpdate}
                groupBySidebar={this.props.groupBySidebar}
                users={this.props.users}
              />
               {(this.state.hoverMemo)?
               <Toolbar
                  memohover={this.memohover}
                  key={this.props.no}
                  index={this.props.index}
                  notify={this.props.notify}
                  // SaveLocal에서 저장시킬 contents값
                  content={this.props.content}
                  // 색을 변화시킬 때 툴바의 색도 함께 변화시킬 props이다.
                  setStyle={{ background: this.props.color }}
                  // 선택한 메모의 no
                  no={this.props.no}
                  memo_gNo={this.props.gNo}
                  group={this.props.group}
                  groupBySidebar={this.props.groupBySidebar}
                  memo_hash={this.props.memo_hash}
                  color={this.props.color}
                  SidebarGroupUpdate={this.props.SidebarGroupUpdate}
                  clientRef={this.props.clientRef}
                  users={this.props.users}
                  distinctGroup_hash={this.props.distinctGroup_hash}
                  IsHashUpdate={this.props.IsHashUpdate}
                />
                 :<div className = {toolbar.toolbarSize}></div>}
            </div>
    );
  }
}