import React from "react";
import "./ContentsHeader.scss";
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
   
    // 클로즈 콜백함수로 <Modal>을 사용 시 반드시 사용할 것!!!!
    onClickFalse(){
        this.setState({openModal:false,})
    }
    
    render() {
        return (<div>
            <button onClick={this.onClickTrue.bind(this)} className="groupOutButton">그룹 삭제</button>
            {/* contents props에 기능과 관련된 단어를 넣으면 Modal창에 적용된다. 참고!!  */}
            {this.state.openModal == true ? 
            <Modal 
            notify={this.props.notify}
            contents={"그룹 삭제"} 
            onClickFalse={this.onClickFalse.bind(this)} 
            getGroup={this.props.getGroup} 
            groupBySidebar={this.props.groupBySidebar} 
            SidebarGroupUpdate={this.props.SidebarGroupUpdate}/> 
             :null}
        </div>)
        
    }
}