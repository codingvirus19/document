import React, { useState } from 'react';
import styles from "../Toolbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
const MemoClose = (props) => {
    const [className,setClassName] = useState(props.className);
    const [buttonName,setButtonName] = useState(props.buttonName);
    if (className == null) setClassName(styles.tool);
    if (buttonName == null) setButtonName(styles.fatimescircle);
    return (
        <button
            className={className}
            aria-label="닫기"
            onClick={props.memoClose}
        >
            <FontAwesomeIcon className={buttonName} icon={faTimesCircle} />
        </button>
    );

}
export default MemoClose;