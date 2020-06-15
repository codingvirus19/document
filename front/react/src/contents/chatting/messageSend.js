import React from "react";

import styles from "./messageSend.css";

export default class MessageList extends React.Component {
  constructor() {
    super();
    this.state = {
      message: "",
      btnClass: styles.button,
    };
    this.onChatSubmit = this.onChatSubmit.bind(this);
    this.onInputChanged = this.onInputChanged.bind(this);
  }

  onInputChanged(event) {
    console.log(event.target.value)
    if(event.target.value != ""){
      this.setState({ btnClass: styles.button2 })
    }
    else {
      this.setState({ btnClass: styles.button })
    }
    this.setState({
      message: event.target.value,
    });
  }

  chatKeyPress(event) {
    if (event.key === "Enter") {
      this.onChatSubmit(event);
    }
  }

  onChatSubmit(event) {
    event.preventDefault();

    if(this.state.message == "" || this.state.message == null || this.state.message.replace(/^\s+|\s+$/g, '') == ''){
      return null;
    }
    this.props.sendMessage(this.state.message, this.props.gNo);
    this.setState({
      message: "",
    });
  }

  render() {
    return (
      <form
        onSubmit={this.onChatSubmit.bind(this)}
        className={styles.inputTable}
      >
        <div className={styles.MessageBox}>
          <input
            name="chat"
            type="text"
            className={styles.Message}
            placeholder="내용을 입력하세요"
            value={this.state.message}
            onChange={this.onInputChanged.bind(this)}
            onKeyPress={this.chatKeyPress.bind(this)}
            autoComplete="off"
          />
          <button
            className={this.state.btnClass}
            onClick={this.onChatSubmit.bind(this)}
          >
            전송
          </button>
        </div>
      </form>
    );
  }
}
