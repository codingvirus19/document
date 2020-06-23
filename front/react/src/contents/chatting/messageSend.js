import React from "react";

import styles from "./messageSend.css";

export default class MessageList extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      message: "",
      btnClass: styles.button,
      dragChat: ""
    };
    this.onChatSubmit = this.onChatSubmit.bind(this);
    this.onInputChanged = this.onInputChanged.bind(this);
  }

  onInputChanged(event) {
    if (event.target.value != "") {
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

    if (this.state.message == "" || this.state.message == null || this.state.message.replace(/^\s+|\s+$/g, '') == '') {
      return null;
    }
    this.props.sendMessage(this.state.message, this.props.gNo);
    this.setState({
      message: "",
    });
  }
  componentWillReceiveProps(props) {
    if (props.chatdragStart != null) {
      this.setState({
        message: props.chatdragStart
      })
    }
    this.messageBtn()
  }

  messageBtn() {
    console.log(this.state.message)
    if (this.state.message != "") {
      this.setState({ btnClass: styles.button2 })
    }
    else {
      this.setState({ btnClass: styles.button })
    }
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
