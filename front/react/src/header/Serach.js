import React, { Fragment } from "react";
export default class Profile extends React.Component {
    render() {
        return (
                <div className="search_div">
                    <form className="search-form" action="">
                        <div className="search">
                            <input
                                className="input-search"
                                type="text"
                                name="input-search"
                                placeholder="검색어를 입력하세요"
                            />
                            <button type="submit" className="search-submit" value="검색" onClick={(e) => e.preventDefault()}>
                                <i className="fas fa-hashtag"></i>
                            </button>
                        </div>
                    </form>
                </div>
        )
    }
}
