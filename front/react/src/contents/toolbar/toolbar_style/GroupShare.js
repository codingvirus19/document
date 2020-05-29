import React, { Fragment } from "react";
import GroupShareSheet from "./GroupShareSheet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faShareSquare} from "@fortawesome/free-solid-svg-icons";
import styles from "../Toolbar.css";

export default class GroupShare extends React.Component {
    constructor() {
        super(...arguments)
        this.state = {
            showGroupShareSheet: false,
            addNullToGroup: null,
            clickGroupShareButton: false,
        };
        this.toggleContainer = React.createRef();
        this.toggleGroupShareSheet = this.toggleGroupShareSheet.bind(this);
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

    // 그룹공유
    toggleGroupShareSheet(e) {
        e.preventDefault();

        // 그룹공유에서 개인을 추가하기위해 null을 추가하여 전달해주는 코드
        let nullValue = { value: "null", label: "개인" };
        let _addNullToGroup = this.props.group.gname.map((element) => {
            return {
                value: element,
                label: element,
            };
        });

        // null값 배열을 맨 앞(0번째배열)으로 추가시켜준다.
        _addNullToGroup.unshift(nullValue);

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
                    className={styles.tool}
                    aria-label="그룹공유"
                    onClick={this.toggleGroupShareSheet.bind(this)}>
                    <FontAwesomeIcon
                        className={styles.faShareSquare}
                        icon={faShareSquare}
                    />
                </button >

                {this.state.showGroupShareSheet ? (
                    //  {true ? (
                    <GroupShareSheet
                        addNullToGroup={this.state.addNullToGroup}
                        refChange={this.toggleContainer}
                        closeGroupShareSheet={this.toggleGroupShareSheet.bind(this)}
                        group={this.props.group}
                    />
                ) : null}
            </Fragment >
        )
    }
}