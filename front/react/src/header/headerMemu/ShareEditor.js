import React, { Fragment } from "react";
import { Remarkable } from 'remarkable';
import SockJsClient from "react-stomp";
import popup from "./Popup.css";
import styles from "./ShareEditor.css";
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

export default class Popup extends React.Component {
  constructor(props) {
    super(props);
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
    this.state = {
      value: '',
      cursor: '',
      textSize: 0,
      memoNo: 0,
      version: 0,
      name: "test" + Math.round(Math.random() * 100)
    };
  }
  boldevent() {
    let input_index = this.getSnapshotBeforeUpdate(this.state.cursor);
    let line_index = 0;
    let textLastLine = [0];
    let keyAll = this.getSnapshotBeforeUpdate(this.state.value);
    keyAll = keyAll.split('');
    let keyAll2 = this.getSnapshotBeforeUpdate(this.state.value);
    keyAll2 = keyAll2.split('\n');
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
      this.send(keyAll.length, '', "**", this.state.version, "boldevent1");
    } else {
      textLastLine.push(keyAll.length);
      keyAll.splice(textLastLine[textLastLine.length - 2], 0, "**");
      keyAll.splice(textLastLine[textLastLine.length - 1] + 1, 0, "**");
      this.send(textLastLine[textLastLine.length - 2], textLastLine[textLastLine.length - 1], "**", this.state.version, "boldevent2");
    }
    keyAll = keyAll.join('');
    keyAll = keyAll.split('');
    this.setState({
      textSize: keyAll.length,
      value: keyAll.join(''),
    })
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
    b = b.split('');
    let state2 = this.getSnapshotBeforeUpdate(this.state.value);
    state2 = state2.split('\n');
    let state3 = this.getSnapshotBeforeUpdate(this.state.value);
    state3 = state3.split('');
    for (let i = 0; i < state2.length; i++) {
      line_index += state2[i].length;
      if (line_index < input_index) {
        line_index += 1;
        textLastLine.push(line_index);
      }
    }
    b.splice(textLastLine[textLastLine.length - 1], 0, pushText);
    console.log(this.state.version);
    this.send(textLastLine[textLastLine.length - 1], state3.length + hsize + 1, pushText, (this.state.version), "hevent");
    this.setState({
      value: b.join(''),
      textSize: (state3.length + hsize + 1)
    })
  }

  send(input_index, size, key, version, type) {
    this.clientRef
      .sendMessage('/app/memo/' + this.state.memoNo,
        JSON.stringify({
          inputIndex: input_index,
          size: size,
          key: key,
          type: type,
          version: version,
          name: this.state.name
        }))
  }
  viewSet(text) {
    text = text.join('');
    text = text.split('');
    this.setState({
      textSize: text.length,
      value: text.join('')
    })
  }

  cursorEvent(e) {
    let input_index = e.target.selectionStart;
    this.setState({ cursor: input_index });
  }
  keyInput(cursorPosition, key) {
    let text = this.getSnapshotBeforeUpdate(this.state.value);
    text = text.split('');
    text.splice(cursorPosition - 1, 0, key);
    this.viewSet(text);
  }
  deleteInput(cursorPosition, deleteSize) {
    let text = this.getSnapshotBeforeUpdate(this.state.value);
    text = text.split('');
    text.splice(cursorPosition, deleteSize + 1);
    this.viewSet(text);
  }
  koreanInput(cursorPosition, key) { //한글입력 중복오류 잡기
    let text = this.getSnapshotBeforeUpdate(this.state.value);
    text = text.split('');
    text.splice(cursorPosition - 1, 1, key);
    this.viewSet(text);
  }
  copyInput(cursorPosition, textsize, key) {
    let text = this.getSnapshotBeforeUpdate(this.state.value);
    text = text.split('');
    text.splice(cursorPosition - (textsize - text.length), 0, key);
    text = text.join('');
    text = text.split('');
    this.viewSet(text);
  }

  componentDidUpdate() {
    console.log("render OK");
  }

  // firstindex lastindex key

  editorPush(e) {
    let textsize = e.target.value.length;
    let input_index = e.target.selectionStart;
    let key = e.target.value.substring(input_index - 1, input_index);
    let temp = this.getSnapshotBeforeUpdate(this.state.textSize);

    // this.send(input_index,textsize,key,(this.state.version));
    console.log("temp", temp, "textsize", textsize)
    if (temp > textsize) {
      this.deleteInput(input_index, (temp - (e.target.value.split('').length + 1)));
      this.send(input_index, (temp - (e.target.value.split('').length + 1)), "", (this.state.version), "delete");
      // console.log("글자지우기");
    } else if (temp == textsize) {
      // console.log("한글입력")
      this.send(input_index, textsize, key, (this.state.version), "korean");
      this.koreanInput(input_index, key);
      //한글입력 오류 잡기~
    } else if ((temp + 1) < textsize) {
      let key = e.target.value.substring((input_index - ((textsize) - temp)), input_index);
      let text = this.getSnapshotBeforeUpdate(this.state.value);
      text = text.split('');
      this.send(input_index, (textsize - text.length), key, (this.state.version), "copy");
      this.copyInput(input_index, textsize, key);
      // console.log("복사");
    } else {
      // console.log("기본입력",input_index);
      this.send(input_index, textsize, key, (this.state.version), "basic");
      this.keyInput(input_index, key);
    }
    this.setState({ cursor: input_index, textSize: e.target.value.split('').length, version: this.state.version }); //변경값을 표출한다.
  }

  getReMarkDown() {
    return { __html: this.md.render(this.state.value) };
  }

  getSnapshotBeforeUpdate(prevState) {
    return prevState;
  }
  receiveHevent(inputIndex, key) {
    let text = this.getSnapshotBeforeUpdate(this.state.value);
    text = text.split('');
    console.log(inputIndex, key);
    text.splice(inputIndex, 0, key);
    this.viewSet(text);
  }
  reciveBevent1(inputIndex) {
    let text = this.getSnapshotBeforeUpdate(this.state.value);
    text = text.split('');
    text.splice(0, 0, "**");
    text.splice(inputIndex, 0, "**");
    this.viewSet(text);
  }
  reciveBevent2(inputIndex, lastIndex) {
    let text = this.getSnapshotBeforeUpdate(this.state.value);
    text = text.split('');
    text.splice(inputIndex, 0, "**");
    text.splice(lastIndex + 1, 0, "**");
    this.viewSet(text);
  }

  receive(message) {
    this.setState({
      version: message.version
    })
    if (message.type == "error" && message.name == this.state.name) {
      console.log(message.version, "error");
      this.setState({
        value: message.key,
        textSize: message.key.split('').length,
        version: message.version
      })
      return;
    } else if (message.name == this.state.name) {
      return;
    } else if (message.type == "basic") {
      this.keyInput(message.inputIndex, message.key);
    } else if (message.type == "korean") {
      this.koreanInput(message.inputIndex, message.key);
    } else if (message.type == "delete") {
      this.deleteInput(message.inputIndex, message.size);
    } else if (message.type == "copy") {
      this.copyInput(message.inputIndex, message.size, message.key);
    } else if (message.type == "hevent") {
      this.receiveHevent(message.inputIndex, message.key);
    } else if (message.type == "boldevent1") {
      this.reciveBevent1(message.inputIndex);
    } else if (message.type == "boldevent2") {
      console.log("2");
      this.reciveBevent2(message.inputIndex, message.size);
    }
  }
  memoSave() {
    console.log()
  }
  markOpen() {
    this.setState({
      markOpen: !this.state.markOpen
    })
  }
  render() {
    const tempStyle = {
      width: "200px",
      height: "200px",
      background: "#ff2"
    }

    return (
      <div
        className={popup.popup}
        onClick={this.props.closePopup}>
        <div
          className={popup.inner}
          onClick={(e) => { e.stopPropagation() }}>
          <div>
            <SockJsClient
              url='./api/memo'
              topics={[`/api/memo/${this.state.memoNo}`]}
              onMessage={this.receive.bind(this)}
              ref={(client) => { this.clientRef = client }} />
          </div>
          <div className={styles.header}>
          </div>
          <div className={styles.editor}>
            <div className={styles.btn}>
              <button onClick={this.hevent.bind(this, 1)}>H1</button>
              <button onClick={this.hevent.bind(this, 2)}>H2</button>
              <button onClick={this.hevent.bind(this, 3)}>H3</button>
              <button onClick={this.hevent.bind(this, 4)}>H4</button>
              <button onClick={this.boldevent.bind(this)}>B</button>
              {(this.state.markOpen) ? <button className={styles.click} onClick={this.markOpen.bind(this)}>E</button> : <button onClick={this.markOpen.bind(this)}>M</button>}
              <button onClick={this.memoSave.bind(this)}>저장</button>
            </div>
            {(this.state.markOpen) ? (
              <div
                className={styles.markDownView}
                dangerouslySetInnerHTML={this.getReMarkDown()}></div>
            )
              : (
                <Fragment>
              <textarea
                wrap="hard"
                rows="2"
                cols="20"
                className={styles.edit}
                onBlur={this.cursorEvent.bind(this)}
                onChange={this.editorPush.bind(this)}
                value={this.state.value}></textarea>
                <div className={styles.toolbar}>
                  <div className={styles.btn}><FontAwesomeIcon className={styles.faPalette} icon={faPalette} /></div>
                  <div className={styles.btn}><FontAwesomeIcon className={styles.faPalette} icon={faPalette} /></div>
                  <div className={styles.btn}><FontAwesomeIcon className={styles.faPalette} icon={faPalette} /></div>
                  <div className={styles.btn}><FontAwesomeIcon className={styles.faPalette} icon={faPalette} /></div>
                </div>
                </Fragment>
                )
            }

          </div>

        </div>
      </div>
    );
  }
}