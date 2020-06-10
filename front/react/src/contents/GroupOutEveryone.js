import React from "react";
import styles from "./ContentsHeader.css";
import Modal from "../Modal.js";

export default class GroupOutEveryone extends React.Component {
    constructor(){
        super(...arguments);
        this.state={
            openModal: false,
        }
    }

    onClickTrue(e){
        e.preventDefault();
        this.setState({
            openModal: !this.state.openModal,
        })
    }
   
    onClickFalse(){
        this.setState({openModal:false,})
    }
    
    render() {
        return (<div>
            <button onClick={this.onClickTrue.bind(this)} className={styles.groupOutButton}>그룹 삭제</button>
            {this.state.openModal == true ? <Modal contents={"그룹 삭제"} onClickFalse={this.onClickFalse.bind(this)} getGroup={this.props.getGroup} groupBySidebar={this.props.groupBySidebar} SidebarGroupUpdate={this.props.SidebarGroupUpdate}/> 
             :null}
        </div>)
        
    }
}