import React, { useState, Fragment } from 'react';
import styles from './FilePopup.css';
const Popup = (props) => {

    const Close = () => {
        console.log("close");
        props.close(false);
    }

    return (
        <Fragment>
        {(props.open) ? 
        <div className={styles.popup} onClick={e=>Close()}>
            <div className={styles.inner} onClick={e=>e.stopPropagation()}>
                {props.children}
            </div>
        </div> 
        : null}
        </Fragment>
        
    )
}
export default Popup;