import React from "react";
import { Remarkable } from 'remarkable';
import SockJsClient from "react-stomp";

export default class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.md = new Remarkable();
    this.state = { value: '', cursor: '', textSize: 0, memoNo: 0, version: 0 };
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
    console.log("error")
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
    this.send(textLastLine[textLastLine.length - 1],state3.length + hsize + 1,pushText,(this.state.version),"hevent");
    this.setState({
      value: b.join(''),
      textSize: (state3.length + hsize + 1)
    })
  }
  send(input_index, size, key, version,type) {
    this.clientRef
    .sendMessage('/app/memo/' + this.state.memoNo,
     JSON.stringify({ 
       inputIndex: input_index,
       size: size,
       key: key,
       type: type,
       version: version}))
  }
  viewSet(text) {
    this.setState({
      value: text.join(''),
      textSize: text.length
    })
  }

  cursorEvent(e) {
    let input_index = e.target.selectionStart;
    // console.log("마우스이벤트", input_index)
    this.setState({ cursor: input_index });
  }
  keyInput(cursorPosition, key) {
    let text = this.getSnapshotBeforeUpdate(this.state.value);
    text = text.split('');
    text.splice(cursorPosition - 1, 0, key);
    this.viewSet(text);
  }

  koreanInput(cursorPosition, key, keyAll) { //한글입력 중복오류 잡기
    let text = keyAll.split('');
    text.splice(cursorPosition - 1, 1, key);
    this.viewSet(text);
  }
  deleteInput(cursorPosition, textSize, keyAll) {
    let text = this.getSnapshotBeforeUpdate(this.state.value);
    console.log("delete");
    text = text.split('');
    keyAll = keyAll.split(''); 
    console.log(text.length-keyAll.length);
    text.splice(cursorPosition,text.length-keyAll.length);
    console.log(text);
    this.viewSet(text);
  }
  copyInput(cursorPosition, textsize, key) {
    let text = this.getSnapshotBeforeUpdate(this.state.value);
    text = text.split('');
    text.splice(cursorPosition - (textsize - text.length), 0, key);
    // console.log(text);
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
    // console.log("temp",temp,"textsize",textsize)
    if (temp > textsize) {
      this.deleteInput(input_index, temp, e.target.value);
      this.send(input_index,(temp-(e.target.value.split('').length + 1)),"",(this.state.version),"delete");
      // console.log("글자지우기");
    } else if (temp == textsize) {
      // console.log("한글입력")
      this.send(input_index,textsize,key,(this.state.version),"korean");
      this.koreanInput(input_index, key, e.target.value);
      //한글입력 오류 잡기~
    } else if ((temp + 1) < textsize) {
      let key = e.target.value.substring((input_index - ((textsize) - temp)), input_index);
      let text = this.getSnapshotBeforeUpdate(this.state.value);
      text = text.split('');
      this.send(input_index,(textsize-text.length),key,(this.state.version),"copy");
      this.copyInput(input_index, textsize, key);
      // console.log("복사");
    } else {
      // console.log("기본입력",input_index);
      this.send(input_index,textsize,key,(this.state.version),"basic");
      this.keyInput(input_index, key);
    }
    this.setState({ cursor: input_index, textSize: e.target.value.split('').length, version :this.state.version+1 }); //변경값을 표출한다.
  }

  getReMarkDown() {
    return { __html: this.md.render(this.state.value) };
  }

  getSnapshotBeforeUpdate(prevState) {
    return prevState;
  }

  receive(){

  }

  render() {
    const tempStyle = {
      width: "200px",
      height: "200px",
      background: "#ff2"
    }

    return (
      <div className="popup" onClick={this.props.closePopup}>
        <div className="popup_inner" onClick={(e) => { e.stopPropagation() }}>
          <div>
            <SockJsClient url='http://192.168.1.132:8080/codingvirus19/api/memo' topics={[`/api/memo/${this.state.memoNo}`]}
              onMessage={this.receive.bind(this)}
              ref={(client) => { this.clientRef = client }} />
          </div>



          <div className="editor">
            <div className="editorButton">
              <button onClick={this.hevent.bind(this, 1)}>H1</button>
              <button onClick={this.hevent.bind(this, 2)}>H2</button>
              <button onClick={this.hevent.bind(this, 3)}>H3</button>
              <button onClick={this.hevent.bind(this, 4)}>H4</button>
            </div>
            <textarea wrap="hard" rows="2" cols="20" className="edit" onFocus={this.cursorEvent.bind(this)} onChange={this.editorPush.bind(this)} value={this.state.value}></textarea>
          </div>

          <div className="markDownView" dangerouslySetInnerHTML={this.getReMarkDown()}></div>
        </div>
      </div>
    );
  }
}
