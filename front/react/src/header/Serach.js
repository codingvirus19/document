import React from "react";

import styles from "./Search.css";

export default class Search extends React.Component {
  onInputChange(event) {
    this.props.onCallbackKeywordChange(event.target.value);
    console.log(event.target.value);
  }

  onClickCallback(e) {
    e.preventDefault();
    this.props.SidebarGroupUpdate(
      this.props.groupBySidebar.no,
      this.props.groupBySidebar.name
    );
    console.log(this.props.groupBySidebar);
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
            >
              <i className="fas fa-hashtag"></i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}
