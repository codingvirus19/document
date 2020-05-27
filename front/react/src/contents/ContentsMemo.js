import React from "react";
import Memo from "./Memo";
import HashList from "./HashList";
import Toolbar from "./toolbar/Toolbar";
import styles from "./ContentsMemo.css";

export default class Contents extends React.Component {
  constructor() {
    super(...arguments);
    this.state={
      dragEnd :false,
      droptarget:'',
      dragtarget:'',
      droptargetno:'',
      dragtargetno:'',
    }
  }

  dropChange(a){
    this.setState({
      droptarget: a.target.id
    })
  }
  
  dragChange(a){
    this.setState({
      dragtarget: a.target.id
    })
  }
  dragButton(){
    if(this.state.dragEnd){
      this.props.memo_Change(this.state.dragtarget,this.state.droptarget);
    }
    this.setState({
      dragEnd: !this.state.dragEnd
    })
  }

  render() {
    return (
      <div className={styles.memo}>

        {this.props.memo_bigArr && this.props.memo_bigArr.map((memos,index) =>
                (<div key={this.props.memo_bigArr[index].no} className={styles.container_memo_form}>
                  <Memo dragButton={this.dragButton.bind(this)} dragChange={this.dragChange.bind(this)} dropChange={this.dropChange.bind(this)} index={index} no={this.props.memo_bigArr.no} content={this.props.memo_bigArr.content} />
                  <HashList />
                        <Toolbar
                  SidebarGroupUpdate={this.props.SidebarGroupUpdate}
                  no={this.props.memo_bigArr[index].no}
                  groupBySidebar={this.props.groupBySidebar}
                  color={this.props.memo_bigArr[index].color}
                />
                </div>
            )

          )}
      </div>
    );
  }
}
// 내가 할 부분
