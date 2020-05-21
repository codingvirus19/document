import React from "react";

import GroupShareSheet from "./GroupShareSheet";
import ShareSheet from "./ShareSheet";
import ColorSheet from "./ColorSheet";
import HashSheet from "./HashSheet";
import styles from "./Toolbar.css";

export default class Toolbar extends React.Component {

    constructor() {
        super(...arguments);
        this.state = {
            showGroupShareSheet: false,
            showShareSheet: false,
            showColorSheet: false,
            showHashSheet: false,
            clickGroupShareButton: false,
            clickHashButton: false
        }
        this.toggleContainer = React.createRef();
        this.toggleContainer2 =  React.createRef();
        this.toggleGroupShareSheet = this.toggleGroupShareSheet.bind(this);
        this.onClickOutsideHandler = this.onClickOutsideHandler.bind(this);
    }

    componentDidMount() {
        window.addEventListener('click', this.onClickOutsideHandler);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.onClickOutsideHandler);
    }

    onClickOutsideHandler(event) {
        if (this.state.clickGroupShareButton) {
            this.setState({
                clickGroupShareButton: !this.state.clickGroupShareButton
            })
        }
        else if (this.state.showGroupShareSheet && !this.toggleContainer.current.contains(event.target)) {
            this.setState({ showGroupShareSheet: false });
        }

        if (this.state.clickHashButton) {
            this.setState({
                clickHashButton: !this.state.clickHashButton
            })
        }
        else if (this.state.showHashSheet && !this.toggleContainer2.current.contains(event.target)) {
            this.setState({ showHashSheet: false });
        }
    }

    toggleGroupShareSheet(e) {
        e.preventDefault();
        this.setState({
            showGroupShareSheet: !this.state.showGroupShareSheet,
            clickGroupShareButton: !this.state.clickGroupShareButton
        });
    }
    toggleShareSheet(showShareSheet) {
        this.setState({
            showShareSheet
        })
    }
    toggleColorSheet(showColorSheet) {
        this.setState({
            showColorSheet
        })
    }
    toggleHashSheet(e) {
        e.preventDefault();
        this.setState({
            showHashSheet: !this.state.showHashSheet,
            clickHashButton: !this.state.clickHashButton
        })
    }

    saveLocal() {
        alert("local 저장")
    }
    delete() {
        alert("삭제");
    }

    render() {
        return (
            <div className={styles.toolbar}>
                <button
                    className={styles.tool}
                    aria-label="그룹공유"
                    onClick={this.toggleGroupShareSheet.bind(this)}>
                    <i className="fab fa-slideshare" />
                </button>
                {this.state.showGroupShareSheet ? (
                //  {true ? (
                    <GroupShareSheet
                        refChange={this.toggleContainer}
                        closeGroupShareSheet={this.toggleGroupShareSheet.bind(this)} 
                        g_no={this.props.g_no} g_name={this.props.g_name} />
                ) : null}

                <button
                    className={styles.tool}
                    aria-label="외부 공유"
                    onMouseEnter={() => this.setState({ showShareSheet: true })}
                    onMouseLeave={() => this.setState({ showShareSheet: false })}>
                    <i className="far fa-share-square" />
                </button>
                {this.state.showShareSheet ? (
                    <ShareSheet
                        toggleShareSheetHandler={this.toggleShareSheet.bind(this)} />
                ) : null}

                <button
                    className={styles.tool}
                    aria-label="색상 변경"
                    onMouseEnter={() => this.setState({ showColorSheet: true })}
                    onMouseLeave={() => this.setState({ showColorSheet: false })}>
                    <i className="fas fa-palette" />
                </button>
                {this.state.showColorSheet ? (
                    <ColorSheet
                        toggleColorSheetHandler={this.toggleColorSheet.bind(this)} />
                ) : null}

                <button
                    className={styles.tool}
                    aria-label="해시 추가"
                    onClick={this.toggleHashSheet.bind(this)}>
                    <i className="fab fa-slack-hash" />
                </button>
                {this.state.showHashSheet ? (
                    <HashSheet
                        refChange={this.toggleContainer2}
                        hash={this.props.hash} />
                ) : null}

                <button
                    className={styles.tool}
                    aria-label="내 컴퓨터에 저장"
                    onClick={this.saveLocal.bind(this)}>
                    <i className="far fa-save" />
                </button>

                <button
                    className={styles.tool}
                    aria-label="파일 올리기">
                        {/* <input type="file"></input> */}
                    <i className="fas fa-file-upload" />
                </button>

                <button
                    className={styles.tool}
                    aria-label="메모 삭제"
                    onClick={this.delete.bind(this)}>
                    <i className="far fa-trash-alt" />
                </button>

            </div>
        );
    }
}
