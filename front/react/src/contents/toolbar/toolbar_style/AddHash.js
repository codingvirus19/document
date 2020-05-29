import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import styles from "../Toolbar.css";
import HashSheet from "./HashSheet";

export default class AddHash extends React.Component {

    constructor() {
        super(...arguments)
        this.state = {
            showHashSheet: false,
            clickHashButton: false,
            no: this.props.no,
            memo_gNo: this.props.memo_gNo,
        };
        this.toggleContainer2 = React.createRef();
        this.onClickOutsideHandler = this.onClickOutsideHandler.bind(this);
    }

    componentDidMount() {
        window.addEventListener("click", this.onClickOutsideHandler);
    }

    componentWillUnmount() {
        window.removeEventListener("click", this.onClickOutsideHandler);
    }
    onClickOutsideHandler(event) {
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

    toggleHashSheet(e) {
        e.preventDefault();
        this.setState({
            showHashSheet: !this.state.showHashSheet,
            clickHashButton: !this.state.clickHashButton,
        });
    }
    // 색상변경
    render() {
        return (
            <Fragment>
                {/* 해시추가 */}
                <button
                    className={styles.tool}
                    aria-label="해시 추가"
                    onClick={this.toggleHashSheet.bind(this)}>

                    <FontAwesomeIcon className={styles.faHashtag} icon={faHashtag} />
                </button>
                {/* {this.state.showHashSheet ? ( */}
                {true ? (
                    <HashSheet
                        refChange={this.toggleContainer2}
                        hash={this.props.hash}
                        memo_no={this.state.no}
                        memo_gNo={this.state.memo_gNo} />
                ) : null}
            </Fragment >
        )
    }
}