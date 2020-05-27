import React from "react";

import GroupShareSheet from "./GroupShareSheet";
import ShareSheet from "./ShareSheet";
import ColorSheet from "./ColorSheet";
import HashSheet from "./HashSheet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExternalLinkAlt,
  faShareSquare,
  faPalette,
  faHashtag,
  faSave,
  faFileUpload,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Toolbar.css";

const API_URL = "http://localhost:8080/codingvirus19";
const API_HEADERS = {
  "Content-Type": "application/json",
};

export default class Toolbar extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      showGroupShareSheet: false,
      showShareSheet: false,
      showColorSheet: false,
      showHashSheet: false,
      clickGroupShareButton: false,
      clickHashButton: false,
      no: this.props.no,
      gNo: this.props.groupBySidebar.no,
      gName: this.props.groupBySidebar.name,
    };
    this.toggleContainer = React.createRef();
    this.toggleContainer2 = React.createRef();
    this.toggleGroupShareSheet = this.toggleGroupShareSheet.bind(this);
    this.onClickOutsideHandler = this.onClickOutsideHandler.bind(this);
  }

  //   shouldComponentUpdate(nextProps, nextState) {
  //     console.log(JSON.stringify(nextProps));
  //     console.log(JSON.stringify(this.props));

  //     console.log(JSON.stringify(nextProps) != JSON.stringify(this.props));
  //     return JSON.stringify(nextProps) != JSON.stringify(this.props);
  //   }

  //   componentDidUpdate(prevProps, prevState) {
  //     this.props.callbackFromToolbar(this.state.gNo);
  //     this.setState({
  //       no: this.props.no,
  //       gNo: this.props.groupBySidebar.no,
  //       //   groups: this.state.group.gname.map(gname => {
  //       //       return {
  //       //           value: gname,
  //       //           label: gname
  //       //       }
  //       //   })
  //     });
  //   }

  componentDidMount() {
    window.addEventListener("click", this.onClickOutsideHandler);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.onClickOutsideHandler);
  }

  onClickOutsideHandler(event) {
    if (this.state.clickGroupShareButton) {
      this.setState({
        clickGroupShareButton: !this.state.clickGroupShareButton,
      });
    } else if (
      this.state.showGroupShareSheet &&
      !this.toggleContainer.current.contains(event.target)
    ) {
      this.setState({ showGroupShareSheet: false });
    }

    if (this.state.clickHashButton) {
      this.setState({
        clickHashButton: !this.state.clickHashButton,
      });
    } else if (
      this.state.showHashSheet &&
      !this.toggleContainer2.current.contains(event.target)
    ) {
      this.setState({ showHashSheet: false });
    }
  }

  toggleGroupShareSheet(e) {
    e.preventDefault();
    this.setState({
      showGroupShareSheet: !this.state.showGroupShareSheet,
      clickGroupShareButton: !this.state.clickGroupShareButton,
    });
  }
  toggleShareSheet(showShareSheet) {
    this.setState({
      showShareSheet,
    });
  }
  toggleColorSheet(showColorSheet) {
    this.setState({
      showColorSheet,
    });
  }
  toggleHashSheet(e) {
    e.preventDefault();
    this.setState({
      showHashSheet: !this.state.showHashSheet,
      clickHashButton: !this.state.clickHashButton,
    });
  }

  saveLocal() {
    alert("local 저장");
  }
  onClickDelete(e) {
    e.preventDefault();
    let input_deleteMemo = {
      no: this.state.no,
      gNo: this.state.gNo,
    };
    console.log(input_deleteMemo);
    this.ajaxDeleteMemo(input_deleteMemo);
    this.props.SidebarGroupUpdate(this.state.gNo, this.state.gName);
  }
  ajaxDeleteMemo(_deleteMemo) {
    fetch(`${API_URL}/api/memo/delete`, {
      method: "post",
      headers: API_HEADERS,
      body: JSON.stringify(_deleteMemo),
    }).catch((err) => console.error(err));
  }

  render() {
    return (
      <div className={styles.toolbar}>
        <button
          className={styles.tool}
          aria-label="그룹공유"
          onClick={this.toggleGroupShareSheet.bind(this)}
        >
          <FontAwesomeIcon
            className={styles.faShareSquare}
            icon={faShareSquare}
          />
        </button>
        {this.state.showGroupShareSheet ? (
          //  {true ? (
          <GroupShareSheet
            refChange={this.toggleContainer}
            closeGroupShareSheet={this.toggleGroupShareSheet.bind(this)}
            group={this.props.group}
          />
        ) : null}

        <button
          className={styles.tool}
          aria-label="색상 변경"
          onMouseEnter={() => this.setState({ showColorSheet: true })}
          onMouseLeave={() => this.setState({ showColorSheet: false })}
        >
          <FontAwesomeIcon className={styles.faPalette} icon={faPalette} />
        </button>
        {this.state.showColorSheet ? (
          <ColorSheet
            toggleColorSheetHandler={this.toggleColorSheet.bind(this)}
          />
        ) : null}

        <button
          className={styles.tool}
          aria-label="해시 추가"
          onClick={this.toggleHashSheet.bind(this)}
        >
          <FontAwesomeIcon className={styles.faHashtag} icon={faHashtag} />
        </button>
        {this.state.showHashSheet ? (
          <HashSheet refChange={this.toggleContainer2} hash={this.props.hash} />
        ) : null}

        <button
          className={styles.tool}
          aria-label="내 컴퓨터에 저장"
          onClick={this.saveLocal.bind(this)}
        >
          <FontAwesomeIcon className={styles.faSave} icon={faSave} />
        </button>

        <button className={styles.tool} aria-label="파일 올리기">
          {/* <input type="file"></input> */}
          <FontAwesomeIcon
            className={styles.faFileUpload}
            icon={faFileUpload}
          />
        </button>

        <button
          className={styles.tool}
          aria-label="외부 공유"
          onMouseEnter={() => this.setState({ showShareSheet: true })}
          onMouseLeave={() => this.setState({ showShareSheet: false })}
        >
          <FontAwesomeIcon
            className={styles.faExternalLinkAlt}
            icon={faExternalLinkAlt}
          />
        </button>
        {this.state.showShareSheet ? (
          // {/* {true ? ( */}
          <ShareSheet
            toggleShareSheetHandler={this.toggleShareSheet.bind(this)}
          />
        ) : null}
        {/* {this.props.SidebarGroupUpdate(this.state.no, this.state.gNo)} */}
        <button
          className={styles.tool}
          aria-label="메모 삭제"
          onClick={this.onClickDelete.bind(this)}
        >
          <FontAwesomeIcon className={styles.faTrashAlt} icon={faTrashAlt} />
        </button>
      </div>
    );
  }
}
