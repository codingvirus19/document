import React, { useState, Fragment } from 'react';
import styles from './FilePopup.css';
const Popup = (props) => {
    const [className,setClassName] = useState(props.className);
    if(className == null)setClassName(styles.inner);
    const Close = () => {
        console.log("close");
        props.close(false);
    }
    return (
        <Fragment>
        {(props.open) ? 
        <div className={styles.popup} onClick={e=>Close()}>
            <div className={className} onClick={e=>e.stopPropagation()}>
                {props.children}
            </div>
        </div> 
        : null}
        </Fragment>
        
    )
}
export default Popup;