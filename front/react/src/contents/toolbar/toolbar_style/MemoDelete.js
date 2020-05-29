import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import styles from "../Toolbar.css";

import ShareSheet from "../ShareSheet";

const API_URL = "http://localhost:8080/codingvirus19";
const API_HEADERS = {
  "Content-Type": "application/json",
};

export default class MemoDelete extends React.Component {

    constructor() {
        super(...arguments)
        this.state = {
            no: this.props.no,
            gNo: this.props.gNo,
        }
    }

    onClickDelete(e) {
        e.preventDefault();
        let input_deleteMemo = {
          no: this.state.no,
          gNo: this.state.gNo,
        };
        this.ajaxDeleteMemo(input_deleteMemo);
        this.props.SidebarGroupUpdate(this.state.gNo, this.state.gName);
      }
      ajaxDeleteMemo(_deleteMemo) {
        fetch(`${API_URL}/api/memo/delete`, {
          method: "post",
          headers: API_HEADERS,
          body: JSON.stringify(_deleteMemo),
        }).catch((err) => console.error(err));
      }

    render() {
        return (
            <Fragment>
                {/* 메모삭제 */}
                {/* {this.props.SidebarGroupUpdate(this.state.no, this.state.gNo)} */}
                <button
                    className={styles.tool}
                    aria-label="메모 삭제"
                    onClick={this.onClickDelete.bind(this)}
                >
                    <FontAwesomeIcon className={styles.faTrashAlt} icon={faTrashAlt} />
                </button>
            </Fragment >
        )
    }
}