import React, { useState } from 'react';
import styles from "../Toolbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
const MemoSave = (props) => {
    const [className,setClassName] = useState(props.className);
    const [buttonName,setButtonName] = useState(props.buttonName);
    if (className == null) setClassName(styles.tool);
    if (buttonName == null) setButtonName(styles.faSave);

    return (
        <button
            className={className}
            aria-label="메모 저장"
            onClick={props.memoSave}
        >
            <FontAwesomeIcon className={buttonName} icon={faSave} />
        </button>
    );

}
export default MemoSave;