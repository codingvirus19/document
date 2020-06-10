import React from "react";
import styles from "./Modal.css";

const API_URL = ".";
const API_HEADERS = {
  "Content-Type": "application/json",
};

export default class Modal extends React.Component {
    constructor(){
        super(...arguments);
        this.state={
            contents: this.props.contents,
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
        <div className={styles.modalContainer} onClick={this.props.onClickFalse}>
            <div className={styles.modalContainer__inner} onClick={(e) => e.stopPropagation()}>
                <header className={styles.inner__header}> 
                    {this.state.contents != null ? 
                    <span className={styles.header__title}><h2 className={styles.title__h2}>{this.state.contents}</h2></span>
                    : null }
                    
                    <span onClick={this.props.onClickFalse} 
                    className={styles.header__close}><button className={styles.close__icon} >&times;</button></span>
                </header>
                {this.state.contents != null ? 
                <div className={styles.contents}>
                    <p className={styles.contents__p}>{this.state.contents}</p><p>를 계속 진행하시겠습니까?</p>
                </div> : null}
               
                <footer className={styles.footer}>
                    {/* GroupOutEveryone의 버튼 클릭시 아래 함수 실행 */}
                    {this.state.contents == "그룹 삭제" ? <button onClick={this.onOutGroup.bind(this)} className={styles.confirm_btn}>확인</button> : null}

                    {/* GroupOutAlone의 버튼 클릭시 아래 함수 실행 */}
                    {this.state.contents == "그룹 나가기" ? <button onClick={this.onOutGroup.bind(this)} className={styles.confirm_btn}>확인</button> : null}
                   
                   {/* onClickFalse은 무조건 콜백함수로 사용해야 종료가 된다. 이전페이지에 꼭 넣기! */}
                   <button onClick={this.props.onClickFalse} className={styles.cancel_btn}>닫기</button>
                </footer>
            </div>
      </div>
      )
        
    }
}