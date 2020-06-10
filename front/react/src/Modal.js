import React from "react";
import styles from "./Modal.css";

export default class Modal extends React.Component {
    constructor(){
        super(...arguments);
        this.state={
            title: this.props.title
        }
    }
    
    // onChangeTitle(){
    //     this.setState({
    //         title:this.props.title
    //     })
    // }
    
    onOutGroup(e){
        e.preventDefault();
        console.log(this.props.groupBySidebar.no)
        let groupNoForDelete = null;
    
        // group의 no는 개인이기 때문에 그룹 나가기가 작동되어선 안된다.
        // no가 null이 아닌것 에서만 그룹나가기가 작동되도록 설정.
        if(this.props.groupBySidebar.no != null){
          // 들어가있는 그룹의 no와 name값(상훈아 name넣었다!!!)
          groupNoForDelete ={
            no: this.props.groupBySidebar.no,
            name: this.props.groupBySidebar.name,
          } 
    
          fetch(`${API_URL}/api/outGroup`, {
            method: "post",
            headers: API_HEADERS,
            body: JSON.stringify(groupNoForDelete),
          })
            .then((response) => response.json())
            .then((json) => {
              console.log(json.data)
              let getTrue = json.data;
              if (getTrue != false) {
                this.props.SidebarGroupUpdate(null, null);
                this.props.getGroup();
              }
            })
            .catch((err) => console.error(err));
        }else{
          console.log("개인은 그룹나가기하면 안됩니다!")
        }
      }
    
    
      render() {
        return (
        <div className={styles.modalContainer}>
            <div className={styles.modalContainer__inner}>
                <header className={styles.inner__header}> 
                    {this.state.title != null ? 
                    <span className={styles.header__title}><h2>{this.state.title}</h2></span>
                    : null }
                    
                    <span onClick={this.props.onClickFalse} 
                    className={styles.header__close}>&times;</span>
                </header>
                <div className={styles.contents}>
                    <p>Some text..</p>
                </div>
                <footer className={styles.footer}>
                   <button onClick={this.onOutGroup.bind(this)} className={styles.confirm_btn}>확인</button>
                   <button onClick={this.props.onClickFalse} className={styles.cancel_btn}>닫기</button>
                </footer>
            </div>
      </div>
      )
        
    }
}