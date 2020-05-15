import React from "react";

import GroupShareSheet from "./GroupShareSheet"
import ShareSheet from "./ShareSheet"
import ColorSheet from "./ColorSheet"
import HashSheet from "./HashSheet"

export default class Toolbar extends React.Component {

    constructor() {
        super(...arguments);
        this.state = {
            showGroupShareSheet: false,
            showShareSheet: false,
            showColorSheet: false,
            showHashSheet: false,
        }
    }

    toggleGroupShare(e) {
        e.preventDefault();
        this.setState({
            showGroupShareSheet: !this.state.showGroupShareSheet
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
            showHashSheet: !this.state.showHashSheet
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
            <div className="toolbar">

                <button
                    className="tool"
                    aria-label="그룹 공유"
                    onClick={this.toggleGroupShare.bind(this)}>
                    <i className="fab fa-slideshare" />
                </button>
                {this.state.showGroupShareSheet ? (
                    <GroupShareSheet />
                ) : null}

                <button
                    className="tool"
                    aria-label="외부 공유"
                    onMouseEnter={() => this.setState({ showShareSheet: true })}
                    onMouseLeave={() => this.setState({ showShareSheet: false })}>
                    <i className="far fa-share-square" />
                </button>
                {this.state.showShareSheet ?
                    <ShareSheet toggleShareSheetHandler={this.toggleShareSheet.bind(this)} /> : null}

                <button
                    className="tool"
                    aria-label="색상 변경"
                    onMouseEnter={() => this.setState({ showColorSheet: true })}
                    onMouseLeave={() => this.setState({ showColorSheet: false })}>
                    <i className="fas fa-palette" />
                </button>
                {this.state.showColorSheet ?
                    <ColorSheet toggleColorSheetHandler={this.toggleColorSheet.bind(this)} /> : null}

                <button
                    className="tool"
                    aria-label="해시 추가"
                    onClick={this.toggleHashSheet.bind(this)}>
                    <i className="fab fa-slack-hash" />
                </button>
                {this.state.showHashSheet ?
                    <HashSheet
                        toggleHashSheetHandler={this.toggleHashSheet.bind(this)}
                        hash={this.props.hash} /> : null}

                <button
                    className="tool"
                    aria-label="내 컴퓨터에 저장"
                    onClick={this.saveLocal}>
                    <i className="far fa-save" />
                </button>

                <button
                    className="tool"
                    aria-label="파일 올리기">
                    <i className="fas fa-file-upload" />
                </button>

                <button
                    className="tool"
                    aria-label="메모 삭제"
                    onClick={this.delete}>
                    <i className="far fa-trash-alt" />
                </button>

            </div>
        );
    }
}
