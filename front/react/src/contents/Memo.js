import React from "react";

export default class Memo extends React.Component {
  render() {
    console.log(this.props.content);
    return (
      <input
        value={this.props.content}
        className="container_memo-form memo"
        type="textarea"
      ></input>
    );
  }
}
