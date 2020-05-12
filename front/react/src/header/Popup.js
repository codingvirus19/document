import React from "react";
import cloneDeep from "lodash/cloneDeep";
import { Remarkable } from "remarkable";

export default class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.md = new Remarkable();
    this.state = { value: "", cursor: "", textSize: "" };
  }
  h1event() {
    let input_index = cloneDeep(this.state.cursor);
    let line_index = 0;
    let textLastLine = [0];
    let b = cloneDeep(this.state.value);
    b = b.split("");
    let state2 = cloneDeep(this.state.value);
    state2 = state2.split("\n");
    let state3 = cloneDeep(this.state.value);
    state3 = state3.split("");
    for (let i = 0; i < state2.length; i++) {
      line_index += state2[i].length;
      if (line_index < input_index) {
        line_index += 1;
        textLastLine.push(line_index);
      }
    }
    console.log("textLastLine", textLastLine[textLastLine.length - 1]);
    b.splice(textLastLine[textLastLine.length - 1], 0, "## ");
    this.setState({
      value: b.join(""),
      textSize: state3.length + 3,
    });
  }
  viewSet(text) {
    this.setState({
      value: text.join(""),
      textSize: text.length,
    });
  }

  cursorEvent(e) {
    let input_index = e.target.selectionStart;
    console.log("마우스이벤트", input_index);
    this.setState({ cursor: input_index });
  }
  koreanInput(cursorPosition, key, keyAll) {
    //한글입력 중복오류 잡기
    let text = keyAll.split("");
    text.splice(cursorPosition - 1, 1, key);
    this.viewSet(text);
  }
  deleteInput(cursorPosition, textSize, keyAll) {
    let text = keyAll.split("");
    text.splice(cursorPosition, textSize - keyAll.split("").length);
    this.viewSet(text);
  }

  componentDidUpdate() {
    console.log("render OK");
  }

  // firstindex lastindex key

  editorPush(e) {
    let state2 = e.target.value.split("");
    let textsize = e.target.value.length;
    let input_index = e.target.selectionStart;
    let key = e.target.value.substring(input_index - 1, input_index);
    let temp = cloneDeep(this.state.textSize);

    if (temp == 0) {
      temp = textsize;
    } else if (temp > textsize) {
      this.deleteInput(input_index, temp, e.target.value);
      // console.log("글자지우기");
    } else if (temp == textsize) {
      this.koreanInput(input_index, key, e.target.value);
      //한글입력 오류 잡기~
    } else if (temp + 1 < textsize) {
      let key = e.target.value.substring(
        input_index - (textsize - temp),
        input_index
      );
      input_index - (textsize - temp); //복사붙여넣기를위해 늘어난 text size를 구하여 추가된 시점부터 글자를 넣어준다.
      // console.log("복사");
      state2.splice(input_index - (textsize - temp), 0, key);
    } else {
      // console.log("기본입력");
      state2.splice(input_index - 1, 1, key);
    }
    let state3 = state2.join(""); //배열로 잘라놓은 문자열을 하나의 문자열로 합친다.
    this.setState({
      value: state3,
      cursor: input_index,
      textSize: state2.length,
    }); //변경값을 표출한다.
  }

  getReMarkDown() {
    return { __html: this.md.render(this.state.value) };
  }

  render() {
    const tempStyle = {
      width: "200px",
      height: "200px",
      background: "#ff2",
    };

    return (
      <div className="popup" onClick={this.props.closePopup}>
        <div
          className="popup_inner"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="editor">
            <div className="editorButton">
              <button onClick={this.h1event.bind(this)}>H1</button>
            </div>
            <textarea
              wrap="hard"
              rows="2"
              cols="20"
              className="edit"
              onFocus={this.cursorEvent.bind(this)}
              onChange={this.editorPush.bind(this)}
              value={this.state.value}
            ></textarea>
          </div>
          <div
            className="markDownView"
            dangerouslySetInnerHTML={this.getReMarkDown()}
          ></div>
        </div>
      </div>
    );
  }
}
