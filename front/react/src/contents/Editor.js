import React, { Fragment } from "react";
import { Remarkable } from 'remarkable';
import styles from "../header/headerMemu/ShareEditor.css";
import ShareEditor from "../header/headerMemu/ShareEditor";
import editorstyles from "./Editor.css";
import Toolbar from "./toolbar/Toolbar";

export default class Editor extends React.Component {

    constructor(props) {
        super(...arguments)
        this.md = new Remarkable('full', {
            html: false,        // Enable HTML tags in source
            xhtmlOut: false,        // Use '/' to close single tags (<br />)
            breaks: false,        // Convert '\n' in paragraphs into <br>
            langPrefix: 'language-',  // CSS language prefix for fenced blocks
            linkify: true,         // autoconvert URL-like texts to links
            linkTarget: '',           // set target to open link in
            typographer: false,
            markOpen: false
        });
        console.log(this.props.no);
        this.state = {
            content: this.props.content,
            showPopup: false
        }
    }

    togglePopdown() {

        this.setState({
            showPopup: !this.state.showPopup,
        });
    }
    getReMarkDown() {
        return { __html: this.md.render(this.state.content) };
    }
    
    render() {
        return (
            <div
                className={editorstyles.popup}
                onClick={this.props.closePopup}>
                <div className={editorstyles.inner}
                    onClick={(e) => { e.stopPropagation() }}>

                    {this.state.showPopup ? (
                        <Fragment>
                            <ShareEditor
                                no={this.props.memo_bigArr[this.props.index].no}
                                memo_gNo={this.props.memo_bigArr.gNo}
                                group={this.props.group}
                                groupBySidebar={this.props.groupBySidebar}
                                color={this.props.memo_bigArr.color}
                                content={this.state.content} />
                            <button className={editorstyles.ShareEditorButtonBack} onClick={this.togglePopdown.bind(this)}>
                                <p>뒤로가기</p>
                            </button>
                        </Fragment>
                    ) :
                        <Fragment>
                            <div className={styles.editor}>
                                <div className={styles.markDownView}
                                    dangerouslySetInnerHTML={this.getReMarkDown()}>
                                </div>
                                <div className={editorstyles.toolbar}>
                                    <Toolbar
                                        no={this.props.memo_bigArr.no}
                                        memo_gNo={this.props.memo_bigArr.gNo}
                                        group={this.props.group}
                                        groupBySidebar={this.props.groupBySidebar}
                                        color={this.props.memo_bigArr.color}
                                    />
                                </div>
                            </div>
                            <button className={editorstyles.ShareEditorButton} onClick={this.togglePopdown.bind(this)}>
                                <p>수정하기</p>
                            </button>
                        </Fragment>
                    }
                </div>
            </div>
        )
    }
}