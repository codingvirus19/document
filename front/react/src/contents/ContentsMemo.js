import React from "react";
import Memo from "./Memo";
import HashList from "./HashList";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Toolbar from "./toolbar/Toolbar";
import styles from "./ContentsMemo.css";

export default class Contents extends React.Component {
  render() {
    return (
      <DragDropContext>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div className={styles.memo} ref={provided.innerRef}>
              {this.props.memo_bigArr &&
                this.props.memo_bigArr.map((memos, index) => (
                  <Draggable
                    key={`${this.props.memo_bigArr[index].no}`}
                    draggableId={`${this.props.memo_bigArr[index].no}`}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className={styles.container_memo_form}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <Memo content={this.props.memo_bigArr.content} />
                        <HashList />
                        <Toolbar
                          SidebarGroupUpdate={this.props.SidebarGroupUpdate}
                          no={this.props.memo_bigArr[index].no}
                          memo_gNo={this.props.memo_bigArr[index].gNo}
                          group={this.props.group}
                          groupBySidebar={this.props.groupBySidebar}
                          color={this.props.memo_bigArr.color}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}
