import React, { useState, Fragment } from 'react';
import Popup from './Popup';
import styles from './FileUpLoad.css'

const FileUpload = (props) => {
    const [className, setClassName] = useState(props.className);
    const [value, setValue] = useState(props.Value);
    const [popupChange, setPopupChange] = useState(false);
    if (className == null) setClassName(null);
    if (value == null) setValue("I");

    const FileUploadBtn = () => {
        document.getElementById('hiddenFileInput').click();
    }
    const FileUploads = e => {
        props.File(e);
    }
    const PopupChange = (e) => {
        setPopupChange(e);
    }

    return (
        <Fragment>
            <button aria-label="사진 변경" className={className} onClick={() => PopupChange(true)}>{value}</button>
            <Popup open={popupChange} close={() => PopupChange()} >
                <div className={styles.upload}>
                    <button className={styles.upload_btn} onClick={FileUploadBtn}>사진 변경</button>
                </div>
                <div className={styles.upload_img}>
                    <input type="file" id="hiddenFileInput" onChange={e => FileUploads(e)} style={{ display: 'none' }} />
                    {(props.image == null) ? null : <img className={styles.image} src={`.${props.image}`} />}
                </div>
                
                {value =="I"? <button className={styles.save} onClick={() => {props.save(true);  PopupChange(false) }}>저장</button> 
                : <button className={styles.save} onClick={() =>{setValue(props.image); PopupChange(false) }}>저장</button>}
                
                <button className={styles.close} onClick={() => PopupChange(false)}>닫기</button>
            </Popup>

        </Fragment>

    );
}
export default FileUpload;