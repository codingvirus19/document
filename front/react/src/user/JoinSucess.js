import React from "react";
import styles from './Login.css';

export default class JoinSuccess extends React.Component {
    render() {
        return (
            <div>
                <img
                    className={styles.check_img}
                    src="./assets/images/check.webp"
                />
                <h4 className={styles.header}>회원가입이 완료되었습니다.</h4>
            </div>
        )
    }
}