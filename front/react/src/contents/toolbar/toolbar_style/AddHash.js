import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import styles from "../Toolbar.css";
import HashSheet from "./HashSheet";

export default class AddHash extends React.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      showHashSheet: false,
      clickHashButton: false,
    };
    if (this.props.className != null) {
      this.className = this.props.className;
    } else {
      this.className = styles.tool
    }
    if (this.props.buttonName != null) {
      this.buttonName = this.props.buttonName;
    } else {
      this.buttonName = styles.faHashtag;
    }
    if (this.props.colorName != null) {
      this.colorName = this.props.colorName;
    } else {
      this.colorName = styles.popover;
    }
    this.toggleContainer2 = React.createRef();
    // this.onClickOutsideHandler = this.onClickOutsideHandler.bind(this);
  }

  // componentDidMount() {
  //   window.addEventListener("click", this.onClickOutsideHandler);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener("click", this.onClickOutsideHandler);
  // }

  // onClickOutsideHandler(event) {
  //   if (this.state.clickHashButton) {
  //     this.setState({
  //       clickHashButton: !this.state.clickHashButton,
  //     });
  //   } else if (
  //     this.state.showHashSheet &&
  //     !this.toggleContainer2.current.contains(event.target)
  //   ) {
  //     this.closeHashSheet();
  //   }
  // }

  handleClick() {
    this.setState({ showHashSheet: !this.state.showHashSheet });
  }

  handleClose() {
    this.setState({ showHashSheet: false });
  }

  toggleHashSheet(e) {
    e.preventDefault();
    this.setState({
      showHashSheet: !this.state.showHashSheet,
      clickHashButton: !this.state.clickHashButton,
    });
  }

  closeHashSheet() {
    this.setState({ showHashSheet: false });
  }

  render() {
    return (
      <>
        {/* 해시추가 */}
        <button
          // style={this.props.setStyle}
          className={this.className}
          aria-label="해시 추가"
          onClick={this.toggleHashSheet.bind(this)}
        >
          <FontAwesomeIcon className={this.buttonName} icon={faHashtag} />
        </button>
        {this.state.showHashSheet ? (
          <div className={this.colorName}>
          <div
            className={styles.cover}
            onClick={this.handleClose.bind(this)}
          />
          <HashSheet
            notify={this.props.notify}
            users={this.props.users}
            clientRef={this.props.clientRef}
            refChange={this.toggleContainer2}
            //react-select에 맞는 형식으로 변환
            memo_hash={this.props.memo_hash.map((element) => {
              return {
                value: element.name,
                label: element.name,
              };
            })}
            memo_no={this.props.memo_no}
            memo_gNo={this.props.memo_gNo}
            //react-select에 맞는 형식으로 변환
            distinctGroup_hash={this.props.distinctGroup_hash.map((element) => {
              return {
                value: element,
                label: element,
              };
            })}
            groupBySidebar={this.props.groupBySidebar}
            SidebarGroupUpdate={this.props.SidebarGroupUpdate}
            closeHashSheet={this.closeHashSheet.bind(this)}
          />
          </div>
        ) : null}
      </>
    );
  }
}