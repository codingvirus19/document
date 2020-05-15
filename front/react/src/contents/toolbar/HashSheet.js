import React from "react";

export default class HashSheet extends React.Component {

constructor() {
  super(...arguments);
  this.state = {
    hashKeyword: ""
  }
}

onInputChange(e) {
  this.setState({
    hashKeyword: e.target.value
  })
};

  render() {
    return (
      <div className="hashSheet">
        <input
          className="searchHash"
          type='text'
          value={this.hashKeyword}
          placeholder="해시 태그 검색"
          onChange={this.onInputChange.bind(this)} />

        {this.props.hash &&
          this.props.hash
            .filter(element => element.hash_name.indexOf(this.state.hashKeyword) != -1)
            .map(({ no, hash_name }) => (
              <div key={no}>{hash_name}</div>
            ))}

      </div>
    );
  }
}
