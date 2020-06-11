import React from "react";
import "./Search.scss";

export default class Search extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      keyword: "",
      searchClassName: "search"
    };
  }

  onInputChange(event) {
    this.props.onCallbackKeywordChange(event.target.value);
    this.UpdateKeyword(event.target.value);
    this.search(event.target.value)
  }
  
  //enter키 눌를시
  onClickEnter(e) {
    if (e.key == "Enter") {
      this.onClickCallback(e);
    }
  }

  // 검색버튼 클릭시 해당 group의 no와 name으로 memoList를 뿌려주는 콜백함수
  onClickCallback(e) {
    e.preventDefault();
    this.search(this.state.keyword)
  }

  search(keyword) {
    // # 이면 해시 검색
    if (keyword[0] == "#") {
      this.props.SearchHash(this.props.groupBySidebar.no, keyword)
    }
    // 아니면 내용 검색
    else {
      this.props.SidebarGroupUpdate(this.props.groupBySidebar.no, this.props.groupBySidebar.name);
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

  render() {
    return (
      <div className="div">
        <form className="form">
          <div className={this.state.searchClassName}>
            <input
              className="input"
              type="text"
              name="input-search"
              value={this.props.keyword}
              onChange={this.onInputChange.bind(this)}
              onKeyPress={this.onClickEnter.bind(this)}
              onFocus={() => this.setState({ searchClassName: "searchFocus" })}
              onBlur={() => this.setState({ searchClassName: "search" })}
              placeholder="검색"
            />
            <button
              className="delete"
              onClick={this.deleteKeyword.bind(this)}>
              <i className="fas fa-times"></i>
            </button>
            <button
              type="submit"
              className="submit"
              value="검색"
              onClick={this.onClickCallback.bind(this)}
            >
              <i className="fa fa-search"></i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}