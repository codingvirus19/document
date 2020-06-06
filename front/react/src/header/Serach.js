import React from "react";
import styles from "./Search.scss";

export default class Search extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      keyword: "",
      showDeleteButton: false,
    };
  }

  onInputChange(event) {
    this.props.onCallbackKeywordChange(event.target.value);
    this.UpdateKeyword(event.target.value);
  }

  // 검색버튼 클릭시 해당 group의 no와 name으로 memoList를 뿌려주는 콜백함수
  onClickCallback(e) {
    e.preventDefault();
    // # 이면 해시 검색
    if (this.state.keyword[0] == "#") {
      let hash = this.state.keyword.slice(1)
      this.props.SearchHash(this.props.groupBySidebar.no, hash)
    }
    // 아니면 내용 검색
    else {
      this.props.SidebarGroupUpdate(this.props.groupBySidebar.no, this.props.groupBySidebar.name);
    }
  }

  onClickEnter(e) {
    if (e.key == "Enter") {
      this.onClickCallback();
    }
  }

  UpdateKeyword(keyword) {
    this.setState({
      keyword: keyword
    })
  }

  deleteKeyword(e) {
    e.preventDefault();
    this.props.onCallbackKeywordChange("");
  }

  onMouseEnter() {
    this.setState({
      showDeleteButton: true
    })
  }

  onMouseLeave() {
    this.setState({
      showDeleteButton: false
    })
  }

  render() {
    return (
      <div
        className="div"
        onMouseEnter={this.onMouseEnter.bind(this)}
        onClick={this.onMouseEnter.bind(this)}
        onMouseLeave={this.onMouseLeave.bind(this)}>
        <form className="form">
          <div className="search">
            <input
              className="input"
              type="text"
              name="input-search"
              value={this.props.keyword}
              onChange={this.onInputChange.bind(this)}
              placeholder="검색"
            />
            <button
              className="delete"
              onClick={this.deleteKeyword.bind(this)}
              onKeyPress={this.onClickEnter.bind(this)}>
              {this.state.showDeleteButton ? (
                <i className="fas fa-times"></i>
              ) : null}
            </button>
            <button
              type="submit"
              className="submit"
              value="검색"
              onClick={this.onClickCallback.bind(this)}
              onKeyPress={this.onClickEnter.bind(this)}
            >
              <i className="fa fa-search"></i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}
