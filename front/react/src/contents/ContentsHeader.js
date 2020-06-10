import React, { Fragment } from "react";
import Popup2 from "../Popup2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faFolderPlus, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import styles from "./ContentsHeader.css";

const API_URL = "http://localhost:8080/codingvirus19";
const API_HEADERS = {
  "Content-Type": "application/json",
};

export default class ContentsHeader extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      ShowGroupAddOrInvite: false,
    };
  }

  toggleGroupAddOrInvite() {
    this.setState({
      ShowGroupAddOrInvite: !this.state.ShowGroupAddOrInvite,
    });
  }  
  
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
      <Fragment>
      <div className={styles.header}>
        <div className={styles.title}>
          {this.props.groupBySidebar.name != null ? <h3>- {this.props.groupBySidebar.name} -</h3> : <h3>- 개인 -</h3>}
        </div>
        {/* <div className={styles.showinglist}>
          <button className="contents-header__btns" aria-label="보기방식 변환">
            <FontAwesomeIcon className={styles.faBars} icon={faBars} />
          </button>
        </div>

        <div className={styles.addgroup} aria-label="그룹 추가(잘모르겠어요)">
          <button className="contents-header__btns">
            <FontAwesomeIcon
              className={styles.faFolderPlus}
              icon={faFolderPlus}
            />
          </button>
        </div> */}

        <div className={styles.invite}>
          <button
            className={styles.btns}
            aria-label="그룹생성"
            onClick={this.toggleGroupAddOrInvite.bind(this)}
          >
            <FontAwesomeIcon className={styles.faUserPlus} icon={faUserPlus} />
          </button>
          {this.state.ShowGroupAddOrInvite ? (
            // { true ? (
            <Popup2
              inner_header="그룹생성 및 초대"
              contents={"groupAddOrInvite"}
              closePopup={this.toggleGroupAddOrInvite.bind(this)}
              group={this.props.group}
              getGroup={this.props.getGroup}
              clientRef={this.props.clientRef}
            />
          ) : null}
        </div>
        <div className={styles.groupUsers}>
            <div>
            </div>
        </div>
      </div>
      <div className={styles.groupOut}>
        {this.props.groupBySidebar.no != null ?
          <button onClick={this.onOutGroup.bind(this)} className={styles.groupOutButton}>그룹 삭제</button>
          : null}
        {this.props.groupBySidebar.no != null ?
          <button className={styles.groupOutButton}>그룹 나가기</button>
          : null}
      </div>
      </Fragment>
    );
  }
}
