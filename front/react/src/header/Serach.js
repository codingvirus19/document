import React from "react";

import styles from "./Search.css";

export default class Search extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      keyword: ""
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

  render() {
    return (
      <div className={styles.div}>
        <form className={styles.form} action="">
          <div className={styles.search}>
            <input
              className={styles.input}
              type="text"
              name="input-search"
              value={this.props.keyword}
              onChange={this.onInputChange.bind(this)}
              placeholder="검색어를 입력하세요"
            />
            <button
              type="submit"
              className={styles.submit}
              value="검색"
              onClick={this.onClickCallback.bind(this)}
              onKeyPress={this.onClickEnter.bind(this)}
            >
              <i className="fas fa-hashtag"></i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}
