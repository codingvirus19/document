import React, { Fragment } from "react";
import Memo from "./Memo";
import HashList from "./HashList";
import Toolbar from "./toolbar/Toolbar";
import toolbar from "./toolbar/Toolbar.css";
import styles from "./ContentsMemoList.css";
import ContentsMemo from "./ContentsMemo";
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
  
  DragStart(e) {
    this.dragStart = e.currentTarget;
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
    if (e.currentTarget.className != `${styles.container_memo_form}`) return;
    if (e.currentTarget.dataset.id == this.dragStart.dataset.id) return;
    this.dragOver = e.currentTarget;
    let from = Number(this.dragStart.dataset.id);
    let to = Number(this.dragOver.dataset.id);
    this.props.memo_Change(from, to);
  }

  
  render() {
    if (this.props.memo_bigArr.length === 0) {
      return (
        <div className={styles.memo__container} >
          <div className={styles.memo_null}>
            <div className={styles.memo_null__container}>
              <h2 className={styles.container__contents1}>메모가 존재하지 않습니다.</h2>
              <span className={styles.container__contents_span}>
                <p>( </p>
                <p onClick={this.togglePopup.bind(this)} className={styles.container__contents_here}>여기</p>
                <p className={styles.container__contents}>를 클릭하여 메모를 생성하세요</p>
                <p> )</p>
              </span>
              {this.state.showPopup ? (
                <CreateEditor
                  users={this.props.users}
                  bringMemoByGroup={this.props.bringMemoByGroup}
                  groupNoForGroupUser={this.props.groupBySidebar}
                  closePopup={this.togglePopup.bind(this)}
                  clientRef={this.props.clientRef}
                />
              ) : null}
            </div>


          </div>
        </div>
      )
    }
    return (
      <div className={styles.memo} >
        {this.props.memo_bigArr &&
          this.props.memo_bigArr.map((memos, index) => (
            <ContentsMemo
              gNo={this.props.memo_bigArr[index].gNo}
              no={this.props.memo_bigArr[index].no}
              content={this.props.memo_bigArr[index].content}
              color={this.props.memo_bigArr[index].color}
              memo_hash={this.props.group_hash.filter((element) =>
                element.memo_no === this.props.memo_bigArr[index].no)}
              index={index}
              DragOver={this.DragOver.bind(this)}
              DragStart={this.DragStart.bind(this)}
              DragEnd={this.DragEnd.bind(this)}
              key={this.props.memo_bigArr[index].no}
              notify={this.props.notify}
              bringMemoByGroup={this.props.bringMemoByGroup}
              memo_Change={this.props.memo_Change}
              callbackFromToolbar={this.props.callbackFromToolbar}
              SidebarGroupUpdate={this.props.SidebarGroupUpdate}
              groupBySidebar={this.props.groupBySidebar}
              group={this.props.group}
              memo_bigArr={this.props.memo_bigArr}
              clientRef={this.props.clientRef}
              users={this.props.users}
              group_hash={this.props.group_hash}
              distinctGroup_hash={this.props.distinctGroup_hash}
              groupInUserList={this.props.groupInUserList}
              key={index}

            />
          ))}
      </div>
    );
  }
}