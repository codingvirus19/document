import React, { Fragment } from "react";
import GroupShareSheet from "./GroupShareSheet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareSquare } from "@fortawesome/free-solid-svg-icons";
import styles from "../Toolbar.css";

export default class GroupShare extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      showGroupShareSheet: false,
      addNullToGroup: null, // groupShare에 사용
      clickGroupShareButton: false,
    };
    if (this.props.className != null) {
      this.className = this.props.className;
    } else {
      this.className = styles.tool
    }
    if (this.props.buttonName != null) {
      this.buttonName = this.props.buttonName;
    } else {
      this.buttonName = styles.faShareSquare;
    }
    this.toggleContainer = React.createRef();
    this.onClickOutsideHandler = this.onClickOutsideHandler.bind(this);
    this.toggleGroupShareSheet = this.toggleGroupShareSheet.bind(this);
  }

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
  }

  handleClose() {
    console.log("handleClose")
    this.setState({ showGroupShareSheet: false });
  }

  // 그룹공유
  toggleGroupShareSheet(e) {
    // 클릭 시 true로 바뀌면서 groupShareSheet가 열린다.
    this.setState({ showGroupShareSheet: !this.state.showGroupShareSheet });
    // e.preventDefault();

    let nullValueAndLabel = { value: null, label: "개인" };
    let _addNullToGroup = [];
    let addGroupNo = this.props.group.no; // ex)[1,2,3]
    let addGroupName = this.props.group.gname; // ex)[이름,이름,이름]
    let obj = null;

    for (let i = 0; i < addGroupNo.length; i++) {
      // 객체에 해당 value와 label을 담는다.
      // _addNullToGroup배열에 해당 객체를 담는다.
      // 결과: [{ value:1, label:"그룹1" }, {..}, {..}..]
      obj = { value: addGroupNo[i], label: addGroupName[i] };
      _addNullToGroup.push(obj);
    }

    // {value:null, label:"개인"}객체를 배열 맨 앞(0번째배열)으로 추가시켜준다.
    // 결과: [{ value: null, label: "개인" }, {..}, {..}..]
    _addNullToGroup.unshift(nullValueAndLabel);

    this.setState({
      showGroupShareSheet: !this.state.showGroupShareSheet,
      clickGroupShareButton: !this.state.clickGroupShareButton,
      addNullToGroup: _addNullToGroup,
    });
  }
  // 그룹공유
  render() {
    return (
      <Fragment>
        {/* 그룹공유 */}
        <button
          style={this.props.setStyle}
          className={this.className}
          aria-label="그룹공유"
          onClick={this.toggleGroupShareSheet.bind(this)}
        >
          <FontAwesomeIcon
            className={this.buttonName}
            icon={faShareSquare}
          />
        </button>

        {this.state.showGroupShareSheet ? (
            <GroupShareSheet
            notify={this.props.notify}
              // gName,gNo : 임의의 작동을 한 그룹의 no와 name으로 콜백이동하기위한 props
              gName={this.props.gName}
              gNo={this.props.gNo}
              // SidebarGroupUpdate: shareMemo 전송 후 수정된 메모list를 다시뿌려주기 위한 callback함수
              SidebarGroupUpdate={this.props.SidebarGroupUpdate}
              // memo_gNo: 선택한 메모의 g_no이다. callback함수에 input되며,
              //  메모리스트를 새로 불러올 때 해당 gNo페이지를 불러옴
              memo_gNo={this.props.memo_gNo}
              // no: 선택한 메모의 no
              no={this.props.no}
              // addNullToGroup: 기존 그룹에 null을 추가하여 넣은 값,
              // GroupShareSheet에서 Select 시 value값에 null을 넣기 위함.
              addNullToGroup={this.state.addNullToGroup}
              refChange={this.toggleContainer}
              closeGroupShareSheet={this.toggleGroupShareSheet.bind(this)}
              group={this.props.group}
              clientRef={this.props.clientRef}
              users={this.props.users}
            />
        ) : null}
      </Fragment>
    );
  }
}
