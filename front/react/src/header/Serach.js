import React from "react";
import "./Search.scss";

export default class Search extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      keyword: "",
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
      this.props.SearchHash(this.props.groupBySidebar.no, this.state.keyword)
    }
    // 아니면 내용 검색
    else {
      this.props.SidebarGroupUpdate(this.props.groupBySidebar.no, this.props.groupBySidebar.name);
    }
  }

  onClickEnter(e) {
    if (e.key == "Enter") {
      this.onClickCallback(e);
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
    if (this.props.hash[0] === "") {
      return null;
    }
    return (
      <div className="div">
        <form className="form">
          <div className="search">
            <input
              className="input"
              type="text"
              name="input-search"
              value={this.props.keyword}
              onChange={this.onInputChange.bind(this)}
              onKeyPress={this.onClickEnter.bind(this)}
              onFocus={() => {
                console.log("!!!!!!!!!!!focus");
              } }
              onBlur={() => {
                console.log("!!!!!!!!!!!blur");
              } }
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
        {/* {this.props.hash
          && this.props.hash
            .filter(element => element.indexOf(this.state.keyword) != -1)
            .map(element =>
              <div key={element} className="search_list">
                {element}
              </div>
            )} */}
      </div>
    );
  }
}