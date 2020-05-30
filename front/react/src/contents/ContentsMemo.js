import React from "react";
import Memo from "./Memo";
import HashList from "./HashList";
import Toolbar from "./toolbar/Toolbar";
import styles from "./ContentsMemo.css";

export default class Contents extends React.PureComponent {

  constructor() {
    super(...arguments);
    this.state = {
      memo_hash: [{ no: '', name: '', memo_no: '' }],
    }
  }
  DragStart(e) {
    this.dragStart = e.currentTarget;
    e.dataTransfer.effectAllowed = "move";
    e.target.style.opacity = 0.1;
    e.dataTransfer.setData("text/html", this.dragStart);
  }
  DragEnd() {
    this.dragStart.style.opacity = 1;
    if(this.dragOver == undefined){
      return;
    }
    let from = Number(this.dragStart.dataset.id);
    let to = Number(this.dragOver.dataset.id);
    if (from < to) to--;
    this.props.memo_Change(from, to);
  }
  DragOver(e) {
    e.preventDefault();
    if (e.target.className != `${styles.container_memo_form}`) return;
    this.dragOver = e.target;
    e.target.parentNode.insertBefore(this.dragStart, e.target);
  }

  setMemo_hash(memo_hash) {
      this.setState({
        memo_hash: this.state.memo_hash.concat(memo_hash),
      })
  }

  render() {
    return (
      <div className={styles.memo} onDragOver={this.DragOver.bind(this)} >
        {this.props.memo_bigArr && this.props.memo_bigArr.map((memos, index) =>
          (<div key={this.props.memo_bigArr[index].no} data-id={index} draggable="true" onDragStart={this.DragStart.bind(this)} onDragEnd={this.DragEnd.bind(this)} className={styles.container_memo_form}>
            <Memo
              groupBySidebar={this.props.groupBySidebar}
              group={this.props.group}
              memo_bigArr={this.props.memo_bigArr}
              content={this.props.memo_bigArr[index].content}
            />
            <HashList
              memo_no={this.props.memo_bigArr[index].no}
              setMemo_hash={this.setMemo_hash.bind(this)}
            />
            <Toolbar
              // 선택한 메모의 no
              no={this.props.memo_bigArr[index].no}
              memo_gNo={this.props.memo_bigArr[index].gNo}
              group={this.props.group}
              groupBySidebar={this.props.groupBySidebar}
              memo_hash={this.state.memo_hash.filter(element => element.memo_no===this.props.memo_bigArr[index].no)}
              color={this.props.memo_bigArr.color}
              SidebarGroupUpdate={this.props.SidebarGroupUpdate}
            />
          </div>
          )
        )}
      </div>
    );
  }
}
