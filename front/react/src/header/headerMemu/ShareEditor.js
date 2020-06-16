import React, { Fragment } from "react";
import { Remarkable } from 'remarkable';
import SockJsClient from "react-stomp";
import popup from "./Popup.css";
import styles from "./ShareEditor.css";
import EditorToolbar from "./EditorToolbar.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fad } from "@fortawesome/free-solid-svg-icons";


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
    this.temp = null;
    this.editor;
    this.inputposition;
    this.count=0;
    this.tempCount = null;
    this.state = {
      value: this.props.content,
      cursor: '',
      textSize: 0,
      version: 0,
      name: this.props.users.id[0],
      color: this.props.color,
      userList: [],
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
    this.send(textLastLine[textLastLine.length - 1], state3.length + hsize + 1, pushText, (this.state.version), "hevent");
    this.setState({
      value: b.join(''),
      textSize: (state3.length + hsize + 1)
    })
  }

  send(input_index, size, key, version, type) {
    this.clientRef
      .sendMessage('/app/memo/' + this.props.no,
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
  }

  // firstindex lastindex key

  editorPush(e) {
    this.editor = e.target;
    let textsize = e.target.value.length;
    let input_index = e.target.selectionStart;
    let key = e.target.value.substring(input_index - 1, input_index);
    this.temp = this.getSnapshotBeforeUpdate(this.state.textSize);
    // this.send(input_index,textsize,key,(this.state.version));
    if (this.temp > textsize) {
      this.deleteInput(input_index, (this.temp - (e.target.value.split('').length + 1)));
      this.send(input_index, (this.temp - (e.target.value.split('').length + 1)), "", (this.state.version), "delete");
      // console.log("글자지우기");
    } else if (this.temp == textsize) {
      // console.log("한글입력")
      this.send(input_index, textsize, key, (this.state.version), "korean");
      this.koreanInput(input_index, key);
      //한글입력 오류 잡기~
    } else if ((this.temp + 1) < textsize) {
      let key = e.target.value.substring((input_index - ((textsize) - this.temp)), input_index);
      let text = this.getSnapshotBeforeUpdate(this.state.value);
      text = text.split('');
      this.send(input_index, (textsize - text.length), key, (this.state.version), "copy");
      this.copyInput(input_index, textsize, key);
      // console.log("복사");
    } else {
      // console.log("기본입력",input_index);
      // console.log(textsize);
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
    text.splice(inputIndex, 0, key);
    this.viewSet(text);
  }
  receiveBevent1(inputIndex) {
    let text = this.getSnapshotBeforeUpdate(this.state.value);
    text = text.split('');
    text.splice(0, 0, "**");
    text.splice(inputIndex, 0, "**");
    this.viewSet(text);
  }
  receiveBevent2(inputIndex, lastIndex) {
    let text = this.getSnapshotBeforeUpdate(this.state.value);
    text = text.split('');
    text.splice(inputIndex, 0, "**");
    text.splice(lastIndex + 1, 0, "**");
    this.viewSet(text);
  }

  receive(message) {
    if(message.type == undefined){
      this.setState({
        userList:message
      })
      return;
    }
    //=====================================================================
    //작성유저 표시
      let writeUser = document.getElementById(message.name);
      if(writeUser != undefined){
      writeUser.className = `${styles.userWriteImage}`;
      setTimeout(()=>{
        writeUser = document.getElementById(message.name);
        writeUser.className = `${styles.userImage}`;
      },500);
    }
    //========================================================================


    this.count = this.count+1;
    if (message.type != "error3" &&message.type != "error2" && message.type != "error1" &&message.type != "error" && message.type != "allKey" && message.name != this.state.name) {
      this.wait(this.count,message);
    } 
    this.setState({
      version: message.version
    })
    if (message.type == "save") {
      this.props.bringMemoByGroup(this.props.gNo == undefined ? null : this.props.gNo);
    }
    if (message.name == this.state.name && message.type == "reClick") {
      this.setState({
        version: message.version
      })
    }


    if (message.type == "allKey" && message.name == this.state.name) {
      // console.log(message);
      this.setState({
        value: message.key,
        textSize: message.key.split('').length,
        version: message.version
      })

      return;
    }else if (message.type == "error") {
      this.setState({
        value: message.key,
        textSize: message.key.split('').length,
        version: message.version
      })
      this.wait(this.count,message);
      return;
    }
    else if (message.type == "error1") {
      this.setState({
        value: message.key,
        textSize: message.key.split('').length,
        version: message.version
      })
      if(this.state.name != message.name){
        this.inputposition = this.inputposition + message.size;
      }else{
        this.inputposition = this.inputposition + message.size;
      }
       
      this.wait(this.count,message);
      return;
    }else if (message.type == "error2") {
      this.setState({
        value: message.key,
        textSize: message.key.split('').length,
        version: message.version
      })
      if(this.state.name == message.name){
        this.inputposition = this.inputposition - message.size;
      }else{
        this.inputposition = this.inputposition + message.size;
      }
      this.wait(this.count,message);
      return;
    }
    else if (message.type == "error3") {
      this.setState({
        value: message.key,
        textSize: message.key.split('').length,
        version: message.version
      })
      this.wait(this.count,message);
      return;
    } else if (message.name == this.state.name) {
      this.inputposition = message.inputIndex;
      return;
    }
    else if (message.type == "basic") {
      if (message.inputIndex != 0 && message.inputIndex < this.inputposition) {
        this.inputposition = this.inputposition + 1;
      }
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
      this.receiveBevent1(message.inputIndex);
    } else if (message.type == "boldevent2") {
      this.receiveBevent2(message.inputIndex, message.size);
    }
  }
  wait(count,message) {
    this.editor.readOnly = true;
    this.tempCount = count;

    setTimeout(() => {
      if(count == this.tempCount){
      this.editor.readOnly = false;
      this.editor.setSelectionRange(this.inputposition, this.inputposition);
      this.editor.focus();
    }
    }, 500);

  }
  memoSave() {
    this.send(0, 0, this.state.color, 0, "save");
  }
  markOpen() {
    this.setState({
      markOpen: !this.state.markOpen
    })
  }
  editorStart(e) {
    if (this.temp == null) {
      this.send(e.target.selectionStart, 0, this.props.content, 0, "allKey");
      this.temp = this.props.content.split('').length;
    } else {
      this.send(e.target.selectionStart, 0, '', 0, "reClick");
    }
  }
  render() {
    return (
      <Fragment>
        <div className={popup.popup} onClick={(e) => { this.props.memoClose }}>
          <SockJsClient
            url='./api/memo'
            topics={[`/api/memo/${this.props.no}`]}
            onMessage={this.receive.bind(this)}
            ref={(client) => { this.clientRef = client }}
            onConnect={()=>this.props.clientRef.sendMessage(`/app/memo/connect/${this.props.no}`,this.state.name)}
            onDisconnect={()=>this.props.clientRef.sendMessage(`/app/memo/disconnect/${this.props.no}`,this.state.name)}
            />
            <div className={styles.userList}>
            {this.props.groupInUserList.map((element,index) => {
              if(this.state.userList.indexOf(element.id)>-1){
              return(
              <div key={index} className={styles.users}>
                <img id={element.id} className={styles.userImage} src={"."+element.img}/>
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
                      ref={e => this.editor = e}
                      onClick={this.editorStart.bind(this)}
                      onBlur={this.cursorEvent.bind(this)}
                      onKeyDown={e=>{(e.key.indexOf("Arrow")!=-1)?this.inputposition = e.target.selectionStart:null;}}
                      onChange={this.editorPush.bind(this)}
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