import React, { Fragment } from "react";
import { Remarkable } from 'remarkable';
import SockJsClient from "react-stomp";
import popup from "./Popup.css";
import styles from "./ShareEditor.css";
import EditorToolbar from "./EditorToolbar.js";

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
      value: this.props.content,
      textSize: 0,
      name: this.props.users.id[0],
      color: this.props.color,
      userList: [],
      textFocus: false,
      focus: false
    };
    this.cursor = 0;
    this.version = 0;
    this.key = null;
    this.keyIndex = null;
    this.keyIndexTemp = null;
    this.type = null;
    this.editor = React.createRef();
    this.keyChack = false;
  }

  receiveBevent1(inputIndex) {
    let text = this.getSnapshotBeforeUpdate(this.state.value);
    text = text.split('');
    text.splice(0, 0, "**");
    text.splice(inputIndex, 0, "**");
    return text;
  }
  receiveBevent2(inputIndex, lastIndex) {
    let text = this.getSnapshotBeforeUpdate(this.state.value);
    text = text.split('');
    text.splice(inputIndex, 0, "**");
    text.splice(lastIndex + 1, 0, "**");
    return text;
  }




  boldevent() {
    let input_index = this.getSnapshotBeforeUpdate(this.cursor);
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
      this.send(keyAll.length, '', "**", "boldevent1");
    } else {
      textLastLine.push(keyAll.length);
      keyAll.splice(textLastLine[textLastLine.length - 2], 0, "**");
      keyAll.splice(textLastLine[textLastLine.length - 1] + 1, 0, "**");
      this.send(textLastLine[textLastLine.length - 2], textLastLine[textLastLine.length - 1], "**", "boldevent2");
    }
    keyAll = keyAll.join('');
    keyAll = keyAll.split('');
    this.setState({
      textSize: keyAll.length,
      value: keyAll.join(''),
    })
  }
  hevent(hsize) {
    let input_index = this.getSnapshotBeforeUpdate(this.cursor);
    let line_index = 0;
    let textLastLine = [0];
    let pushText = "#";
    for (let i = 1; i < hsize; i++) {
      pushText += "#";
    }
    pushText += " ";
    let textValue = this.getSnapshotBeforeUpdate(this.state.value);
    textValue = textValue.split('');
    let textValueTemp = this.getSnapshotBeforeUpdate(this.state.value);
    textValueTemp = textValueTemp.split('\n');
    let textSave = this.getSnapshotBeforeUpdate(this.state.value);
    textSave = textSave.split('');
    for (let i = 0; i < textValueTemp.length; i++) {
      line_index += textValueTemp[i].length;
      if (line_index < input_index) {
        line_index += 1;
        textLastLine.push(line_index);
      }
    }
    textValue.splice(textLastLine[textLastLine.length - 1], 0, pushText);
    this.send(textLastLine[textLastLine.length - 1], textSave.length + hsize + 1, pushText, "hevent");
    this.setState({
      value: textValue.join(''),
      textSize: (textSave.length + hsize + 1)
    })
  }

  send(input_index, size, key, type) {
    console.log(this.version);
    this.clientRef
      .sendMessage('/app/memo/' + this.props.no,
        JSON.stringify({
          inputIndex: input_index,
          size: size,
          key: key,
          type: type,
          version: this.version,
          name: this.state.name
        }))
  }
  getReMarkDown() {
    return { __html: this.md.render(this.state.value) };
  }

  viewSet(text) {
    text = text.join('');
    text = text.split('');
    this.setState({
      textSize: text.length,
      value: text.join(''),
      cursor: this.cursor
    })
  }



  editorWrite(e) {
    if (!this.keyChack) { return; }
    if (this.keyIndex == null) {//최초 입력시 focus위치 저장
      this.keyIndex = e.currentTarget.selectionStart;
    } else {
      this.keyIndexTemp = this.keyIndex; //이전의 focus 위치를 저장
      this.keyIndex = e.currentTarget.selectionStart; // 새로운 focus 위치 저장
    }
    let AllKey = this.getSnapshotBeforeUpdate(e.target.value.split(""));
    let prevAllKey = this.getSnapshotBeforeUpdate(this.state.value);
    this.cursor = this.getSnapshotBeforeUpdate(e.target.selectionStart);
    let textSize = AllKey.length - prevAllKey.split("").length; // 입력된 textSize 저장

    if (AllKey.length == prevAllKey.split("").length + 1) {
      //영어 숫자및 기본입력일때
      this.key = AllKey.splice(this.keyIndex - 2, 2); //기본 입력이라도 글자를 2개씩 가져온다(한글 오류를 잡기위해서)
      textSize = this.key.length; //textSize 를 다시 설정한다
      this.type = "basic"

    } else if (AllKey.length == prevAllKey.split("").length && this.keyIndex == this.keyIndexTemp) {
      //한글 입력 에러 잡기
      this.key = AllKey.splice(this.keyIndex - 1, 1); //한글 입력되는 문자열을 뽑아온다.
      textSize = this.key.length; //textSize 를 다시 설정한다
      this.type = "korean"
    } else if (AllKey.length > prevAllKey.split("").length + 1) {
      //복사 
      this.key = AllKey.splice(this.keyIndex - textSize, this.keyIndex); //복사하여 입력한 문자를 key변수에 담아둔다.
      // AllKey.splice(this.keyIndex-textSize,0,this.key.join(""));
      this.type = "copy"
    } else if (AllKey.length < prevAllKey.split("").length + 1) {
      //지우기
      this.key = [];
      this.type = "delete"
    }
    // console.log(this.keyIndex, textSize, this.key.join(""), this.type);
    this.send(this.keyIndex, textSize, this.key.join(""), this.type);

    if(!this.state.focus){
    this.setState({
      value: e.target.value,
    });
  }

  }


  getSnapshotBeforeUpdate(prev) {
    return prev;
  }
  //=====================================receive=================================
  receive(message) {
    if (message.type == undefined) {
      this.setState({
        userList: message
      })
      return;
    }

    //=====================================================================
    //작성유저 표시
    let writeUser = document.getElementById(message.name);
    if (writeUser != undefined) {
      writeUser.className = `${styles.userWriteImage}`;
      setTimeout(() => {
        writeUser = document.getElementById(message.name);
        writeUser.className = `${styles.userImage}`;
      }, 500);
    }
    //========================================================================
    this.version = message.version + 1;
    if (message.name == this.state.name && message.type == "AllText") { //최초 접근
      this.viewSet(message.key.split(""));
      return;
    }

    if (message.name == this.state.name) return; //자기가보낸 데이터는 받지않음
    let text = this.getSnapshotBeforeUpdate(this.state.value);
    if (this.cursor > message.inputIndex) {
      if (message.type == "basic") {
        this.cursor = this.cursor + 1;
      } else {
        this.cursor = this.cursor + message.textSize;
      }
    }

    if (message.name != this.state.name && message.type != "AllText") {
      this.setState({
        focus: true
      })
      setTimeout(() => {
        // this.editor.current.readOnly = false;
        // this.editor.current.focus();
        this.setState({
          focus: false
        })
      }, 900);
    }


    text = text.split("");
    switch (message.type) {
      case "basic":
        if (message.inputIndex < 1) {
          text.splice(0, 0, message.key);
        } else {
          text.splice(message.inputIndex - 2, 1, message.key);
        }
        break; //기본입력!!
      case "korean":
        text.splice(message.inputIndex - 1, 1, message.key);
        console.log("korean", message);
        break;
      case "copy":
        text.splice(message.inputIndex - Math.abs(message.size), 0, message.key);
        console.log("copy", message);
        break;
      case "delete":
        console.log(message);
        text.splice(message.inputIndex, Math.abs(message.size));
        console.log("delete", message);
        break;
      case "hevent":
        text.splice(message.inputIndex, 0, message.key);
        // this.receiveHevent(message.inputIndex, message.key);
        break;
      case "boldevent1":
        text = this.receiveBevent1(message.inputIndex);
        break;
      case "boldevent2":
        text = this.receiveBevent2(message.inputIndex, message.size);
        break;
    }

    this.viewSet(text);

  }
  //=====================================receive=================================

  memoSave() {
    this.send(0, 0, this.state.color, 0, "save");
  }

  markOpen() {
    this.setState({
      markOpen: !this.state.markOpen
    })
  }
  updateMarkdown(editor, data, value) {
    this.setState({ markdown: value });
  }
  AllText() {
    this.send(0, 0, this.state.color, "AllText");
  }
  keyDown(e) {
    this.keyChack = true;

    if (!this.state.focus) {

      this.cursor = e.target.selectionStart;
    }
    // console.log(e.currentTarget.selectionStart);
    // console.log(e.keyCode,"코드");
    if (47 < e.keyCode && e.keyCode < 112 || e.keyCode == 229 || 187 < e.keyCode && e.keyCode < 223) {
      // console.log(e.key);
      // console.log(e.keyCode);
    }


  }
  keyUp(e) {
    this.keyChack = false;
  }

  componentDidUpdate() {
    if (this.editor.current != null) {
      if (!this.state.focus) {
        setTimeout(() => {
          this.editor.current.focus();
          this.editor.current.setSelectionRange(this.cursor, this.cursor);
        }, 0)
      }
    }
  }
  render() {
    // console.log(this.cursor);
    // if (this.editor.current != null) {
    //   if (!this.state.focus) {
    //     setTimeout(() => {
    //       this.editor.current.focus();
    //       this.editor.current.setSelectionRange(this.cursor, this.cursor);
    //     }, 0)
    //   }
    // }
    return (
      <Fragment>
        <div className={popup.popup} onClick={(e) => { this.props.memoClose }}>
          <SockJsClient
            url='./api/memo'
            topics={[`/api/memo/${this.props.no}`]}
            onMessage={this.receive.bind(this)}
            ref={(client) => { this.clientRef = client }}
            onConnect={() => { this.props.clientRef.sendMessage(`/app/memo/connect/${this.props.no}`, this.state.name); this.AllText(); }}
            onDisconnect={() => this.props.clientRef.sendMessage(`/app/memo/disconnect/${this.props.no}`, this.state.name)}
          />
          <div className={styles.userList}>
            {this.props.groupInUserList.map((element, index) => {
              if (this.state.userList.indexOf(element.id) > -1) {
                return (
                  <div key={index} className={styles.users}>
                    <img id={element.id} className={styles.userImage} src={"." + element.img} />
                  </div>
                );
              }
            })}
          </div>
          <div className={popup.inner} style={{ backgroundColor: `${this.props.color}` }} onClick={e => e.stopPropagation()}>
            <div className={styles.editor} style={{ backgroundColor: `${this.props.color}` }}>
              <div className={styles.btn}>
                <button className={styles.button} onClick={this.hevent.bind(this, 1)}>H1</button>
                <button className={styles.button} onClick={this.hevent.bind(this, 2)}>H2</button>
                <button className={styles.button} onClick={this.hevent.bind(this, 3)}>H3</button>
                <button className={styles.button} onClick={this.hevent.bind(this, 4)}>H4</button>
                <button className={styles.button} onClick={this.boldevent.bind(this)}>B</button>
                {(this.state.markOpen) ? <button className={`${styles.click} ${styles.button}`} onClick={this.markOpen.bind(this)}>E</button> : <button className={styles.button} onClick={this.markOpen.bind(this)}>M</button>}
              </div>
              {(this.state.markOpen) ? (
                <div
                  style={{ backgroundColor: `${this.props.color}` }}
                  className={styles.markDownView}
                  dangerouslySetInnerHTML={this.getReMarkDown()}></div>
              )
                : (
                  <Fragment>
                    <textarea
                      style={{ backgroundColor: `${this.props.color}` }}
                      wrap="hard"
                      rows="2"
                      cols="20"
                      className={styles.edit}
                      ref={this.editor}
                      onClick={(e) => {(!this.state.focus)?this.cursor = e.target.selectionStart : null}}
                      onKeyDown={(e) => this.keyDown(e)}
                      onKeyUp={(e) => this.keyUp(e)}
                      disabled={(this.state.focus) ? true : false}
                      // onClick={this.AllText.bind(this)}
                      onChange={e => { this.editorWrite(e) }}
                      value={this.state.value}></textarea>
                    <div className={styles.toolbar}>
                      <EditorToolbar
                        memo_no={this.props.no}
                        memo_gNo={this.props.gNo}
                        no={this.props.no}
                        group={this.props.group}
                        groupBySidebar={this.props.groupBySidebar}
                        color={this.props.color}
                        memo_hash={this.props.memo_hash}
                        group_hash={this.props.group_hash}
                        memoSave={this.memoSave.bind(this)}
                        memoClose={this.props.memoClose}
                        SidebarGroupUpdate={this.props.SidebarGroupUpdate}
                        distinctGroup_hash={this.props.distinctGroup_hash}
                        clientRef={this.props.clientRef}
                        users={this.props.users}
                        setStyle={this.props.setStyle}
                        notify={this.props.notify}
                      />

                    </div>
                  </Fragment>
                )
              }
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}