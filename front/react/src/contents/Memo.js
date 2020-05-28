import React from "react";

import styles from "./Memo.css";

export default class Memo extends React.Component {

  constructor() {
    super(...arguments)
    this.state = {
      showPopup: false,
      droptarget: '',
      dragtarget: ''
    }
  }

  viewPopup(){
    console.log("click");
    this.setState({
      showPopup: !this.state.showPopup
    })
    console.log(this.state.showPopup)
  }
  DrageStart(e){
    this.props.dragChange(e);
    this.props.dragButton();
  }
  

  render() {
    return (
      <input onClick={this.viewPopup.bind(this)} id={this.props.index} name={this.props.no} draggable="true" onDragOver={(e)=>this.props.dropChange(e)} onDragStart={(e)=>this.DrageStart(e)} onDragEnd={this.props.dragButton} value={this.props.content}
        // onChange={}
        className={styles.memo}
      ></input>
    );
  }
}
