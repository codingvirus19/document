import React, { Fragment } from "react";
import { Remarkable } from "remarkable";
import popup from "./Popup.css";
import styles from "./ShareEditor.css";
import FileUpload from "../../contents/FileUpload.js";


export default class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.md = new Remarkable("full", {
      html: false, // Enable HTML tags in source
      xhtmlOut: false, // Use '/' to close single tags (<br />)
      breaks: false, // Convert '\n' in paragraphs into <br>
      langPrefix: "language-", // CSS language prefix for fenced blocks
      linkify: true, // autoconvert URL-like texts to links
      linkTarget: "", // set target to open link in
      typographer: false,
      markOpen: false,
    });
    this.state = {
      value: "",
      cursor: "",
      textSize: 0,
      memoNo: 0,
      version: 0,
      name: "test" + Math.round(Math.random() * 100),
      image: null,
      color: "white",
    };
    this.image = null;
  }
  boldevent() {
    let input_index = this.getSnapshotBeforeUpdate(this.state.cursor);
    let line_index = 0;
    let textLastLine = [0];
    let keyAll = this.getSnapshotBeforeUpdate(this.state.value);
    keyAll = keyAll.split("");
    let keyAll2 = this.getSnapshotBeforeUpdate(this.state.value);
    keyAll2 = keyAll2.split("\n");
    for (let i = 0; i < keyAll2.length; i++) {
      line_index += keyAll2[i].length;
      if (line_index < input_index) {
        line_index += 1;
        textLastLine.push(line_index);
      }
    }
    if (textLastLine.length == 1) {
      keyAll.splice(0, 0, "**");
      keyAll.splice(keyAll.length, 0, "**");
    } else {
      textLastLine.push(keyAll.length);
      keyAll.splice(textLastLine[textLastLine.length - 2], 0, "**");
      keyAll.splice(textLastLine[textLastLine.length - 1] + 1, 0, "**");
    }
    keyAll = keyAll.join("");
    keyAll = keyAll.split("");
    this.setState({
      textSize: keyAll.length,
      value: keyAll.join(""),
    });
  }
  hevent(hsize) {
    let input_index = this.getSnapshotBeforeUpdate(this.state.cursor);
    let line_index = 0;
    let textLastLine = [0];
    let pushText = "#";
    for (let i = 1; i < hsize; i++) {
      pushText += "#";
    }
    pushText += " ";
    let b = this.getSnapshotBeforeUpdate(this.state.value);
    b = b.split("");
    let state2 = this.getSnapshotBeforeUpdate(this.state.value);
    state2 = state2.split("\n");
    let state3 = this.getSnapshotBeforeUpdate(this.state.value);
    state3 = state3.split("");
    for (let i = 0; i < state2.length; i++) {
      line_index += state2[i].length;
      if (line_index < input_index) {
        line_index += 1;
        textLastLine.push(line_index);
      }
    }
    b.splice(textLastLine[textLastLine.length - 1], 0, pushText);
    this.setState({
      value: b.join(""),
      textSize: state3.length + hsize + 1,
    });
  }

  viewSet(text) {
    text = text.join("");
    text = text.split("");
    this.setState({
      textSize: text.length,
      value: text.join(""),
    });
  }

  cursorEvent(e) {
    let input_index = e.target.selectionStart;
    this.setState({ cursor: input_index });
  }

  componentDidUpdate() {
  }

  // firstindex lastindex key

  editorPush(e) {
    let input_index = e.target.selectionStart;
    this.setState({ cursor: input_index, value:e.target.value ,textSize: e.target.value.split('').length}); //변경값을 표출한다.
  }

  getReMarkDown() {
    return { __html: this.md.render(this.state.value) };
  }

  getSnapshotBeforeUpdate(prevState) {
    return prevState;
  }

  memoSave() {
    fetch("http://localhost:8080/codingvirus19/api/memo/save", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: this.state.value,
        gNo: this.props.groupNoForGroupUser.no,
        color: this.state.color,
      }),
    })
      .then((response) => response.json())
      .catch((err) => console.error(err));
    this.props.bringMemoByGroup(this.props.groupNoForGroupUser.no);
  }
  markOpen() {
    this.setState({
      markOpen: !this.state.markOpen,
    });
  }
  FileInputOpen() {
    document.getElementById("hiddenFileInput").click();
  }
  FileUpload(e) {
    const formData = new FormData();
    formData.append("multipartFile", e.currentTarget.files[0]);
    
    fetch("http://localhost:8080/codingvirus19/api/upload", {
      method: "post",
      headers: { append: "application/json" },
      body: formData,
    })
      .then((response) => response.json())
      .then((json) => {
        this.image = json.data;
        this.setState({ image: json.data });
      })
      .catch((err) => console.error(err));
  }
  ImageSave(e) {
    let text = this.getSnapshotBeforeUpdate(this.state.value);
    text = text.split("");
    text.splice(this.state.cursor, 0, `\n![img](.${this.image})\n`);
    this.viewSet(text);
  }
  render() {
    const tempStyle = {
      width: "200px",
      height: "200px",
      background: "#ff2",
    };

    return (
      <div className={popup.popup} onClick={this.props.closePopup}>
        <div
          className={popup.inner}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div></div>
          <div className={styles.header}></div>
          <div className={styles.editor}>
            <div className={styles.btn}>

              <button className={styles.button} onClick={this.hevent.bind(this, 1)}>H1</button>
              <button className={styles.button} onClick={this.hevent.bind(this, 2)}>H2</button>
              <button className={styles.button} onClick={this.hevent.bind(this, 3)}>H3</button>
              <button className={styles.button} onClick={this.hevent.bind(this, 4)}>H4</button>
              <button className={styles.button} onClick={this.boldevent.bind(this)}>B</button>
              {(this.state.markOpen) ? <button className={`${styles.click} ${styles.button}`} onClick={this.markOpen.bind(this)}>E</button> : <button className={styles.button} onClick={this.markOpen.bind(this)}>M</button>}
              
              <FileUpload className={styles.button} File={e => this.FileUpload(e)} image={this.state.image} save={this.ImageSave.bind(this)} />

              <button className={styles.button} onClick={this.memoSave.bind(this)}>저장</button>
              <button className={styles.button} onClick={this.props.closePopup}>종료</button>

            </div>
            {this.state.markOpen ? (
              <div
                className={styles.markDownView}
                dangerouslySetInnerHTML={this.getReMarkDown()}
              ></div>
            ) : (
              <Fragment>
                <textarea
                  wrap="hard"
                  rows="2"
                  cols="20"
                  className={styles.edit}
                  onBlur={this.cursorEvent.bind(this)}
                  onChange={this.editorPush.bind(this)}
                  value={this.state.value}
                ></textarea>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }
}
