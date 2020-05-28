import React from "react";
import Memo from "./Memo";
import HashList from "./HashList";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Toolbar from "./toolbar/Toolbar";
import styles from "./ContentsMemo.css";


export default class Contents extends React.Component {

  constructor() {
    super(...arguments);
    this.state = {
      dragEnd: '',
      dragStart: '',
      dragOver: '',
    }
  }

  dragStart(e) {
    e.dataTransfer.effectAllowed = 'move';
    e.target.style.opacity = 0.1;
    e.dataTransfer.setData('text/html', e.currentTarget);
    this.setState({
      dragStart: e.currentTarget
    })
  }
  dragEnd(e) {
    this.state.dragStart.style.opacity = 1;
    let from = Number(this.state.dragStart.dataset.id);
    let to = Number(this.state.dragOver.dataset.id);
    if (from < to) to--;
    this.props.memo_Change(from, to);
  }
  dragOver(e) {
    e.preventDefault();
    if (e.target.className != `${styles.container_memo_form}`) return;
    this.setState({
      dragOver: e.target
    })
    e.target.parentNode.insertBefore(this.state.dragStart, e.target);
  }
 

  render() {

    return (

      <div className={styles.memo} onDragOver={this.dragOver.bind(this)} >
        {this.props.memo_bigArr && this.props.memo_bigArr.map((memos, index) =>
          (<div key={this.props.memo_bigArr[index].no} data-id={index} draggable="true"  onDragStart={this.dragStart.bind(this)} onDragEnd={this.dragEnd.bind(this)} className={styles.container_memo_form}>
            <Memo index={index} no={this.props.memo_bigArr.no} content={this.props.memo_bigArr.content} />
            <HashList />
            <Toolbar
              groupBySidebar={this.props.groupBySidebar}
              color={this.props.memo_bigArr.color}
            />
          </div>
          )
        )}

      </div>
    );
  }
}
