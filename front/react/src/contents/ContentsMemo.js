import React from "react";
import Memo from "./Memo";
import HashList from "./HashList";
import Toolbar from "./toolbar/Toolbar";
import styles from "./ContentsMemo.css";

export default class Contents extends React.Component {
  constructor(props) {
    super(...arguments);
    this.state = {
      memo_hash: [{ no: "", name: "", memo_no: "" }],
      color: "#ffffff",
      memo_bigArr: this.props.memo_bigArr
    };
  }
  DragStart(e) {
    this.dragStart = e.target;
    this.cpdragStart = this.dragStart.cloneNode(true);
    e.dataTransfer.effectAllowed = "move";
    e.target.style.opacity = 0.1;
    e.dataTransfer.setData("text/html", this.cpdragStart);
  }
  DragEnd(e) {
    this.dragStart.style.opacity = 1;
    if (this.dragOver == undefined) {
      return;
    }
  }
  DragOver(e) {
    e.preventDefault();
    if (e.target.className != `${styles.container_memo_form}`) return;
    if (e.target.dataset.id == this.dragStart.dataset.id) return;
    this.dragOver = e.target;
    let from = Number(this.dragStart.dataset.id);
    let to = Number(this.dragOver.dataset.id);
    this.props.memo_Change(from, to);
  }
  setMemo_hash(memo_hash) {
    this.setState({
      memo_hash: this.state.memo_hash.concat(memo_hash),
    });
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps)
  }
  render() {
    if (this.props.memo_bigArr.length === 0) {
      return (
        <div className={styles.memo} >
          <div className={styles.memo_null}>
            메모가 존재하지 않습니다.
        </div>
        </div>
      )
    }
    return (
      // memo_hash: 해당 메모의 해시들
      <div className={styles.memo} >
        {this.props.memo_bigArr &&
          this.props.memo_bigArr.map((memos, index) => (
            <div
              style={{ background: this.props.memo_bigArr[index].color }}
              key={this.props.memo_bigArr[index].no}
              data-id={index}
              draggable="true"
              onDragStart={this.DragStart.bind(this)}
              onDragEnd={this.DragEnd.bind(this)}
              onDragOver={this.DragOver.bind(this)}
              className={styles.container_memo_form}
            >
              <Memo
                memo_gNo={this.props.memo_bigArr[index].gNo}
                distinctGroup_hash={this.props.distinctGroup_hash}
                SidebarGroupUpdate={this.props.SidebarGroupUpdate}
                bringMemoByGroup={this.props.bringMemoByGroup}
                groupBySidebar={this.props.groupBySidebar}
                group={this.props.group}
                memo_bigArr={this.props.memo_bigArr}
                index={index}
                no={this.props.memo_bigArr[index].no}
                clientRef={this.props.clientRef}
                content={this.props.memo_bigArr[index].content}
                memo_hash={this.props.group_hash.filter((element) =>
                  element.memo_no === this.props.memo_bigArr[index].no)}
                color={this.props.memo_bigArr[index].color}
                group_hash={this.props.group_hash}
                users={this.props.users}
                setStyle={{ background: this.props.memo_bigArr[index].color }}
              />
              <HashList
                memo_no={this.props.memo_bigArr[index].no}
                setMemo_hash={this.setMemo_hash.bind(this)}
                memo_hash={this.props.group_hash.filter((element) =>
                  element.memo_no === this.props.memo_bigArr[index].no)}
                SidebarGroupUpdate={this.props.SidebarGroupUpdate}
                groupBySidebar={this.props.groupBySidebar}
              />
              <Toolbar
                notify={this.props.notify}
                // SaveLocal에서 저장시킬 contents값
                content={this.props.memo_bigArr[index].content}
                // 색을 변화시킬 때 툴바의 색도 함께 변화시킬 props이다.
                setStyle={{ background: this.props.memo_bigArr[index].color }}
                // 선택한 메모의 no
                no={this.props.memo_bigArr[index].no}
                memo_gNo={this.props.memo_bigArr[index].gNo}
                group={this.props.group}
                groupBySidebar={this.props.groupBySidebar}
                memo_hash={this.props.group_hash.filter((element) =>
                  element.memo_no === this.props.memo_bigArr[index].no)}
                color={this.props.memo_bigArr[index].color}
                SidebarGroupUpdate={this.props.SidebarGroupUpdate}
                clientRef={this.props.clientRef}
                users={this.props.users}
                distinctGroup_hash={this.props.distinctGroup_hash}
                IsHashUpdate={this.props.IsHashUpdate}
              />
            </div>
          ))}
      </div>
    );
  }
}//