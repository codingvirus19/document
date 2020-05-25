import React from "react";
import Select from 'react-select';
import { ToastContainer, toast, Slide } from 'react-toastify';
import "../../ReactToastify.scss";
import styles from "./Sheets.css";

export default class GroupShareSheet extends React.Component {

    constructor() {
        super(...arguments);
        this.state = {
            g_noUpdate: '',
            currentG_no: null,
            groups: this.props.group.gname.map(element => {
                return {
                    value: element,
                    label: element
                }
            }),
            // 다 삭제 안되는 오류
        }
    }

    share(e) {
        e.preventDefault();
        toast("그룹에 메모가 공유되었습니다.", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
        })
    }

    render() {

        return (
            <div
                className={styles.groupShareSheet}
                ref={this.props.refChange}>
                <div className={styles.container}>
                    <div className={styles.title}>공유할 그룹</div>
                    <div className={styles.contents}>
                        <Select
                            isMulti
                            autoFocus={true}
                            className={styles.select}
                            defaultMenuIsOpen={true}
                            closeMenuOnSelect={false}
                            menuIsOpen={true}
                            maxMenuHeight={100}
                            options={this.state.groups}
                            placeholder="공유할 그룹 선택"
                            transition={Slide}
                        />
                    </div>
                </div>
                <div className={styles.btns}>
                    <button
                        onClick={this.share.bind(this)}
                        type="submit"
                        className={styles.confirm_btn}>공유하기</button>
                    <button
                        className={styles.cancel_btn}
                        onClick={this.props.closeGroupShareSheet}>
                        취소
              </button>
                    <ToastContainer
                        position="bottom-right"
                        autoClose={3000}
                        hideProgressBar
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable={false}
                        pauseOnHover
                        transition={Slide}
                    />
                </div>
            </div >
        );
    }
}